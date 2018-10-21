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
      '/variables/primitifs-composes',
      '/variables/debogguer-une-variable',
      '/variables/operations-mathematiques',
      '/variables/structure',
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