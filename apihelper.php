<?php
// apihelper.php
// Used by shopping cart to interface with NetLink across domains via ajax.
// Place this on your web server and make all calls to this instead of netlink.php

$querystring = $_SERVER['QUERY_STRING'];
$netlink_url = "http://72.64.152.18:8081/nlhtml/custom/netlink.php?$querystring";

$curl_handle=curl_init();
curl_setopt($curl_handle,CURLOPT_URL,$netlink_url);
curl_setopt($curl_handle,CURLOPT_CONNECTTIMEOUT,20);
curl_setopt($curl_handle,CURLOPT_RETURNTRANSFER,1);
curl_setopt($curl_handle,CURLOPT_USERAGENT,'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13');
$buffer = curl_exec($curl_handle);
curl_close($curl_handle);

print $buffer;
?>
