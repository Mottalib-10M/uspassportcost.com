# Étude : passeport américain, coût exact et délais (idée A11, 2026-10-15)

## Volume
Keyword Planner (objetech, 2026-10-15) : ~1 160 000 recherches/mois sur 28 requêtes (« how long does it take to get a passport » 100 k – 1 M ; « passport fees », « how much does a passport cost », « passport renewal » 10 k – 100 k). Enchère haute 0,6 – 2,4 €. Fichier : `volumes-us-passport.txt` (borne prudente 411 096).

## SERP relevé (WebSearch + WebFetch, 2026-10-15/16)
| Résultat | Type | Ce qu'il fait | Défaut constaté | Ce qu'on fait mieux |
|---|---|---|---|---|
| travel.state.gov (frais, délais) | BLOQUÉ | source officielle, calculateur de formulaire | pages éclatées (PDF, délais, renouvellement, pays) ; pas de date d'arrivée face au voyage | une seule saisie : total ventilé par paiement + fenêtre d'arrivée + règle du pays |
| nerdwallet.com | DÉFENDU | article | « 1-2 day delivery $22,05 » (26,87 $ depuis octobre 2026), « Published Sep 15, 2023 », aucun calculateur | grille d'octobre 2026, simulateur sur chaque page |
| moneygeek.com | DÉFENDU | article | ni délais ni livraison, pas de calculateur passeport | idem |
| rusticpathways.com | CLONE à jour (6 oct. 2026) | calculateur de coût | ne relie pas le coût à la date de voyage ; pas de ventilation par chèque ; pas de règles pays | date d'arrivée, conseil officiel (6 sem. / 3 sem. / 14 j), deux paiements, 24 destinations |
| citizennow.com | PRENABLE | article (3 juil. 2026) | « 1-2 Day Delivery $22.05 », pas de délai ordinaire | frais et délais lus par script, mis à jour automatiquement |
| usahousinginformation.com | PRENABLE | article (févr. 2026) | « $19.53 », « 6 to 8 weeks » | 26,87 $ et 4-6 semaines datés |
| afar.com, newsweek | BLOQUÉ (médias) | articles | délais de 2023 (« 8 to 11 weeks ») | — |
| rushmypassport.com | DÉFENDU (vente) | expéditeur | 349 à 699 $ hors frais d'État | aucun service vendu ; page qui montre la part gouvernementale d'un devis |

Verdict : volume > 300 000, SERP non imprenable (indépendants classés) → GO (RECETTE §2.1).

## Actif de données
- Grille PDF « United States Passport Fees », octobre 2026 (miroir adoptions.state.gov du Bureau of Consular Affairs ; travel.state.gov refuse les robots, pas de contournement) + page Passport Fees.
- 22 CFR 22.1 par l'API eCFR (50 $ + 80 $ de surcharge = 130 $).
- Pages Processing Time (5 oct. 2026), Renew Online (30 sept.), Renew by Mail (1er oct.), Get Fast, Refund (15 jours ouvrés), fériés OPM.
- API Consular Affairs (cadataapi.state.gov) : fiches pays (24 destinations, citations vérifiées par test), 14 321 lieux de dépôt par État, délivrances par exercice.

## Angle
« Combien je paie et quand je le reçois » : total au centime par destinataire (chèque « U.S. Department of State » / structure d'accueil / carte), fenêtre d'arrivée calculée tronçon par tronçon, comparaison avec la date de départ, et validité exigée par le pays de destination. Jamais de vente d'accélération.
