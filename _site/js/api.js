//****************************************************************************
//******* Mod Date    By        Remarks
//CODEB4* 03/11/15    CH        Update dhtmlxAjax calls for codebase.4
//102014* 10/20/14	  TS		Add findColIndex function
//101314* 10/13/14	  CH        Add replaceWordChars function
//050714* 05/07/14	  TS		Add nextField2 function (nextField doesn't work in IE11 and other browsers)
//011314* 01/13/14	  TS		In sendForm and sendForm2 convert newline to CR/NL before doing escape
//091313* 09/13/13    Rob       Handle unicode characters in post string, etc. (use escape)
//052213* 05/22/13    Rob       Change on 5/22/13 caused other issues, recode.
//050613* 05/06/13    Rob       Encode % in post string.
//013113* 01/31/13    Tim       Add limitChars function
//011413* 01/14/13    Tim		Add Select_Value_Get function
//010913* 01/09/13    Tim		Add nextField function
//121812* 12/18/12    Tim       Add addCommas and StringtoNumber and numberToDollars functions
//121112* 12/11/12    Tim       Add trim function
//101712* 10/17/12    Rob       QSAPTX change not correct for processor mode.
//071712* 07/17/12    Tim       Added saveSWParameter and getSWParameter functions.
//QSAPTX* 07/17/12    Rob       Allow more than one form to be used for sendForm2.
//040912* 04/09/12    Rob       Added function to "URLEncode" a string.
//030812* 03/08/12    Rob       Added function to send e-mail (using NLEMAIL).
//071111* 07/11/11    Rob       Select_Value_Set function failed with empty value.
//060111* 06/01/11    Rob       Several issues in GetData function.
//HHYPHS* 09/10/10    Rob       Handle checkboxes in forms.
//042810* 04/28/10    Rob       Added sendForm2, callAjax2 and related functions.
//120109* 12/01/09    Rob       Ajax filename needs to be unique for web proc.
//113009* 11/30/09    Rob       Added Add_OnLoad_Function
//110609* 11/06/09    Rob       Convert & in sendForm function.
//REV15 *  REV15      Tim/Rob   New feature.
//****************************************************************************
//*******
//*******   COPYRIGHT (C) 2009   SouthWare Innovations, Inc.
//*******      Auburn, Alabama, USA
//*******
//****************************************************************************
//
//doclin* How to use sendForm function:
//doclin*   Purpose: Gathers & Sends form fields to an AJAX import job and returns result in div
//doclin*   Parameters: formaction - form action URL (typically 'http://@var_form_action_url_@')
//doclin*               p_formid - id of the form to send
//doclin*               is_swwebsvr - y/n if in web processor mode ('@var_sw_webserver_mode_@')
//doclin*               ajaxfilename - ajax filename for web proc mode ('@var_ajax_file_name_@')
//doclin*               p_statusdiv - div that should contain the status returned from import
//
//****************************************************************************
  function sendForm(formaction, p_formid, is_swwebsvr, ajaxfilename, p_statusdiv) {
	var formData = '';
    statusdiv = p_statusdiv;
    formid = p_formid;
	var elem = document.getElementById(formid).elements;
	formData += elem[0].name + "=" + elem[0].value;
	for(var i = 1; i < elem.length; i++){
		if(elem[i].type=="checkbox"){
			var fieldvalue = elem[i].checked;
		}
		else {
		//	var pctfix = elem[i].value.replace(/\%/g, "%25");
			var reNewLines=/[\n]/g;
		//	var fieldvalue = pctfix.replace(reNewLines, "%0D%0A");
			var fieldvalue = elem[i].value;
		}
		if(elem[i].type=="checkbox"){
			formData += "&" + elem[i].name + "=" + fieldvalue;
		}
		else {
		//	formData += "&" + elem[i].name + "=" + URLEncode(fieldvalue);
		fieldvalue = fieldvalue.replace(/\r\n|\r|\n/g, "\r\n");    //replaces CR/NL or CR or NL with CR/NL
		fieldvalue = escape(fieldvalue);
		//fieldvalue = fieldvalue.replace(reNewLines, "%0D%0A");
		formData += "&" + elem[i].name + "=" + fieldvalue.replace(/\+/g, "%2B");
		}
	}
	if (is_swwebsvr == "Y") {
        window.location.href = "http://nlajx2?" + formaction + "?formid=" + formid + "|" + ajaxfilename;
        showImportResult2(ajaxfilename);
    }
    else {
    	if (!window.dhtmlxAjax){								//CODEB4
  			window.dhtmlxAjax = {								//CODEB4
      			post:function(url, data, callback){				//CODEB4
         			dhx4.ajax.post(url, data, callback);		//CODEB4
      			}												//CODEB4
  			}													//CODEB4
		}														//CODEB4
		dhtmlxAjax.post(formaction,formData,showImportResult);
    }
  }

//****************************************************************************
//
//doclin* How to use sendForm2 function:
//doclin*   Purpose: Gathers & Sends form fields to an AJAX import job and returns result in variable
//doclin*   Parameters: formaction - form action URL (typically 'http://@var_form_action_url_@')
//doclin*               p_formid - id of the form to send
//doclin*               is_swwebsvr - y/n if in web processor mode ('@var_sw_webserver_mode_@')
//doclin*               ajaxfilename - ajax filename for web proc mode ('@var_ajax_file_name_@')
//doclin*
//doclin*   Sample use:
//doclin*   localvar = sendForm2('http://@var_form_action_url_@',formid,'@var_sw_webserver_mode_@','@var_ajax_file_name_@')
//
//****************************************************************************
  function sendForm2(formaction, p_formid, is_swwebsvr, ajaxfilename) {
  var formData = '';
    //formid = p_formid;
	formarray = p_formid.split("~");
	for (var j = 0; j < formarray.length; j++){
		formid = formarray[j];
		var elem = document.getElementById(formid).elements;
		if (j > 0){ formData += "&"; }
		formData += elem[0].name + "=" + elem[0].value;
		for(var i = 1; i < elem.length; i++){
			if(elem[i].type=="checkbox"){
				var fieldvalue = elem[i].checked;
			}
			else {
			//	var pctfix = elem[i].value.replace(/\%/g, "%25");
				var reNewLines=/[\n]/g;
			//	var fieldvalue = pctfix.replace(reNewLines, "%0D%0A");
				var fieldvalue = elem[i].value;
			}
			if(elem[i].type=="checkbox"){
				formData += "&" + elem[i].name + "=" + fieldvalue;
			}
			else {
			//	formData += "&" + elem[i].name + "=" + URLEncode(fieldvalue);
				fieldvalue = fieldvalue.replace(/\r\n|\r|\n/g, "\r\n");    //replaces CR/NL or CR or NL with CR/NL
				fieldvalue = escape(fieldvalue);
				//fieldvalue = fieldvalue.replace(reNewLines, "%0D%0A");
				formData += "&" + elem[i].name + "=" + fieldvalue.replace(/\+/g, "%2B");
			}
		}
	}
	//alert("formdata: "+formData);  //debug
    if (is_swwebsvr == "Y") {
        window.location.href = "http://nlajx2?" + formaction + "?formid=" + p_formid + "|" + ajaxfilename;
		returnAjaxResult2(ajaxfilename);
    }
    else {
    	if (!window.dhtmlxAjax){									//CODEB4
    		var loader = dhx4.ajax.postSync(formaction,formData);	//CODEB4
		}															//CODEB4
		else {														//CODEB4
        	var loader = dhtmlxAjax.postSync(formaction,formData);
        }															//CODEB4
		AjaxResponse = loader.xmlDoc.responseText;
    }
    return AjaxResponse;
  }
//****************************************************************************
//
//doclin* How to use countChars:
//doclin*   Purpose: Counts characters in a field and displays them in a div
//doclin*   Parameters: objElement - entry field id
//doclin*               countdiv - div in which the count will display
//
//****************************************************************************
  function countChars(objElement,countdiv){
     document.getElementById(countdiv).innerHTML = objElement.value.length + " characters entered.";
  }
//****************************************************************************
//
//doclin* How to use limitChars:
//doclin*   Purpose: limits characters in a textarea field
//doclin*   Parameters: objElement - field object
//doclin*               limit - max characters allowed
//doclin*   Sample use:
//doclin*    onchange="limitChars(this,max);"
//
//****************************************************************************
  function limitChars(objElement,maxLen){
     if (objElement.value.length > maxLen){
			alert("You may only enter "+maxLen+" characters in this field");
			objElement.value = objElement.value.substring(0,maxLen);
	 }
  }
//****************************************************************************
//
//doclin* How to use callAjax:
//doclin*   Purpose: Used in place of dhtmlAjax.get for generic ajax calls
//doclin*   Parameters: p_getdataurl - URL for the AJAX job
//doclin*               p_returnfunction - function to be called after AJAX job is done
//doclin*               p_is_swwebsvr - y/n if in web processor mode ('@var_sw_webserver_mode_@')
//doclin*               p_ajaxfilename - ajax filename for web proc mode ('@var_ajax_file_name_@')
//
//****************************************************************************
  function callAjax(p_getdataurl, p_returnfunction, p_is_swwebsvr, p_ajaxfilename){
      getdataurl = p_getdataurl;
      is_swwebsvr = p_is_swwebsvr;
      ajaxfilename = p_ajaxfilename;
      if (is_swwebsvr == "Y") {
        loader = getData(getdataurl,ajaxfilename,p_returnfunction);
      }
      else {
        var IEfix = "&var=" + new Date().valueOf().toString();
        var getdataurlIE = getdataurl + IEfix;
        getdataurl = getdataurlIE;
    	if (!window.dhtmlxAjax){						//CODEB4
  			window.dhtmlxAjax = {						//CODEB4
      			get:function(url, callback){			//CODEB4
         			dhx4.ajax.get(url, callback);		//CODEB4
      			}										//CODEB4
  			}											//CODEB4
		}												//CODEB4
	    dhtmlxAjax.get(getdataurl,p_returnfunction);
      }
  }
//****************************************************************************
//
//doclin* How to use callAjax2 function:
//doclin*   Purpose: Used in place of dhtmlAjax.get for generic ajax calls and returns result in variable
//doclin*   Parameters: p_getdataurl - URL for the AJAX job
//doclin*               p_is_swwebsvr - y/n if in web processor mode ('@var_sw_webserver_mode_@')
//doclin*               p_ajaxfilename - ajax filename for web proc mode ('@var_ajax_file_name_@')
//doclin*
//doclin*   Sample use:
//doclin*   localvar = callAjax2(p_getdataurl,'@var_sw_webserver_mode_@','@var_ajax_file_name_@')
//
//****************************************************************************
  function callAjax2(p_getdataurl, p_is_swwebsvr, p_ajaxfilename) {
      getdataurl = p_getdataurl;
      is_swwebsvr = p_is_swwebsvr;
      ajaxfilename = p_ajaxfilename;
      if (is_swwebsvr == "Y") {
		  window.location.href = "http://nlajax?" + getdataurl + "|" + ajaxfilename;
		  returnAjaxResult2(ajaxfilename);
      }
      else {
        var IEfix = "&var=" + new Date().valueOf().toString();
        var getdataurlIE = getdataurl + IEfix;
        getdataurl = getdataurlIE;
    	if (!window.dhtmlxAjax){							//CODEB4
    		var loader = dhx4.ajax.getSync(getdataurl);		//CODEB4
		}													//CODEB4
		else {												//CODEB4
        	var loader = dhtmlxAjax.getSync(getdataurl);
        }													//CODEB4
		AjaxResponse = loader.xmlDoc.responseText;
      }
      return AjaxResponse;
  }
//****************************************************************************
//
//doclin* How to use showChange function:
//doclin*   Purpose: Changes the color of an entry field when the field is changed
//doclin*   Parameters: objElement - entry field id
//
  function showChange(objElement){
      objElement.className='changedfield';
  }
//****************************************************************************
//
//doclin* How to use limitText:
//doclin*   Purpose: Limits number of characters that can be entered in a text field (used from onKeyUp)
//doclin*   Parameters: limitField - id of field to be limited
//doclin*               limitNum - number of characters to limit field to
//
//****************************************************************************
  function limitText(limitField, limitNum) {
     var reNewLines=/[\n]/g;
     var fieldvalue = limitField.value.replace(reNewLines, "%0D%0A");
	 if (fieldvalue.length > limitNum) {
	   limitField.value = limitField.value.substring(0, limitNum);
	 }
  }
//****************************************************************************
//
//doclin* How to use checkTimeStamp:
//doclin*   Purpose: Checks the time stamp for a record before an import is done; if okay, does import
//doclin*   Parameters: p_getdataurl - URL for determining timestamp of record (typically a @getdata request)
//doclin*               p_originaltime - variable containing time when page was loaded
//doclin*               p_statusdiv - div that should contain the status returned from import
//doclin*               p_is_swwebsvr - y/n if in web processor mode ('@var_sw_webserver_mode_@')
//doclin*               p_ajaxfilename - ajax filename for web proc mode ('@var_ajax_file_name_@')
//doclin*               p_formaction - form action URL (typically 'http://@var_form_action_url_@')
//doclin*               p_formid - id of the form to send
//
//****************************************************************************
  function checkTimeStamp(p_getdataurl, p_originaltime, p_statusdiv, p_is_swwebsvr, p_ajaxfilename, p_formaction, p_formid){
     getdataurl = p_getdataurl;
     originaltime = p_originaltime;
     is_swwebsvr = p_is_swwebsvr;
     ajaxfilename = p_ajaxfilename;
     timestampfilename = ajaxfilename + "_t";
     formaction = p_formaction;
     formid = p_formid;
     statusdiv = p_statusdiv;
	 if (is_swwebsvr == "Y") {
       loader = getData(getdataurl,timestampfilename,checkTimeStamp2);
     }
     else {
       var IEfix = "&var=" + new Date().valueOf().toString();
       var getdataurlIE = getdataurl + IEfix;
       getdataurl = getdataurlIE;
    	if (!window.dhtmlxAjax){						//CODEB4
  			window.dhtmlxAjax = {						//CODEB4
      			get:function(url, callback){			//CODEB4
         			dhx4.ajax.get(url, callback);		//CODEB4
      			}										//CODEB4
  			}											//CODEB4
		}												//CODEB4
	   dhtmlxAjax.get(getdataurl,checkTimeStamp2);
     }
  }
//****************************************************************************
//
//doclin* How to use deleteRecord:
//doclin*   Purpose: Delete a record if possible
//doclin*   Parameters: deleteurl - URL used to delete record
//doclin*               p_deletetype - literal describing type of record to delete (task, order, etc)
//doclin*               p_successdiv - div that should contain the status returned from import when delete was successful
//doclin*               p_unsuccessdiv - div that should contain the status returned from import when delete was NOT successful
//doclin*               p_is_swwebsvr - y/n if in web processor mode ('@var_sw_webserver_mode_@')
//doclin*               p_ajaxfilename - ajax filename for web proc mode ('@var_ajax_file_name_@')
//
//****************************************************************************
  function deleteRecord(deleteurl, p_deletetype, p_successdiv, p_unsuccessdiv, p_is_swwebsvr, ajaxfilename)  {
      deletetype= p_deletetype;
      successdiv = p_successdiv;
      unsuccessdiv = p_unsuccessdiv;
      is_swwebsvr = p_is_swwebsvr;
      if(confirm("Sure you want to DELETE this " + deletetype + "?")) {
	    if (is_swwebsvr == "Y") {
	        delloader = getData(deleteurl,ajaxfilename,deleteRecord2);
	    }
	    else {
	        var IEfix = "&var=" + new Date().valueOf().toString();
            var deleteurlIE = deleteurl + IEfix;
            deleteurl = deleteurlIE;
    		if (!window.dhtmlxAjax){					//CODEB4
  				window.dhtmlxAjax = {					//CODEB4
      				get:function(url, callback){		//CODEB4
        	 			dhx4.ajax.get(url, callback);	//CODEB4
      				}									//CODEB4
  				}										//CODEB4
			}											//CODEB4
	        dhtmlxAjax.get(deleteurl,deleteRecord2);
	    }
      }
  }
//****************************************************************************
//
//doclin* How to use showGridPreviewPane:
//doclin*   Purpose: Shows grid preview pane
//doclin*   Parameters: previewurl - URL used for the grid preview pane
//doclin*               p_previewdiv- div that should contain the preview pane
//doclin*               p_is_swwebsvr - y/n if in web processor mode ('@var_sw_webserver_mode_@')
//doclin*               ajaxfilename - ajax filename for web proc mode ('@var_ajax_file_name_@')
//
//****************************************************************************
  function showGridPreviewPane(previewurl, p_previewdiv, p_is_swwebsvr, ajaxfilename){
      previewdiv = p_previewdiv;
      is_swwebsvr = p_is_swwebsvr;
      if (is_swwebsvr == "Y") {
          prevloader = getData(previewurl,ajaxfilename,showGridPreviewPane2);
      }
      else {
	    var IEfix = "&var=" + new Date().valueOf().toString();
        var previewurlIE = previewurl + IEfix;
        previewurl = previewurlIE;
	 //   dhtmlxAjax.get(previewurl,showGridPreviewPane2);
    	if (!window.dhtmlxAjax){						//CODEB4
  			window.dhtmlxAjax = {						//CODEB4
      			getSync:function(url){					//CODEB4
         			dhx4.ajax.getSync(url);				//CODEB4
      			}										//CODEB4
  			}											//CODEB4
		}												//CODEB4
        var loader = dhtmlxAjax.getSync(previewurl);
	  	showGridPreviewPane2(loader);
 }
  }

//****************************************************************************
//
//doclin* How to use RemoveLeadingTrailingSpaces:
//doclin*   Purpose: Removes leading and trailing spaces from a string
//doclin*   Parameters: value - value of the string
//
//****************************************************************************
function RemoveLeadingTrailingSpaces(value) {
    return value.replace(/^\s*/, "").replace(/\s*$/, "");
}


//****************************************************************************
//
//doclin* How to use Select_Value_Set:
//doclin*   Purpose: sets value in a dropdown entry field (select options)
//doclin*   Parameters: SelectName - name of field to set value of
//doclin*               Value - value to set the field
//
//****************************************************************************
  function Select_Value_Set(SelectName, Value) {
    var valuelength = Value.length;
    eval('SelectObject = document.' + SelectName + ';');
    for(index = 0;
        index < SelectObject.length;
        index++) {
      var selectvalue = RemoveLeadingTrailingSpaces(SelectObject[index].value);
      //var selectvalue = SelectObject[index].value;
      while(''+selectvalue.charAt(selectvalue.length-1)==' ')selectvalue=selectvalue.substring(0,selectvalue.length-1);

      var selectlength = selectvalue.length;
//      alert ("select value: " + selectvalue + " (length: " + selectlength + ") actual value: " + Value + " (length: " + valuelength + ")");
      if(selectvalue.substring(0,valuelength) == Value && selectlength == valuelength){
        SelectObject.selectedIndex = index;
//        alert ("selected value: " + SelectObject[index].value);
        index = SelectObject.length;
      }
	  if(selectvalue.length == 0 && Value == " "){
	    SelectObject.selectedIndex = index;
		index = SelectObject.length;
	  }
    }
  }

//****************************************************************************
//
//doclin* How to use Select_Value_Get:
//doclin*   Purpose: gets value of selected value in a dropdown entry field (select options)
//doclin*   Parameters: SelectID - id of select field
//doclin*   Returns:  Value of selected item
//
//****************************************************************************
  function Select_Value_Get(SelectID) {
  	var e = document.getElementById(SelectID);
	var selValue = e.options[e.selectedIndex].value;
	return selValue;
  }
//****************************************************************************
//
//doclin* How to use Add_OnLoad_Function:
//doclin*   Purpose: Required instead of onload events for NetLink due to
//doclin*            multiple dynamic onload functions
//doclin*   Parameters: MyLoadEvent - function to be added
//doclin*
//doclin*   Example (place in <head> section within a <script>):
//doclin*     Add_OnLoad_Function(function() {
//doclin*          MyLoadEvent();
//doclin*     })
//
//****************************************************************************
  function Add_OnLoad_Function(func) {
     var oldonload = window.onload;
     if (typeof window.onload != 'function') {
        window.onload = func;
     } else {
        window.onload = function() {
           if (oldonload) {
              oldonload();
           }
           func();
        }
     }
  }
 //****************************************************************************
//
//doclin* How to use Send_Email:
//doclin*   Purpose: to send an e-mail via an E-Launch ID from a NL page
//doclin*            via the NL Background Server
//doclin*   Parameters: launch_id - E-Launch ID
//doclin*               launch_key - Key for E-Launch Primary File
//doclin*               ovr_email_addr - Override e-mail address (overrides what is in E-Launch ID)
//doclin*               confirm_mesg - y/n whether to include a confirmation message or not
//doclin*               p_form_action_url - form action url ('http://@var_form_action_url_@')
//doclin*               p_session_no - session number ('@var_session_no_@')
//doclin*               p_is_swwebsvr - y/n if in web processor mode ('@var_sw_webserver_mode_@')
//doclin*               p_ajaxfilename - ajax filename for web proc mode ('@var_ajax_file_name_@')
//doclin*   Example: Send_Email('LAUNCHID', '@var_cust_no_@', 'carl@abc.com', 'y', 'http://@var_form_action_url_@', '@var_session_no_@', '@var_sw_webserver_mode_@', '@var_ajax_file_name_@');
//
//****************************************************************************

	function Send_Email(launch_id, launch_key, ovr_email_addr, confirm_mesg, p_form_action_url, p_session_no, p_is_swwebsvr, p_ajaxfilename) {
	    ajaxurl = p_form_action_url + "?session_no=" + p_session_no + "&request_id=nlemail&email_launch_id=" + launch_id + "&email_launch_key=" + launch_key + "&email_ovr_address=" + ovr_email_addr;
		response = callAjax2(ajaxurl, p_is_swwebsvr,p_ajaxfilename);
		if (confirm_mesg == "y" || confirm_mesg == "Y"){
			if (response.substring(0,2) == "OK") {
				alert ("E-mail was sent.");
			}
			else {
				alert (response.substring(10,90));
			}
		}
	}
//****************************************************************************
//
//doclin* How to use URLEncode function:
//doclin*   Purpose: Encodes a string to be used in a URL by encoding +, &, =, # as hex
//doclin*   Parameters: string - string to be encoded
//doclin*
//doclin*   Sample use:
//doclin*   localvar = URLEncode(string);
//
//****************************************************************************
  function URLEncode(string) {
   	  var fixed_string = string;
	  fixed_string = fixed_string.replace(/\+/g, "%2B");
	  fixed_string = fixed_string.replace(/\&/g, "%26");
	  fixed_string = fixed_string.replace(/\=/g, "%3D");
	  fixed_string = fixed_string.replace(/\#/g, "%23");
      return fixed_string;
  }

//****************************************************************************
//doclin* Used to replace special Word characters when text is cut and pasted from Microsoft Word
//doclin* use onblur="replaceWordChars(this,this.value);" in input text field
//****************************************************************************

function replaceWordChars(id,value) {
	var s = value;
 	// smart single quotes and apostrophe
    s = s.replace(/[\u2018|\u2019|\u201A]/g, "\'");
    // smart double quotes
    s = s.replace(/[\u201C|\u201D|\u201E]/g, "\"");
    // ellipsis
    s = s.replace(/\u2026/g, "...");
    // dashes
    s = s.replace(/[\u2013|\u2014]/g, "-");
    // circumflex
    s = s.replace(/\u02C6/g, "^");
    // open angle bracket
    s = s.replace(/\u2039/g, "<");
    // close angle bracket
    s = s.replace(/\u203A/g, ">");
    // spaces
    s = s.replace(/[\u02DC|\u00A0]/g, " ");
    id.value = s;
}

//****************************************************************************
//
//doclin* How to use findColIndex function:
//doclin*   Purpose: Used to find index for a grid column via the column header text - typically so you can modify column
//doclin*   Parameters: gridname - name of grid (e.g. mygrid1) - (do not put in quotes)
//doclin*               colhdrtxt - column header text (in quotes) - e.g. "Customer Name"
//doclin*   Returns:  Index of column with that header text, 999 if not found
//doclin*   Example:
//doclin*      var qtycolindex=findColIndex(mygrid1,"Quantity");
//
//
//****************************************************************************
	function findColIndex(gridname,colhdrtxt) {
		var cols = gridname.getColumnsNum();
		for (var j = 0; j < cols; j = j + 1) {
			var col_label = gridname.getColumnLabel(j);
			var is_found=col_label.indexOf(colhdrtxt);
			if(is_found != -1) {
				return j;
			}
		}
		return 999;
	}

//****************************************************************************
//
//doclin* How to use nextField function:
//doclin*   Purpose: Used to change enter key to tab for entry of fields
//doclin*   nextField();
//doclin*   Returns: nothing
//doclin*   Example function for an input field: onKeyDown="nextField();"
//
//****************************************************************************
	function nextField()  {
		//change enter key to tab for entry of fields
		    if (window.event && window.event.keyCode == 13) {
		        window.event.keyCode = 9;
			}
	}
//
//****************************************************************************

//****************************************************************************
//
//doclin* How to use nextField2 function:
//doclin*   Purpose: Used to cause enter key to move to next text field (IE11 obsoleted nextField function)
//doclin*   nextField(event,id);
//doclin*   Returns: nothing
//doclin*   Example function for an input field: onkeyup="nextField(event,this.id);"
//
//****************************************************************************
	function nextField2(e,id) {
		e.which = e.which || e.keyCode;
		if(e.which == 13) {
			//alert("pressed Enter key");
			var field_element=document.getElementById(id);
			var next_field_element=get_nextsibling(field_element);
			next_field_element.focus();
		}
	}
//
//****************************************************************************


//****************************************************************************
//
//doclin* How to use saveSWParameter function:
//doclin*   Purpose: Used to save a value in SouthWare learn for later retrieval via getSWParameter
//doclin*   Parameters: oper_id - operator key for saved parameter
//doclin*               value_key - Key for parameter (up to 36 characters)
//doclin*               save_value - Override e-mail address (overrides what is in E-Launch ID)
//doclin*               p_form_action_url - form action url ('http://@var_form_action_url_@')
//doclin*               p_session_no - session number ('@var_session_no_@')
//doclin*               p_is_swwebsvr - y/n if in web processor mode ('@var_sw_webserver_mode_@')
//doclin*               p_ajaxfilename - ajax filename for web proc mode ('@var_ajax_file_name_@')
//doclin*   Returns: "OK" in first 2 chars if saved OK, "ERR" in first three chars if error and message in pos 11-100
//doclin*   Example: saveSWParameter('@var_dd_XX990001_@', 'myparamkey', 'myparamvalue', 'http://@var_form_action_url_@', '@var_session_no_@', '@var_sw_webserver_mode_@', '@var_ajax_file_name_@');
//
//****************************************************************************

	function saveSWParameter(oper_id, value_key, save_value, p_form_action_url, p_session_no, p_is_swwebsvr, p_ajaxfilename) {
	    saveSWParamURL = p_form_action_url + "?session_no=" + p_session_no + "&request_id=nlgetsub&command=SAVEVALUE&oper_id=" + oper_id + "&value_key=" + value_key + "&save_value=" + save_value;
		saveresponse = callAjax2(saveSWParamURL, p_is_swwebsvr,p_ajaxfilename);
		return saveresponse;
	}

//****************************************************************************
//
//doclin* How to use getSWParameter function:
//doclin*   Purpose: Used to retrieve a value in SouthWare learn that was saved via saveSWParameter
//doclin*   Parameters: oper_id - operator key for saved parameter
//doclin*               value_key - Key for parameter (same as used during save)
//doclin*               p_form_action_url - form action url ('http://@var_form_action_url_@')
//doclin*               p_session_no - session number ('@var_session_no_@')
//doclin*               p_is_swwebsvr - y/n if in web processor mode ('@var_sw_webserver_mode_@')
//doclin*               p_ajaxfilename - ajax filename for web proc mode ('@var_ajax_file_name_@')
//doclin*   Returns: value if OK, otherwise *ERR
//doclin*   Example: myvalue = getSWParameter('@var_dd_XX990001_@', 'myparamkey', 'http://@var_form_action_url_@', '@var_session_no_@', '@var_sw_webserver_mode_@', '@var_ajax_file_name_@');
//
//****************************************************************************

	function getSWParameter(oper_id, value_key, p_form_action_url, p_session_no, p_is_swwebsvr, p_ajaxfilename) {
	    getSWParamURL = p_form_action_url + "?session_no=" + p_session_no + "&request_id=nlgetsub&command=GETVALUE&oper_id=" + oper_id + "&value_key=" + value_key;
		getresponse = callAjax2(getSWParamURL, p_is_swwebsvr,p_ajaxfilename);
		if (getresponse.substr(0,2) == "OK") {
			return getresponse.substr(10,90);
		}
		else {
			return "*ERR";
		}
	}

//****************************************************************************
//
//doclin* How to use trim function:
//doclin*   Purpose: Used to trim variable to non-blank characters
//doclin*   trim(valuetotrim);
//doclin*   Returns: value trimmed
//doclin*   Example: myvalue = trim(myvalue);
//
//****************************************************************************
	function trim(stringToTrim) {
		trimvalue = stringToTrim.replace(/^\s+|\s+$/g,"");
		return trimvalue;
	}

//****************************************************************************
//
//doclin* How to use addCommas function:
//doclin*   Purpose: function to add commas to a calculated number
//doclin*   addCommas(value);
//doclin*   Returns: value formatted with commas
//doclin*   Example: myvalue = addCommas(myvalue);
//
//****************************************************************************
	function addCommas(nStr) {
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	}

//
//****************************************************************************
//
//doclin* How to use StringtoNumber function:
//doclin*   Purpose: function to take a formatted number string (from RM) and convert it to a number for calculation with Javascript
//doclin*   StringtoNumber(formatted value);
//doclin*   Returns: value without formatting
//doclin*   Example: myvalue = StringtoNumber(myvalue);
//
//****************************************************************************
	function StringtoNumber(string) {
	    var result=Number(string.replace(/[^0-9\.]+/g,""));
	    return result;
	}

//****************************************************************************
//
//doclin* How to use numberToDollars function:
//doclin*   Purpose: function to take a number and convert it to a formatted dollar amount for display
//doclin*   numberToDollars(unformatted number);
//doclin*   Returns: value formatted as dollars
//doclin*   Example: myvalue = numberToDollars(myvalue);
//
//****************************************************************************
	function numberToDollars(number) {
    var number = number.toString(),
    dollars = number.split('.')[0],
    cents = (number.split('.')[1] || '') +'00';
    dollars = dollars.split('').reverse().join('')
        .replace(/(\d{3}(?!$))/g, '$1,')
        .split('').reverse().join('');
    return '$' + dollars + '.' + cents.slice(0, 2);
	}

//****************************************************************************
//      PRIVATE FUNCTIONS BELOW
//****************************************************************************
  //shows the response from the import job
  function showImportResult(loader){
        //alert ("at showImportResult");
        var importResponse = loader.xmlDoc.responseText;
        var firstChar = loader.xmlDoc.responseText.substring(0,4);
        document.getElementById(statusdiv).innerHTML = importResponse;
        if (firstChar == "<OK>") {
           	var currform = document.getElementById(formid);
		currform.Submit.disabled = true;
        }
    }

// this function loads a file into the statusdiv on a page (used with SW Web Processor only)
function showImportResult2(file) {
	  var request = getHTTPObject();
      request.open("GET",file,true);
       // alert("file opened " + file);
	  request.onreadystatechange = function() {
	  if(request.readyState == 4){
			var results = document.getElementById(statusdiv);
			results.innerHTML = request.responseText;
			var firstChar = request.responseText.substring(0,4);
        	if (firstChar == "<OK>") {
           		//alert("At add record " + firstChar);
           		var currform = document.getElementById(formid);
				currform.Submit.disabled = true;
           }

	  }
	}
	request.send(null);
}
  //shows the response from the import job
  function returnAjaxResult(loader){
        //alert ("at returnAjaxResult");
        AjaxResponse = loader.xmlDoc.responseText;
    }

// this function loads a file into the statusdiv on a page (used with SW Web Processor only)
function returnAjaxResult2(file) {
	  var request = getHTTPObject();
      request.open("GET",file,true);
       // alert("file opened " + file);
	  request.onreadystatechange = function() {
	  if(request.readyState == 4){
			AjaxResponse = request.responseText;
	  }
	}
	request.send(null);
}

// this function opens a file so that the DOM can be accessed (used with SW Web Processor only)
function getHTTPObject() {
	var xmlhttp;

	//if (window.ActiveXObject){ // if IE
		//alert("in window.ActiveXObject");
		try {
			xmlhttp= new ActiveXObject("Msxml2.XMLHTTP")
		}
		catch (e){
			try{
				xmlhttp= new ActiveXObject("Microsoft.XMLHTTP")
			}
			catch (e){}
		}
	//}

	return xmlhttp;
}

// this function gets data for Web Processor jobs and returns loader object (used with SW Web Processor only)
function getData(getdataurl, ajaxfilename, callbackfunction){
     //  var IEfix = new Date().valueOf().toString();
     //  ajaxfilename = ajaxfilename + IEfix;
       window.location.href = "http://nlajax?" + getdataurl + "|" + ajaxfilename;
      // location.href = "http://nlajax?" + getdataurl + "|" + ajaxfilename;
	  var request = getHTTPObject();
	  var thebase = document.getElementsByTagName("base");
	  var basehref = thebase[0].href;
	  ajaxfilename = basehref + ajaxfilename;
      request.open("GET",ajaxfilename,true);
	  request.onreadystatechange = function() {
 	  if(request.readyState == 4){
        callbackfunction(request);
	  }
	}
	request.send(null);
}


// this function is called after the checking of timestamp ajax job; essentially part 2
 function checkTimeStamp2(loader) {
        if (is_swwebsvr == "Y") {
		  var newTime6 = loader.responseText.substring(0,6);
		  var newTime5 = loader.responseText.substring(0,5);
        }
		else {
		  var newTime6 = loader.xmlDoc.responseText.substring(0,6);
		  var newTime5 = loader.xmlDoc.responseText.substring(0,5);
    	}
	 	var oldTime = originaltime;
		//alert(newTime6 + newTime5 + "old " + oldTime);
  		if (newTime6 == oldTime || newTime5 == oldTime)  {
  		  sendForm(formaction,formid,is_swwebsvr,ajaxfilename,statusdiv);
  		}
  		else  {
  		  if(confirm("Record has been changed by another person/process since you started editing.  If the changes you made might overwrite someone else's work you should cancel the update, refresh the page, and make your change again. \n\nDo you want to update anyway?")) {
  		  		sendForm(formaction,formid,is_swwebsvr,ajaxfilename,statusdiv);
  		     }
  		  else {
             document.getElementById(statusdiv).innerHTML = "<b>Record was NOT updated!</b><p>You may refresh the page to see current values and make any changes.</p>";
  		     }
  		}
 }


// this function is used to delete a record if possible; essentially part 2
function deleteRecord2(delloader){
		 if (is_swwebsvr == "Y") {
		  var importResponse = delloader.responseText;
		  var firstChar = delloader.responseText.substring(0,2);
        }
		else {
		  var importResponse = delloader.xmlDoc.responseText;
		  var firstChar = delloader.xmlDoc.responseText.substring(0,2);
    	}
        var deleteMessage = '<p class="message"><img src="images/check2.png">&nbsp;' + deletetype + ' Deleted!</p>';
        document.getElementById(unsuccessdiv).innerHTML = importResponse;
        //alert(importResponse);
        if (firstChar == "OK") {
           document.getElementById(successdiv).innerHTML = deleteMessage;

           }
    }


//function to actually show preview; essentially part 2
  function showGridPreviewPane2(prevloader) {
        if (is_swwebsvr == "Y") {
		  var detresponse = prevloader.responseText;
        }
		else {
		  var detresponse = prevloader.xmlDoc.responseText;
    	}
  		document.getElementById(previewdiv).innerHTML = detresponse;
}
