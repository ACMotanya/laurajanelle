<?php
//session_no - REQUIRED.

//order_no - OPTIONAL. If not given, will use the last order number entered

//ship_to - OPTIONAL. If customer is presented with a dropdown list of ship to addresses this is the index number of that address
//        example would be if they select first address then ?ship_to=1 or if they selected the third address then ?ship_to=3
//        If a ship to is not provided, it will use the last ship to address entered.


// ####################session_no####################
if(isset($_GET['session_no']))
    $sessionNumber = $_GET['session_no'];
else
    die ("session_no was not provided!");
// end session_no


// ####################order_no####################
/* Sets order_no to the order_no passed via URL. If non provided it will get the last order number entered.*/
if (isset($_GET['order_no'])) {
	$orderNumber = $_GET['order_no']; // order_no is passed via URL
}else {
    $orderList = file_get_contents("http://72.64.152.18:8081/nlhtml/custom/netlink.php?request_id=APIORDLST&session_no=" . $sessionNumber);
    $orderList = trim($orderList);
    $orderLines = explode("\r\n", $orderList);

	// array starts @ 0 which is header. In for loop I'm starting @1 to skip headers
	$currentOrderNumber = 0;
	for ($i=1; $i < count($orderLines); $i++) {
	    $orderLineCurrent = explode("|", $orderLines[$i]);
		if ($currentOrderNumber > trim($orderLineCurrent[0])) {
			continue;
		}
		// all of this is skipped if previous order number was larger
		$orderNumber = trim($orderLineCurrent[0]); // or order_no is last order entered
		$orderDate = trim($orderLineCurrent[1]);
		$orderShipDate = trim($orderLineCurrent[2]);
		$custNumber = trim($orderLineCurrent[3]);
		$orderPoNumber = trim($orderLineCurrent[4]);
		$orderTax = trim($orderLineCurrent[5]);
		$orderTotal = trim($orderLineCurrent[6]);
		$orderDiscount = trim($orderLineCurrent[7]);
		$orderBillTo = trim($orderLineCurrent[8]);
		$orderShipTo = trim($orderLineCurrent[9]);
	}
}
// End order_no


// ####################Order Header####################
$orderHeader = file_get_contents("http://72.64.152.18:8081/nlhtml/custom/netlink.php?request_id=APIORDH&order_no=" . $orderNumber . "&session_no=" . $sessionNumber);
$orderHeader = trim($orderHeader);
$orderHeaderLines = explode("\r\n", $orderHeader);

// skip the header row by starting @ index of 1
$orderHeaderLineCurrent = explode("|", $orderHeaderLines[1]);

// set header info
$headerOrderNumber = trim($orderHeaderLineCurrent[0];
$headerOrderDate = trim($orderHeaderLineCurrent[1];
$headerShippingDate = trim($orderHeaderLineCurrent[2];
$headerCustomerNumber = trim($orderHeaderLineCurrent[3];
$headerPoNumber = trim($orderHeaderLineCurrent[4];
$headerTermsCode = trim($orderHeaderLineCurrent[5];
$headerShipViaCode = trim($orderHeaderLineCurrent[6];
$headerTaxAmount = trim($orderHeaderLineCurrent[7];
$headerOrderTotal = trim($orderHeaderLineCurrent[8];
$headerDiscountAmt = trim($orderHeaderLineCurrent[9];
$headerBillToName = trim($orderHeaderLineCurrent[10];
$headerBillToAdd1 = trim($orderHeaderLineCurrent[11];
$headerBillToAdd2 = trim($orderHeaderLineCurrent[12];
$headerBillToAdd3 = trim($orderHeaderLineCurrent[13];
$headerBillToCity = trim($orderHeaderLineCurrent[14];
$headerBillToState = trim($orderHeaderLineCurrent[15];
$headerBillToZip = trim($orderHeaderLineCurrent[16];
$headerShipToName = trim($orderHeaderLineCurrent[17];
$headerShipToAdd1 = trim($orderHeaderLineCurrent[18];
$headerShipToAdd2 = trim($orderHeaderLineCurrent[19];
$headerShipToAdd3 = trim($orderHeaderLineCurrent[20];
$headerShipToCity = trim($orderHeaderLineCurrent[21];
$headerShipToState = trim($orderHeaderLineCurrent[22];
$headerShipToZip = trim($orderHeaderLineCurrent[23];
$headerText1 = trim($orderHeaderLineCurrent[24];
$headerText2 = trim($orderHeaderLineCurrent[25];
$headerText3 = trim($orderHeaderLineCurrent[26];
$headerText4 = trim($orderHeaderLineCurrent[27];
$headerText5 = trim($orderHeaderLineCurrent[28];
$headerEmailAddress = trim($orderHeaderLineCurrent[29];
$headerTotalPayments = trim($orderHeaderLineCurrent[30];
$headerNumberOfLines = trim($orderHeaderLineCurrent[31];
$headerTotalOrderQty = trim($orderHeaderLineCurrent[32]; // Qty combined all lines
$headerTotalWeight = trim($orderHeaderLineCurrent[33];
$headerShipViaDescription = trim($orderHeaderLineCurrent[34];
$headerTotalOtherCharges = trim($orderHeaderLineCurrent[35]; // non-freight non-tax charges
$headerTotalFreight = trim($orderHeaderLineCurrent[36];
$headerShipToCountry = trim($orderHeaderLineCurrent[37];
$headerBillToCountry = trim($orderHeaderLineCurrent[38];
// End Order Header


// ####################Order Details####################
$orderDetails = file_get_contents("http://72.64.152.18:8081/nlhtml/custom/netlink.php?request_id=APIORDL&order_no=" . $orderNumber . "&session_no=" . $sessionNumber);
$orderDetails = trim($orderDetails);
$orderDetailsLines = explode("\r\n", $orderDetails);

$orderDetailsHTML = "";
$oderDetailsText = "";

$orderDetailsLinesCount = count($orderDetailsLines);
// skip the header by starting @ index of 1
for ($i=1; $i < $orderDetailsLinesCount; $i++) {
    $orderDetailsLineCurrent = explode("|", $orderDetailsLines[$i]);

    $orderDetailLine[$i]["line_num"] = trim($orderDetailsLineCurrent[1]);
    $orderDetailLine[$i]["stock_num"] = trim($orderDetailsLineCurrent[2]);
    $orderDetailLine[$i]["desc_1"] = trim($orderDetailsLineCurrent[3]);
    $orderDetailLine[$i]["desc_2"] = trim($orderDetailsLineCurrent[4]);
    $orderDetailLine[$i]["desc_3"] = trim($orderDetailsLineCurrent[5]);
    $orderDetailLine[$i]["qty_ordered"] = trim($orderDetailsLineCurrent[6]);
    $orderDetailLine[$i]["price_each"] = trim($orderDetailsLineCurrent[7]);
    $orderDetailLine[$i]["price_qty"] = trim($orderDetailsLineCurrent[8]);
    $orderDetailLine[$i]["discount_amount"] = trim($orderDetailsLineCurrent[9]);

    //create the HTML lines
    $orderDetailsHTML .= "<tr>\n";
    $orderDetailsHTML .= "<td>" . $orderDetailLine[$i]["stock_num"] . "</td>\n";
    $orderDetailsHTML .= "<td>" . $orderDetailLine[$i]["desc_1"] . "</td>\n";
    $orderDetailsHTML .= "<td>" . $orderDetailLine[$i]["qty_ordered"] . "</td>\n";
    $orderDetailsHTML .= "<td>" . $orderDetailLine[$i]["price_qty"] . "</td>\n";
    $orderDetailsHTML .= "</tr>\n";

    //create the TEXT lines
    $orderDetailsText .= str_pad($orderDetailLine[$i]["stock_num"], 15, " ");
    $orderDetailsText .= str_pad($orderDetailLine[$i]["desc_1"], 30, " ");
    $orderDetailsText .= str_pad($orderDetailLine[$i]["qty_ordered"], 10, " ");
    $orderDetailsText .= str_pad("$" . $orderDetailLine[$i]["price_qty"], 10, " ");
    $orderDetailsText .= "\n\r";

}
// End Order Details


// Creates variable $htmlEmail and places the HTML email template in it
require_once('order_confirmation_template_html.php');

$htmlEmail = str_ireplace("{name}", $headerShipToName ,$htmlEmail);
$htmlEmail = str_ireplace("{customer_id}", $headerCustomerNumber ,$htmlEmail);
$htmlEmail = str_ireplace("{email}", $headerEmailAddress ,$htmlEmail);
$htmlEmail = str_ireplace("{order_number}", $headerOrderNumber ,$htmlEmail);
$htmlEmail = str_ireplace("{ordered_on}", $headerOrderDate ,$htmlEmail);
$htmlEmail = str_ireplace("{ordered_by}", $headerShipToName ,$htmlEmail);
$htmlEmail = str_ireplace("{order_status}", "Pending" ,$htmlEmail); // Hard coded to "pending"

//Payment method is not in API
//$htmlEmail = str_ireplace("{payment_method}", "Payment Method TBD" ,$htmlEmail); // How to determine Payment info?

$htmlEmail = str_ireplace("{bill_add_1}", $headerBillToAdd1 ,$htmlEmail);
$htmlEmail = str_ireplace("{bill_add_2}", $headerBillToAdd2 ,$htmlEmail);
$htmlEmail = str_ireplace("{bill_add_3}", $headerBillToAdd3 ,$htmlEmail);
$htmlEmail = str_ireplace("{bill_city}", $headerBillToCity ,$htmlEmail);
$htmlEmail = str_ireplace("{bill_state}", $headerBillToState ,$htmlEmail);
$htmlEmail = str_ireplace("{bill_zip}", $headerBillToZip ,$htmlEmail);
$htmlEmail = str_ireplace("{bill_country}", $headerBillToCountry ,$htmlEmail);
$htmlEmail = str_ireplace("{ship_add_1}", $headerShipToAdd1 ,$htmlEmail);
$htmlEmail = str_ireplace("{ship_add_2}", $headerShipToAdd2 ,$htmlEmail);
$htmlEmail = str_ireplace("{ship_add_3}", $headerShipToAdd3 ,$htmlEmail);
$htmlEmail = str_ireplace("{ship_city}", $headerShipToCity ,$htmlEmail);
$htmlEmail = str_ireplace("{ship_state}", $headerShipToState ,$htmlEmail);
$htmlEmail = str_ireplace("{ship_zip}", $headerShipToZip ,$htmlEmail);
$htmlEmail = str_ireplace("{ship_country}", $headerShipToCountry ,$htmlEmail);

$htmlEmail = str_ireplace("{lines_html}", $orderDetailsHTML ,$htmlEmail); // table rows with items ordered

$htmlEmail = str_ireplace("{subtotal}", ($headerOrderTotal - $headerTaxAmount - $headerTotalFreight - $headerDiscountAmt) ,$htmlEmail);
$htmlEmail = str_ireplace("{tax}", $headerTaxAmount ,$htmlEmail);
$htmlEmail = str_ireplace("{shipping}", $headerTotalFreight ,$htmlEmail);
$htmlEmail = str_ireplace("{discounts}", $headerDiscountAmt ,$htmlEmail);
$htmlEmail = str_ireplace("{total}", $headerOrderTotal ,$htmlEmail);


// Creates variable $textEmail and places the HTML email template in it
require_once('order_confirmation_template_text.php');

$textEmail = str_ireplace("{name}", $headerShipToName ,$textEmail);
$textEmail = str_ireplace("{customer_id}", $headerCustomerNumber ,$textEmail);
$textEmail = str_ireplace("{email}", $headerEmailAddress ,$textEmail);
$textEmail = str_ireplace("{order_number}", $headerOrderNumber ,$textEmail);
$textEmail = str_ireplace("{ordered_on}", $headerOrderDate ,$textEmail);
$textEmail = str_ireplace("{ordered_by}", $headerShipToName ,$textEmail);
$textEmail = str_ireplace("{order_status}", "Pending" ,$textEmail); // Hard coded to "pending"
$textEmail = str_ireplace("{payment_method}", "Payment Method TBD" ,$textEmail); // How to determine Payment info?
$textEmail = str_ireplace("{bill_add_1}", $headerBillToAdd1 ,$textEmail);
$textEmail = str_ireplace("{bill_add_2}", $headerBillToAdd2 ,$textEmail);
$textEmail = str_ireplace("{bill_add_3}", $headerBillToAdd3 ,$textEmail);
$textEmail = str_ireplace("{bill_city}", $headerBillToCity ,$textEmail);
$textEmail = str_ireplace("{bill_state}", $headerBillToState ,$textEmail);
$textEmail = str_ireplace("{bill_zip}", $headerBillToZip ,$textEmail);
$textEmail = str_ireplace("{bill_country}", $headerBillToCountry ,$textEmail);
$textEmail = str_ireplace("{ship_add_1}", $headerShipToAdd1 ,$textEmail);
$textEmail = str_ireplace("{ship_add_2}", $headerShipToAdd2 ,$textEmail);
$textEmail = str_ireplace("{ship_add_3}", $headerShipToAdd3 ,$textEmail);
$textEmail = str_ireplace("{ship_city}", $headerShipToCity ,$textEmail);
$textEmail = str_ireplace("{ship_state}", $headerShipToState ,$textEmail);
$textEmail = str_ireplace("{ship_zip}", $headerShipToZip ,$textEmail);
$textEmail = str_ireplace("{ship_country}", $headerShipToCountry ,$textEmail);

$textEmail = str_ireplace("{lines_text}", $orderDetailsText ,$textEmail); // table rows with items ordered

$textEmail = str_ireplace("{subtotal}", ($headerOrderTotal - $headerTaxAmount - $headerTotalFreight - $headerDiscountAmt) ,$textEmail);
$textEmail = str_ireplace("{tax}", $headerTaxAmount ,$textEmail);
$textEmail = str_ireplace("{shipping}", $headerTotalFreight ,$textEmail);
$textEmail = str_ireplace("{discounts}", $headerDiscountAmt ,$textEmail);
$textEmail = str_ireplace("{total}", $headerOrderTotal ,$textEmail);




require('PHPMailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->isSMTP();
$mail->Host = 'smtp.office365.com';
$mail->SMTPAuth = true;
$mail->Username = 'info@laurajanelle.com';
$mail->Password = 'b0wnDrnw';
$mail->SMTPSecure = 'tls';
$mail->Port = 587;

$mail->setFrom('info@laurajanelle.com', 'LauraJanelle.com');
$mail->addAddress($headerEmailAddress, $headerShipToName);
$mail->addReplyTo('', '');
$mail->addBCC('');
$mail->isHTML(true);

$mail->Subject = "Thank you for your order with LauraJanelle.com";
$mail->Body = $htmlEmail;
$mail->AltBody = $textEmail;


if (!$mail->send()) {
    echo $mail->ErrorInfo;
}
?>
