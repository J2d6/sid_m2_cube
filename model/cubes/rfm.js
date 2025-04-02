// cube(`RFM`, {
//   sql: `
//     SELECT
//       v.id_client,
//       MAX(v.date_vente) AS derniere_achat,
//       COUNT(v.id_vente) AS frequence,
//       SUM(v.montant) AS montant_total
//     FROM ventes v
//     GROUP BY v.id_client
//   `,
//   measures: {
//     frequence: {
//       type: `count`
//     },
//     montantTotal: {
//       sql: `montant_total`,
//       type: `sum`
//     }
//   },
//   dimensions: {
//     derniereAchat: {
//       sql: `derniere_achat`,
//       type: `time`
//     },
//     idClient: {
//       sql: `id_client`,
//       type: `number`
//     }
//   },
//   segments: {
//     clientsRecents: {
//       sql: `derniere_achat > NOW() - INTERVAL 2 YEAR`
//     }
//   }
// });
