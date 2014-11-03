/*jshint undef:false */
var cbpHorizontalMenu = (function() {

  var $listItems = $( '#nav-horizontal > ul > li' ),
    $menuItems = $listItems.children( 'a' ),
    $body = $( 'body' ),
    current = -1;

  function init() {
    $menuItems.on( 'click', open );
    $listItems.on( 'click', function( event ) { event.stopPropagation(); } );
  }

  function open( event ) {

    if( current !== -1 ) {
      $listItems.eq( current ).removeClass( 'nav-horizontal-submenu-open' );
    }

    var $item = $( event.currentTarget ).parent( 'li' ),
      idx = $item.index();

    if( current === idx ) {
      $item.removeClass( 'nav-horizontal-submenu-open' );
      current = -1;
    }
    else {
      $item.addClass( 'nav-horizontal-submenu-open' );
      current = idx;
      $body.off( 'click' ).on( 'click', close );
    }

    return false;

  }

  function close( event ) {
    $listItems.eq( current ).removeClass( 'nav-horizontal-submenu-open' );
    current = -1;
  }

  return { init : init };

})();
