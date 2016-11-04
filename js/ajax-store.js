var breadtitle;
var cartheader;
var cartitems;
var cartQty;
var collection;
var country;
var countrylines;
var cust_name;
var detailViewQty;
var fields;
var filters = {};
var flds;
var fldsArray = { "data": []};
var fldsArray_json;
var head;
var item;
var lines;
var min;
var max;
var numberOfOrders;
var newCustomerNumber;
var newNumberOfOrders;
var neworder;
var orderAmt;
var pictureSlider;
var prices = [];
var prod;
var searchField = document.getElementById('searchvalue');
var searchTerm;
var secondColumn;
var session_no;
var shippingAddresses = [];
var shippingCost;
var shoppingCart;
var sortItems = [
  "11100A","CD111","11105","11126","11106","11107","11108","11135",
  "11136","11125","11127","11137","11130","11109","11110","11138",
  "11129","11140","11139","11128","11131","11122","11102","11134",
  "11124","11104","11103","11123","11133","11101","11121","11132",
  "11141","11142","11143","11144","11145","11146","10000A","CD100",
  "10025","10026","10027","10029","10031","10032","10033","10034",
  "10036","10035","10028","10030","10037","10038","10039","10041",
  "10043","10044","10045","10046","10048","10047","10040","10042",
  "10013","10014","10015","10017","10019","10020","10021","10022",
  "10024","10023","10016","10018","10001","10002","10003","10005",
  "10007","10008","10009","10010","10012","10011","10004","10006",
  "10700D","PIL107","34737029","10700B","CD107","10713","10714",
  "10721","10715","10716","10723","10717","10718","10725","10719",
  "10720","10727","10722","10729","10730","10724","10731","10732",
  "10726","10733","10734","10728","10735","10736","10743","10744",
  "10745","10746","10747","10748","10737","10738","10739","10740",
  "10741","10742","10700A","10707","10712","10710","10703","10704",
  "10711","10701","10705","10702","10706","10708","10709","10700C",
  "10749","10750","10751","10752","10753","10754","10755","10756",
  "10757","10758","10759","10760","10761","10762","10763","10764",
  "10765","10766","10767","10768","10769","10770","10771","10772",
  "10773","10774","10775","10776","10777","10778","10779","10780",
  "10781","10782","10783","10784","10300A","CD103","10301","10302",
  "10303","10304","10305","10306","10307","10308","10309","10310",
  "10311","10314","10315","10312","10313","10316","10317","10318",
  "10319","10320","10322","10323","10321","10324","10325","10326",
  "10327","10328","10329","10330","10331","10332","10500A","CD105",
  "10501","10502","10503","10504","10517","10518","10519","10520",
  "10505","10506","10507","10508","10523","10524","10525","10522",
  "10509","10510","10511","10512","10526","10527","10528","10521",
  "10513","10514","10515","10516","10529","10530","10531","10532",
  "10533","10534","10535","10536","10541","10542","10537","10538",
  "10539","10540","10543","10544"];
var stock_no;
var subtotal;
var type;
var username;



/////////////////////////////////////////
        // create new customer //
/////////////////////////////////////////
function createCustomer()
{
  var createcompanyname = $("#create-companyname").val();
  var createcontactname = $("#create-contactname").val();
  var createaddress     = $("#create-address").val();
  var createaddress2    = $("#create-address2").val();
  var createaddress3    = $("#create-address3").val();
  var createcity        = $("#create-city").val();
  var createstate       = $("#create-state").val();
  var createzipcode     = $("#create-zipcode").val();
  var createcountry     = $("#create-country").val();
  var createemail       = $("#create-email").val();
  var createphone       = $("#create-phone").val();
  var createfax         = $("#create-fax").val();

  $.ajax({
   type: "GET",
   url: "http://72.64.152.18:8081/nlhtml/custom/netlink.php?",
   data: {
     request_id: "APINEWCUST",
     cust_name: createcompanyname,
     address1: createaddress,
     address2: createaddress2,
     address3: createaddress3,
     city: createcity,
     state: createstate,
     zip: createzipcode,
     contact_name: createcontactname,
     phone: createphone,
     email: createemail,
     fax: createfax,
     country: createcountry
   },
   success: function(response) {
     if (response.length <= 10) {
       alert("An errror occured, try again.");
     } else {
       newCustomerNumber = response;
       $("#newCustomer").hide();
       $("#newUser").show();
       document.getElementById("create-user-number").value = newCustomerNumber.trim();
       document.getElementById("create-user-email").value = createemail.trim();
       document.getElementById("create-user-contactname").value = createcompanyname.trim();
     }
   }
 });
}



/////////////////////////////////////////
//////////// Create New User ////////////
/////////////////////////////////////////
function createUser()
{
  var userName        = $("#create-user-name").val();
  var userPassword    = $("#create-user-password").val();
  var userNumber      = $("#create-user-number").val();
  var userEmail       = $("#create-user-email").val();
  var userContactName = $("#create-user-contactname").val();

  $.get("http://72.64.152.18:8081/nlhtml/custom/netlink.php?request_id=APICHECKUSER&session_no=2UD24M4BDN2D4RDAWABU9D254&username="+ userName.toUpperCase() +"", function( data ) {
    if ( data.length > 4 ) {
      alert("Pick a different username.");
    } else {
      $.ajax({
       type: "GET",
       url: "http://72.64.152.18:8081/nlhtml/custom/netlink.php?",
       data: {
         request_id: "APINEWUSER",
         new_username: userName,
         new_password: userPassword,
         cust_no: userNumber,
         contact_name: userContactName,
         email: userEmail
       },
       success: function(response) {
         if ( response === response.toUpperCase() ) {
           alert("Laura Janelle user has been created. Double check SouthWare and make sure everything was entered correctly.");
           $.get("http://72.64.152.18:8082/ace/mailer/logincred.php?username="+ userName+"&email="+ userEmail +"&password="+ userPassword +"&name="+userContactName+"");
         } else {
           alert("User not created, try again.");
         }
       }
     });
   }
  });
}


////////////////////////////////////////
/// SUBROUTINE- Add item to the cart ///
////////////////////////////////////////
function addItemGeneric(session_no, stock_no, qty)
{
  $.get("http://72.64.152.18:8081/nlhtml/custom/netlink.php?request_id=APICARTADD&session_no="+ session_no +"&stock_no="+ stock_no +"&qty="+qty+"");
}
//////////////////////////////////////////////
// Add item to the cart for the detail page //
//////////////////////////////////////////////
function addItemDetailView()
{
  if (document.getElementById(stock_no)) {
    detailViewQty = document.getElementById(stock_no).value;
  } else {
    detailViewQty = "1";
  }
  console.log(stock_no);
    // Save color and type in the sessionStorage
    if (!sessionStorage.getItem(stock_no) || sessionStorage.getItem(stock_no) === "undefined" || sessionStorage.getItem(stock_no) === null ) {
      sessionStorage.setItem(stock_no, detailString);
    }

  addItemGeneric(session_no, stock_no, detailViewQty);
  if ( window.location.hash !== "#shop" ) {
    windowHash("cart");
  }
  return false;
}



/////////////////////////////////////////
// SUBROUTINE - REMOVE ITEMS FROM CART //
/////////////////////////////////////////
function removeItemGeneric(session_no, line_no)
{
  $.get("http://72.64.152.18:8081/nlhtml/custom/netlink.php?request_id=APICARTREM&session_no="+ session_no +"&line_no="+ line_no +"");
}
//////////////////////////////////
  // REMOVE ITEMS FROM CART //
//////////////////////////////////
function removeItem(clicked_id)
{
  line_no = clicked_id;
  removeItemGeneric(session_no, line_no);
  cartHeader();
  cartList();
  return false;
}



//////////////////////////////
// Get back the cart header //
//////////////////////////////
function cartHeader(callback)
{
  jQuery.ajax({
    type: "GET",
    url: "http://72.64.152.18:8081/nlhtml/custom/netlink.php?",
    data: {
      request_id: "APICARTH",
      session_no: session_no
    },
    success: function(response) {
      cartheader = response.split("\n");
      if (cartheader.length >=3 ){
        cartheader = cartheader[1].split("|");
        orderAmt = cartheader[22];
        subtotal = cartheader[19];
        cartQty = cartheader[24];
        document.getElementById("top-cart-trigger").innerHTML += '<span>' + cartQty.trim() + '</span>';

        if ( window.location.hash === "#cart" || window.location.hash === "#checkout") {
          $(".cart-product-name.subtotal").html( '<span class="amount">' + subtotal.trim() + '</span>' );
          $(".cart-product-name.total").html( '<span class="amount color lead"><strong>' + orderAmt.trim() + '</strong></span>');
        }
      }
    },
    complete: function () {
      if (callback && typeof(callback) === "function") {
        callback();
      }
    }
  });
  return false;
}



////////////////////
// Get Line items //
////////////////////
function cartList()
{
  jQuery.ajax({
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
      jQuery("#minicart").empty();
      html2 = [];

      if ( window.location.hash === "#cart") {
        html = [];
        $(".cart_item.products").empty();
        cartHelper();
        $("#cartItemTable").prepend(html.join(''));
        $("#updateCartButton").show();
      } else if ( window.location.hash === "#checkout" ){
        jQuery("#checkout-cartItemTable").empty();
        cartHelper();
      } else {
        cartHelper();
      }
    }
  });
  return false;
}

/////////////////////////////////////////////
// SUBROUTINE - CONSTRUCTING THE CART LIST //
/////////////////////////////////////////////
function cartHelper()
{
  for (i=1; i<cartitems.length - 1; i++) {
    data = cartitems[i].split("|");
    miniitem = '<div class="top-cart-item clearfix"><div class="top-cart-item-image"><a href="#"><img src="../ljimages/' + data[2].replace(/\s+/g,'') + '-sm.png" alt="' + data[3] + '" /></a></div>';
    miniitem += '<div class="top-cart-item-desc"><a href="#">' + data[3] + '</a><span class="top-cart-item-price">$' + data[7].substring(0, data[7].length - 3) + '</span><span class="top-cart-item-quantity">x ' + data[6].replace(/\s+/g,'') + '</span></div></div>';
    html2.push(miniitem);

    if ( window.location.hash === "#cart") {
      item = '<tr class="cart_item products"><td class="cart-product-remove"><a href="#cart" class="remove" onclick="removeItem(this.id); return false;" id="' + data[1].replace(/\s+/g,'') + '" title="Remove this item"><i class="icon-trash2"></i></a></td>';
      item += '<td class="cart-product-thumbnail"><a href="#detail-view+' + data[2].replace(/\s+/g,'') + '"><img width="64" height="64" src="../ljimages/' + data[2].replace(/\s+/g,'') + '-sm.png" alt="' + data[3] + '"></a></td>';
      item += '<td class="cart-product-name"><a href="#detail-view+' + data[2].replace(/\s+/g,'') + '">' + data[3] + '</a></td>';
      item += '<td class="cart-product-price"><span class="amount">$' + data[7].substring(0, data[7].length - 3) + '</span></td>';
      item += '<td class="cart-product-quantity"><div class="quantity clearfix">';
      item += '<input type="button" value="-" class="minus btn-number" data-type="minus" data-field="quant['+i+']" onclick="changeQuantity(this);">';
      item += '<input type="text" name="quant['+i+']" min="1" value="' + data[6].replace(/\s+/g,'') + '" class="qty form-control input-number" id="' + data[2].replace(/\s+/g,'') + '" />';
      item += '<input type="button" value="+" class="plus btn-number" data-type="plus" data-field="quant['+i+']" onclick="changeQuantity(this);"></div></td>';
      item += '<td class="cart-product-subtotal"><span class="amount">$' + data[8].substring(0, data[8].length - 4) + '</span></td></tr>';
      html.push(item);

      $("#updateCartButton").show();
    } else if ( window.location.hash === "#checkout") {
      item1 =  '<tr class="cart_item"><td class="cart-product-thumbnail"><a href=#detail-view+' + data[2].replace(/\s+/g,'') + '"><img width="64" height="64" src="../ljimages/' + data[2].replace(/\s+/g,'') + '-sm.png" alt="' + data[3] + '"></a></td>';
      item1 += '<td class="cart-product-name"><a href="#detail-view+' + data[2].replace(/\s+/g,'') + '">' + data[3] + '</a></td>';
      item1 += '<td class="cart-product-quantity"><div class="quantity clearfix">' + data[6].replace(/\s+/g,'') + '</div></td>';
      item1 += '<td class="cart-product-subtotal"><span class="amount">$' + data[8].substring(0, data[8].length - 4) + '</span></td></tr>';
      $("#checkout-cartItemTable").append(item1);
    }
  }
  $("#minicart").append(html2.join(''));
}



//////////////////////////////
// Get Detail View for Item //
//////////////////////////////
function detailView()
{
  jQuery("#images").empty();
  jQuery("#secondColumn").empty();
  jQuery("#addInfo").empty();
  var detailString;
  var color;
  var type;
  var hash = window.location.hash.split("+");
  var stock_no = hash[1].replace();
  console.log(stock_no);

  if (hash.length === 4 ) {
    detailString = window.location.hash;
    color = hash[2].replace( /^\D+/g, '');
    type  = hash[3].replace( /^\D+/g, '');
    sessionStorage.setItem(stock_no, detailString);
  } else if ( sessionStorage.getItem(stock_no) !== null && sessionStorage.getItem(stock_no) != "undefined" && sessionStorage.getItem(stock_no).length >= 15 ) {
    var dets = sessionStorage.getItem(stock_no).split("+");
    color = dets[2].replace( /^\D+/g, '');
    type  = dets[3].replace( /^\D+/g, '');
  }

  $.ajax({
    type: "GET",
    url: "http://72.64.152.18:8081/nlhtml/custom/netlink.php?",
    data: {request_id: "APISTKDTL", stock_no: stock_no},
    success: function(response) {
      lines = response.split("\n");
      // lines[0] is header row
      // lines[1]+ are data lines
      fields = lines[1].split("|");

       /* Fill in the pictures for the product */

       var pics =  '<div class="fslider" data-pagi="false" data-arrows="false" data-thumbs="true"><div class="flexslider"><div class="slider-wrap" data-lightbox="gallery">';

           pics += '<div class="slide" data-thumb="../ljimages/' + fields[0] + '-sm.png"><a href="../ljimages/' + fields[0] + '-lg.png" title="' + fields[1] + '" data-lightbox="gallery-item"><span class="zoom ex1"><img src="../ljimages/' + fields[0] + '-md.png" alt="' + fields[1] + '"></span></a></div>';
       if (fields[2] === "ENC" && stock_no !== "CD103" && stock_no !== "10300A" || fields[2] === "GLB" && stock_no === "34737029" && stock_no !== "10700A" && stock_no !== "10700B" && stock_no !== "10700C" && stock_no !== "10700D"  && stock_no !== "PIL107")  {
           pics += '<div class="slide" data-thumb="../packaging/' + fields[0] + '-sm.JPG"><a href="../packaging/' + fields[0] + '-lg.JPG" title="' + fields[1] + '" data-lightbox="gallery-item"><span class="zoom ex1"><img src="../packaging/' + fields[0] + '-md.JPG" alt="' + fields[1] + '"></span></a></div>';
       } else if (fields[2] === "GLB" && stock_no !== "CD107" && stock_no >= 10701 && stock_no <= 10748) {
           pics += '<div class="slide" data-thumb="../backs/' + fields[0] + 'bk-sm.png"><a href="../backs/' + fields[0] + 'bk-lg.png" title="' + fields[1] + '" data-lightbox="gallery-item"><span class="zoom ex1"><img src="../backs/' + fields[0] + 'bk-md.png" alt="' + fields[1] + '"></span></a></div>';
       }
           pics += '</div></div></div>';

       secondColumn  = '<div><a href="'+ detailString +'" title="Brand Logo" class="hidden-xs"><img class="image_fade" src="../img/'+ fields[2] +'-logo.png" alt="Brand Logo"></a></div>';
       secondColumn += '<div><span itemprop="productID" class="sku_wrapper" style="font-size: 24px; font-weight: 600;">ITEM # <span class="sku">' + fields[0].replace(/\s+/g,'') + '</span></span></div><div class="line"></div>';
       secondColumn += '<div class="product-price col_one_third" style="font-size: 16px; font-weight: 400;"> <ins>COST:&nbsp;' + fields[4] + '</ins></div><div class="col_one_third hidden-xs" style="top: 0px; margin: 0px;">MIN: 1</div>';
       if (stock_no !== "CD111" && stock_no !== "CD103" && stock_no !== "CD105" && stock_no !== "CD107" && stock_no !== "CD100" && stock_no !== "11100A" && stock_no !== "10000A" && stock_no !== "10300A" && stock_no !== "10500A" && stock_no !== "10700A" && stock_no !== "10700B" && stock_no !== "10700C" && stock_no !== "10700D" && stock_no !== "PIL107" && stock_no !== "34737029" )  {
         secondColumn += '<div class="product-rating col_one_third col_last" style="top: 0px; margin: 0px;">MSRP:&nbsp;' + fields[3] + '</div>';
       }
       secondColumn += '<div class="clear"></div><div class="line"></div><form class="cart nobottommargin clearfix" method="post" enctype="multipart/form-data"><div class="quantity clearfix">';
       secondColumn += '<input type="button" value="-" class="minus btn-number" data-type="minus" data-field="quant[1]" onclick="changeQuantity(this)">';
       secondColumn += '<input type="text" name="quant[1]" step="1" min="1" name="quantity" value="1" title="Qty" size="4" class="qty form-control input-number" id="' + fields[0].replace(/\s+/g,'') + '" />';
       secondColumn += '<input type="button" value="+" class="plus btn-number" data-type="plus" data-field="quant[1]" onclick="changeQuantity(this)"></div>';
       secondColumn += '<button type="button" id="add-item" class="add-to-cart button nomargin" onclick="stock_no=\'' + fields[0].trim() + '\'; addItemDetailView();">Add to cart</button></form><div class="clear"></div><div class="line"></div>';

       if (fields[2] === "ENC" )  {
         secondColumn += '<p>' + fields[8] + '</p><p>The value of this look is unbeatable, each necklace features fun and exciting packaging. She is getting multiple styles per necklace, while you’ll be making a 3x markup! Not to mention, this look serves a broad demographic so all of your customers will be sure to find the perfect design.</p>';
       } else if (fields[2] === "IDT" )  {
         secondColumn += '<p>' + fields[8] + '</p><p>The value of this look is unbeatable; each piece features an intricate, unique and trending design whether it is a lanyard, tassel or snap. You’ll be making a 2.5x markup, along with several opportunities to upsell this look. Not to mention, the look of Identify will serve her during numerous events and places she will go at an unbeatable price: the casino, at her corporate office or hospital job, or to school, these are just to name a few!</p>';
       } else {
         if (fields[8].length !== 0) {
           secondColumn += '<p>' + fields[8] + '</p>';
         } else {
           secondColumn += '<p>' + fields[1] + '</p>';
         }
       }

       info =  '<tr><td>Description</td><td>' + fields[1] + '</td></tr>';
       info += '<tr><td>Dimensions</td><td>' + fields[6] + '</td></tr>';
       info += '<tr><td>Color</td><td>' + whatColor(color) +'</td></tr>';
       info += '<tr><td>Type</td><td>' + whatType(type) + '</td></tr>';
       info += '<tr><td>Look</td><td>' + whatLook(fields[2]) + '</td></tr>';
       $("#images").html(pics);
       $("#secondColumn").html(secondColumn);
       $("#addInfo").html(info);
     },
     complete: function () {
       $('.ex1 img').wrap('<span style="display:inline-block"></span>').css('display', 'block').parent().zoom();
       setTimeout(function(){
         SEMICOLON.widget.loadFlexSlider();
       },1000);
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
      $("#countries").empty();
      for (i=1; i<country.length - 1; i++) {
        countrylines = country[i].split("|");
        document.getElementById("countries").innerHTML += '<option value="' + countrylines[0].replace(/\s+/g,'') + '">' + countrylines[1].replace(/\s+/g,'') + '</option>';
      }
    }
  });
}



////////////////////////\\
// Update Cart Function \\
//\\\\\\\\\\\\\\\\\\\\\\\\
function updateCart1()
{
  $("#updateCartButton").hide();
  shoppingCart = {};
  var table = $("table tbody#cartItemTable");

  // loop thru cart and flatten the items that are repeated
  table.find('tr.products').each(function () {
    var line_no     = $(this).find('td:first-child a').attr('id');
    var stockNumber = $(this).find('td:nth-child(5) div input:nth-child(2)').attr('id');
    var qty         = parseInt($(this).find('td:nth-child(5) div input:nth-child(2)').val());

    if (!shoppingCart.hasOwnProperty(stockNumber)) {
      shoppingCart[stockNumber] = [qty, line_no];
      removeItemGeneric(session_no, line_no);
    } else {
      shoppingCart[stockNumber][0] += qty;
      removeItemGeneric(session_no, shoppingCart[stockNumber][1]);
      removeItemGeneric(session_no, line_no);
    }
  });

  $.each( shoppingCart, function( key, value ) {
    addItemGeneric(session_no, key, value[0]);
  });
  cartList();
  cartHeader();
}

function updateCart2()
{
  $("#updateCartButton").hide();
  shoppingCart = {};

  var table = $("table tbody#cartItemTable");

  // loop thru cart and flatten the items that are repeated
  table.find('tr.products').each(function () {
    var line_no     = $(this).find('td:first-child a').attr('id');
    var stockNumber = $(this).find('td:nth-child(5) div input:nth-child(2)').attr('id');
    var qty         = parseInt($(this).find('td:nth-child(5) div input:nth-child(2)').val());
    shoppingCart[stockNumber] = [qty, line_no];
    removeItemGeneric(session_no, line_no);
  }).promise().done(function(){
    table = "";
  });

//  $.each( shoppingCart, function( key, value ) {
//    addItemGeneric(session_no, key, value[0]);
//  });
//  cartList();
//  cartHeader();
  var promises = [];
  $.each( shoppingCart, function( key, value ) {
    console.log(value[0]);
    promises.push(addItemGeneric(session_no, key, value[0]));
  });
  $.when.apply($, promises).then(function() {
    cartList();
    cartHeader();
  });
  return false;
}

function updateCart3()
{
  event.preventDefault();
  $("#updateCartButton").hide();
  shoppingCart = {};

  $.get("http://72.64.152.18:8081/nlhtml/custom/netlink.php?request_id=APICARTL&session_no=" + session_no + "", function (data) {
    cartlines = data.split("\n");

    cartlines.shift();
    cartlinesPlus = [];
    for (i=0; i<cartlines.length - 1; i++) {
      cartlinesPlus.push(cartlines[i].split("|"));
    }

    for (i=0; i<cartlinesPlus.length; i++) {
      cartfields = cartlinesPlus[i];
//      shoppingCart[cartfields[2]] = [cartfields[6], cartfields[1]];
//    }
      if (!shoppingCart.hasOwnProperty(cartfields[2])) {
        shoppingCart[cartfields[2]] = [cartfields[6], cartfields[1]];
//        removeItemGeneric(session_no, cartfields[1]);
      } else {
        shoppingCart[cartfields[2]][0] += cartfields[6];
//        removeItemGeneric(session_no, shoppingCart[cartfields[2]][1]);
//        removeItemGeneric(session_no, cartfields[1]);
      }
    }
    console.log(Object.keys(shoppingCart));
  }).done( function(){
    $.get("http://72.64.152.18:8081/nlhtml/custom/netlink.php?request_id=APICARTDEL&session_no=" + session_no + "").done( function(){
      var promises = [];
      $.each( shoppingCart, function( key, value ) {
        promises.push(addItemGeneric(session_no, key.trim(), value[0].trim()));
      });
      $.when.apply($, promises).then(function() {
        cartList();
        cartHeader();
      });
    });
  });

}


/////////////////////////
// Credit Card Process //
/////////////////////////
function creditCard()
{
  $.ajax({
    type: "GET",
    url: "http://72.64.152.18:8081/nlhtml/custom/netlink.php?",
    data: {
      request_id: "APIORDLST",
      session_no: session_no
    },
    success: function(response) {
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
            $( "#success" ).click();
            $("#successMessage").empty();
           	var message =  '<h4 style="font-family: Lato;">The order # is: ' + newOrder + '</h4>';
                message += '<p>This is a confirmation that your order has been successfully received and is currently under process. You will receive an email soon with a copy of your invoice, which also includes the details of your order.</p>';
                message += '<p class="nobottommargin">Laura Janelle values your business and is continuously looking for ways to better satisfy their customers. Please do share with us if there is a way we can serve you better.</p>';

            document.getElementById("successMessage").innerHTML += message;
            document.body.addEventListener("click", sendEmail);
          }
        });
      }, 3000);
    }
  });
}

function sendEmail()
{
  var email_num = session_no;
  $.get("http://72.64.152.18:8082/ace/mailer/order_confirmation.php?session_no=" + email_num + "&order_no="+ newOrder + "").always(function(){ email_num = 1;});
    document.body.removeEventListener("click", sendEmail);
    windowHash("orders");
    // add the search for the new order number and display the data.
}


/////////////////////////////////////////
// Saving Addresses from Checkout Page //
/////////////////////////////////////////
function saveAddresses()
{
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
  var ponumber                = $("#shipping-form-ponumber").val();
  var text1 = "";
  var text2 = "";
  var text3 = "";
  var text4 = "";
  var text5 = "";
  var notesArray = [];
  if($("#shipping-form-message").val()) {
    notesArray = $("#shipping-form-message").val().match(/.{1,30}/g);
    if (notesArray[0] && typeof(notesArray[0]) === "string") {
       text1 = notesArray[0];
    }
    if (notesArray[1] && typeof(notesArray[1]) === "string") {
      text2 = notesArray[1];
    }
    if (notesArray[2] && typeof(notesArray[2]) === "string") {
      text3 = notesArray[2];
    }
    if (notesArray[3] && typeof(notesArray[3]) === "string") {
      text4 = notesArray[3];
    }
    if (notesArray[4] && typeof(notesArray[4]) === "string") {
      text5 = notesArray[4];
    }
  }

  if ( window.location.hash === "#checkout" ) {
    $.ajax({
      type: "GET",
      url: "http://72.64.152.18:8081/nlhtml/custom/netlink.php?",
      data: {
        request_id: "APICARTUPD",
        session_no: session_no,
        shipname: shippingformcompanyname,
        shipadd1: shippingformaddress,
        shipadd2: shippingformaddress2,
        shipadd3: shippingformaddress3,
        shipcity: shippingformcity,
        shipstate: shippingformstate,
        shipzip: shippingformzipcode,
        shipcountry: shippingformcountry,
        phone: phone,
        email_addr: email_addr,
        po_no: ponumber,
        text1: text1,
        text2: text2,
        text3: text3,
        text4: text4,
        text5: text5
      }
    });
  } else if ( window.location.hash === "#profile" ) {
    cust_no = $("#cust_no").html().trim();
    var shippingformcontactname = $("#shipping-form-contactname").val();
     $.ajax({
      type: "GET",
      url: "http://72.64.152.18:8081/nlhtml/custom/netlink.php?",
      data: {
        request_id: "APINEWSHIP",
        cust_no: cust_no,
        ship_to_name: shippingformcompanyname,
        address1: shippingformaddress,
        address2: shippingformaddress2,
        address3: shippingformaddress3,
        city: shippingformcity,
        state: shippingformstate,
        zip: shippingformzipcode,
        country: shippingformcountry,
        contact_name: shippingformcontactname,
        phone: phone,
        email: email_addr
      }
    });
  }
}


/////////////////////////
// Search API Function //
/////////////////////////
function search()
{
  stock_no = window.location.hash;

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

///////////////// Leave in until McPhate changes the fields for the SearchAPI call put this back after changes -->  fillShop3(data);
        oldhash = window.location.hash;
        windowHash("shop");
        lines = response.split("\n");
        lines.shift();
        linesPlus = [];
        for (i=0; i<lines.length - 1; i++) {
          linesPlus.push(lines[i].split("|"));
        }
        linesPlus.sort( function( a, b ) {
          retVal=0;
          if (sortItems.indexOf(a[0].trim()) != sortItems.indexOf( b[0].trim() )) retVal= sortItems.indexOf( a[0].trim() ) > sortItems.indexOf( b[0].trim() )?1:-1;
          return retVal;
        });
        // lines[1]+ are data lines
        $('#shopItems').empty();
        html = [];
        if ( lines.length <= 1) {
          document.getElementById("shopItems").innerHTML += '<h1>There are no results</h1>';
        } else {
          for (i=0; i<linesPlus.length; i++) {
            flds = linesPlus[i];

            prod = '<div class="product clearfix ' + flds[2] + '"><div class="product-image"><a href="#detail-view+' + flds[0].trim() +'"><img class="shopimg" src="../ljimages/' + flds[0].trim()  + '-sm.png" alt="' + flds[1] + '"></a><div class="product-overlay">';
            prod += '<a href="#shop" class="add-to-cart" data-notify-position="top-right" data-notify-type="info" data-notify-msg="<i class=icon-info-sign></i>Item ' + flds[0].trim()  + ' has been added to your cart!" onclick="stock_no=\'' + flds[0].trim() + '\'; detailString=\'detail-view+' + flds[0].trim() + '\'; addItemDetailView(); cartList(); SEMICOLON.widget.notifications(this); return false;" id="' + flds[0].replace(/\s+/g,'') + '"><i class="icon-shopping-cart"></i><span> Add to Cart</span></a>';
            prod += '<a href="#detail-view+' + flds[0].trim() + '" class="item-quick-view"><i class="icon-zoom-in2"></i><span class="' + flds[0].trim()  + '">Detail View</span></a></div></div>';
            prod += '<div class="product-desc" style="height: 80px;"><div class="product-title"><h3><a href="#detail-view+' + flds[0].trim() + '">' + flds[1] +'</a></h3></div><div class="product-price"><ins>$' + parseFloat(flds[4]).toFixed(2) + '</ins></div></div></div>';

            html.push(prod);

          }
          document.getElementById("shopItems").innerHTML += html.join('');
          $("#shopItems").prepend('<button style="display: block; bottommargin-sm" type="button" class="button button-3d button-mini button-rounded button-black" onclick="$(\'#shopItems\').empty(); windowHash(\''+oldhash+'\'); filterFunction2(\'APISTKLST\',\'\',\'\',\'\',\'\',\'\');">Close Search</button>');
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
  var fldsArray = { "data": []};
  $.ajax({
   type: "GET",
   url: "http://72.64.152.18:8081/nlhtml/custom/netlink.php?",
   data: {
     request_id: "APIHISTLST",
     session_no: session_no
   },
   success: function(response) {
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

       fldsArray.data.push(flds);
     }
     fldsArray = JSON.stringify(fldsArray);
     fldsArray_json = $.parseJSON(fldsArray);
   },
   complete: function(){
     table = $('#datatable2').DataTable();
     table.clear();
     table.rows.add( fldsArray_json.data ).draw();

     table5 = $('#datatable5').DataTable();
     table5.clear();
     table5.rows.add( fldsArray_json.data ).draw();
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
     openlines = response.split("\n");
     // lines[0] is header row
     // lines[1]+ are data lines

     for (i=1; i < openlines.length - 1; i++) {
       fields = openlines[i].split("|");
       fields.splice(3, 1);
       fields.splice(6, 1);
       fields.splice(6, 1);
       fields.splice(6, 1);
       openfldsArray.data.push(fields);
     }
     openfldsArray = JSON.stringify(openfldsArray);
     openfldsArray_json = $.parseJSON(openfldsArray);
   },
   complete: function(){
     table1 = $('#datatable1').DataTable();
     table1.clear();
     table1.rows.add( openfldsArray_json.data ).draw();
   }
 });
}



/////////////////////////////////////////////
    // GET ORDER HEADER AND LINE ITEMS //
/////////////////////////////////////////////
function searchOrders(orderSearchNumber)
{
  $("#orders-details-title").show();
  $("#orders-details-table").show();
  $("#orders-line-item-title").show();
  $("#orders-line-item-table").show();
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
      $('#orders-orderDetails').empty();
      html = [];
      if ( lines.length <= 2) {
        document.getElementById("orders-orderDetails").innerHTML += '<tr><td><h1>There are no results</h1></td><td></td></tr>';
      } else {
        for (i=1; i<lines.length - 1; i++) {
          details = lines[i].split("|");
          line = '<tr><td>Order Number</td><td>'+details[0]+'</td></tr>';
          line += '<tr><td>Order Date</td><td>'+details[1]+'</td></tr>';
          line += '<tr><td>Shipping Date</td><td>'+details[2]+'</td></tr>';
          line += '<tr><td>Customer Number</td><td>'+details[3]+'</td></tr>';
          line += '<tr><td>PO Number</td><td>'+details[4]+'</td></tr>';
          line += '<tr><td>Tax Amount</td><td>'+details[5]+'</td></tr>';
          line += '<tr><td>Order Total</td><td>'+details[6]+'</td></tr>';
          line += '<tr><td>Discount Amount</td><td>'+details[7]+'</td></tr>';
          line += '<tr><td>Bill-to Name</td><td>'+details[8]+'</td></tr>';
          line += '<tr><td>Bill-to Address</td><td>'+details[9]+' '+details[10]+' '+details[11]+', '+details[12]+', '+details[13]+', '+details[14]+'</td></tr>';
          line += '<tr><td>Ship-to Name</td><td>'+details[15]+'</td></tr>';
          line += '<tr><td>Ship-to Address</td><td>'+details[16]+' '+details[17]+' '+details[18]+', '+details[19]+', '+details[20]+', '+details[21]+'</td></tr>';
          line += '<tr><td>Notes</td><td>'+details[22]+' '+details[23]+' '+details[24]+' '+details[25]+' '+details[26]+'</td></tr>';
          line += '<tr><td>Email Address</td><td>'+details[27]+'</td></tr>';
          line += '<tr><td>Total Payments</td><td>'+details[28]+'</td></tr>';
          line += '<tr><td>Number of Lines</td><td>'+details[29]+'</td></tr>';
          line += '<tr><td>Total Order Qty</td><td>'+details[30]+'</td></tr>';
          line += '<tr><td>Total Weight</td><td>'+details[31]+'</td></tr>';
          line += '<tr><td>Shipping Method</td><td>'+details[32]+'</td></tr>';
          line += '<tr><td>Total Other Charges</td><td>'+details[33]+'</td></tr>';
          line += '<tr><td>Total Freight</td><td>'+details[34]+'</td></tr>';
          html.push(line);
          document.getElementById("orders-orderDetails").innerHTML += html.join('');
        }
      }
    }
  });
  var openfldsArray = { "data": []};
  fields = "";
  $.ajax({
    type: "GET",
    url: "http://72.64.152.18:8081/nlhtml/custom/netlink.php?",
    data: {
      request_id: "APIORDL",
      session_no: session_no,
      order_no: orderSearchNumber},
    success: function(response) {
      console.log(response);
      openlines = response.split("\n");
      // lines[0] is header row
      // lines[1]+ are data lines
      for (i=1; i< openlines.length - 1; i++) {
        fields = openlines[i].split("|");
        fields.splice(0, 1);
        fields.splice(3, 1);
        fields.splice(3, 1);
        fields.splice(6, 1);
        openfldsArray.data.push(fields);
      }
      openfldsArray = JSON.stringify(openfldsArray);
      openfldsArray_json = $.parseJSON(openfldsArray);
    },
    complete: function(){
      if (fields === "" ) {
        $("#datatable3").hide();
      } else {
        $("#datatable3").show();

        table3 = $('#datatable3').DataTable();
        table3.clear();
        table3.rows.add( openfldsArray_json.data ).draw();
      }
    }
  });
}



/////////////////////////////////////////////
   // GET INVOICE HEADER AND LINE ITEMS //
/////////////////////////////////////////////
function searchInvoices(invoiceSearchNumber)
{
  $("#details-title").show();
  $("#details-table").show();
  $("#line-item-title").show();
  $("#line-item-table").show();
  $.ajax({
    type: "GET",
    url: "http://72.64.152.18:8081/nlhtml/custom/netlink.php?",
    data: {
      request_id: "APIHISTH",
      session_no: session_no,
      inv_no: invoiceSearchNumber},
    success: function(response) {
      lines = response.split("\n");
      // lines[0] is header row
      // lines[1]+ are data lines
      $('#invoiceDetails').empty();
      // html = [];
      if ( lines.length <= 2) {
        document.getElementById("invoiceDetails").innerHTML += '<tr><td><h1>There are no results</h1></td><td></td></tr>';
      } else {
        for (i=1; i<lines.length - 1; i++) {
          details = lines[i].split("|");
          line = '<tr><td>Order Number</td><td>'+details[0]+'</td></tr>';
          line += '<tr><td>Invoice Number</td><td>'+details[1]+'</td></tr>';
          line += '<tr><td>Order Date</td><td>'+details[2]+'</td></tr>';
          line += '<tr><td>Shipping Date</td><td>'+details[3]+'</td></tr>';
          line += '<tr><td>Customer Number</td><td>'+details[4]+'</td></tr>';
          line += '<tr><td>PO Number</td><td>'+details[5]+'</td></tr>';
          line += '<tr><td>Tax Amount</td><td>'+details[8]+'</td></tr>';
          line += '<tr><td>Order Total</td><td>'+details[9]+'</td></tr>';
          line += '<tr><td>Discount Amount</td><td>'+details[10]+'</td></tr>';
          line += '<tr><td>Bill-to Name</td><td>'+details[11]+'</td></tr>';
          line += '<tr><td>Bill-to Address</td><td>'+details[12]+' '+details[13]+' '+details[14]+', '+details[15]+', '+details[16]+', '+details[17]+'</td></tr>';
          line += '<tr><td>Ship-to Name</td><td>'+details[18]+'</td></tr>';
          line += '<tr><td>Ship-to Address</td><td>'+details[19]+' '+details[20]+' '+details[21]+', '+details[22]+', '+details[23]+', '+details[24]+'</td></tr>';
          line += '<tr><td>Notes</td><td>'+details[25]+' '+details[26]+' '+details[27]+' '+details[28]+' '+details[29]+'</td></tr>';
          line += '<tr><td>Email Address</td><td>'+details[30]+'</td></tr>';
          line += '<tr><td>Total Payments</td><td>'+details[31]+'</td></tr>';
          line += '<tr><td>Number of Lines</td><td>'+details[32]+'</td></tr>';
          line += '<tr><td>Total Order Qty</td><td>'+details[33]+'</td></tr>';
          line += '<tr><td>Total Weight</td><td>'+details[34]+'</td></tr>';
          line += '<tr><td>Shipping Method</td><td>'+details[35]+'</td></tr>';
          line += '<tr><td>Total Other Charges</td><td>'+details[36]+'</td></tr>';
          line += '<tr><td>Total Freight</td><td>'+details[37]+'</td></tr>';

          document.getElementById("invoiceDetails").innerHTML += line;
        }
      }
    }
  });
  var openfldsArray = { "data": []};
  fields = "";
  $.ajax({
    type: "GET",
    url: "http://72.64.152.18:8081/nlhtml/custom/netlink.php?",
    data: {
      request_id: "APIHISTL",
      session_no: session_no,
      inv_no: invoiceSearchNumber},
    success: function(response) {

      openlines = response.split("\n");
      // lines[0] is header row
      // lines[1]+ are data lines
      // $('#tableBody').empty();
      for (i=1; i< openlines.length - 1; i++) {
        fields = openlines[i].split("|");
        fields.splice(0, 1);
        fields.splice(2, 1);
        fields.splice(4, 1);
        fields.splice(4, 1);
        fields.splice(8, 1);

        openfldsArray.data.push(fields);
      }
      openfldsArray = JSON.stringify(openfldsArray);
      openfldsArray_json = $.parseJSON(openfldsArray);
    },
    complete: function(){
      if (fields === "" ) {
        table4 = $('#datatable4').DataTable();
        table4.clear();
      } else {
        $("#datatable4").show();
        table4 = $('#datatable4').DataTable();
        table4.clear();
        table4.rows.add( openfldsArray_json.data ).draw();

      }
    }
  });
}



/////////////////////////////////////////////
         // GET ACCOUNT DETAILS //
/////////////////////////////////////////////
function accountDetails()
{
  $.ajax({
    type: "GET",
    url: "http://72.64.152.18:8081/nlhtml/custom/netlink.php?",
    data: {
      request_id: "APIACCTINFO",
      user: username},
    success: function(response) {

      lines = response.split("\n");
      // lines[0] is header row
      // lines[1]+ are data lines
      $('#accountDetails').empty();
      for (i=0; i<lines.length - 1; i++) {
        details = lines[i].split("|");
        line =  '<tr><td>Username</td><td>'+details[0]+'</td></tr>';
        line += '<tr><td>Customer Number</td><td id="cust_no">'+details[1]+'</td></tr>';
        line += '<tr><td>Customer Name</td><td>'+details[2]+'</td></tr>';
        line += '<tr><td>Email Address</td><td>'+details[3]+'</td></tr>';
        line += '<tr><td>Phone Number</td><td>'+details[4]+'</td></tr>';
        line += '<tr><td>Default Ship Via Code</td><td>'+details[5]+'</td></tr>';
        line += '<tr><td>Terms Code</td><td>'+details[6]+'</td></tr>';
        line += '<tr><td>Current Session Number</td><td>'+session_no+'</td></tr>';
        document.getElementById("accountDetails").innerHTML += line;
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




///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////// HELPER FUNCTIONS / SUBROUTINES ///////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////
          // redirect with hash add ins  //
/////////////////////////////////////////////////////
function redirect(pathname)
{
  pathArray = window.location.pathname.split( '/' );
  pathArray[pathArray.length - 2] = pathname;
  window.location.pathname = pathArray.join('/');
}

function windowHash(name)
{
  window.location.hash = name;
  return false;
}


/////////////////////////////////////////////////////
// Get Session Number and Authorize Access to Page //
/////////////////////////////////////////////////////
function sessionNumber()
{
  session_no = Cookies.get('session_no');
  if (typeof(session_no) === "undefined" || session_no.length !== 25) {
    pathArray = window.location.pathname.split( '/' );
    pathArray[pathArray.length - 2] = "retailerlogin";
    window.location.pathname = pathArray.join('/');
    alert("Please log in first.");
  }
}



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
    Cookies.set('session_no', "Logged Out");
    redirect("");
}




////////////////////////////////
// Find Minimum for the order //
////////////////////////////////
function minimumTotal()
{
  newCustomer = Cookies.get('newCustomer');
  orderAmt.trim();
  orderAmtFloat = parseFloat(orderAmt.replace(/,/g,''));
  if (newCustomer === "false" && orderAmtFloat < 100 || newCustomer === "true" && orderAmtFloat < 200 ){
    $("#myButton").hide();
    if (newCustomer === "true") {
      document.getElementById("minimumTotalWarning").innerHTML += '<h2>You need spend $' + parseFloat((200 - orderAmtFloat)).toFixed(2) + ' more to reach the minimum order requirement of $200 for new customers.</h2>';
    }
    if (newCustomer === "false") {
      document.getElementById("minimumTotalWarning").innerHTML += '<h2>You need spend $' + parseFloat((100 - orderAmtFloat)).toFixed(2) + ' more to reach the minimum order requirement of $100.</h2>';
    }
  } else {
    $("#myButton").show();
  }
}



//////////////////////////////////////
// Functionality of + and - Buttons //
//////////////////////////////////////
function changeQuantity(element)
{
  var fieldName = jQuery(element).attr('data-field');
  var type      = jQuery(element).attr('data-type');
  var input     = jQuery("input[name='"+fieldName+"']");
  var currentVal = parseInt(input.val());
  if (!isNaN(currentVal)) {
    if(type == 'minus') {
      var minValue = parseInt(input.attr('min'));
      if(!minValue) minValue = 1;
      if(currentVal > minValue) {
        input.val(currentVal - 1).change();
      }
      if(parseInt(input.val()) == minValue) {
        jQuery(element).attr('disabled', true);
      }
    } else if(type == 'plus') {
      var maxValue = parseInt(input.attr('max'));
      if(!maxValue) maxValue = 9999999999999;
      if(currentVal < maxValue) {
        input.val(currentVal + 1).change();
      }
      if(parseInt(input.val()) == maxValue) {
        jQuery(element).attr('disabled', true);
      }
    }
  } else {
    input.val(0);
  }

  jQuery('.input-number').focusin(function(){
    jQuery(element).data('oldValue', jQuery(element).val());
  });
  jQuery('.input-number').change(function() {
    var minValue = parseInt(input.attr('min'));
    var maxValue = parseInt(input.attr('max'));
    if(!minValue) minValue = 1;
    if(!maxValue) maxValue = 9999999999999;
    var valueCurrent = parseInt(input.val());
  });
  return false;
}



/////////////////////////////////////
  // SUBROUTINE TO FIND COLOR //
/////////////////////////////////////
function whatColor(colorCode)
{
  switch (colorCode) {
    case "01": color = "Silver";
    break;
    case "02": color = "Gold";
    break;
    case "03": color = "Black";
    break;
    case "04": color = "Blue";
    break;
    case "05": color = "Brown";
    break;
    case "06": color = "Clear";
    break;
    case "07": color = "Green";
    break;
    case "08": color = "Grey";
    break;
    case "09": color = "Opal";
    break;
    case "10": color = "Orange";
    break;
    case "11": color = "Pink";
    break;
    case "12": color = "Purple";
    break;
    case "13": color = "Rainbow";
    break;
    case "14": color = "Red";
    break;
    case "15": color = "Tan";
    break;
    case "16": color = "Teal";
    break;
    case "17": color = "Turquoise";
    break;
    case "18": color = "White";
    break;
    case "19": color = "Yellow";
    break;
    case "20": color = "Mulitcolored";
    break;
    default:
    color = "N/A";
  }
  return color;
}



/////////////////////////////////////
   // SUBROUTINE TO FIND TYPE //
/////////////////////////////////////
function whatType(typeCode)
{
  switch (typeCode) {
    case "100": type = "Necklace";
    break;
    case "200": type = "Bracelet";
    break;
    case "300": type = "Earrings";
    break;
    case "400": type = "Lanyard";
    break;
    case "500": type = "Snap";
    break;
    case "600": type = "Tassel";
    break;
    case "700": type = "Set";
    break;
    case "800": type = "Program";
    break;
    case "850": type = "Display";
    break;
    case "900": type = "Oil";
    break;
    case "950": type = "Accessories";
    break;
    default:
    type = "N/A";
  }
  return type;
}



/////////////////////////////////////
   // SUBROUTINE TO FIND LOOK //
/////////////////////////////////////
function whatLook(lookCode)
{
  switch (lookCode) {
    case "SLK": look = "SLEEK";
    break;
    case "ENC": look = "enCHARMing";
    break;
    case "GLB": look = "RGLB";
    break;
    case "IDT": look = "iDentify";
    break;
    case "ZEN": look = "AURA";
    break;
    default:
    look = "N/A";
  }
  return look;
}



//////////////////////////
// Filter Function Test //
//////////////////////////
function filterFunction2(a,b,c,d,e,f)
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
       console.log(response);
      lines = response.split("\n");
      lines.shift();
      linesPlus = [];
      for (i=0; i<lines.length - 1; i++) {
        linesPlus.push(lines[i].split("|"));
      }

      linesPlus.sort( function( a, b ) {
        retVal=0;
        if (sortItems.indexOf(a[0].trim()) != sortItems.indexOf( b[0].trim() )) retVal= sortItems.indexOf( a[0].trim() ) > sortItems.indexOf( b[0].trim() )?1:-1;
        return retVal;
      });

      $('#shopItems').empty();
      html = [];
      if ( lines.length <= 1) {
        document.getElementById("shopItems").innerHTML += '<h1>There are no results</h1>';
      } else {
        for (i=0; i<linesPlus.length; i++) {
          flds = linesPlus[i];

          prod =  '<div class="product clearfix ' + flds[2] +" "+ flds[8].trim() +" "+ flds[9].trim() + '"><div class="product-image"><a href="#detail-view+' + flds[0].trim() + '+' + flds[8].trim() + '+' + flds[9].trim() + '"><img class="shopimg" src="../ljimages/' + flds[0].trim()  + '-sm.png" alt="' + flds[1] + '"></a><div class="product-overlay">';
          prod += '<a href="#shop" class="add-to-cart" data-notify-position="top-right" data-notify-type="info" data-notify-msg="<i class=icon-info-sign></i>Item ' + flds[0].trim() + ' has been added to your cart!" onclick="stock_no=\'' + flds[0].trim() + '\'; detailString=\'detail-view+' + flds[0].trim() + '+' + flds[8].trim() + '+' + flds[9].trim() + '\'; addItemDetailView(); cartHeader(); cartList(); SEMICOLON.widget.notifications(this); return false;"><i class="icon-shopping-cart"></i><span> Add to Cart</span></a>';
          prod += '<a href="../shop-item.html" class="item-quick-view" data-lightbox="ajax" onclick="event.preventDefault(); stock_no=\'' + flds[0].trim() + '\'; quickView(this.id);" id="' + flds[0].trim() + '+' + flds[8].trim() + '+' + flds[9].trim() + '"><i class="icon-zoom-in2"></i><span id="' + flds[0].trim() + '+' + flds[8].trim() + '+' + flds[9].trim() + '">Quick View</span></a></div></div>';
          prod += '<div class="product-desc center"><div class="product-title"><h3><a href="#detail-view+' + flds[0].trim() + '+' + flds[8].trim() + '+' + flds[9].trim() + '">' + flds[1] +'</a></h3></div><div class="product-price">cost &nbsp;<ins>$' + flds[4].trim() + '</ins></div></div></div>';

          html.push(prod);
        }
        document.getElementById("shopItems").innerHTML += html.join('');
      }
    },
    complete: function(){
      SEMICOLON.initialize.lightbox();
    }
  });
}



/////////////////////////////////////////////
// Get Information for the Item Quick View //
/////////////////////////////////////////////
function quickView(clicked_id)
{
  jQuery.ajax({
    type: "GET",
    url: "http://72.64.152.18:8081/nlhtml/custom/netlink.php?",
    data: {request_id: "APISTKDTL", stock_no: stock_no},
    success: function(response) {
      lines = response.split("\n");
      fields = lines[1].split("|");

      switch (fields[2]) {
        case "SLK": collection = 'SLEEK';
          break;
        case "GLB": collection = "RGLB";
          break;
        case "ENC": collection = "enCHARMing";
          break;
        case "IDT": collection = "iDentify";
          break;
        case "ZEN": collection = "AURA";
          break;
        default:
          collection = fields[2];
      }

      var prodtype = fields[1].split(/(\s+)/);
					prodtype = prodtype[2];

			document.getElementById("quickViewimages").innerHTML = '<div class="slide" style="display: block;"><a href="#shop"><img src="../ljimages/' + stock_no + '-md.png" alt="' + fields[1] + '"></a></div>';

      jQuery( "#secondColumn").prepend('<div><a href="#shop" title="Brand Logo" class="hidden-xs"><img class="image_fade" src="../img/'+ fields[2] +'-logo.png" alt="Brand Logo"></a></div><div><span itemprop="productID" class="sku_wrapper" style="font-size: 24px; font-weight: 600;">ITEM # <span class="sku">' + stock_no + '</span></span></div><div class="line"></div><div class="product-price col_half" style="font-size: 16px; font-weight: 400;"><ins>COST:&nbsp;' + fields[4] + '</ins></div>');
      jQuery( ".minus" ).after( '<input type="text" name="quant[1]" step="1" min="1" name="quantity" value="1" title="Qty" size="4" class="qty form-control input-number" id="' + stock_no + '" />' );
    //  if (fields[8].length !== 0)  {
    //     secondColumn = '<p>' + fields[8] + '</p>';
    //  } else {
         secondColumn = '<p>' + fields[1] + '</p>';
  //    }
      $("#quickViewForm").append('<button type="button" id="add-item" class="add-to-cart button nomargin" data-notify-position="top-right" data-notify-type="info" data-notify-msg="<i class=icon-info-sign></i>The item(s) have been added to your cart!" onclick="detailString=\'detail-view+' + clicked_id + '\'; addItemDetailView(); SEMICOLON.widget.notifications(this); cartList(); return false;">Add to cart</button>');
      $("#description").append(secondColumn);
    }
  });
}



/////////////////////////////////////////////
// Tabs loads ajax. Makes this go faster.. //
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////

function shopPage()
{
//filterFunction2('APISTKLST','','','','','');

cartHeader();
cartList();
}

function priceFilter() {
  var priceRangefrom = parseFloat($("#min").val());
  var priceRangeto = parseFloat($("#max").val());

  $container.isotope({
    transitionDuration: '0.65s',
    filter: function() {
      if( jQuery(this).is(':visible')) {
        if( jQuery(this).find('.product-price').find('ins').length > 0 ) {
          price = jQuery(this).find('.product-price ins').text();
        } else {
          price = jQuery(this).find('.product-price').text();
        }
        priceNum = price.split("$");
        return ( priceRangefrom <= priceNum[1] && priceRangeto >= priceNum[1] );
      }
    }
  });
}
//.page_link:visible'
$(function() {
  $container = $('#shopItems');
//      $container.isotope('destroy');
  $container.imagesLoaded(function(){
    $(function(){
      $container = $('#shopItems');
      var $output = $('#output');

      // do stuff when checkbox change
      $('.ui-group').on( 'change', function( jQEvent ) {

        var $checkbox = $( jQEvent.target );
        manageCheckbox( $checkbox );

        var comboFilter = getComboFilter( filters );

        $container.isotope({
          transitionDuration: '0.65s',
          filter: comboFilter
         });
        $output.text( comboFilter );

      }).promise().done(function(){
        pageMe();
      });
    });
  });

});

function getComboFilter( filters ) {
  var i = 0;
  var comboFilters = [];
  var message = [];

  for ( var prop in filters ) {
    message.push( filters[ prop ].join(' ') );
    var filterGroup = filters[ prop ];
    // skip to next filter group if it doesn't have any values
    if ( !filterGroup.length ) {
      continue;
    }
    if ( i === 0 ) {
      // copy to new array
      comboFilters = filterGroup.slice(0);
    } else {
      var filterSelectors = [];
      // copy to fresh array
      var groupCombo = comboFilters.slice(0); // [ A, B ]
      // merge filter Groups
      for (var k=0, len3 = filterGroup.length; k < len3; k++) {
        for (var j=0, len2 = groupCombo.length; j < len2; j++) {
          filterSelectors.push( groupCombo[j] + filterGroup[k] ); // [ 1, 2 ]
        }
      }
      // apply filter selectors to combo filters for next group
      comboFilters = filterSelectors;
    }
    i++;
  }

  var comboFilter = comboFilters.join(', ');
  return comboFilter;
}

function manageCheckbox( $checkbox ) {
  var checkbox = $checkbox[0];

  var group = $checkbox.parents('.togglec').attr('data-group');
  // create array for filter group, if not there yet
  var filterGroup = filters[ group ];
  if ( !filterGroup ) {
    filterGroup = filters[ group ] = [];
  }

  var isAll = $checkbox.hasClass('all');
  // reset filter group if the all box was checked
  if ( isAll ) {
    delete filters[ group ];
    if ( !checkbox.checked ) {
      checkbox.checked = 'checked';
    }
  }
  // index of
  var index = $.inArray( checkbox.value, filterGroup );

  if ( checkbox.checked ) {
    var selector = isAll ? 'input' : 'input.all';
    $checkbox.siblings( selector ).removeAttr('checked');

    if ( !isAll && index === -1 ) {
      // add filter to group
      filters[ group ].push( checkbox.value );
    }
  } else if ( !isAll ) {
    // remove filter from group
    filters[ group ].splice( index, 1 );
    // if unchecked the last box, check the all
    if ( !$checkbox.siblings('[checked]').length ) {
      $checkbox.siblings('input.all').attr('checked', 'checked');
    }
  }
}


/////////////////////////////////////////////
/////////////////////////////////////////////


function cartPage()
{
  cartList();
  cartHeader();
}



/////////////////////////////////////////////
/////////////////////////////////////////////


function checkoutPage()
{
  shippingAddresses = [];
  $("#minimumTotalWarning").empty();
  $("#shipping-address").empty();
  cartList();
  cartHeader(minimumTotal); // cartHeader(); cartHeader(minimumTotal);
  shipToAddress();
  $("#creditcard").hide();
  document.getElementById("creditcard").src="http://72.64.152.18:8081/nlhtml/custom/netlink.php?request_id=APICC&session_no=" + session_no + "";

  $("#myButton").click(function() {
    console.log("is this working?");
    var hasErrors = $('#shipping-form').validator('validate').has('.has-error').length;
    if (hasErrors) {
      alert('Shipping address form has errors.');
    } else {
      saveAddresses();
      creditCard();
      $( "#creditcard" ).slideDown( "slow" );
    }
  });
}


/////////////////////////////////////////////
/////////////////////////////////////////////

function whichPage()
{
  var hashy = window.location.hash.split("+");
  var locale = hashy[0];
  switch (locale) {
    case '#shop' :
      $('#content div div section').hide();
      $('#shop').show();
      shopPage();
      break;
    case '#cart' :
      $('#content div div section').hide();
      $('#cart').show();
      cartPage();
      break;
    case '#checkout' :
      $('#content div div section').hide();
      $('#checkout').show();
      checkoutPage();
      break;
    case '#profile' :
      $('#content div div section').hide();
      $('#profile').show();
      username = Cookies.get('username').toUpperCase();
      accountDetails();
      $("#myButton").click(function() {
        console.log("is this working?");
        var hasErrors = $('#shipping-form').validator('validate').has('.has-error').length;
        if (hasErrors) {
          alert('Shipping address form has errors.');
        } else {
          saveAddresses();
        }
      });
      break;
    case '#invoices' :
      $('#content div div section').hide();
      $('#invoices').show();
      $("#details-title").hide();
      $("#details-table").hide();
      $("#line-item-title").hide();
      $("#line-item-table").hide();

      orderHistory();
      cartList();
      $('#searchForInvoices').click(function(){
        var invoiceSearchNumber = $('#invoiceNumber').val();
        searchInvoices(invoiceSearchNumber);
      });
      $('#invoiceNumber').keypress(function(e){
        if(e.which == 13){//Enter key pressed
          $('#searchButton').click();//Trigger search button click event
        }
      });
      break;
    case '#orders' :
      $('#content div div section').hide();
      $('#orders').show();
      $("#orders-details-title").hide();
      $("#orders-details-table").hide();
      $("#orders-line-item-title").hide();
      $("#orders-line-item-table").hide();
      openOrders();
      orderHistory();
      cartList();
      $('#searchForOrders').click(function(){
        var orderSearchNumber = $('#orderNumber').val();
        searchOrders(orderSearchNumber);
      });
      $('#orderNumber').keypress(function(e){
        if(e.which == 13){//Enter key pressed
          $('#searchButton').click();//Trigger search button click event
        }
      });
      break;
    case '#detail-view' :
      $('#content div div section').hide();
      $('#detail-view').show();
      detailView();
      cartHeader();
      cartList();
      break;
    case '#faq' :
      $('#content div div section').hide();
      $('#faq').show();
      break;
    case '#customerservice' :
      $('#content div div section').hide();
      $('#customerservice').show();
      break;
    default :
      $('#content div div section').hide();
      $('#shop').show();
      shopPage();
  }
}
