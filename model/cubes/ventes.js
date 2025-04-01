cube("Ventes", {
    sql: `SELECT * FROM fait_ventes`,
  
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
      },
      id_client: {
        sql: `id_client`,
        type: `number`
      },
      id_produit: {
        sql: `id_produit`,
        type: `number`
      },
      id_canal: {
        sql: `id_canal`,
        type: `number`
      },
      id_temps: {
        sql: `id_temps`,
        type: `number`
      }
    }
  });