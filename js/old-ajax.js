function addItemDetailView()
{
  var detailViewQty;
  if (document.getElementById(stock_no)) {
    detailViewQty = document.getElementById(stock_no).value;
  } else {
    detailViewQty = "1";
  }

  // Save color and type in the 
  if (!localStorage.getItem(stock_no) || localStorage.getItem(stock_no) === "undefined" || localStorage.getItem(stock_no) === null ) {
    localStorage.setItem(stock_no, detailString);
  }

  addItemGeneric(session_no, stock_no, detailViewQty);
  if ( window.location.hash !== "#shop" ) {
    windowHash("cart");
  }
  return false;
}

function filterFunction2(a,b,c,d,e,f,g,h)
{
  // Delete after October PLease!!!!
  $('#breast-cancer-banner').remove();
  $.ajax({
    type: "GET",
    url: "https://netlink.laurajanelle.com:444/nlhtml/custom/netlink.php?",
    data: {
      request_id: a,
      level1: b,
      level2: c,
      level3: d,
      level4: e,
      level5: f,
      session_no: g,
      loc_no: h
    },
    success: function(response) {
      $('#shopItems').empty();
      itemRender("shopItems", response);
    },
    complete: function(){
      SEMICOLON.initialize.lightbox();
    }
  });
}

function itemRender(div,response)
{
  lines = response.split("\n");
  lines.shift();
  if ( lines.length <= 1) {
    document.getElementById(div).innerHTML += '<h1>There are no results</h1>';
  } else {
    html = [];
    linesPlus = [];
    for (i=0; i<lines.length - 1; i++) {
      linesPlus.push(lines[i].split("|"));
    }

    linesPlus.sort( function( a, b ) {
      retVal=0;
      if (sortItems.indexOf(a[0].trim()) != sortItems.indexOf( b[0].trim() )) retVal= sortItems.indexOf( a[0].trim() ) > sortItems.indexOf( b[0].trim() )?1:-1;
      return retVal;
    });
    for (i=0; i<linesPlus.length; i++) {
      flds = linesPlus[i];

      // blocking out new items for encharming
      // if ( banned.indexOf(flds[0].trim()) != -1 ) { continue; } 

      stringOfDetails = flds[0].trim() + '+' + flds[8].trim() + '+' + flds[9].trim() + '+' + flds[10].trim();
      prod =  '<div class="product clearfix ' + flds[2].trim() +" "+ flds[8].trim() +" "+ flds[9].trim() +" "+ flds[10].trim() + 1 +'"><div class="product-image"><a href="#detail-view+' + stringOfDetails + '"><img class="shopimg" src="https://www.laurajanelle.com/ljjpgimages/' + flds[0].trim()  + '-sm.jpg" alt="' + flds[1] + '"></a>';
      if (flds[7].trim().length === 3) {
        prod += '<div class="sale-flash">NEW!</div>';
      }
      prod += '<div class="product-overlay"><a href="#shop" class="add-to-cart" data-notify-position="top-right" data-notify-type="info" data-notify-msg="<i class=icon-info-sign></i>Item ' + flds[0].trim() + ' has been added to your cart!" onclick="stock_no=\'' + flds[0].trim() + '\'; detailString=\'#detail-view+' + stringOfDetails + '\'; addItemDetailView(); shopPage(); SEMICOLON.widget.notifications(this); return false;"><i class="icon-shopping-cart"></i><span> Add to Cart</span></a>';
      prod += '<a href="../shop-item.html" class="item-quick-view" data-lightbox="ajax" onclick="stock_no=\'' + flds[0].trim() + '\'; quickView(this.id);" id="' + stringOfDetails + '"><i class="icon-zoom-in2"></i><span id="' + stringOfDetails + '">Quick View</span></a></div></div>';
      prod += '<div class="product-desc center"><div class="product-title"><h3><a href="#detail-view+' + stringOfDetails + '">' + flds[1] +'</a></h3></div><div class="product-price">cost &nbsp;$' + flds[4].trim() + '</div></div></div>';

      html.push(prod);
    }
    document.getElementById(div).innerHTML += html.join('');
  }
}

/////////////////////////////////////
  // SUBROUTINE TO FIND COLOR //
/////////////////////////////////////
function whatColor(colorCode)
{
  switch (colorCode) {
    case "1": color = "Silver";
      break;
    case "2": color = "Gold";
      break;
    case "3": color = "Black";
      break;
    case "4": color = "Blue";
      break;   
    case "5": color = "Brown";
      break;   
    case "6": color = "Clear";
      break;    
    case "7": color = "Green";
      break;    
    case "8": color = "Grey";
      break;   
    case "9": color = "Opal";
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
    case "950": type = "Accessory";
    break;
    case "1000": type = "Scarf";
    break;
    case "1100": type = "Pendant";
    break;
    case "1200": type = "Purse";
    break;
    case "1300": type = "Wristlet";
    break;
    case "1400": type = "Brooch";
    break;
    case "1500": type = "Ring";
    break;
    case "1600": type = "Versatile";
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
    case "SRK": look = "Salt Rock";
    break;
    case "MAN": look = "MANTRA";
    break;
    case "TRS": look = "Natural Treasures";
    break;
    case "TEM": look = "TEAM SPIRIT!";
    break;
    default:
    look = "N/A";
  }
  return look;
}



/////////////////////////////////////
 // SUBROUTINE TO FIND METAL TYPE //
/////////////////////////////////////
function whatMetal(metalCode)
{
  switch (metalCode) {
    case "10": metal = "Gold";
    break;
    case "20": metal = "Silver";
    break;
    case "30": metal = "Antique Gold";
    break;
    case "40": metal = "Gunmetal";
    break;
    default:
    metal = "N/A";
  }
  return metal;
}

function updateCart()
{
  $("#updateCartButton").hide();
  var shoppingCart = {};
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
  shopPage();
}

/////////////////////////////////////////////////
// Subroutine to Populate Detail-View Page //
/////////////////////////////////////////////////
function populateDetailView(secondImage, color, type, metal, callback, callback2, stock_no) {
  $.ajax({
    type: "GET",
    url: "https://netlink.laurajanelle.com:444/nlhtml/custom/netlink.php?",
    data: {
      request_id: "APISTKDTL",
      stock_no: stock_no,
      session_no: session_no
    },
    success: function (response) {
      // lines[0] is header row
      // lines[1]+ are data lines
      lines = response.split("\n");
      fields = lines[1].split("|");

      secondColumn = '<div class="row"><div class="col-sm-6 nobottommargin"><span itemprop="productID" class="sku_wrapper" style="font-size: 24px; font-weight: 600;">ITEM # <span class="sku">' + fields[0].replace(/\s+/g, '') + '</span></span></div><div id="mainRatingDiv" class="col-sm-6 nobottommargin"></div></div><div class="line"></div>';
      secondColumn += '<div class="row"><div class="product-price col-sm-4" style="font-size: 16px; font-weight: 400;"> COST:&nbsp;' + fields[4] + '</div><div class="col-sm-4 hidden-xs" style="top: 0px; margin: 0px;">MIN: 1</div>';
      if (fields[3] != ".00") {
        secondColumn += '<div class="product-rating col-sm-4" style="top: 0px; margin: 0px;">MSRP:&nbsp;' + fields[3] + '</div>';
      }
      secondColumn += '</div><div class="clear"></div><div class="line"></div><form class="cart nobottommargin clearfix" method="post" enctype="multipart/form-data"><div class="quantity clearfix">';
      secondColumn += '<input type="button" value="-" class="minus btn-number" data-type="minus" data-field="quant[1]" onclick="changeQuantity(this)">';
      secondColumn += '<input type="text" name="quant[1]" step="1" min="1" name="quantity" value="1" title="Qty" size="4" class="qty form-control input-number" id="' + fields[0].replace(/\s+/g, '') + '" />';
      secondColumn += '<input type="button" value="+" class="plus btn-number" data-type="plus" data-field="quant[1]" onclick="changeQuantity(this)"></div>';
      secondColumn += '<button type="button" id="add-item" class="add-to-cart button-3d button button-small" onclick="stock_no=\'' + fields[0].trim() + '\'; addItemDetailView();">Add to cart</button><a id="addReviewButton" href="#" data-toggle="modal" data-target="#reviewFormModal" class="add-to-cart button button-3d button-mini hidden-xs" onclick="populateReviewModal(); return false;">Add Review</a></form><div class="clear"></div><div class="line"></div>';

      if (fields[8] && fields[8].length !== 0) {
        secondColumn += '<p>' + fields[8] + '</p>';
      } else {
        secondColumn += '<p>' + fields[1] + '</p>';
      }

      thirdColumn = '<a title="Brand Logo" class="hidden-xs"><img class="image_fade" src="../img/logos/' + fields[2] + '-logo.png" alt="Brand Logo"></a><div class="divider divider-center"><i class="icon-circle-blank"></i></div>';

      info =  '<tr><td>Description</td><td>' + fields[1] + '</td></tr>';
      info += '<tr><td>Dimensions</td><td>' + fields[6] + '</td></tr>';
      info += '<tr><td>Color</td><td>' + whatColor(color) + '</td></tr>';
      info += '<tr><td>Type</td><td>' + whatType(type) + '</td></tr>';
      info += '<tr><td>Look</td><td>' + whatLook(fields[2]) + '</td></tr>';
      info += '<tr><td>Metal Color</td><td>' + whatMetal(metal) + '</td></tr>';

      /* Fill in the pictures for the product */
      var pics = '<div class="fslider" data-pagi="false" data-arrows="false" data-thumbs="true"><div class="flexslider"><div class="slider-wrap" data-lightbox="gallery">';
      pics += '<div class="slide" data-thumb="https://www.laurajanelle.com/ljjpgimages/' + fields[0] + '-sm.jpg"><a href="https://www.laurajanelle.com/ljjpgimages/' + fields[0] + '-lg.jpg" title="' + fields[1] + '" data-lightbox="gallery-item"><span class="zoom ex1"><img src="https://www.laurajanelle.com/ljjpgimages/' + fields[0] + '-md.jpg" alt="' + fields[1] + '"></span></a></div>';
      pics += secondImage;
      pics += '</div></div></div>';
      if (fields[7]) {
        if (fields[7].trim().length === 3) {
          pics += '<div class="sale-flash">NEW!</div>';
        }
      }

      $("#images").html(pics);
      $("#secondColumn").html(secondColumn);
      $("#thirdColumn").prepend(thirdColumn);
      $("#addInfo").html(info);
    },
    complete: function () {
      $('.ex1 img').wrap('<span style="display:inline-block"></span>').css('display', 'block').parent().zoom();
      setTimeout(function () {
        SEMICOLON.widget.loadFlexSlider();

      }, 500);

      if (callback && typeof (callback) === "function") {
        callback(stock_no);
      }
      if (callback2 && typeof (callback2) === "function") {
        callback2(stock_no);
      }
    }
  });
}

function detailView(callback, callback2) {
  jQuery("#images, #secondColumn, #addInfo, #thirdColumn").empty();

  var dets;
  var secondColumn;
  var detailString;
  var color;
  var type;
  var metal;
  var secondImage;
  var hash = window.location.hash.split("+");
  var stock_no = hash[1];
  var productRating = [];

  if (hash[3] !== "" && hash.length === 5) {
    detailString = window.location.hash;
    color = hash[2];
    type = hash[3];
    metal = hash[4];
    localStorage.setItem(stock_no, detailString);
  } else if (localStorage.getItem(stock_no) !== null && localStorage.getItem(stock_no) != "undefined" && localStorage.getItem(stock_no).length >= 15) { //  add back if undefined ever comes up again
    dets = localStorage.getItem(stock_no).split("+");
    color = dets[2];
    type = dets[3];
    metal = dets[4];
  }

  url = "../ljjpgimages-2/" + stock_no + "-2-sm.jpg";
  $.get(url)
    .done(function () {
      secondImage = '<div class="slide" data-thumb="https://www.laurajanelle.com/ljjpgimages-2/' + stock_no + '-2-sm.jpg"><a href="https://www.laurajanelle.com/ljjpgimages-2/' + stock_no + '-2-lg.jpg" data-lightbox="gallery-item"><span class="zoom ex1"><img src="https://www.laurajanelle.com/ljjpgimages-2/' + stock_no + '-2-md.jpg"></span></a></div>';
      populateDetailView(secondImage, color, type, metal, callback, callback2, stock_no);
    }).fail(function () {
      // not exists code
      console.log("hey guys, there isn't a second image.");
      noSecondImage = '';
      populateDetailView(noSecondImage, color, type, metal, callback, callback2, stock_no);
    });
}