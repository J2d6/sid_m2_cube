cube("RFM", {
    sql: `
    WITH rfm_data AS (
      SELECT
        v.id_client,
        MAX(t.date) as last_purchase_date,
        COUNT(DISTINCT v.id_vente) as purchase_count,
        SUM(v.montant) as total_amount,
        NTILE(5) OVER (ORDER BY MAX(t.date) DESC) as recency_score,
        NTILE(5) OVER (ORDER BY COUNT(DISTINCT v.id_vente)) as frequency_score,
        NTILE(5) OVER (ORDER BY SUM(v.montant)) as monetary_score
      FROM fait_ventes v
      JOIN dim_temps t ON v.id_temps = t.id_temps
      WHERE t.date >= CURRENT_DATE - INTERVAL '2 years' // Syntaxe DuckDB
      GROUP BY v.id_client
    )
    SELECT *,
      CASE
        WHEN recency_score >= 4 AND frequency_score >= 4 AND monetary_score >= 4 THEN 'Champions'
        WHEN recency_score >= 3 AND monetary_score >= 4 THEN 'VIP Potentiels'
        WHEN recency_score <= 2 AND frequency_score <= 2 THEN 'Dormants'
        ELSE 'A Segmenter'
      END as segment_rfm
    FROM rfm_data
  `,
  
    joins: {
      Clients: {
        sql: `${RFM}.id_client = ${Clients}.id_client`,
        relationship: `belongsTo`
      }
    },
  
    measures: {
      recency: {
        sql: `DATE_DIFF('day', last_purchase_date, CURRENT_DATE)`,
        type: `number`
      },
      frequency: {
        sql: `purchase_count`,
        type: `number`
      },
      monetary: {
        sql: `total_amount`,
        type: `sum`,
        format: `currency`
      }
    },
  
    dimensions: {
      clientId: {
        sql: `id_client`,
        type: `number`,
        primaryKey: true
      },
      segmentRfm: {
        sql: `segment_rfm`,
        type: `string`
      }
    }
  });