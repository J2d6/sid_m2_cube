cube("Fidelite", {
    sql: `SELECT * FROM fait_fidelite`,
  
    dimensions: {
      id_operation: {
        sql: `id_operation`,
        type: `number`,
        primaryKey: true
      },
      type_operation: {
        sql: `type_operation`,
        type: `string`
      }
    }
  });