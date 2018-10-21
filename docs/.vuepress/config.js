let config = require("../../vuepress.config")
config.themeConfig.sidebar = [
  ["/", "Rust depuis zéro"],
  "/historique-de-rust",
  {
    title: "Variables",
    children: [
      '/variables/type-de-donnees',
      '/variables/declarer-une-variable',
      '/variables/primitifs-atomiques',
      '/variables/operations-mathematiques',
      '/variables/primitifs-composes',
      '/variables/structure',
      '/variables/debogguer-une-variable',
    ]
  },
  {
    title: "Les modules",
    children:[
      '/modules/',
    ]
  }

]
module.exports = config;