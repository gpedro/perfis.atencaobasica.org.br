
module.exports.clientside = {
  publicVars: {
    links: {
      timeline: 'https://cursos.atencaobasica.org.br',
      redeSocial: 'https://novo.atencaobasica.org.br/relato'
    },

    menus: {
      // your app main menu
      main: {
        links: []
      },

      sidebar: {
        links: []
      },

      admin: {
        links: [

          {
            i18nText: 'menu.link.vocabulary',
            type: 'resource',
            model: 'vocabularies'
          },

          {
            i18nText: 'menu.link.user',
            type: 'resource',
            model: 'user'
          },

          {
            i18nText: 'menu.link.permissions',
            type: 'resource',
            model: 'permissions'
          }
        ]
      }
    }
  } // end publicVars
}