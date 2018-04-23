
function findnumber(string) 
{
  const rx = /([\w]+)\-(?:[\-|\w]+)\.jpg$/;
  const item = rx.exec( string );
  return item[1];
}

function woocommerce()
{
  netlinkcart = {};
  var table = jQuery("table.shop_table tbody");
  table.find('tr.cart_item').each(function () {
    partnumber = jQuery(this).find('td:nth-child(2) a img').attr('src');
    partnumber2 = findnumber(partnumber);
    qty = jQuery(this).find('td:nth-child(5) div input').val();
    netlinkcart[partnumber2] = qty;
  });
  localStorage.setItem('cart', JSON.stringify(netlinkcart));
}


jQuery("input[name='apply_coupon'], button[name='update_cart']").on("click", function () {
		
});


function wooCheckout() 
{
  jQuery.ajax({
    type: "GET",
    url: "https://netlink.laurajanelle.com:444/nlhtml/custom/netlink.php?",
    data: {
      request_id: "APICARTDEL",
      session_no: "O9UEZURDBGGDERDRTGEGZAG4O"
    },
    complete: function(response) {
			wooPutInCart();
    }
  });
}

function wooPutInCart()
{
  var newcart = localStorage.getItem('cart');
	newcart = JSON.parse(newcart);
	newcntr = 0;
  jQuery.each(newcart, function (key, value) { 
		jQuery.get("https://netlink.laurajanelle.com:444/nlhtml/custom/netlink.php?request_id=APICARTADD&session_no=O9UEZURDBGGDERDRTGEGZAG4O&stock_no=" + key + "&qty=" + value + "");
		cntr++;
	});
	
	if (newcart.length === newcntr) {
		wooCreditCard();
	}
	//if (callback && typeof(callback) === "function") {
	//	callback();
	//}
}

function wooCreditCard()
{
  //session_no = localStorage.getItem('session_no');
  jQuery('#payment').append("<iframe id='creditcard'width=99% height=365></iframe>");
  document.getElementById("creditcard").src="https://netlink.laurajanelle.com:444/nlhtml/custom/netlink.php?request_id=APICC&session_no=O9UEZURDBGGDERDRTGEGZAG4O";
}
	
var newNumberOfOrders;
var numberOfOrders;
function wooCreditCardCatcher (n)
{
  var neworder;
  jQuery.ajax({
    type: "GET",
    url: "https://netlink.laurajanelle.com:444/nlhtml/custom/netlink.php?",
    data: {
      request_id: "APIORDLST",
      session_no: "O9UEZURDBGGDERDRTGEGZAG4O"
    },
    success: function(response) {
      openlines = response.split("\n");
      if (n === 1 ) {
        numberOfOrders = openlines.length;
      }
      newNumberOfOrders = openlines.length;

      if (numberOfOrders != newNumberOfOrders) {
        /*
        windowHash("orders");
        $( "#success" ).click();
        $("#successMessage").empty();
        hideCC = true;
        orders = [];
        for (i=1; i< openlines.length - 1; i++) {
          fields = openlines[i].split("|");
          orders.push(fields);
        }
       
        orders = orders.sort(function(a, b) {
          return a[1] > b[1] ? -1 : 1;
        });
        newOrder = orders[0][0];
        */

        /*
       	var message =  '<h4 style="font-family: Lato;">The order # is: ' + newOrder + '</h4>';
            message += '<p>This is a confirmation that your order has been successfully received and is currently under process. You will receive an email soon with a copy of your invoice, which also includes the details of your order.</p>';
            message += '<p class="nobottommargin">Laura Janelle values your business and is continuously looking for ways to better satisfy their customers. Please do share with us if there is a way we can serve you better.</p>';

        document.getElementById("successMessage").innerHTML += message;

        return $.get("https://netlink.laurajanelle.com:444/mailer/order_confirmation.php?session_no=" + session_no + "&order_no="+ newOrder + "");
        */
        alert("Order is complete!");
      } else {
        return setTimeout(function(){ wooCreditCardCatcher(n+1); }, 3000);
      }
    }
  });
}
	
	setTimeout(wooCheckout, 3000);
	wooCreditCardCatcher(1);
