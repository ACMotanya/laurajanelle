// 1.
var $wrap = $( "#wrapper" );

// 2.
$wrap.on( "click", ".page-link", function( event ) {

    // 3.
    event.preventDefault();

    // 4.
    if ( window.location === this.href ) {
        return;
    }
console.log(this.href);
    // 5.
    var pageTitle = ( this.title ) ? this.title : this.textContent;
        pageTitle = ( this.getAttribute( "rel" ) === "home" ) ? pageTitle : pageTitle + " â€” Laura Janelle";

    // 6.
    History.pushState( this.href, pageTitle, this.title );
});

// 1.
History.Adapter.bind( window, "statechange", function() {

    // 2.
    var state = History.getState();

    // 3.
    $.get( state.url, function( res ) {
      console.log("please be working?");
        // 4.
        $.each( $( res ), function( index, elem ) {
            if ( $wrap.selector !== "#" + elem.id ) {
                return;
            }
            $wrap.html( $( elem ).html() );
        } );

    } );
} );
