/************************************************************
*************************************************************

** Contributors:	Jason Ardener

** Handle cookie functionality.
** @Functions:	getCookie(c_name),			getArray(c_name),
				deleteCookie(c_name),		setCookie(c_name, value, exdays)
				
*************************************************************
************************************************************/

/**
* Return the contents of a specified cookie, as a string.
*
*/
function getCookie(c_name) {
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++)
	{
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		if (x==c_name) {
			return unescape(y);
		}
	}
}


/**
* Converts cookie string to an array and returns it.
*
* @var cookieString			Holds the array of bookmarks. Using method getArray (see cookies.js).
* @var cookieArray			The cookie string, converted to an array.
*
* @param c_name				The name of the cookie to access.
*
* @return					Returns the cookieString as an array or false if the string is null.
*/
function getArray(c_name) {
	var cookieString = getCookie(c_name);
	
	// Check to see if the cookie is not empty.
	if (cookieString != null) {
		var cookieArray = cookieString.split(",");	// Split the cookie string up by the commas.
		return cookieArray;
	} else {
		return false;
	}
}


/**
* Delete the specified cookie.
*
* @param c_name				The name of the cookie to access.
*/
function deleteCookie(c_name) {
    document.cookie = encodeURIComponent(c_name) + "=deleted; expires=" + new Date(0).toUTCString();
}


/**
* Set the new cookie.
*
* @var exdate				The date the cookie should expire.
* @var c_value				The cookie content.
*
* @param c_name				The name of the cookie to access.
* @param value				The value to be stored in the cookie.
* @param exdays				The number of days until the cookie expires.
*/
function setCookie(c_name, value, exdays) {
	var exdate = new Date();
	
	exdate.setDate(exdate.getDate() + exdays);
	
	var c_value = escape(value) + ((exdays===null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie = c_name + "=" + c_value;
}