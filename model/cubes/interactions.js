cube("Interactions", {
    sql: `SELECT * FROM fait_interactions`,
  
    dimensions: {
      id_interaction: {
        sql: `id_interaction`,
        type: `number`,
        primaryKey: true // Ajout crucial
      },
      type_interaction: {
        sql: `type_interaction`,
        type: `string`
      }
    },
  
    measures: {
      taux_ouverture: {
        sql: `CASE WHEN type_interaction = 'Email' AND action = 'Ouverture' THEN 1 ELSE 0 END`,
        type: `sum`,
        format: `percent`
      }
    }
  });