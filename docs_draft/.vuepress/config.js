let config = require("../../vuepress.config")
config.title = "DRAFT - Rust depuis Zéro"
config.themeConfig.sidebar = [
  ["/", "Rust depuis zéro"],
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
      '/variables/declarer-une-variable',
      '/variables/reference',
      '/variables/primitifs-atomiques',
      '/variables/operations-mathematiques',
      '/variables/primitifs-composes',
      '/variables/fonction',
      '/variables/structure',
      '/variables/enumeration',
      '/variables/collections',
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
  {
    title: "Gestion des erreurs",
    children: [
      '/gestion-des-erreurs/'
    ]
  }
]
module.exports = config;
