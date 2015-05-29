/**
 * Assets configs
 */

module.exports.assets = {
  // css files shared in admin and app pages
  css: [
    // 'bower_components/font-awesome/css/font-awesome.css',
    // 'bower_components/summernote/dist/summernote.css',
    // 'bower_components/select2/select2.css',
    // 'bower_components/codemirror/lib/codemirror.css',

    // 'bower_components/nprogress/nprogress.css',

    // 'bower_components/At.js/dist/css/jquery.atwho.css',
  ],
  // user app css files only
  cssApp: [
    'bower_components/bootstrap/dist/css/bootstrap.min.css',
    'bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
    'bower_components/tupi/css/build.css',
    'bower_components/bootstrapValidator/src/css/bootstrapValidator.css'
  ],
  // admin pages ( /admin ) css files
  cssAdmin: [
    'bower_components/metisMenu/dist/metisMenu.css'
  ],

  emberApp: [
    'node_modules/*/client/app/beforeAll/*.js',
    'node_modules/*/client/app/libs/*.js',

    'client/app/beforeAll/*.js',
    'client/app/emberApp.js',

    'node_modules/*/client/app/mixins/*.js',
    'node_modules/*/client/app/helpers/*.js',
    'node_modules/*/client/app/adapters/*.js',
    'node_modules/*/client/app/routes/*.js',
    // 'node_modules/we-plugin-core/client/app/routes/*.js',
    // 'node_modules/we-plugin-cdp-profile/client/app/routes/*.js',
    'node_modules/*/client/app/controllers/*.js',
    'node_modules/*/client/app/models/*.js',
    'node_modules/*/client/app/views/*.js',
    'node_modules/*/client/app/components/*.js',

    'client/app/controllers/*.js',
    'client/app/routes/*.js',
    'client/app/views/*.js',

    'client/app/afterEmberFilesLoaded.js'
  ],

  emberAdminApp: [
    'node_modules/*/client/app/beforeAll/*.js',
    // load client libs for admin
    'node_modules/*/client/app/libs/*.js',
    'node_modules/*/client/appAdmin/libs/*.js',

    'client/app/emberApp.js',

    'node_modules/*/client/appAdmin/emberApp.js',
    'node_modules/*/client/app/mixins/*.js',
    'node_modules/*/client/appAdmin/mixins/*.js',
    'node_modules/*/client/appAdmin/helpers/*.js',

    'node_modules/*/client/app/adapters/*.js',
    'node_modules/*/client/appAdmin/adapters/*.js',

    'node_modules/*/client/appAdmin/routes/*.js',
    'node_modules/*/client/appAdmin/controllers/*.js',
    'node_modules/*/client/appAdmin/models/*.js',
    'node_modules/*/client/appAdmin/views/*.js',
    // load client components
    'node_modules/*/client/app/components/*.js',

    'node_modules/*/client/appAdmin/components/*.js',
    'node_modules/*/client/appAdmin/afterEmberFilesLoaded.js',

    'client/appAdmin/afterEmberFilesLoaded.js'
  ],

  bowerComponentsFoldersToCopy: [
    'bower_components/lightbox/img/**/*',
    'bower_components/tupi/css/**/*',
    'bower_components/tupi/icon/**/*'
  ]

};
