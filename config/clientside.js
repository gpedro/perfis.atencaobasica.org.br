
module.exports.clientside = {
  publicVars: {
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