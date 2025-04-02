
// cube(`Ventes`, {
//   sql: `SELECT * FROM ventes`,
//   measures: {
//     count: {
//       type: `count`
//     },
//     totalMontant: {
//       sql: `montant`,
//       type: `sum`
//     }
//   },
//   dimensions: {
//     dateVente: {
//       sql: `date_vente`,
//       type: `time`
//     },
//     idClient: {
//       sql: `id_client`,
//       type: `number`
//     }
//   },
//   joins: {
//     Clients: {
//       sql: `${CUBE}.id_client = ${Clients}.id_client`,
//       relationship: `belongsTo`
//     }
//   }
// });
