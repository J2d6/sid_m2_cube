cube("VentesAnalytics", {
    sql: `SELECT v.*, p.cout_production 
          FROM fait_ventes v
          JOIN dim_produits p ON v.id_produit = p.id_produit`,
  
    joins: {
      Clients: {
        sql: `${VentesAnalytics}.id_client = ${Clients}.id_client`,
        relationship: `belongsTo`
      },
      Temps: {
        sql: `${VentesAnalytics}.id_temps = ${Temps}.id_temps`,
        relationship: `belongsTo`
      }
    },
  
    measures: {
      marge: {
        sql: `montant - cout_production`,
        type: `sum`,
        format: `currency`
      },
      ca_total: {
        sql: `montant`,
        type: `sum`,
        format: `currency`
      },
      nb_transactions: {
        sql: `id_vente`,
        type: `count`
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