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


var sortItems2 = [
  "18005BA",
  "18005LBLK",
  "18005LBLU",
  "18005LBRN",
  "18005LCRL",
  "18005LGRN",
  "18005LIVY",
  "18005LLGR",
  "18005LMRN",
  "18005LPNK",
  "18005LSNK",
  "18005LSVR",
  "18005LTEL",
  "18053RA",
  "18053LGBK",
  "18053LGMR",
  "18053LGPBR",
  "18053LGPK",
  "18053LGRD",
  "18053LGTE",
  "18053LSBF",
  "18053LSBK",
  "18053LSBL",
  "18053LSGR",
  "18053LSIV",
  "18053LSTL",
  "18001BA",
  "18001LBLK",
  "18001LCHR",
  "18001LGLD",
  "18001LGRN",
  "18001LGRY",
  "18001LLTB",
  "18001LNVY",
  "18001LPNK",
  "18001LRED",
  "18002LBLK",
  "18002LBLU",
  "18002LGLD",
  "18002LGRN",
  "18002LGRY",
  "18002LMDN",
  "18002LPRP",
  "18002LSLV",
  "18002LWHT",
  "18056NA",
  "18056LBLK",
  "18056LBLU",
  "18056LBRN",
  "18056LDKO",
  "18056LGLD",
  "18056LGRN",
  "18056LGRY",
  "18056LPNK",
  "18057EA",
  "18057LBLK",
  "18057LBLU",
  "18057LGLD",
  "18057LGRN",
  "18057LPNK",
  "180587LWHT",
  "18058LBLK",
  "18058LBLU",
  "18058LGLD",
  "18058LGRN",
  "18058LPNK",
  "18058LWHT",
  "18059LBLK",
  "18059LBLU",
  "18059LGLD",
  "18059LGRN",
  "18059LPNK",
  "18059LWHT",
  "18098LBLK",
  "18098LBLU",
  "18098LBRN",
  "18098LGRN",
  "18098LGRY",
  "18098LPCH",
  "18098LRED",
  "18098LTRQ",
  "18098NA",
  "18054LGBK",
  "18054LGGD",
  "18054LGGN",
  "18054LGGY",
  "18054LGMN",
  "18054LGNY",
  "18054LSBK",
  "18054LSGD",
  "18054LSGN",
  "18054LSGY",
  "18054LSMN",
  "18054LSNY",
  "18054NA",
  "18031BA",
  "18031LBLK",
  "18031LBRY",
  "18031LDKB",
  "18031LDKG",
  "18031LDRD",
  "18031LGLD",
  "18031LGRY",
  "18031LGYL",
  "18031LLTO",
  "18031LMGR",
  "18031LPRP",
  "18031LRED",
  "18031LRYB",
  "18031LSKB",
  "18031LSLV",
  "18031LWHT",
  "18048BA",
  "18048LGBG",
  "18048LGBK",
  "18048LGBP",
  "18048LGCP",
  "18048LGFU",
  "18048LGIV",
  "18048LSBG",
  "18048LSBK",
  "18048LSBP",
  "18048LSCP",
  "18048LSFU",
  "18048LSIV",
  "18030BA",
  "18030LBLK",
  "18030LCPR",
  "18030LGLD",
  "18030LGRY",
  "18030LLBL",
  "18030LSLV",
  "18030LTAN",
  "18030LTRQ",
  "18028BA",
  "18028LBLK",
  "18028LBRN",
  "18028LGRN",
  "18028LPRP",
  "18068BA",
  "18068LGBK",
  "18068LGBL",
  "18068LGGD",
  "18068LGGR",
  "18068LGPK",
  "18068LGTL",
  "18068LGWH",
  "18068LSBK",
  "18068LSBL",
  "18068LSGD",
  "18068LSGR",
  "18068LSPK",
  "18068LSTL",
  "18068LSWH",
  "108BA",
  "11313",
  "11314",
  "11315",
  "11316",
  "11317",
  "11318",
  "11319",
  "11320",
  "11321",
  "11322",
  "11323",
  "11324",
  "11325",
  "11326",
  "11327",
  "11328",
  "11329",
  "11330",
  "11331",
  "11332",
  "11333",
  "11334",
  "11335",
  "11336",
  "107BA",
  "10749",
  "10750",
  "10751",
  "10752",
  "10753",
  "10754",
  "10755",
  "10756",
  "10757",
  "10758",
  "10759",
  "10760",
  "10761",
  "10762",
  "10763",
  "10764",
  "10765",
  "10766",
  "10767",
  "10768",
  "10769",
  "10770",
  "10771",
  "10772",
  "11385",
  "11386",
  "11387",
  "11388",
  "11389",
  "11390",
  "11391",
  "11392",
  "11393",
  "11394",
  "11395",
  "11396",
  "11397",
  "11398",
  "11399",
  "11400",
  "11401",
  "11402",
  "11403",
  "11404",
  "11405",
  "11406",
  "11407",
  "11408",
  "11409",
  "11410",
  "11411",
  "11412",
  "11413",
  "11414",
  "11415",
  "11416",
  "11417",
  "11418",
  "11419",
  "11420",
  "1133BA",
  "11421",
  "11422",
  "11423",
  "11424",
  "11425",
  "11426",
  "11427",
  "11428",
  "11429",
  "11430",
  "11431",
  "11432",
  "11433",
  "11434",
  "11435",
  "11436",
  "11437",
  "11438",
  "11439",
  "11440",
  "11441",
  "11442",
  "11443",
  "11444",
  "11445",
  "11446",
  "11447",
  "11448",
  "11449",
  "11450",
  "11451",
  "11452",
  "11453",
  "11454",
  "11455",
  "11456",
  "10700B",
  "10713",
  "10714",
  "10715",
  "10716",
  "10717",
  "10718",
  "10719",
  "10720",
  "10721",
  "10722",
  "10723",
  "10724",
  "10725",
  "10726",
  "10727",
  "10728",
  "10729",
  "10730",
  "10731",
  "10732",
  "10733",
  "10734",
  "10735",
  "10736",
  "10737",
  "10738",
  "10739",
  "10740",
  "10741",
  "10742",
  "10743",
  "10744",
  "10745",
  "10746",
  "10747",
  "10748",
  "123BA",
  "12340",
  "12341",
  "12342",
  "12343",
  "12344",
  "12345",
  "12346",
  "12347",
  "12348",
  "12349",
  "12350",
  "12351",
  "123NA",
  "12310",
  "12311",
  "12312",
  "12313",
  "12314",
  "12337",
  "12338",
  "12339",
  "12354",
  "12355",
  "10408",
  "10375",
  "10376",
  "10377",
  "10378",
  "10379",
  "10380",
  "10381",
  "10382",
  "10401",
  "10405",
  "10407",
  "10409",
  "10410",
  "10412",
  "10413",
  "10414",
  "12330",
  "1300A",
  "12908",
  "12909",
  "12910",
  "12911",
  "12912",
  "12913",
  "12914",
  "12915",
  "12900A",
  "12900",
  "12901",
  "12902",
  "12903",
  "12904",
  "12905",
  "12906",
  "12907",
  "118BA",
  "11774",
  "11775",
  "11776",
  "11777",
  "11778",
  "11779",
  "11780",
  "11781",
  "11782",
  "11783",
  "117BA",
  "10072",
  "10073",
  "10074",
  "10075",
  "10028",
  "10030",
  "10040",
  "10042",
  "10016",
  "10018",
  "10004",
  "10006",
  "117EA",
  "10007",
  "10008",
  "10010",
  "10011",
  "10012",
  "10019",
  "10020",
  "10022",
  "10023",
  "10024",
  "10031",
  "10032",
  "10034",
  "10035",
  "10036",
  "10043",
  "10044",
  "10046",
  "10047",
  "10048",
  "118V2A",
  "11740",
  "11741",
  "10050",
  "10052",
  "11732",
  "11733",
  "10058",
  "10059",
  "10060",
  "10061",
  "10057",
  "10076",
  "18060NA",
  "18060LGLD",
  "18061LSLV",
  "18062LGLD",
  "18063LSLV",
  "18064LGLD",
  "18065LSLV",
  "18066LGLD",
  "18067LSLV",
  "18047A",
  "18047LGBK",
  "18047LGFU",
  "18047LGGD",
  "18047LGWH",
  "18047LSBK",
  "18047LSGR",
  "18047LSLB",
  "18047LSWH",
  "128V2A",
  "11742",
  "11743",
  "11744",
  "11745",
  "11754",
  "11755",
  "11756",
  "11757",
  "11762",
  "11763",
  "11764",
  "11765",
  "11766",
  "11767",
  "11768",
  "11769",
  "12700AG",
  "12712",
  "12713",
  "12714",
  "12715",
  "12716",
  "12717",
  "12718",
  "12719",
  "12720",
  "12721",
  "12722",
  "12723",
  "12732",
  "12733",
  "12734",
  "12735",
  "12700AS",
  "12704",
  "12705",
  "12706",
  "12707",
  "12708",
  "12709",
  "12710",
  "12711",
  "12724",
  "12725",
  "12726",
  "12727",
  "12728",
  "12729",
  "12730",
  "12731",
  "18046NA",
  "18046LAPR",
  "18046LAUG",
  "18046LDEC",
  "18046LFEB",
  "18046LJAN",
  "18046LJUL",
  "18046LJUN",
  "18046LMAR",
  "18046LMAY",
  "18046LNOV",
  "18046LOCT",
  "18046LSEP",
  "109BA",
  "10930",
  "10939",
  "10947",
  "10948",
  "10949",
  "10950",
  "10951",
  "10952",
  "10965",
  "10966",
  "109EA",
  "10917",
  "10941",
  "10942",
  "10943",
  "10944",
  "10945",
  "10946",
  "10954",
  "10955",
  "10957",
  "10959",
  "10970",
  "10971",
  "10974",
  "10975",
  "10976",
  "119BA",
  "18003LBLK",
  "18003LBNZ",
  "18003LCPR",
  "18003LDPR",
  "18003LDTL",
  "18003LGRN",
  "18003LGRY",
  "18003LIVR",
  "18003LLGD",
  "18003LNVY",
  "18003LPRP",
  "18003LTAN",
  "135BA",
  "13400",
  "13401",
  "13402",
  "13404",
  "13405",
  "13407",
  "13408",
  "13409",
  "13410",
  "13412",
  "13413",
  "13415",
  "119002NA",
  "11996",
  "11997",
  "11998",
  "11999",
  "12000",
  "12001",
  "12002",
  "12003",
  "12004",
  "12005",
  "119002BA",
  "12006",
  "12007",
  "12008",
  "12009",
  "12010",
  "12011",
  "12012",
  "12013",
  "12014",
  "12015",
  "12016",
  "12017",
  "12018",
  "12019",
  "11141",
  "11142",
  "11143",
  "11144",
  "11145",
  "11146",
  "11900BA",
  "11929",
  "11930",
  "11932",
  "11934",
  "11935",
  "11936",
  "11937",
  "11939",
  "11940",
  "11941",
  "11945",
  "11946",
  "11947",
  "11948",
  "11949",
  "11950",
  "11951",
  "11952",
  "11953",
  "11991",
  "11992",
  "11993",
  "11994",
  "11995",
  "11900ENA",
  "11942",
  "11943",
  "11944",
  "11954",
  "11955",
  "11956",
  "11958",
  "11963",
  "11967",
  "11969",
  "11972",
  "11978",
  "11981",
  "11983",
  "11984",
  "11985",
  "11986",
  "11987",
  "11988",
  "11989",
  "11990",
  "103HA",
  "10419",
  "10420",
  "10421",
  "10422",
  "10423",
  "10424",
  "10425",
  "10426",
  "10427",
  "10428",
  "10429",
  "10430",
  "103EA",
  "10431",
  "10432",
  "10433",
  "10434",
  "10435",
  "10436",
  "10437",
  "10438",
  "10439",
  "10440",
  "10441",
  "10442",
  "1044A",
  "10399",
  "10456",
  "10458",
  "10460",
  "10475",
  "10476",
  "10477",
  "10478",
  "1043A",
  "10389",
  "10461",
  "10466",
  "10479",
  "10480",
  "10481",
  "10482",
  "10415",
  "103EVA",
  "10333",
  "10334",
  "10336",
  "10337",
  "10338",
  "10339",
  "10340",
  "10343",
  "10345",
  "10346",
  "10348",
  "10349",
  "181200A",
  "18120LBLK",
  "18120LBLS",
  "18120LBLU",
  "18120LGRY",
  "18120LIVY",
  "18120LPNK",
  "18120LTAN",
  "12125",
  "12127",
  "12128",
  "12129",
  "12132",
  "12133",
  "12134",
  "12135",
  "12137",
  "12138",
  "12139",
  "12141",
  "12145",
  "12146",
  "12147",
  "12148",
  "1051A",
  "10614",
  "10615",
  "10616",
  "10617",
  "10619",
  "10620",
  "10621",
  "10622",
  "10624",
  "10625",
  "10627",
  "10628",
  "10629",
  "10630",
  "10633",
  "10636",
  "10639",
  "10642",
  "10643",
  "10644",
  "18032LBLK",
  "18032LGRY",
  "18033LBLK",
  "18033LGRY",
  "18034LBLK",
  "18034LGRY",
  "18036LBLK",
  "18036LGRY",
  "18038LBLK",
  "18038LGRY",
  "18041LBKL",
  "18041LBKS",
  "18041LBSL",
  "18041LBSS",
  "18041LGHL",
  "18041LGHS",
  "18041LTPL",
  "18041LTPS",
  "18043LBLK",
  "18043LBLP",
  "18043LGRY",
  "18043LIVY",
  "18043LTRQ",
  "18044LBLK",
  "18044LBLU",
  "18044LPNK", 
  "119002NA", "119002BA", "12002", "12012", "12016", "12009", 
  "11999", "12017", "12011", "12019", "12014", "12003", "12007", 
  "12006", "12008", "12001", "11996", "11998", "12005", "12010", 
  "12013", "11997", "12018", "12015", "12000", "12004", "1010A", 
  "10101", "10100", "10102", "10103", "10104", "11954", "11955", 
  "11956", "11958", "11942", "11943", "11944", "11963", "11967", 
  "11969", "11972", "11985", "11986", "11987", "11978", "11981", 
  "11983", "11984", "11988", "11989", "11990", "11945", "11946", 
  "11947", "11948", "11949", "11950", "11951", "11952", "11991", 
  "11992", "11993", "11994", "11995", "11953", "11929", "11930", 
  "11932", "11934", "11935", "11936", "11937", "11939", "11940", 
  "11941", "10105", "10106", "10107", "10108", "10109", "10110",
  "10111", "10112", "10113", "10114", "1041A", "1042A", "10388", 
  "10389", "10390", "10391", "10392", "10393", "10394", "10395", 
  "10396", "10397", "10398", "10399", "10400", "10416", "10415", 
  "10417", "1051A", "10614", "10615", "10616", "10617", "10619", 
  "10620", "10627", "10628", "10629", "10630", "10633", "10636", 
  "10621", "10622", "10624", "10625", "10639", "10642", "10643", 
  "10644", "10599A", "10584", "10585", "10586", 
  "10587", "10588", "10589", "10590", "10591", "10592", "10593", 
  "10594", "10595", "CD051", "11421", "11422", "11423", "11424", 
  "11425", "11426", "11433", "11434", "11435", "11445", "11446", 
  "11447", "11427", "11428", "11429", "11430", "11431", "11432", 
  "11436", "11438", "11437", "11439", "11440", "11441", "11442", 
  "11443", "11444", "11448", "11449", "11450", "11451", "11452", 
  "11453", "11454", "11455", "11456", "11386", "11389", "11392",
  "11395", "11398", "11401", "11404", "11407", "11410", "11413",
  "11416", "11419", "11385", "11387", "11388", "11390", "11391", 
  "11393", "11394", "11396", "11397", "11399", "11400", "11402",
  "11403", "11405", "11406", "11408", "11409", "11411", "11412", 
  "11414", "11415", "11417", "11418", "11420", "1311A", "13100", 
  "13101", "13102", "13103", "13104", "13107", "13108", "13126", 
  "13129", "13136", "13137", "13139", "11300B", "11349", "11350", 
  "11351", "11352", "11353", "11354", "11355", "11356", "11357", 
  "11358", "11359", "11360", "11361", "11362", "11363", "11364", 
  "11365", "11366", "11367", "11368", "11369", "11370", "11371", 
  "11372", "11373", "11374", "11375", "11376", "11377", "11378",
  "11379", "11380", "11381", "11382", "11383", "11384", "10700B",
  "10713", "10714", "10721", "10715", "10716", "10723", "10717", 
  "10718", "10725", "10719", "10720", "10727", "10722", "10729",
  "10730", "10724", "10731", "10732", "10726", "10733", "10734", 
  "10728", "10735", "10736", "10743", "10744", "10745", "10746", 
  "10747", "10748", "10737", "10738", "10739", "10740", "10741", 
  "10742", "11300C", "11313", "11314", "11315", "11316", "11317",
  "11318", "11319", "11320", "11321", "11322", "11323", "11324",
  "11325", "11326", "11327", "11328", "11329", "11330", "11331",
  "11332", "11333", "11334", "11335", "11336", "11301", "11302", 
  "11303", "11304", "11305", "11306", "11307", "11308", "11309", 
  "11310", "11311", "11312", "10700D", "10700C", "10749", "10750", 
  "10751", "10752", "10753", "10754", "10755", "10756", "10757",
  "10758", "10759", "10760", "10767", "10768", "10767", "10768",
  "10769", "10770", "10771", "10772", "10761", "10762", "10763",
  "10764", "10765", "10766", "10773", "10774", "10775", "10776",
  "10777", "10778", "10779", "10780", "10781", "10782", "10783", 
  "10784", "11300A", "11337", "11338", "11339", "11340", "11341", 
  "11342", "11343", "11344", "11345", "11346", "11347", "11348", 
  "10700A", "10707", "10712", "10710", "10703", "10704", "10711", 
  "10701", "10705", "10702", "10706", "10708", "10709", "12100A", 
  "CD121", "12101", "12102", "12103", "12104", "12105", "12106", 
  "12107", "12108", "12109", "12110", "12111", "12112", "12113", 
  "12114", "12115", "12116", "12117", "12118", "12119", "12120", 
  "12121", "12122", "12123", "12124", "12100B", "CD121A","PIL107",
  "CD107", "34737029", "EXT107G", "EXT107S", "12714", "12715", 
  "12713", "12712", "12718", "12719", "12717", "12716", "12722", 
  "12723", "12721", "12720", "12734", "12735", "12733", "12732",
  "12706", "12707", "12705", "12704", "12710", "12711", "12709", "12708",
  "12726", "12727", "12725", "12724", "12730", "12731", "12729", "12728",
  "11740", "11741", "10050", "10052", "11732", "11733", "10074", "10075",
  "10058", "10059", "10060", "10061", "10057", "10076", "10072", "10073", 
  "10001A", "10092", "10093", "10094", "10095", "10096", "10097", "10000A",
  "CD100", "10025", "10026", "10027", "10029", "10031", "10032",
  "10033", "10034", "10036", "10035", "10028", "10030", "10037",
  "10038", "10039", "10041", "10043", "10044", "10045", "10046",
  "10048", "10047", "10040", "10042", "10013", "10014", "10015",
  "10017", "10019", "10020", "10021", "10022", "10024", "10023",
  "10016", "10018", "10001", "10002", "10003", "10005", "10007",
  "10008", "10009", "10010", "10012", "10011", "10004", "10006",
  "10900A", "CD109", "10900B", "CD109A", "10929", "10969", "10978",
  "10917", "10941", "10942", "10943", "10930", "10939", "10947",
  "10944", "10945", "10946", "10954", "10932", "10934", "10935",
  "10936", "10948", "10951", "10952", "10954","10955", "10957", 
  "10959", "10970", "10937", "10938", "10940", "10960", "10965", 
  "10966", "10971", "10974", "10975", "10976", "10972", "10973",
  "10977", "10979", "10949", "10950", "12900A","CD104W","10300V2A", 
  "10401", "10405", "10407", "10409", "10410", "10412", "10413",
  "10414", "12900", "12901", "12902", "12903", "12904", "12905",
  "12906", "12907", "10301A", "10375", "10376", "10377", "10378",
  "10379", "10380", "10381", "10382", "12125", "12127", "12128",
  "12129", "12132", "12133", "12134", "12135", "12137", "12138",
  "12139", "12141", "12148", "12145", "12146", "12147", "10300A",
  "CD103", "10336",
  "10335", "10337", "10334", "10338", "10340", "10339", "10350",
  "10345", "10346", "10347", "10333", "10341", "10342", "10348",
  "10343", "10349", "10344", "10301", "10302", "10303", "10304",
  "10305", "10306", "10307", "10308", "10309", "10310", "10311",
  "10314", "10315", "10312", "10313", "10316", "10317", "10318",
  "10319", "10320", "10322", "10323", "10321", "10324", "10325",
  "10326", "10327", "10328", "10329", "10330", "10331", "10332",
  "11100A", "CD111", "11105", "11126", "11106", "11107", "11108",
  "11135", "11136", "11125", "11127", "11137", "11130", "11109",
  "11110", "11138", "11129", "11140", "11139", "11128", "11131",
  "11122", "11102", "11134", "11124", "11104", "11103", "11123",
  "11133", "11101", "11121", "11132", "11141", "11142", "11143",
  "11144", "11145", "11146", "10500A", "CD105", "10501", "10502",
  "10503", "10504", "10517", "10518", "10519", "10520", "10505",
  "10506", "10507", "10508", "10523", "10524", "10525", "10522",
  "10509", "10510", "10511", "10512", "10526", "10527", "10528",
  "10521", "10533", "10534", "10535", "10536", "10513", "10514",
  "10515", "10516", "10529", "10530", "10531", "10532", "10537",
  "10538", "10539", "10540", "10544", "10542", "10541", "10543"
];