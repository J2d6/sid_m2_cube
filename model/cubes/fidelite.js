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