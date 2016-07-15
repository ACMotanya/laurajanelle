var breadtitle;
var cartheader;
var cartitems;
var cartQty;
var collection;
var country;
var countrylines;
var discountAmt;
var detailViewQty;
var fields;
var flds;
var fldsArray = { "data": []};
var fldsArray_json;
var head;
var item;
var lines;
var min;
var max;
var numberOfOrders;
var newNumberOfOrders;
var orderAmt;
var pictureSlider;
var prices = [];
var prod;
var salesTax;
var searchField = document.getElementById('searchvalue');
var searchTerm;
var secondColumn;
var session_no;
var shippingAddresses = [];
var shippingCost;
var shoppingCart;
var stock_no;
var subtotal;
var type;



/////////////////////////////////////////////////////
// Get Session Number and Authorize Access to Page //
/////////////////////////////////////////////////////
function sessionNumber()
{
  session_no = Cookies.get('session_no');
  if (typeof(session_no) === "undefined" || session_no.length !== 25) {
    location.pathname = "/cousin-op/retailerlogin/";  //  Well need to change when going live
    alert("Please log in first.");
  }
}



////////////////////////////////////////
// New Generic - Add item to the cart //
////////////////////////////////////////
function addItemGeneric(session_no, stock_no, qty)
{
   $.ajax({
    type: "GET",
    url: "http://72.64.152.18:8081/nlhtml/custom/netlink.php?",
    data: {
      request_id: "APICARTADD",
      session_no: session_no,
      stock_no: stock_no,
      qty: qty
    },
    success: function(response) {
      console.log(response);
    }
  });
}



////////////////////////////////
// OLD - Add item to the cart //
////////////////////////////////
function addItem(clicked_id)
{
   stock_no = clicked_id;
   console.log(stock_no);
   console.log("are you running when i click?");
   detailViewQty = document.getElementById(stock_no).value;

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



//////////////////////////////////////////////
// Add item to the cart for the detail page //
//////////////////////////////////////////////
function addItemDetailView()
{
  console.log("are you running when I click for detail view?");
  detailViewQty = document.getElementById(stock_no).value;

  $.ajax({
    type: "GET",
    url: "http://72.64.152.18:8081/nlhtml/custom/netlink.php?",
    data: {
      request_id: "APICARTADD",
      session_no: session_no,
      stock_no: stock_no,
      qty: detailViewQty
    },
    success: function(response) {
      console.log(response);
      cartRedirect();
    }
  });
}



//////////////////////////////////////
// GENERIC - REMOVE ITEMS FROM CART //
//////////////////////////////////////
function removeItemGeneric(session_no, line_no)
{
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
    }
  });
}



//////////////////////////////////
// OLD - REMOVE ITEMS FROM CART //
//////////////////////////////////
function removeItem(clicked_id)
{
  line_no = clicked_id;

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
      $("#minicart").empty();

      if (location.pathname === "/cousin-op/cart/") {
        for (i=1; i<cartitems.length - 1; i++) {
          flds = cartitems[i].split("|");

          item = '<tr class="cart_item products">';
            item += '<td class="cart-product-remove">';
              item += '<a href="#" class="remove" onclick="removeItem(this.id)" id="' + flds[1].replace(/\s+/g,'') + '" title="Remove this item"><i class="icon-trash2"></i></a>';
            item += '</td>';

            item += '<td class="cart-product-thumbnail">';
              item += '<a href="../detail-view/#' + flds[2].replace(/\s+/g,'') + '"><img width="64" height="64" src="../ljimages/' + flds[2].replace(/\s+/g,'') + '-sm.png" alt="' + flds[3] + '"></a>';
            item += '</td>';

            item += '<td class="cart-product-name">';
              item += '<a href="../detail-view/#' + flds[2].replace(/\s+/g,'') + '">' + flds[3] + '</a>';
            item += '</td>';

            item += '<td class="cart-product-price">';
              item += '<span class="amount">$' + parseInt(flds[7]).toFixed(2) + '</span>';
            item += '</td>';

            item += '<td class="cart-product-quantity">';
              item += '<div class="quantity clearfix">';
                item += '<input type="button" value="-" class="minus btn-number" disabled="disabled" data-type="minus" data-field="quant['+i+']" onclick="changeQuantity(this)">';
                item += '<input type="text" name="quant['+i+']" value="' + flds[6].replace(/\s+/g,'') + '" class="qty form-control input-number" id="' + flds[2].replace(/\s+/g,'') + '" />';
                item += '<input type="button" value="+" class="plus btn-number" data-type="plus" data-field="quant['+i+']" onclick="changeQuantity(this)">';
              item += '</div>';
            item += '</td>';

            item += '<td class="cart-product-subtotal">';
              item += '<span class="amount">$' + parseInt(flds[8]).toFixed(2) + '</span>';
            item += '</td>';
          item += '</tr>';
          $("#cartItemTable").prepend(item);

          miniitem = '<div class="top-cart-item clearfix">';
            miniitem += '<div class="top-cart-item-image">';
              miniitem += '<a href="#"><img src="../ljimages/' + flds[2].replace(/\s+/g,'') + '-sm.png" alt="' + flds[3] + '" /></a>';
            miniitem += '</div>';
            miniitem += '<div class="top-cart-item-desc">';
              miniitem += '<a href="#">' + flds[3] + '</a>';
              miniitem += '<span class="top-cart-item-price">$' + parseInt(flds[7]).toFixed(2) + '</span>';
              miniitem += '<span class="top-cart-item-quantity">x ' + flds[6].replace(/\s+/g,'') + '</span>';
            miniitem += '</div>';
          miniitem += '</div>';
          $("#minicart").append(miniitem);
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
                item += '<a href="#" class="button button-3d nomargin fright"  onclick="updateCart()">Update Cart</a>';
                item += '<a href="#" class="button button-3d notopmargin fright" onclick="checkoutRedirect()">Proceed to Checkout</a>';
              item += '</div>';
            item += '</div>';
          item += '</td>';
        item += '</tr>';
        $("#cartItemTable").append(item);
      } else if (location.pathname === "/cousin-op/checkout/") {
        for (i=1; i<cartitems.length - 1; i++) {
          flds = cartitems[i].split("|");

          item = '<tr class="cart_item">';
            item += '<td class="cart-product-thumbnail">';
              item += '<a href=../detail-view/#' + flds[2].replace(/\s+/g,'') + '"><img width="64" height="64" src="../ljimages/' + flds[2].replace(/\s+/g,'') + '-sm.png" alt="' + flds[3] + '"></a>';
            item += '</td>';

            item += '<td class="cart-product-name">';
              item += '<a href="../detail-view/#' + flds[2].replace(/\s+/g,'') + '">' + flds[3] + '</a>';
            item += '</td>';

            item += '<td class="cart-product-quantity">';
              item += '<div class="quantity clearfix">' + flds[6].replace(/\s+/g,'') + '</div>';
            item += '</td>';

            item += '<td class="cart-product-subtotal">';
              item += '<span class="amount">$' + parseInt(flds[8]).toFixed(2) + '</span>';
            item += '</td>';
          item += '</tr>';
          $("#cartItemTable").append(item);

          miniitem = '<div class="top-cart-item clearfix">';
            miniitem += '<div class="top-cart-item-image">';
              miniitem += '<a href="#"><img src="../ljimages/' + flds[2].replace(/\s+/g,'') + '-sm.png" alt="' + flds[3] + '" /></a>';
            miniitem += '</div>';
            miniitem += '<div class="top-cart-item-desc">';
              miniitem += '<a href="#">' + flds[3] + '</a>';
              miniitem += '<span class="top-cart-item-price">$' + parseInt(flds[7]).toFixed(2) + '</span>';
              miniitem += '<span class="top-cart-item-quantity">x ' + flds[6].replace(/\s+/g,'') + '</span>';
            miniitem += '</div>';
          miniitem += '</div>';
          $("#minicart").append(miniitem);
        }
      } else {
        miniitem = '<div class="top-cart-item clearfix">';
          miniitem += '<div class="top-cart-item-image">';
            miniitem += '<a href="#"><img src="../ljimages/' + flds[2].replace(/\s+/g,'') + '-sm.png" alt="' + flds[3] + '" /></a>';
          miniitem += '</div>';
          miniitem += '<div class="top-cart-item-desc">';
            miniitem += '<a href="#">' + flds[3] + '</a>';
            miniitem += '<span class="top-cart-item-price">$' + parseInt(flds[7]).toFixed(2) + '</span>';
            miniitem += '<span class="top-cart-item-quantity">x ' + flds[6].replace(/\s+/g,'') + '</span>';
          miniitem += '</div>';
        miniitem += '</div>';
        $("#minicart").append(miniitem);
      }
    }
  });
}





//////////////////////////////////////
// Functionality of + and - Buttons //
//////////////////////////////////////
function changeQuantity(element)
{
  var fieldName = $(element).attr('data-field');
  console.log(fieldName);
  var type      = $(element).attr('data-type');
  console.log(type);
  var input = $("input[name='"+fieldName+"']");
  console.log(input);
  var currentVal = parseInt(input.val());
  if (!isNaN(currentVal)) {
    if(type == 'minus') {
      var minValue = parseInt(input.attr('min'));
      if(!minValue) minValue = 1;
      if(currentVal > minValue) {
        input.val(currentVal - 1).change();
      }
      if(parseInt(input.val()) == minValue) {
        $(this).attr('disabled', true);
      }
    } else if(type == 'plus') {
      var maxValue = parseInt(input.attr('max'));
        if(!maxValue) maxValue = 9999999999999;
        if(currentVal < maxValue) {
          input.val(currentVal + 1).change();
        }
        if(parseInt(input.val()) == maxValue) {
          $(this).attr('disabled', true);
        }
    }
  } else {
    input.val(0);
  }

  $('.input-number').focusin(function(){
    $(this).data('oldValue', $(this).val());
  });
  $('.input-number').change(function() {
    var minValue =  parseInt($(this).attr('min'));
    var maxValue =  parseInt($(this).attr('max'));
    if(!minValue) minValue = 1;
    if(!maxValue) maxValue = 9999999999999;
    var valueCurrent = parseInt($(this).val());

    var name = $(this).attr('name');
    if(valueCurrent >= minValue) {
        $(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled');
    } else {
        alert('Sorry, the minimum value was reached');
        $(this).val($(this).data('oldValue'));
    }
    if(valueCurrent <= maxValue) {
        $(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled');
    } else {
        alert('Sorry, the maximum value was reached');
        $(this).val($(this).data('oldValue'));
    }
  });
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



////////////////////////\\
// Update Cart Function \\
//\\\\\\\\\\\\\\\\\\\\\\\\
function updateCart ()
{
  shoppingCart = {};

  var table = $("table tbody#cartItemTable");

  // loop thru cart and faltten the items that are repeated
  table.find('tr.products').each(function () {
    var line_no     = $(this).find('td:first-child a').attr('id');
    var stockNumber = $(this).find('td:nth-child(5) div input:nth-child(2)').attr('id');
    var qty         = parseInt($(this).find('td:nth-child(5) div input:nth-child(2)').val());

    console.log(line_no);
    console.log(stockNumber);
    console.log(qty);

    if (!shoppingCart.hasOwnProperty(stockNumber)) {
      shoppingCart[stockNumber] = [qty, line_no];
      removeItemGeneric(session_no, line_no);

    } else {
      console.log("This is already in there");
      shoppingCart[stockNumber][0] += qty;
      removeItemGeneric(session_no, shoppingCart[stockNumber][1]);
      removeItemGeneric(session_no, line_no);

    }
  });
  console.log(shoppingCart);

  $.each( shoppingCart, function( key, value ) {
    addItemGeneric(session_no, key, value[0]);
  });
  cartList();
  cartTotals();
}



/////////////////////////
// Credit Card Process //
/////////////////////////
function creditCard()
{
  document.getElementById("creditcard").src="http://72.64.152.18:8081/nlhtml/custom/netlink.php?request_id=APICC&session_no=" + session_no + "";

  $.ajax({
    type: "GET",
    url: "http://72.64.152.18:8081/nlhtml/custom/netlink.php?",
    data: {
      request_id: "APIORDLST",
      session_no: session_no
    },
    success: function(response) {
      console.log(response);
      openlines = response.split("\n");
      numberOfOrders = openlines.length;
    },
    complete: function (){
      var findNewOrder = setInterval(function(){
        $.get("http://72.64.152.18:8081/nlhtml/custom/netlink.php?request_id=APIORDLST&session_no=" + session_no + "", function( data ) {
          openlines = data.split("\n");
          newNumberOfOrders = openlines.length;
          if (numberOfOrders != newNumberOfOrders) {
            clearInterval(findNewOrder);

            orders = [];
            for (i=1; i< openlines.length - 1; i++) {
              fields = openlines[i].split("|");
              orders.push(fields);
            }
            orders = orders.sort(function(a, b) {
              return a[1] > b[1] ? -1 : 1;
            });
            newOrder = orders[0][0];
            $( "#success" ).trigger( "click" );
            var message =  '<h4 style="font-family: Lato;">The order # is: ' + newOrder + '</h4>';

                message += '<p>This is a confirmation that your order has been successfully received and is currently under process. You will receive an email soon with a copy of your invoice, which also includes the details of your order.</p>';
                message += '<p class="nobottommargin">Laura Janelle values your business and is continuously looking for ways to better satisfy their customers. Please do share with us if there is a way we can serve you better.</p>';
            document.getElementById("successMessage").innerHTML += message;
            document.body.addEventListener("click", function(){
              ordersRedirect();
            });
          }
        });
      }, 3000);
    }
  });
}




/////////////////////////////////////////
// Saving Addresses from Checkout Page //
/////////////////////////////////////////
function saveAddresses()
{
/*  var billingformcompanyname  = $("#billing-form-companyname").val();
  var billingformaddress      = $("#billing-form-addres").val();
  var billingformaddress2     = $("#billing-form-address2").val();
  var billingformaddress3     = $("#billing-form-address3").val();
  var billingformcity         = $("#billing-form-city").val();
  var billingformstate        = $("#billing-form-state").val();
  var billingformzipcode      = $("#billing-form-zipcode").val();
  var billingformcountry      = $("#billing-form-country").val();
  var billingformemail        = $("#billing-form-email").val();
  var billingformphone        = $("#billing-form-phone").val();
*/
  var shippingformcompanyname = $("#shipping-form-companyname").val();
  var shippingformaddress     = $("#shipping-form-address").val();
  var shippingformaddress2    = $("#shipping-form-address2").val();
  var shippingformaddress3    = $("#shipping-form-address3").val();
  var shippingformcity        = $("#shipping-form-city").val();
  var shippingformstate       = $("#shipping-form-state").val();
  var shippingformzipcode     = $("#shipping-form-zipcode").val();
  var shippingformcountry     = $("#shipping-form-country").val();
  var email_addr              = $("#billing-form-email").val();
  var phone                   = $("#billing-form-phone").val();

  $.ajax({
   type: "GET",
   url: "http://72.64.152.18:8081/nlhtml/custom/netlink.php?",
   data: {
     request_id: "APICARTUPD",
     session_no: session_no,
/*     billname: billingformcompanyname,
     billadd1: billingformaddress,
     billadd2: billingformaddress2,
     billadd3: billingformaddress3,
     billcity: billingformcity,
     billstate: billingformstate,
     billzip: billingformzipcode,
     billcountry: billingformcountry,
*/
     shipname: shippingformcompanyname,
     shipadd1: shippingformaddress,
     shipadd2: shippingformaddress2,
     shipadd3: shippingformaddress3,
     shipcity: shippingformcity,
     shipstate: shippingformstate,
     shipzip: shippingformzipcode,
     shipcountry: shippingformcountry,
     email_addr: email_addr,
     phone: phone
   },
   success: function(response) {
     console.log(response);
   }
 });
}



/////////////////////////
// Populate Page Title //
/////////////////////////
function pageTitle()
{
switch (window.location.hash) {
  case "#sleek":
    $('#page-title').empty();
    document.getElementById("page-title").innerHTML += '<div class="container clearfix"><h1>SLEEK</h1><ol class="breadcrumb"><li><a href="#">Home</a></li><li>Shop</li><li class="active">SLEEK</li></ol></div>';
    break;
  case "#rglb":
    $('#page-title').empty();
    document.getElementById("page-title").innerHTML += '<div class="container clearfix"><h1>RGLB</h1><ol class="breadcrumb"><li><a href="#">Home</a></li><li>Shop</li><li class="active">RGLB</li></ol></div>';
    break;
  case "#encharming":
    $('#page-title').empty();
    document.getElementById("page-title").innerHTML += '<div class="container clearfix"><h1>Encharming</h1><ol class="breadcrumb"><li><a href="#">Home</a></li><li>Shop</li><li class="active">Encharming</li></ol></div>';
    break;
  case "#identify":
    $('#page-title').empty();
    document.getElementById("page-title").innerHTML += '<div class="container clearfix"><h1>iDentify</h1><ol class="breadcrumb"><li><a href="#">Home</a></li><li>Shop</li><li class="active">iDentify</li></ol></div>';
    break;
  case "#programs":
    $('#page-title').empty();
    document.getElementById("page-title").innerHTML += '<div class="container clearfix"><h1>Programs</h1><ol class="breadcrumb"><li><a href="#">Home</a></li><li>Shop</li><li class="active">Programs</li></ol></div>';
    break;
  case "#sets":
    $('#page-title').empty();
    document.getElementById("page-title").innerHTML += '<div class="container clearfix"><h1>Sets</h1><ol class="breadcrumb"><li><a href="#">Home</a></li><li>Shop</li><li class="active">Sets</li></ol></div>';
    break;
  case "#earrings":
    $('#page-title').empty();
    document.getElementById("page-title").innerHTML += '<div class="container clearfix"><h1>Earrings</h1><ol class="breadcrumb"><li><a href="#">Home</a></li><li>Shop</li><li class="active">Earrings</li></ol></div>';
    break;
  case "#necklaces":
    $('#page-title').empty();
    document.getElementById("page-title").innerHTML += '<div class="container clearfix"><h1>Necklaces</h1><ol class="breadcrumb"><li><a href="#">Home</a></li><li>Shop</li><li class="active">Necklaces</li></ol></div>';
    break;
  case "#bracelets":
    $('#page-title').empty();
    document.getElementById("page-title").innerHTML += '<div class="container clearfix"><h1>Bracelets</h1><ol class="breadcrumb"><li><a href="#">Home</a></li><li>Shop</li><li class="active">Bracelets</li></ol></div>';
    break;
  case "#lanyards":
    $('#page-title').empty();
    document.getElementById("page-title").innerHTML += '<div class="container clearfix"><h1>Lanyards</h1><ol class="breadcrumb"><li><a href="#">Home</a></li><<li>Shop</li><li class="active">Lanyards</li></ol></div>';
    break;
  case "#tassels":
    $('#page-title').empty();
    document.getElementById("page-title").innerHTML += '<div class="container clearfix"><h1>Tassels</h1><ol class="breadcrumb"><li><a href="#">Home</a></li><li>Shop</li><li class="active">Tassels</li></ol></div>';
    break;
  case "#snaps":
    $('#page-title').empty();
    document.getElementById("page-title").innerHTML += '<div class="container clearfix"><h1>Snaps</h1><ol class="breadcrumb"><li><a href="#">Home</a></li><li>Shop</li><li class="active">Snaps</li></ol></div>';
    break;
  default:
    $('#page-title').empty();
    document.getElementById("page-title").innerHTML += '<div class="container clearfix"><h1>Full Suite</h1><ol class="breadcrumb"><li><a href="#">Home</a></li><li class="active">Shop</li></ol></div>';
  }
}



/////////////////////
// Filter Function //
/////////////////////
function filterFunction(a,b,c,d,e,f)
{
  $.ajax({
    type: "GET",
    url: "http://72.64.152.18:8081/nlhtml/custom/netlink.php?",
    data: {
      request_id: a,
      level1: b,
      level2: c,
      level3: d,
      level4: e,
      level5: f},
    success: function(response) {
      fillShop(response);
    },
    complete: function(){
      pageTitle();
    }
  });
}



/////////////////////////
// Search API Function //
/////////////////////////
function search()
{
  if(event.keyCode == 13) {
    event.preventDefault();
    searchTerm = $('#searchvalue').val();
    $.ajax({
      type: "GET",
      url: "http://72.64.152.18:8081/nlhtml/custom/netlink.php?",
      data: {
        request_id: "APISTKSEARCH",
        query: searchTerm},
      success: function(response) {
        fillShop(response);
      }
    });
  }
}



/////////////////////////////////////////////
      // POPULATE THE STORE PAGE //
/////////////////////////////////////////////
function fillShop(response)
{
  lines = response.split("\n");
  // lines[0] is header row
  // lines[1]+ are data lines
  $('#shop').empty();
  html = [];
  if ( lines.length <= 2) {
    document.getElementById("shop").innerHTML += '<h1>There are no results</h1>';
  } else {
    for (i=1; i<lines.length - 1; i++) {
      flds = lines[i].split("|");

      prices.push(Number(flds[4]));
      prod = '<div class="product clearfix ' + flds[2] + '">';
        prod += '<div class="product-image">';
          prod += '<a href="../detail-view/#' + flds[0].replace(/\s+/g,'') + '"><img src="../ljimages/' + flds[0].replace(/\s+/g,'') + '-sm.png" alt="' + flds[1] + '"></a>';
        //  prod += '<a href="#"><img src="../ljimages/' + flds[0].replace(/\s+/g,'') + '-sm.png" alt="' + flds[1] + '"></a>';
        //  prod += 'div class="sale-flash">50% Off*</div>'
          prod += '<div class="product-overlay">';
            prod += '<a href="#" class="add-to-cart" data-notify-position="top-right" data-notify-type="info" data-notify-msg="<i class=icon-info-sign></i>Item ' + flds[0].replace(/\s+/g,'') + ' has been added to your cart!" onclick="addItem(this.id); cartList(); SEMICOLON.widget.notifications(this); return false;" id="' + flds[0].replace(/\s+/g,'') + '"><i class="icon-shopping-cart"></i><span> Add to Cart</span></a>';
            prod += '<a href="../detail-view/#' + flds[0].replace(/\s+/g,'') + '" class="item-quick-view" data-lightbox="ajax"><i class="icon-zoom-in2"></i><span class="' + flds[0].replace(/\s+/g,'') + '">Detail View</span></a>';
          prod += '</div>';
        prod += '</div>';
        prod += '<div class="product-desc">';
          prod += '<div class="product-title"><h3><a href="#">' + flds[1] +'</a></h3></div>';
          prod += '<div class="product-price"><ins>$' + parseInt(flds[4]).toFixed(2) + '</ins></div>';
        prod += '</div>';
      prod += '</div>';
      html.push(prod);
    }
    document.getElementById("shop").innerHTML += html.join('');
    $(document).trigger("filters");
  }
}



/////////////////////////////////////////////
// ORDER/INVOICE API Function - APIHISTLST //
/////////////////////////////////////////////
function orderHistory()
{
  $.ajax({
   type: "GET",
   url: "http://72.64.152.18:8081/nlhtml/custom/netlink.php?",
   data: {
     request_id: "APIHISTLST",
     session_no: session_no
   },
   success: function(response) {
     console.log(response);
     lines = response.split("\n");
     // lines[0] is header row
     // lines[1]+ are data lines
     // $('#tableBody').empty();
     for (i=1; i<lines.length - 1; i++) {
       flds = lines[i].split("|");
       flds.splice(5, 1);
       flds.splice(5, 1);
       flds.splice(9, 1);
       flds.splice(7, 1);
       flds.splice(7, 1);
       flds.splice(7, 1);
       console.log(flds);
       fldsArray.data.push(flds);
     }
     fldsArray = JSON.stringify(fldsArray);
     fldsArray_json = $.parseJSON(fldsArray);
   },
   complete: function(){
     table = $('#datatable2').DataTable();
     table.rows.add( fldsArray_json.data ).draw();
     console.log("did this run past orders");
   }
 });
}



/////////////////////////////////////////
// OPEN ORDER API Function - APIORDLST //
/////////////////////////////////////////
function openOrders()
{
  var openlines,
      openfldsArray = { "data": []},
      openfldsArray_json,
      fields;
  $.ajax({
   type: "GET",
   url: "http://72.64.152.18:8081/nlhtml/custom/netlink.php?",
   data: {
     request_id: "APIORDLST",
     session_no: session_no
   },
   success: function(response) {
     console.log(response);
     openlines = response.split("\n");
     // lines[0] is header row
     // lines[1]+ are data lines
     // $('#tableBody').empty();
     for (i=1; i< openlines.length - 1; i++) {
       fields = openlines[i].split("|");
       fields.splice(3, 1);
       fields.splice(6, 1);
       fields.splice(6, 1);
       fields.splice(6, 1);
       console.log(flds);
       openfldsArray.data.push(fields);
     }
     openfldsArray = JSON.stringify(openfldsArray);
     openfldsArray_json = $.parseJSON(openfldsArray);
   },
   complete: function(){
     table1 = $('#datatable1').DataTable();
     table1.rows.add( openfldsArray_json.data ).draw();
     console.log("did this run open orders");
   }
 });
}



/////////////////////////////////////////////
          // GET ORDER HEADER //
/////////////////////////////////////////////
function searchOrders(orderSearchNumber)
{
    $.ajax({
      type: "GET",
      url: "http://72.64.152.18:8081/nlhtml/custom/netlink.php?",
      data: {
        request_id: "APIORDH",
        session_no: session_no,
        order_no: orderSearchNumber},
      success: function(response) {
        lines = response.split("\n");
        // lines[0] is header row
        // lines[1]+ are data lines
        $('#orderDetails').empty();
        // html = [];
        if ( lines.length <= 2) {
          document.getElementById("shop").innerHTML += '<h1>There are no results</h1>';
        } else {
          for (i=1; i<lines.length - 1; i++) {
            details = lines[i].split("|");
            line = '<tr><td>Order Number</td><td>'+details[1]+'</td></tr>';

            line += '<tr><td>Order Date</td><td>'+details[2]+'</td></tr>';

            line += '<tr><td>Shipping Date</td><td>'+details[3]+'</td></tr>';

            line += '<tr><td>Customer Number</td><td>'+details[4]+'</td></tr>';

            line += '<tr><td>PO Number</td><td>'+details[5]+'</td></tr>';

            line += '<tr><td>Terms Code</td><td>'+details[6]+'</td></tr>';

            line += '<tr><td>Ship-via Code</td><td>'+details[7]+'</td></tr>';

            line += '<tr><td>Tax Amount</td><td>'+details[8]+'</td></tr>';

            line += '<tr><td>Order Total</td><td>'+details[9]+'</td></tr>';

            line += '<tr><td>Discount Amount</td><td>'+details[10]+'</td></tr>';

            line += '<tr><td>Bill-to Name</td><td>'+details[11]+'</td></tr>';

            line += '<tr><td>Bill-to Address</td><td>'+details[12]+'</td></tr>';

            line += '<tr><td>Ship-to Name</td><td>'+details[13]+'</td></tr>';

            line += '<tr><td>Ship-to Address</td><td>'+details[14]+'</td></tr>';

            line += '<tr><td>Notes</td><td>'+details[15]+'</td></tr>';

            line += '<tr><td>Email Address</td><td>'+details[16]+'</td></tr>';

            line += '<tr><td>Total Payments</td><td>'+details[17]+'</td></tr>';

            line += '<tr><td>Number of Lines</td><td>'+details[18]+'</td></tr>';

            line += '<tr><td>Total Order Qty</td><td>'+details[19]+'</td></tr>';

            line += '<tr><td>Total Weight</td><td>'+details[20]+'</td></tr>';

            line += '<tr><td>Shipping Method</td><td>'+details[21]+'</td></tr>';

            line += '<tr><td>Total Other Charges</td><td>'+details[22]+'</td></tr>';

            line += '<tr><td>Total Freight</td><td>'+details[23]+'</td></tr>';

            document.getElementById("orderDetails").innerHTML += line;
          }
        }
      }
    });

}


/////////////////////////////////////////////
     // PULL SAVED BILL TO ADDRESSES //
/////////////////////////////////////////////
function billToAddress()
{
  $.ajax({
    type: "GET",
    url: "http://72.64.152.18:8081/nlhtml/custom/netlink.php?",
    data: {
      request_id: "APIBIILLST",
      session_no: session_no
    },
    success: function(response) {
      console.log(response);
      lines = response.split("\n");
      // lines[0] is header row
      // lines[1]+ are data lines
      // $('#tableBody').empty();
      for (i=1; i<lines.length - 1; i++) {
        flds = lines[i].split("|");
      }

    }
 });
}

/////////////////////////////////////////////
    // PULL SAVED SHIP TO ADDRESSES //
/////////////////////////////////////////////
function shipToAddress()
{
  $.ajax({
    type: "GET",
    url: "http://72.64.152.18:8081/nlhtml/custom/netlink.php?",
    data: {
      request_id: "APISHIPLST",
      session_no: session_no
    },
    success: function(response) {
      console.log(response);
      lines = response.split("\n");
      // lines[0] is header row
      // lines[1]+ are data lines
      for (i=1; i<lines.length - 1; i++) {
        flds = lines[i].split("|");
        shippingAddresses.push([flds[1],flds[2],flds[3],flds[4],flds[5],flds[6],flds[7]]);
        document.getElementById("shipping-address").innerHTML += '<option value="'+i+'">' + flds[1] + ', ' + flds[2] + '</option>';
      }
      $("#shipping-address").prepend('<option selected="selected">Select Address</option>');
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

function cartRedirect()
{
  window.location.pathname = "/cousin-op/cart/";
}

function detailViewRedirect(partNumber)
{
  window.location.pathname = "/cousin-op/detail-view/#" + partNumber;
}

function ordersRedirect()
{
  window.location.pathname = "/cousin-op/orders/";
}

function shopRedriect()
{
  window.location.pathname = "/cousin-op/shop/";
}

function homeRedriect()
{
  window.location.pathname = "/cousin-op/";
}



//////////////////////
// HELPER FUNCTIONS //
//////////////////////

function Comparator(a,b)
{
  if (a[8] < b[8]) return -1;
  if (a[8] > b[8]) return 1;
  return 0;
}

Array.min = function( array ){
    return Math.min.apply( Math, array );
};

Array.max = function( array ){
    return Math.max.apply( Math, array );
};

function displayAddress(index) {
  var ind = index - 1;
  document.getElementById("shipping-form-companyname").value = shippingAddresses[ind][0].trim();
  document.getElementById("shipping-form-address").value = shippingAddresses[ind][1].trim();
  document.getElementById("shipping-form-address2").value = shippingAddresses[ind][2].trim();
  document.getElementById("shipping-form-address3").value = shippingAddresses[ind][3].trim();
  document.getElementById("shipping-form-city").value = shippingAddresses[ind][4].trim();
  document.getElementById("shipping-form-state").value = shippingAddresses[ind][5].trim();
  document.getElementById("shipping-form-zipcode").value = shippingAddresses[ind][6].trim();
}

function logoff()
{
  $.get("http://72.64.152.18:8081/nlhtml/custom/netlink.php?request_id==APILOGOFF&session_no="+ session_no +"", function( data ) {
    Cookies.set('session_no', "Logged Out");
    homeRedriect();
  });
}
