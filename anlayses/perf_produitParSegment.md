// Produits achetés en répétition par les VIP
{
  measures: ["VentesAnalytics.quantite_totale"],
  dimensions: ["Produits.nom_produit"],
  filters: [
    { member: "Clients.segment", operator: "equals", values: ["VIP"] },
    { member: "Ventes.nb_transactions", operator: "gt", values: ["3"] }
  ]
}