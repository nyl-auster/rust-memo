module.exports = {
  title: 'Rust depuis zéro',
  description: 'Apprendre Rust progressivement depuis zéro',
  themeConfig: {
    sidebar: [
      '/',
      '/historique-de-rust',
      {
        title: "Prelude",
        children: [
          '/prelude/',
          '/prelude/compilation-execution',
          '/prelude/fichier-binaire',
          '/prelude/bit',
          '/prelude/numeration-binaire',
          '/prelude/gestion-memoire',
          '/prelude/les-segments-memoire',
        ]
      },
      '/commencer-rust-rapidement',
      '/cargo',
      '/expression-vs-declaration',
      {
        title: "Variables et fonctions",
        children: [
          '/variables/type-de-donnees',
          '/variables/let',
          '/variables/primitifs-atomiques',
          '/variables/operations-mathematiques',
          '/variables/primitifs-composes',
          '/variables/fonction',
          '/variables/structure',
          '/variables/enumeration',
          '/variables/collections',
          '/variables/autres-types',
          '/variables/debogguer-une-variable',
          '/variables/duree-de-vie-des-variables',
          '/variables/recapitulatif',
        ]
      },
      '/boucles',
      '/conditions',
      '/propriete-et-emprunt'
    ]
  },

}