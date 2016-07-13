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
    location.pathname = "/cousin-op/";  //  Well need to change when going live
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
      }
      if (location.pathname === "/cousin-op/checkout/") {
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
        }
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
function creditCard ()
{
/*  $.ajax({
   type: "GET",
   url: "../apihelper.php",
   data: {
     request_id: "APICC",
     session_no: session_no
   },
   success: function(response) {
     console.log(response);
     document.getElementById("creditcard").innerHTML += response;
     $( "div#creditcard" ).hide();
   }
 });
*/
  console.log("is this working?");
   $.get("../apihelper.php?request_id=APICC&session_no=UREWAAUOF9AFU4D9WADWNDN32");
   console.log("it worked?");
   return false;
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
      lines = response.split("\n");
      // lines[0] is header row
      // lines[1]+ are data lines
      $('#shop').empty();
      var html = [];
      fldsArray = [];
      for (i=1; i<lines.length - 1; i++) {
        flds = lines[i].split("|");
        fldsArray.push(flds);
        fldsArray = fldsArray.sort(Comparator);
      }
      for (i=0; i<=fldsArray.length - 1; i++) {
        flds = fldsArray[i];
        prices.push(Number(flds[4]));
        prod = '<div class="product clearfix ' + flds[2] + '">';
          prod += '<div class="product-image">';
            prod += '<a href="../detail-view/#' + flds[0].replace(/\s+/g,'') + '"><img src="../ljimages/' + flds[0].replace(/\s+/g,'') + '-sm.png" alt="' + flds[1] + '"></a>';
          //  prod += '<a href="#"><img src="../ljimages/' + flds[0].replace(/\s+/g,'') + '-sm.png" alt="' + flds[1] + '"></a>';
          //  prod += 'div class="sale-flash">50% Off*</div>'
            prod += '<div class="product-overlay">';
              prod += '<a href="#" class="add-to-cart" data-notify-position="top-right" data-notify-type="info" data-notify-msg="<i class=icon-info-sign></i>Item ' + flds[0].replace(/\s+/g,'') + ' has been added to your cart!" onclick="addItem(this.id); SEMICOLON.widget.notifications(this); return false;" id="' + flds[0].replace(/\s+/g,'') + '"><i class="icon-shopping-cart"></i><span> Add to Cart</span></a>';
              prod += '<a href="../detail-view/#' + flds[0].replace(/\s+/g,'') + '" class="item-quick-view" data-lightbox="ajax"><i class="icon-zoom-in2"></i><span class="' + flds[0].replace(/\s+/g,'') + '">Detail View</span></a>';
            prod += '</div>';
          prod += '</div>';
          prod += '<div class="product-desc">';
            prod += '<div class="product-title"><h3><a href="#">' + flds[1] +'</a></h3></div>';
            prod += '<div class="product-price"><ins>$' + flds[4] +'</ins></div>';
          prod += '</div>';
        prod += '</div>';
        html.push(prod);
      }
      document.getElementById("shop").innerHTML += html.join('');
      $(document).trigger("filters");
      min = Array.min(prices);
      max = Array.max(prices);
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
    console.log(searchTerm);
    $.ajax({
      type: "GET",
      url: "http://72.64.152.18:8081/nlhtml/custom/netlink.php?",
      data: {
        request_id: "APISTKSEARCH",
        query: searchTerm},
      success: function(response) {
        console.log(response);
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
            prod = '<div class="product clearfix pf-dress">';
              prod += '<div class="product-image">';
                prod += '<a href="../detail-view/#' + flds[0].replace(/\s+/g,'') + '"><img src="../ljimages/' + flds[0].replace(/\s+/g,'') + '-sm.png" alt="' + flds[1] + '"></a>';
              //  prod += '<a href="#"><img src="../ljimages/' + flds[0].replace(/\s+/g,'') + '-sm.png" alt="' + flds[1] + '"></a>';
              //  prod += 'div class="sale-flash">50% Off*</div>'
                prod += '<div class="product-overlay">';
                  prod += '<a href="#" class="add-to-cart" data-notify-position="top-right" data-notify-type="info" data-notify-msg="<i class=icon-info-sign></i>Item ' + flds[0].replace(/\s+/g,'') + ' has been added to your cart!" onclick="addItem(this.id); SEMICOLON.widget.notifications(this); return false;" id="' + flds[0].replace(/\s+/g,'') + '"><i class="icon-shopping-cart"></i><span> Add to Cart</span></a>';
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
    });
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
function searchOrders()
{
  if(event.keyCode == 13) {
    event.preventDefault();
    searchTerm = $('#searchvalue').val();
  }
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
