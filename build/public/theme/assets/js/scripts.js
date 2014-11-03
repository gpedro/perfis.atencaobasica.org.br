/* main scripts */

// tootip configs
$('#tooltip').tooltip('hide');

// Ember breadcrumbs configs
window.BreadCrumbs.BreadCrumbsComponent.reopen({
  tagName: 'ol',
  classNames: ['breadcrumb'],
  // use application/templates/components/bread-crumbs.hbs template
  layout: null
});

/**
 * Home page slideshow
 */
 $('.carousel').carousel({
   interval: 9000,
   pause: 'none'
 })
