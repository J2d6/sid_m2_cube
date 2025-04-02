cube("Canaux", {
    sql: `SELECT * FROM dim_canaux`,
    
    dimensions: {
      id_canal: {
        sql: `id_canal`,
        type: `number`,
        primaryKey: true
      },
      nom_canal: {
        sql: `nom_canal`,
        type: `string`
      },
      type_canal: {
        sql: `type_canal`,
        type: `string`
      }
    }
  });
  
  cube("Clients", {
    sql: `SELECT * FROM dim_clients`,
    
    dimensions: {
      id_client: {
        sql: `id_client`,
        type: `number`,
        primaryKey: true
      },
      nom: {
        sql: `nom`,
        type: `string`
      },
      prenom: {
        sql: `prenom`,
        type: `string`
      },
      email: {
        sql: `email`,
        type: `string`
      },
      segment: {
        sql: `segment`,
        type: `string`
      },
      canal_acquisition: {
        sql: `canal_acquisition`,
        type: `string`
      }
    }
  });
  
  cube("Fidelite", {
    sql: `SELECT * FROM fait_fidelite`,
  
    joins: {
      Clients: {
        sql: `${Fidelite}.id_client = ${Clients}.id_client`,
        relationship: `belongsTo`
      },
      Temps: {
        sql: `${Fidelite}.id_temps = ${Temps}.id_temps`,
        relationship: `belongsTo`
      }
    },
  
    measures: {
      points_moyens_utilises: {
        sql: `points_utilises`,
        type: `avg`,
        format: `number`
      },
      taux_utilisation: {
        sql: `SUM(points_utilises) / NULLIF(SUM(points_acquis), 0)`,
        type: `number`,
        format: `percent`
      }
    },
  
    dimensions: {
      id_operation: {
        sql: `id_operation`,
        type: `number`,
        primaryKey: true
      },
      type_operation: {
        sql: `type_operation`,
        type: `string`
      },
      est_recompense: {
        sql: `CASE WHEN recompense IS NOT NULL THEN 1 ELSE 0 END`,
        type: `boolean`
      }
    }
  });
  
  cube("Interactions", {
    sql: `SELECT * FROM fait_interactions`,
  
    joins: {
      Clients: {
        sql: `${Interactions}.id_client = ${Clients}.id_client`,
        relationship: `belongsTo`
      },
      Temps: {
        sql: `${Interactions}.id_temps = ${Temps}.id_temps`,
        relationship: `belongsTo`
      },
      Canaux: {
        sql: `${Interactions}.id_canal = ${Canaux}.id_canal`,
        relationship: `belongsTo`
      }
    },
  
    measures: {
      taux_ouverture: {
        sql: `CASE WHEN ${Interactions}.type_interaction = 'Email' AND ${Interactions}.action = 'Ouverture' THEN 1 ELSE 0 END`,
        type: `avg`,
        format: `percent`
      },
      taux_conversion: {
        sql: `CASE WHEN ${Interactions}.action = 'Achat' THEN 1 ELSE 0 END`,
        type: `avg`,
        format: `percent`
      }
    },
  
    dimensions: {
      id_interaction: {
        sql: `id_interaction`,
        type: `number`,
        primaryKey: true
      },
      type_interaction: {
        sql: `type_interaction`,
        type: `string`
      },
      est_email: {
        sql: `CASE WHEN ${Interactions}.type_interaction = 'Email' THEN 1 ELSE 0 END`,
        type: `boolean`
      }
    }
  });

  cube("Produits", {
    sql: `SELECT * FROM dim_produits`,
    
    dimensions: {
      id_produit: {
        sql: `id_produit`,
        type: `number`,
        primaryKey: true
      },
      nom_produit: {
        sql: `nom_produit`,
        type: `string`
      },
      categorie: {
        sql: `categorie`,
        type: `string`
      },
      sous_categorie: {
        sql: `sous_categorie`,
        type: `string`
      },
      marque: {
        sql: `marque`,
        type: `string`
      },
      cout_production: { 
        sql: `cout_production`,
        type: `number`
      },
      prix_unitaire: {
        sql: `prix_unitaire`,
        type: `number`
      }
    }
  });

cube("RFM", {
  sql: `
    WITH rfm_data AS (
      SELECT
        v.id_client,
        MAX(t.date) as last_purchase_date,
        COUNT(DISTINCT v.id_vente) as frequency,  
        SUM(v.montant) as monetary,               
        NTILE(5) OVER (ORDER BY MAX(t.date) DESC) as recency_score,
        NTILE(5) OVER (ORDER BY COUNT(DISTINCT v.id_vente)) as frequency_score,
        NTILE(5) OVER (ORDER BY SUM(v.montant)) as monetary_score
      FROM fait_ventes v
      JOIN dim_temps t ON v.id_temps = t.id_temps
      WHERE t.date >= CURRENT_DATE - INTERVAL '2 years'
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
    recency_days: {  // Renommé depuis 'recency'
      sql: `DATEDIFF('day', last_purchase_date, CURRENT_DATE)`,
      type: `number`
    },
    frequency: {     // Correspond à purchase_count
      sql: `frequency`,
      type: `number`
    },
    monetary: {      // Correspond à total_amount
      sql: `monetary`,
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
    },
    recency_score: {
        sql: `recency_score`,
        type: `number`
      },
      frequency_score: {
        sql: `frequency_score`,
        type: `number`
      },
      monetary_score: {
        sql: `monetary_score`,
        type: `number`
      }
  }
});
  
  cube("Temps", {
    sql: `SELECT * FROM dim_temps`,
    
    dimensions: {
      id_temps: {
        sql: `id_temps`,
        type: `number`,
        primaryKey: true
      },
      date: {
        sql: `date`,
        type: `time`
      },
      mois: {
        sql: `mois`,
        type: `number`
      },
      annee: {
        sql: `annee`,
        type: `number`
      }
    }
  });
  
  cube("Ventes", {
    sql: `SELECT * FROM fait_ventes`,
    
    joins: {
      Clients: {
        sql: `${Ventes}.id_client = ${Clients}.id_client`,
        relationship: `belongsTo`
      },
      Produits: {
        sql: `${Ventes}.id_produit = ${Produits}.id_produit`,
        relationship: `belongsTo`
      },
      Temps: {
        sql: `${Ventes}.id_temps = ${Temps}.id_temps`,
        relationship: `belongsTo`
      },
      Canaux: {
        sql: `${Ventes}.id_canal = ${Canaux}.id_canal`,
        relationship: `belongsTo`
      }
    },
  
    measures: {
      ca_total: {
        sql: `montant`,
        type: `sum`,
        format: `currency`
      },
      quantite_totale: {
        sql: `quantite`,
        type: `sum`
      }
    },
  
    dimensions: {
      id_vente: {
        sql: `id_vente`,
        type: `number`,
        primaryKey: true
      }
    }
  });
  
  cube("VentesAnalytics", {
    sql: `
      SELECT 
        v.*, 
        (v.montant - (p.cout_production * v.quantite)) as marge_unitaire
      FROM fait_ventes v
      JOIN dim_produits p ON v.id_produit = p.id_produit
    `,
  
    joins: {
      Clients: {
        sql: `${VentesAnalytics}.id_client = ${Clients}.id_client`,
        relationship: `belongsTo`
      },
      Temps: {
        sql: `${VentesAnalytics}.id_temps = ${Temps}.id_temps`,
        relationship: `belongsTo`
      },
      Produits: {
        sql: `${VentesAnalytics}.id_produit = ${Produits}.id_produit`,
        relationship: `belongsTo`
      }
    },
  
    measures: {
      marge_totale: {
        sql: `marge_unitaire`,
        type: `sum`,
        format: `currency`
      },
      panier_moyen: {
        sql: `SUM(montant) / COUNT(DISTINCT id_vente)`,
        type: `number`,
        format: `currency`
      }
    },
  
    dimensions: {
      id_vente: {
        sql: `id_vente`,
        type: `number`,
        primaryKey: true
      }
    }
  });