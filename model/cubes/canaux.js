cube("Canaux", {
    sql: `SELECT * FROM dim_canaux`,
  
    dimensions: {
      id_canal: {
        sql: `id_canal`,
        type: `number`,
        primaryKey: true
      },
      type_canal: {
        sql: `type_canal`,
        type: `string`
      }
    }
  });