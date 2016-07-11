<?php
$htmlEmail = "
<!DOCTYPE html>
<html>
  <head>
    <meta charset=\"utf-8\">
    <title>Order Confirmation</title>

  </head>
  <body style=\"font-style:Arial;font-size:14px\">
    <table border=\"0px\" cellspacing=\"0px\" cellpadding=\"0px\" width=\"700px\" style=\"margin-bottom:15px;margin-left: auto;margin-right: auto\">
      <tr>
        <td colspan=\"2\">
          <img alt=\"Laura Janelle by Cousin\" src=\"http://www.laurajanelle.com/one-page/images/LJ_grey.jpg\" width=\"450px\" style=\"margin-left: 25px;margin-top: 15px\">
        </td>
      </tr>
      <tr>
        <td>
          <p><strong>Hello {name}!</strong></p>
        </td>
      </tr>
      <tr>
        <td>
          <p>We have received your order and will begin processing it shortly. At any time you may check the status of your order by visiting <a href=\"http://www.laurajanelle.com/\" style=\"color: #666666\">laurajanelle.com</a> to view your account.</p>
          <p>
            Thank you for shopping with us,<br>
            Laura Janelle
                </p>
        </td>
      </tr>
      <tr>
        <td style=\"background-color: #205099;color: white\">
          <h3 style=\"text-align: center\">
            Order Summary
                </h3>
        </td>
      </tr>
      <tr>
        <td>
          <table border=\"0px\" cellspacing=\"0px\" cellpadding=\"5px\" width=\"85%\" style=\"margin-bottom:15px;margin-left: auto;margin-right: auto\">
            <tr>
              <td valign=\"top\" width=\"55%\">
                <p>&nbsp;</p>
                <table border=\"0px\" cellspacing=\"0px\" cellpadding=\"0px\" width=\"100%\" style=\"margin-bottom:15px\">
                  <tr>
                    <td style=\"text-align: right\" width=\"45%\"><strong>Customer ID:</strong></td>
                    <td>{customer_id}</td>
                  </tr>
                  <tr>
                    <td style=\"text-align: right\"><strong>Email:</strong></td>
                    <td>{email}</td>
                  </tr>
                  <tr>
                    <td style=\"text-align: right\"><strong>Order Number:</strong></td>
                    <td>{order_number}</td>
                  </tr>
                  <tr>
                    <td style=\"text-align: right\"><strong>Ordered On:</strong></td>
                    <td>{ordered_on}</td>
                  </tr>
                  <tr>
                    <td style=\"text-align: right\"><strong>Ordered By:</strong></td>
                    <td>{ordered_by}</td>
                  </tr>
                  <tr>
                    <td style=\"text-align: right\"><strong>Order Status:</strong></td>
                    <td>{order_status}</td>
                  </tr>
                </table>
              </td>
              <td valign=\"top\">
                <p>&nbsp;</p>
                <strong>Billing Address</strong><br>
                {bill_add_1}<br>
                {bill_add_2}<br>
                {bill_add_3}<br>
                {bill_city}, {bill_state} {bill_zip}<br>
                {bill_country}
                        </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style=\"background-color: #205099;color: white\">
          <h3 style=\"text-align: center\">
            Shipment Information
                </h3>
        </td>
      </tr>
      <tr>
        <td>
          <table border=\"0px\" cellspacing=\"0px\" cellpadding=\"5px\" width=\"85%\" style=\"margin-bottom:15px;margin-left: auto;margin-right: auto\">
            <tr>
              <td valign=\"top\" width=\"50%\">
                <p>
                  <strong>Ship From:</strong><br>
                  LauraJanelle.com<br>
                  12333 Enterprise Blvd.<br>
                  Largo, FL 33773<br>
                  United States
                            </p>
              </td>
              <td valign=\"top\" width=\"50%\">
                <p>
                  <strong>Shipping To:</strong><br>
                  {ship_add_1}<br>
                  {ship_add_2}<br>
                  {ship_add_3}<br>
                  {ship_city}, {ship_state} {ship_zip}<br>
                  {ship_country}
                            </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table border=\"0px\" cellspacing=\"1px\" cellpadding=\"4px\" width=\"100%\" style=\"margin-bottom:15px;margin-left: auto;margin-right: auto\">
            <tr>
              <td style=\"background-color: #F0F0F0\">SKU</td>
              <td style=\"background-color: #F0F0F0\">Description</td>
              <td style=\"background-color: #F0F0F0\">Quantity</td>
              <td style=\"background-color: #F0F0F0\">Price</td>
            </tr>
            <!-- Start item line loop -->
                {lines_html}
            <!-- End item line loop -->
          </table>
        </td>
      </tr>
      <tr>
        <td style=\"background-color: #205099;color: white\">
          <h3 style=\"text-align: center\">
            Order Totals
                </h3>
        </td>
      </tr>
      <tr>
        <td>
          <table border=\"0px\" cellspacing=\"0px\" cellpadding=\"5px\" width=\"100%\" style=\"margin-bottom:15px;margin-left: auto;margin-right: auto\">
            <tr>
              <td valign=\"top\" width=\"50%\">
                <table border=\"0px\" cellspacing=\"0px\" cellpadding=\"5px\" width=\"100%\" style=\"margin-bottom:15px\">
                  <tr>
                    <td style=\"text-align: right\">Subtotal:</td>
                    <td>{subtotal}</td>
                  </tr>
                  <tr>
                    <td style=\"text-align: right\">Tax:</td>
                    <td>{tax}</td>
                  </tr>
                  <tr>
                    <td style=\"text-align: right\">(Estimate) Shipping/Handling:</td>
                    <td>{shipping}</td>
                  </tr>
                  <tr>
                    <td style=\"text-align: right\">(Estimate) Discounts:</td>
                    <td>{discounts}</td>
                  </tr>
                  <tr>
                    <td style=\"text-align: right\">Total:</td>
                    <td>{total}</td>
                  </tr>
                </table>
              </td>
              <td valign=\"top\">
                <strong>
                  Thank you for shopping with Laura Janelle.
                            </strong>
                <table border=\"0px\" cellspacing=\"0px\" cellpadding=\"2px\" width=\"100%\" style=\"margin-bottom:15px;margin-left: auto;margin-right: auto\">
                  <tr>
                    <td colspan=\"2\" style=\"text-align: center\">Office Hours</td>
                  </tr>
                  <tr>
                    <td width=\"50%\" style=\"text-align: right\">Monday - Friday:</td>
                    <td>9:00am - 5:00pm EST</td>
                  </tr>
                  <tr>
                    <td style=\"text-align: right\">Saturday - Sunday:</td>
                    <td>Closed</td>
                  </tr>
                </table>
                <table border=\"0px\" cellspacing=\"0px\" cellpadding=\"2px\" width=\"100%\" style=\"margin-bottom:15px;margin-left: auto;margin-right: auto\">
                  <tr>
                    <td width=\"20%\" style=\"text-align: right\">Phone:</td>
                    <td>1-844-366-6900</td>
                  </tr>
                  <tr>
                    <td style=\"text-align: right\">Fax:</td>
                    <td>1-844-366-6121</td>
                  </tr>
                  <tr>
                    <td style=\"text-align: right\">Email:</td>
                    <td>customerservice@laurajanelle.com</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
";
?>
