var breadtitle;
var cartheader;
var cartitems;
var cartQty;
var collection;
var country;
var countrylines;
var discountAmt;
var fields;
var flds;
var head;
var item;
var lines;
var orderAmt;
var pictureSlider;
var prod;
var salesTax;
var searchField = document.getElementById('searchvalue');
var searchTerm;
var secondColumn;
var session_no;
var shippingCost;
var stock_no;
var subtotal;
var type;

/////////////////////////////////////////////////////
// Get Session Number and Authorize Access to Page //
/////////////////////////////////////////////////////
function sessionNumber()
{
  session_no = Cookies.get('session_no');
  if (session_no.length !== 25) {
    location.pathname = "/cousin-op/";
    alert("Please log in first.");
  }
}



//////////////////////////
// Add item to the cart //
//////////////////////////
function addItem(clicked_id)
{
   stock_no = clicked_id;
   console.log(stock_no);
   console.log("are you running when i click?");

   $.ajax({
    type: "GET",
    url: "http://72.64.152.18:8081/nlhtml/custom/netlink.php?",
    data: {
      request_id: "APICARTADD",
      session_no: session_no,
      stock_no: stock_no,
      qty: 1
    },
    success: function(response) {
      console.log(response);
      cartHeader();
    }
  });
}



//////////////////////////////
// Get back the cart header //
//////////////////////////////
function cartHeader()
{
  $.ajax({
    type: "GET",
    url: "http://72.64.152.18:8081/nlhtml/custom/netlink.php?",
    data: {
      request_id: "APICARTH",
      session_no: session_no
    },
    success: function(response) {
      cartheader = response.split("\n");
      cartheader = cartheader[1].split("|");
      orderAmt = cartheader[22].replace(/\s+/g,'');
      subtotal = cartheader[19].replace(/\s+/g,'');
      discountAmt = cartheader[20].replace(/\s+/g,'');
      salesTax = cartheader[21].replace(/\s+/g,'');
      shippingCost = cartheader[28].replace(/\s+/g,'');
      cartQty = cartheader[24].replace(/\s+/g,'');
      document.getElementById("top-cart-trigger").innerHTML += '<span>' + cartQty + '</span>';

      if (location.pathname === "/cousin-op/cart/" || location.pathname === "/cousin-op/checkout/") {
        cartTotals();
      }
    }
  });
}


////////////////////
// Get Line items //
////////////////////
function cartList()
{
  $.ajax({
    type: "GET",
    url: "http://72.64.152.18:8081/nlhtml/custom/netlink.php?",
    data: {
      request_id: "APICARTL",
      session_no: session_no
    },
    success: function(response) {

      cartitems = response.split("\n");
      // lines[0] is header row
      // lines[1]+ are data lines

      $("#cartItemTable").empty();

      if (location.pathname === "/cousin-op/cart/") {
        for (i=1; i<cartitems.length - 1; i++) {
          flds = cartitems[i].split("|");

          item = '<tr class="cart_item">';
            item += '<td class="cart-product-remove">';
              item += '<a href="#" class="remove" onclick="removeItem(this.id)" id="' + flds[1].replace(/\s+/g,'') + '" title="Remove this item"><i class="icon-trash2"></i></a>';
            item += '</td>';

            item += '<td class="cart-product-thumbnail">';
              item += '<a href="#"><img width="64" height="64" src="../ljimages/' + flds[2].replace(/\s+/g,'') + '-sm.png" alt="' + flds[3] + '"></a>';
            item += '</td>';

            item += '<td class="cart-product-name">';
              item += '<a href="#">' + flds[3] + '</a>';
            item += '</td>';

            item += '<td class="cart-product-price">';
              item += '<span class="amount">$' + parseInt(flds[7]).toFixed(2) + '</span>';
            item += '</td>';

            item += '<td class="cart-product-quantity">';
              item += '<div class="quantity clearfix">';
                item += '<input type="button" value="-" class="minus">';
                item += '<input type="text" name="quantity" value="' + flds[6].replace(/\s+/g,'') + '" class="qty" />';
                item += '<input type="button" value="+" class="plus">';
              item += '</div>';
            item += '</td>';

            item += '<td class="cart-product-subtotal">';
              item += '<span class="amount">$' + parseInt(flds[8]).toFixed(2) + '</span>';
            item += '</td>';
          item += '</tr>';
          $("#cartItemTable").prepend(item);
        }

        item = '<tr class="cart_item">';
          item += '<td colspan="6">';
            item += '<div class="row clearfix">';
              item += '<div class="col-md-4 col-xs-4 nopadding">';
                item += '<div class="col-md-8 col-xs-7 nopadding">';
                  item += '<input type="text" value="" class="sm-form-control" placeholder="Enter Coupon Code.." />';
                item += '</div>';
                item += '<div class="col-md-4 col-xs-5">';
                  item += '<a href="#" class="button button-3d button-black nomargin">Apply Coupon</a>';
                item += '</div>';
              item += '</div>';
              item += '<div class="col-md-8 col-xs-8 nopadding">';
                item += '<a href="#" class="button button-3d nomargin fright">Update Cart</a>';
                item += '<a href="#" class="button button-3d notopmargin fright" onclick="checkoutRedirect()">Proceed to Checkout</a>';
              item += '</div>';
            item += '</div>';
          item += '</td>';
        item += '</tr>';
        $("#cartItemTable").append(item);
      }
      if (location.pathname === "/cousin-op/checkout/") {
        for (i=1; i<cartitems.length - 1; i++) {
          flds = cartitems[i].split("|");

          item = '<tr class="cart_item">';
            item += '<td class="cart-product-thumbnail">';
              item += '<a href="#"><img width="64" height="64" src="../ljimages/' + flds[2].replace(/\s+/g,'') + '-sm.png" alt="' + flds[3] + '"></a>';
            item += '</td>';

            item += '<td class="cart-product-name">';
              item += '<a href="#">' + flds[3] + '</a>';
            item += '</td>';

            item += '<td class="cart-product-quantity">';
              item += '<div class="quantity clearfix">' + flds[6].replace(/\s+/g,'') + '</div>';
            item += '</td>';

            item += '<td class="cart-product-subtotal">';
              item += '<span class="amount">$' + parseInt(flds[8]).toFixed(2) + '</span>';
            item += '</td>';
          item += '</tr>';
          $("#cartItemTable").append(item);
        }
      }
    }
  });
}

////////////////////////////
// REMOVE ITEMS FROM CART //
////////////////////////////
function removeItem(clicked_id)
{
  line_no = clicked_id;
  console.log(line_no);
  console.log("test, am i removing the item?");

  $.ajax({
    type: "GET",
    url: "http://72.64.152.18:8081/nlhtml/custom/netlink.php?",
    data: {
      request_id: "APICARTREM",
      session_no: session_no,
      line_no: line_no
    },
    success: function(response) {
      console.log(response);
      cartHeader();
      cartList();
    }
  });
}

//////////////////////////////////////
// Functionality of + and - Buttons //
//////////////////////////////////////
function increaseValue()
{
    var value = parseInt(document.getElementById('number').value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById('number').value = value;
}

function decreaseValue()
{
    var value = parseInt(document.getElementById('number').value, 10);
    value = isNaN(value) ? 0 : value;
    value--;
    document.getElementById('number').value = value;
}


/////////////////////////////////
// Get Country Codes and Stuff //
/////////////////////////////////
function countryCode()
{
    $.ajax({
    type: "GET",
    url: "http://72.64.152.18:8081/nlhtml/custom/netlink.php?",
    data: {
      request_id: "APICOUNTRY",
      session_no: session_no
    },
    success: function(response) {
      country = response.split("\n");
      // lines[0] is header row
      // lines[1]+ are data lines

      $("#countries").empty();

      for (i=1; i<country.length - 1; i++) {
        countrylines = country[i].split("|");
        document.getElementById("countries").innerHTML += '<option value="' + countrylines[0].replace(/\s+/g,'') + '">' + countrylines[1].replace(/\s+/g,'') + '</option>';
      }
    }
  });
}



/////////////////////////
// Fill in Cart Totals //
/////////////////////////
function cartTotals()
{
  $("#cart-totals").empty();
  var totals = '<tr class="cart_item">';
    totals += '<td class="notopborder cart-product-name">';
      totals += '<strong>Cart Subtotal</strong>';
    totals += '</td>';

    totals += '<td class="notopborder cart-product-name">';
      totals += '<span class="amount">' + subtotal + '</span>';
    totals += '</td>';
  totals += '</tr>';
  totals += '<tr class="cart_item">';
    totals += '<td class="cart-product-name">';
      totals += '<strong>Shipping</strong>';
    totals += '</td>';

    totals += '<td class="cart-product-name">';
      totals += '<span class="amount">' + shippingCost + '</span>';
    totals += '</td>';
  totals += '</tr>';
  totals += '<tr class="cart_item">';
    totals += '<td class="cart-product-name">';
      totals += '<strong>Total</strong>';
    totals += '</td>';

    totals += '<td class="cart-product-name">';
      totals += '<span class="amount color lead"><strong>' + orderAmt + '</strong></span>';
    totals += '</td>';
  totals += '</tr>';
  document.getElementById("cart-totals").innerHTML += totals;
}



/////////////////////////
// Credit Card Process //
/////////////////////////
function creditCard ()
{
  $.ajax({
   type: "GET",
   url: "http://72.64.152.18:8081/nlhtml/custom/netlink.php?",
   data: {
     request_id: "APICC",
     session_no: session_no
   },
   success: function(response) {
     console.log(response);
     document.getElementById("creditcard").innerHTML += response;
   }
 });
}


///////////////////////////////
// Potential Filter Function //
///////////////////////////////
function filterFunction(a,b,c,d,e,f)
{
  $.ajax({
    type: "GET",
    url: "http://192.168.123.17:8080/nlhtml/custom/netlink.php?",
    data: {a,
    level1: b,
    level2: c,
    level3: d,
    level4: e,
    level5: f},
    success: function(response) {

      lines = response.split("\n");
      // lines[0] is header row
      // lines[1]+ are data lines
      fields = lines[1].split("|");

        $('#shop').empty();
        $('#breadcrumbtitle').empty();

      for (i=1; i<lines.length - 1; i++) {
        flds = lines[i].split("|");

        prod = '<div class="product clearfix pf-dress">';
          prod += '<div class="product-image">';
            prod += '<a href="#"><img src="../ljimages/' + flds[0].replace(/\s+/g,'') + '-md.png" alt="' + flds[1] + '"></a>';
          //  prod += '<a href="#"><img src="../ljimages/' + flds[0].replace(/\s+/g,'') + '-sm.png" alt="' + flds[1] + '"></a>';
          //  prod += 'div class="sale-flash">50% Off*</div>'
            prod += '<div class="product-overlay">';
              prod += '<a href="#" class="add-to-cart" onclick="addItem()" id="' + flds[0].replace(/\s+/g,'') + '"><i class="icon-shopping-cart"></i><span> Add to Cart</span></a>';
              prod += '<a href="{{ site.baseurl }}/detail-view/#' + flds[0].replace(/\s+/g,'') + '" class="item-quick-view" data-lightbox="ajax"><i class="icon-zoom-in2"></i><span class="' + flds[0].replace(/\s+/g,'') + '">Detail View</span></a>';
            prod += '</div>';
          prod += '</div>';
          prod += '<div class="product-desc">';
            prod += '<div class="product-title"><h3><a href="#">' + flds[1] +'</a></h3></div>';
            prod += '<div class="product-price"><ins>$' + flds[4] +'</ins></div>';
          prod += '</div>';
        prod += '</div>';
        document.getElementById("shop").innerHTML += prod;
      }
    }
  });
}



//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////

//////////////      REDIRECT FUINCTIONS      /////////////////

//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////

function checkoutRedirect()
{
  window.location.pathname = "/cousin-op/checkout/";
}

//
// List all Products API Function
//

$("#shopFilterSleek").on('click', function () {
switch (window.location.pathname) {
     case "/cousin-op/sleek/":
        $("#shopFilterSleek").on('click', {request_id: "APISTKLST", level1: "LJ10000", level2: "", level3: "", level4: "", level5: ""}, filterFunction);
        break;
     case "/cousin-op/rglb/":
        $("#shopFilterRGLB").on('click', {request_id: "APISTKLST", level1: "LJ10700", level2: "", level3: "", level4: "", level5: ""}, filterFunction);
        break;
     case "/cousin-op/encharming/":
        $("#shopFilterEncharming").on('click', {request_id: "APISTKLST", level1: "LJ10300", level2: "", level3: "", level4: "", level5: ""}, filterFunction);
        break;
     case "/cousin-op/identify/":
        $("#shopFilterIdentify").on('click', {request_id: "APISTKLST", level1: "LJ10500", level2: "", level3: "", level4: "", level5: ""}, filterFunction);
        break;
     default:
        $("#shopFilter").on('click', {request_id: "APISTKLST", level1: "", level2: "", level3: "", level4: "", level5: ""}, filterFunction);
   }
});

$("#shopFilter").on('click', {request_id: "APISTKLST", level1: "", level2: "", level3: "", level4: "", level5: ""}, filterFunction);


//
// List all SLEEK Products API Function
//

//$("#shopFilterSleek").on('click', {request_id: "APISTKLST", level1: "LJ10000", level2: "", level3: "", level4: "", level5: ""}, filterFunction);


//
// List all RGLB Products API Function
//

//$("#shopFilterRGLB").on('click', {request_id: "APISTKLST", level1: "LJ10700", level2: "", level3: "", level4: "", level5: ""}, filterFunction);


//
// List all enChamring Products API Function
//

//$("#shopFilterEncharming").on('click', {request_id: "APISTKLST", level1: "LJ10300", level2: "", level3: "", level4: "", level5: ""}, filterFunction);


//
// List all Identify Products API Function
//

//$("#shopFilterIdentify").on('click', {request_id: "APISTKLST", level1: "LJ10500", level2: "", level3: "", level4: "", level5: ""}, filterFunction);


//
// List all Programs API Function
//

$("#shopFilterPrograms").on('click', {request_id: "APISTKLST", level1: "", level2: "800", level3: "", level4: "", level5: ""}, filterFunction);


//
// List all Sets API Function
//

$("#shopFilterSets").on('click', {request_id: "APISTKLST", level1: "", level2: "700", level3: "", level4: "", level5: ""}, filterFunction);


//
// List all Earrings API Function
//

$("#shopFilterEarrings").on('click', {request_id: "APISTKLST", level1: "", level2: "300", level3: "", level4: "", level5: ""}, filterFunction);


//
// List all Necklaces API Function
//

$("#shopFilterNecklaces").on('click', {request_id: "APISTKLST", level1: "", level2: "100", level3: "", level4: "", level5: ""}, filterFunction);


//
// List all Bracelets API Function
//

$("#shopFilterBracelets").on('click', {request_id: "APISTKLST", level1: "", level2: "200", level3: "", level4: "", level5: ""}, filterFunction);


//
// List all Lanyards API Function
//

$("#shopFilterLanyards").on('click', {request_id: "APISTKLST", level1: "", level2: "400", level3: "", level4: "", level5: ""}, filterFunction);


//
// List all Tassels API Function
//

$("#shopFilterTassels").on('click', {request_id: "APISTKLST", level1: "", level2: "600", level3: "", level4: "", level5: ""}, filterFunction);


//
// List all Snaps API Function
//

$("#shopFilterSnaps").on('click', {request_id: "APISTKLST", level1: "", level2: "500", level3: "", level4: "", level5: ""}, filterFunction);



//
// Search API Function
//

$('#searchvalue').on("input", function() {
  searchTerm = this.value;
  console.log(searchTerm);
});



$('input#searchvalue').on('keypress', {request_id: "APISTKSEARCH", level1: searchTerm}, function (event) {
    var key = event.which || event.keyCode;
    if (key === 13) {
      event.preventDefault();
//      getSearchTerm();
      $.get("http://192.168.123.17:8080/nlhtml/custom/netlink.php?",
      {request_id: "APISTKSEARCH",
       query: searchTerm},
      function(response) {
        lines = response.split("\n");
        // lines[0] is header row
        // lines[1]+ are data lines
        fields = lines[1].split("|");
        $('#shop').empty();

        for (i=1; i<lines.length - 1; i++) {
          flds = lines[i].split("|");
    //          prod = '<div class="product clearfix"><div class="product-image">';
    //          prod += '<a href="#"><img src="http://api.netlink.ninja/nlhtml/images/shop/' + flds[3] + '" alt="' + flds[1] + '"></a>';
    //          prod += '<div class="product-overlay"><a href="#" class="add-to-cart"><i class="icon-shopping-cart"></i><span> Add to Cart</span></a><a href="include/ajax/shop-item.html" class="item-quick-view" data-lightbox="ajax"><i class="icon-zoom-in2"></i><span> Quick View</span></a></div></div>';
    //          prod += '<div class="product-desc center"><div class="product-title"><h3><a href="#">' + flds[1] + '</a></h3></div><div class="product-price">' + flds[4] + '</div><div class="product-rating"><i class="icon-star3"></i><i class="icon-star3"></i><i class="icon-star3"></i><i class="icon-star-half-full"></i><i class="icon-star-empty"></i></div></div>';

              prod = '<div class="product clearfix pf-dress">';
                prod += '<div class="product-image">';
                  prod += '<a href="#"><img src="../ljimages/' + flds[0].replace(/\s+/g,'') + '-lg.png" alt="' + flds[1] + '"></a>';
                  prod += '<a href="#"><img src="../ljimages/' + flds[0].replace(/\s+/g,'') + '-lg.png" alt="' + flds[1] + '"></a>';
                //  prod += 'div class="sale-flash">50% Off*</div>'
                  prod += '<div class="product-overlay">';
                    prod += '<a href="#" class="add-to-cart"><i class="icon-shopping-cart"></i><span> Add to Cart</span></a>';
                    prod += '<a href="../include/ajax/shop-item.html" class="item-quick-view" data-lightbox="ajax"><i class="icon-zoom-in2"></i><span> Quick View</span></a>';
                  prod += '</div>';
                prod += '</div>';
                prod += '<div class="product-desc">';
  								prod += '<div class="product-title"><h3><a href="#">' + flds[1] +'</a></h3></div>';
  								prod += '<div class="product-price"><ins>' + flds[4] +'</ins></div>';
  							prod += '</div>';
              prod += '</div>';
          document.getElementById("shop").innerHTML += prod;
        }
     });
    }
});
