// cube("VentesAnalytics", {
//   sql: `
//     SELECT 
//       v.*, 
//       (v.montant - (p.cout_production * v.quantite)) as marge_unitaire
//     FROM fait_ventes v
//     JOIN dim_produits p ON v.id_produit = p.id_produit
//   `,

//   joins: {
//     Clients: {
//       sql: `${VentesAnalytics}.id_client = ${Clients}.id_client`,
//       relationship: `belongsTo`
//     },
//     Temps: {
//       sql: `${VentesAnalytics}.id_temps = ${Temps}.id_temps`,
//       relationship: `belongsTo`
//     },
//     Produits: {
//       sql: `${VentesAnalytics}.id_produit = ${Produits}.id_produit`,
//       relationship: `belongsTo`
//     }
//   },

//   measures: {
//     marge_totale: {
//       sql: `marge_unitaire`,
//       type: `sum`,
//       format: `currency`
//     },
//     panier_moyen: {
//       sql: `SUM(montant) / COUNT(DISTINCT id_vente)`,
//       type: `number`,
//       format: `currency`
//     },
//     ca_total: {
//       sql: `montant`,
//       type: `sum`,
//       format: `currency`
//     }
//   },

//   dimensions: {
//     id_vente: {
//       sql: `id_vente`,
//       type: `number`,
//       primaryKey: true
//     }
//   }
// });