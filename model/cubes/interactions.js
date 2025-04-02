// cube("Interactions", {
//   sql: `SELECT * FROM fait_interactions`,

//   joins: {
//     Clients: {
//       sql: `${Interactions}.id_client = ${Clients}.id_client`,
//       relationship: `belongsTo`
//     },
//     Temps: {
//       sql: `${Interactions}.id_temps = ${Temps}.id_temps`,
//       relationship: `belongsTo`
//     },
//     Canaux: {
//       sql: `${Interactions}.id_canal = ${Canaux}.id_canal`,
//       relationship: `belongsTo`
//     }
//   },

//   measures: {
//     taux_ouverture: {
//       sql: `CASE WHEN type_interaction = 'Email' AND action = 'Ouverture' THEN 1 ELSE 0 END`,
//       type: `avg`,
//       format: `percent`
//     },
//     taux_conversion: {
//       sql: `CASE WHEN action = 'Achat' THEN 1 ELSE 0 END`,
//       type: `avg`,
//       format: `percent`
//     }
//   },

//   dimensions: {
//     id_interaction: {
//       sql: `id_interaction`,
//       type: `number`,
//       primaryKey: true
//     },
//     type_interaction: {
//       sql: `type_interaction`,
//       type: `string`
//     },
//     est_email: {
//       sql: `CASE WHEN type_interaction = 'Email' THEN 1 ELSE 0 END`,
//       type: `boolean`
//     }
//   }
// });