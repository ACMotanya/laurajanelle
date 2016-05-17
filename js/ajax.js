var fields;
var breadtitle;
var collection;
var lines;
var flds;
var prod;
var type;
var searchTerm;
var searchField = document.getElementById('searchvalue');


var filterFunction = function(event) {
  $.get("http://192.168.123.17:8080/nlhtml/custom/netlink.php?",
    {request_id: "APISTKLST",
    level1: event.data.level1,
    level2: event.data.level2,
    level3: event.data.level3,
    level4: event.data.level4,
    level5: event.data.level5},
    function(response) {
      lines = response.split("\n");
      // lines[0] is header row
      // lines[1]+ are data lines
      fields = lines[1].split("|");

      switch (fields[2]) {
        case "SLK":
          collection = 'Sleek';
          break;
        case "GLB":
          collection = "RGLB";
          break;
        case "EC":
          collection = "enCharming";
          break;
        case "ID":
          collection = "iDentify";
          break;
        default:
          collection = fields[2];
        }

      $('#shop').empty();
      $('#breadcrumbtitle').empty();

      for (i=1; i<lines.length - 1; i++) {
        flds = lines[i].split("|");
    //          prod = '<div class="product clearfix"><div class="product-image">';
    //          prod += '<a href="#"><img src="http://api.netlink.ninja/nlhtml/images/shop/' + flds[3] + '" alt="' + flds[1] + '"></a>';
    //          prod += '<div class="product-overlay"><a href="#" class="add-to-cart"><i class="icon-shopping-cart"></i><span> Add to Cart</span></a><a href="include/ajax/shop-item.html" class="item-quick-view" data-lightbox="ajax"><i class="icon-zoom-in2"></i><span> Quick View</span></a></div></div>';
    //          prod += '<div class="product-desc center"><div class="product-title"><h3><a href="#">' + flds[1] + '</a></h3></div><div class="product-price">' + flds[4] + '</div><div class="product-rating"><i class="icon-star3"></i><i class="icon-star3"></i><i class="icon-star3"></i><i class="icon-star-half-full"></i><i class="icon-star-empty"></i></div></div>';

            prod = '<div class="product clearfix pf-dress">';
              prod += '<div class="product-image">';
                prod += '<a href="#"><img src="../ljimages/' + flds[0].replace(/\s+/g,'') + '-lg.png" alt="' + flds[1] + '"></a>';
                prod += '<a href="#"><img src="../images/shop/dress/1-1.jpg" alt="Checked Short Dress"></a>';
              //  prod += 'div class="sale-flash">50% Off*</div>'
                prod += '<div class="product-overlay">';
                  prod += '<a href="#" class="add-to-cart"><i class="icon-shopping-cart"></i><span> Add to Cart</span></a>';
                  prod += '<a href="../include/ajax/shop-item.html" class="item-quick-view" data-lightbox="ajax"><i class="icon-zoom-in2"></i><span> Quick View</span></a>';
                prod += '</div>';
              prod += '</div>';
            prod += '</div>';
        document.getElementById("shop").innerHTML += prod;
      }

         breadtitle = '<h1>' + collection + '</h1>';
         breadtitle += '<span>Made With Swarovski Cystals</span>';
         breadtitle += '<ol class="breadcrumb">';
           breadtitle += '<li><a href="#">Home</a></li>';
           breadtitle += '<li>Shop</li>';
           breadtitle += '<li class="active">' + collection + '</li>';
         breadtitle += '</ol>';
       document.getElementById("breadcrumbtitle").innerHTML += breadtitle;
    });
};


//
// List all Product API Function
//

$("#shopFilter").on('click', filterFunction);


//
// List all SLEEK Product API Function
//

$("#shopFilterSleek").on('click', {level1: "LJ10000", level2: "", level3: "", level4: "", level5: ""}, filterFunction);


//
// List all RGLB Product API Function
//

$("#shopFilterRGLB").on('click', {level1: "LJ10700", level2: "", level3: "", level4: "", level5: ""}, filterFunction);


//
// List all enChamring Product API Function
//

$("#shopFilterEncharming").on('click', {level1: "LJ10300", level2: "", level3: "", level4: "", level5: ""}, filterFunction);


//
// List all Identify Product API Function
//

$("#shopFilterIdentify").on('click', {level1: "LJ10500", level2: "", level3: "", level4: "", level5: ""}, filterFunction);


//
// List all Programs API Function
//

$("#shopFilterPrograms").on('click', filterFunction);


//
// List all Sets API Function
//

$("#shopFilterSets").on('click', filterFunction);


//
// List all Product API Function
//

$("#shopFilterEarrings").on('click', {level1: "", level2: "300", level3: "", level4: "", level5: ""},filterFunction);


//
// List all Necklaces API Function
//

$("#shopFilterNecklaces").on('click', {level1: "", level2: "100", level3: "", level4: "", level5: ""}, filterFunction);


//
// List all Bracelets API Function
//

$("#shopFilterBracelets").on('click', {level1: "", level2: "200", level3: "", level4: "", level5: ""}, filterFunction);


//
// List all Product API Function
//

$("#shopFilterLanyards").on('click', {level1: "", level2: "400", level3: "", level4: "", level5: ""}, filterFunction);


//
// List all Product API Function
//

$("#shopFilterTassels").on('click', {level1: "", level2: "600", level3: "", level4: "", level5: ""}, filterFunction);


//
// List all Product API Function
//

$("#shopFilterSnaps").on('click', {level1: "", level2: "500", level3: "", level4: "", level5: ""}, filterFunction);



//
// Search API Function
//
function getSearchTerm() {
  searchTerm = document.getElementById("searchvalue").value;
}

searchField.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
      getSearchTerm();
      $.get("http://192.168.123.17:8080/nlhtml/custom/netlink.php?",
      {request_id: "APISTKSEARCH",
       query: searchTerm},
      function(response) {
        lines = response.split("\n");
        // lines[0] is header row
        // lines[1]+ are data lines
        fields = lines[1].split("|");

        for (i=1; i<lines.length - 1; i++) {
          flds = lines[i].split("|");
    //          prod = '<div class="product clearfix"><div class="product-image">';
    //          prod += '<a href="#"><img src="http://api.netlink.ninja/nlhtml/images/shop/' + flds[3] + '" alt="' + flds[1] + '"></a>';
    //          prod += '<div class="product-overlay"><a href="#" class="add-to-cart"><i class="icon-shopping-cart"></i><span> Add to Cart</span></a><a href="include/ajax/shop-item.html" class="item-quick-view" data-lightbox="ajax"><i class="icon-zoom-in2"></i><span> Quick View</span></a></div></div>';
    //          prod += '<div class="product-desc center"><div class="product-title"><h3><a href="#">' + flds[1] + '</a></h3></div><div class="product-price">' + flds[4] + '</div><div class="product-rating"><i class="icon-star3"></i><i class="icon-star3"></i><i class="icon-star3"></i><i class="icon-star-half-full"></i><i class="icon-star-empty"></i></div></div>';

              prod = '<div class="product clearfix pf-dress">';
                prod += '<div class="product-image">';
                  prod += '<a href="#"><img src="../ljimages/' + flds[0].replace(/\s+/g,'') + '-lg.png" alt="' + flds[1] + '"></a>';
                  prod += '<a href="#"><img src="../images/shop/dress/1-1.jpg" alt="Checked Short Dress"></a>';
                //  prod += 'div class="sale-flash">50% Off*</div>'
                  prod += '<div class="product-overlay">';
                    prod += '<a href="#" class="add-to-cart"><i class="icon-shopping-cart"></i><span> Add to Cart</span></a>';
                    prod += '<a href="../include/ajax/shop-item.html" class="item-quick-view" data-lightbox="ajax"><i class="icon-zoom-in2"></i><span> Quick View</span></a>';
                  prod += '</div>';
                prod += '</div>';
              prod += '</div>';
          document.getElementById("results").innerHTML += prod;
        }
     });
    }
});
