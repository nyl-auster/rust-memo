module.exports = {
  title: 'Rust depuis zéro',
  description: 'Apprendre Rust progressivement depuis zéro',
  themeConfig: {
    sidebar: [
      '/',
      '/commencer-rapidement',
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
      '/cargo',
      '/expression-et-declaration',
      {
        title: "Variables et fonctions",
        children: [
          '/variables/type-de-donnees',
          '/variables/declarer-une-variable',
          '/variables/reference',
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
      {
        title: "Contrôle de flux",
        children: [
          '/controle-de-flux/boucles',
          '/controle-de-flux/if-else',
          '/controle-de-flux/suite-de-fibonacci',
          '/controle-de-flux/pattern-matching',
        ]
      },
      '/propriete-et-emprunt'
    ]
  },

}