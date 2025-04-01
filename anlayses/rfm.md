- "Quels clients achètent souvent (Fréquence) mais dépensent peu (Montant) ?"  
  → Filtre : `segmentRfm = 'A Segmenter' ET frequency_score >= 4 ET monetary_score <= 2`

- "Quels clients ont un CA élevé mais n'ont pas acheté récemment ?"  
  → Filtre : `segmentRfm = 'VIP Potentiels' ET recency >= 90 jours`


  