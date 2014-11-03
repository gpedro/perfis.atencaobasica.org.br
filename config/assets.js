/**
 * Assets configs
 */

module.exports.assets = {
  // css files shared in admin and app pages
  css: [
    'bower_components/bootstrap/dist/css/bootstrap.css',
    'bower_components/bootstrap/dist/css/bootstrap-theme.css',
    'bower_components/select2/select2.css',
    'bower_components/Jcrop/css/jquery.Jcrop.css',
    'bower_components/font-awesome/css/font-awesome.css',
    'bower_components/summernote/dist/summernote.css',
    'bower_components/codemirror/lib/codemirror.css'
  ],
  // user app css files only
  cssApp: [
    'bower_components/tupi/css/build.css',
    'bower_components/tupi/css/icon/tupi-icon.awesome.css',
    'bower_components/tupi/css/icon/tupi-icon.line.css',
    'bower_components/tupi/css/icon/tupi-icon.cdp.css'
  ],

  // admin pages ( /admin ) css files
  cssAdmin: [],

  js: [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/jquery.cookie/jquery.cookie.js',
    'bower_components/bootstrap/dist/js/bootstrap.js',
    'bower_components/select2/select2.js',
    'bower_components/codemirror/lib/codemirror.js',
    'bower_components/summernote/dist/summernote.js',
    'bower_components/jquery-validation/dist/jquery.validate.js',
    'bower_components/bootstrapValidator/dist/js/bootstrapValidator.js',
    'bower_components/Jcrop/js/jquery.color.js',
    'bower_components/Jcrop/js/jquery.Jcrop.js'
  ],

  emberApp: [],

  emberAdminApp: [],

  bowerComponentsFoldersToCopy: [
    'bower_components/font-awesome/fonts/**',
    'bower_components/bootstrap/dist/fonts/**/*',
    'bower_components/bootstrap/dist/css/*',
    'bower_components/select2/*.png',
    'bower_components/select2/*.gif',
    'bower_components/lightbox/img/**/*',
    'bower_components/tupi/css/**/*',
    'bower_components/tupi/icon/**/*'
  ]
};
