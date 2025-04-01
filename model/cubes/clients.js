cube("Clients", {
    sql: `SELECT * FROM dim_clients`,
  
    dimensions: {
      id_client: {
        sql: `id_client`,
        type: `number`,
        primaryKey: true
      },
      segment: {
        sql: `segment`,
        type: `string`
      }
    }
  });