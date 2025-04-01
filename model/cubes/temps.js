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
      }
    }
  });