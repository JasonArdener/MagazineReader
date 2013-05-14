/************************************************************
*************************************************************

** Contributors:	Jason Ardener

** List of all the global variables.
				
*************************************************************
************************************************************/

var cPage			= 1;													// Current page number, set in script.js
var viewer			= null;													// Viewer object, set in reader.js
var viewOrientation = "vertical";											// Orientation of device, set in script.js
var viewportwidth;															// Viewport width, set in viewport.js
var viewportheight;															// Viewport height, set in viewport.js
var fullscreen		= false;												// Full screen boolean. Set in script.js.
var maxZoomOut;																// Get the maximum zoom level of the device.

var eid				= "f053378e-4a1c-4f92-beb6-648d462bb901";				// Edition ID, set by builder.
var logoloc			= "img/pagesuite.png";									// The location of the logo.
var logolink		= "http://www.pagesuite.com";							// Logo link target.
var etitle			= "Edition Title";										// Edition title.
var edesc			= "The latest editions, online. Powered by PageSuite.";	// Edition description.
var eimgprev		= "";													// Edition preview.
var tPages			= 0;													// Total number of pages, set in script.js.

var cookieExp		= 500;													// How long the cookie takes to expire in days.

var downloadCount	= 0;													// Keep count of pages to download selected.
var printCount		= 0;													// Keep count of pages to print selected.