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
    }
  }
});