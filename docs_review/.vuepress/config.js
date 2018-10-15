let config = require("../../vuepress.config")
config.title = "REVIEW - Rust depuis Zéro"
config.themeConfig.sidebar = [
  ["/", "REVIEW - Rust depuis zéro"],
  {
    title: "Variables et fonctions",
    children: [
      '/variables/type-de-donnees',
      '/variables/structure',
    ]
  }
]
module.exports = config;
