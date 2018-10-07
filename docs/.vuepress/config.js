module.exports = {
  title: 'Rust depuis zéro',
  description: 'Apprendre Rust progressivement depuis zéro',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    lastUpdated: 'Last Updated', // string | boolean
    nav: [
      { text: "S'abonner", link: 'http://eepurl.com/dJuW3I' },
      { text: 'Contact', link: 'https://yineo.fr/contact' },
    ],
    sidebar: [
      ["/", "Rust depuis zéro"],
      '/modules/',
      /* UNPUBLISHED */
      /*
      {
        title: "introduction",
        children:[
          'introduction/historique-de-rust',
          'introduction/commencer-rapidement',
          'introduction/cargo',
        ]
      },
      {
        title: "Prelude",
        children: [
          '/prelude/compilation-execution',
          '/prelude/fichier-binaire',
          '/prelude/bit',
          '/prelude/numeration-binaire',
          '/prelude/gestion-memoire',
          '/prelude/les-segments-memoire',
        ]
      },
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
          '/variables/duree-de-vie-des-variables'
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
      {
        title: "Propriété et emprunt",
        children: [
          '/propriete/propriete-et-emprunt'
        ]
      },
      */
      /*
      {
        title: "Gestion des erreurs",
        children: [
          '/gestion-des-erreurs/'
        ]
      },
      */
    ]
  },

}