/************************************************************
*************************************************************

** Contributors:	Jason Ardener

** Init script calls.
** Misc scripts.

** @Functions:	init(),							getCount(),
				checkFullscreen(),			curPage(),
				switchTo(event, xml),			checkOrientation(),
				previousButton(event),		nextButton(event),
				firstButton(event),			lastButton(event),
				goToPage(page),			toUrlVar(array),
				logoSetup()
				
*************************************************************
************************************************************/

init();

/**
* Initiate functionality.
*
* @var bookmarks			Holds the array of bookmarks. Using method getArray (see cookies.js).
*/
function init() {
	// Initiate seadragon reader.
	Seadragon.Utils.addEvent(window, "load", initReader);
	
	// Get the total number of pages from pages XML.
	getCount();
	logoSetup();
	
	// Go to fullscreen when fullscreen button pressed.
	$("#icon_resize").click(function() {
		$(document).toggleFullScreen();
		fullscreen = !fullscreen;
		checkFullscreen();
		maxZoomOut = viewer.viewport.getZoom();	// Set the maximum zoom out level, this is the size of the viewer.
	});
	
	// Update viewport dimension variables.
	viewport();
	
	// Check to see if it is in fullscreen.
	checkFullscreen();
	
	// Set orientation.
	if (viewportheight > viewportwidth) {
		viewOrientation = "vertical";
		
		// Update the current page display.
		curPage();
	} else {
		viewOrientation = "horizontal";
		
		// Update the current page display.
		curPage();
	}
	
	// Check placeholder browser support
    if (!Modernizr.input.placeholder) {
		
        // set placeholder values
        $('header').find('[placeholder]').each(function()
        {
            if ($(this).val() === '') // if field is empty
            {
                $(this).val( $(this).attr('placeholder') );
            }
			
			$(this).focus(function() {
				var input = $(this);
				if (input.val() == input.attr('placeholder')) {
					input.val('');
				}
			});
        });
    }
	
	$('.dropdown-toggle').dropdown();
}



/**
* Get the total number of pages in the pages XML.
*
* @var tPages			The total number of pages.
*/
function getCount(){
	if (window.XMLHttpRequest){ // code for IE7+, Firefox, Chrome, Opera, Safari
		xmlcount=new XMLHttpRequest();
	} else { // code for IE6, IE5
		xmlcount=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	xmlcount.open("GET","pages/list_pages.xml",false);
	xmlcount.send();
	pageCountXML=xmlcount.responseXML;
	
	// Get the pages count from the XML.
	tPages = (pageCountXML.getElementsByTagName("pages")[0].getAttribute("count"));
	// tPages = 90;
}


/**
* Deal with functionality to trigger when the viewport is resized.
* Checks if in fullscreen, the orientation and sets which pages to display accordingly.
*
*/
$(window).resize(function(event) {
	// Check if the browser is in fullscreen.
	if (document.fullscreen || document.mozFullScreen || document.webkitIsFullScreen ) {
		fullscreen = true;
		maxZoomOut = viewer.viewport.getZoom();	// Set the maximum zoom out level, this is the size of the viewer.
	} else {
		fullscreen = false;
		maxZoomOut = viewer.viewport.getZoom();	// Set the maximum zoom out level, this is the size of the viewer.
	}
	
	// Update viewport measurements.
	viewport();
	
	// Check if fullscreen.
	checkFullscreen();
	
	// Check the orientation and update if it changes from the last time it was set.
	if (viewOrientation != "vertical" && (viewportheight > viewportwidth)) {
		viewOrientation = "vertical";
		
		// Switch to single page.
		switchTo(event, "pages/singlePages/"+cPage+".xml");
		
		// Update page number display.
		curPage();
	} else if (viewOrientation != "horizontal" && (viewportwidth > viewportheight)) {
		viewOrientation = "horizontal";
		
		// Switch to double page. Check to see if current page is odd or even and change to the correct double page. Must always change to an even.
		if (cPage%2 !== 0 && cPage !== 1) {
			cPage--;
			switchTo(event, "pages/doublePages/"+cPage+".xml");
		} else {
			switchTo(event, "pages/doublePages/"+cPage+".xml");
		}
		
		// Update page number display.
		curPage();
	}
	
	viewer.viewport.goHome();
});


/**
* Check to see if fullscreen is set and adjust height accordingly.
*
*/
function checkFullscreen() {
	if (!fullscreen) {
		$("#reader").css("height", viewportheight-100);	// Adjust the height of the reader.
		$("header").show();
		$("footer").show();
	} else {
		$("#reader").css("height", viewportheight);		// Adjust the height of the reader.
		$("header").hide();
		$("footer").hide();
	}
}


/**
* Keypress functionality for navigation reader.
*
*/
$(document).keydown(function(e) {
	// Left key. Previous page.
	if (e.keyCode == 37) {
		previousButton();
		return false;
	}
	// Right key. Next page.
	else if (e.keyCode == 39) {
		nextButton();
		return false;
	}
	// Up key. Zoom in.
	else if (e.keyCode == 38) {
		viewer.viewport.zoomBy(2, null, true);
		return false;
	}
	// Down key. Zoom out.
	else if (e.keyCode == 40) {
		viewer.viewport.zoomBy(0.5, null, true);
		return false;
	}
});


/**
* Update the current page number display.
*
* @var pDisplay			The array as a string.
*
*/
function curPage() {
	var pDisplay;
	cPage = (parseInt(cPage,10));
	
	// Check if the current page is the first.
	if(cPage == 1) {
		pDisplay = "1 of " + tPages;
	} else {
		if (viewOrientation == "vertical") {
			pDisplay = cPage + " of " + tPages;
		} else {
		
			// Check if the current page is the last.
			if(cPage == tPages) {
				pDisplay = cPage + " of " + tPages;
			} else {
				pDisplay = cPage + " to " + (parseInt(cPage,10)+1) + " of " + tPages;
			}
		}
	}
	
	// Update the display.
	$('.page-num').html(pDisplay);
}


/**
* Load new page.
*
* @param event			event
* @param xml			The location of the page xml.
*
*/
function switchTo(event, xml) {
	viewer.openDzi(xml);
   
	// Don't let the browser handle the link.
	Seadragon.Utils.cancelEvent(event);
}

/**
* Loads a page depending on the orientation.
*
*/
function checkOrientation() {
	if (viewOrientation == "vertical") {
		switchTo(event, "pages/singlePages/"+cPage+".xml");
	} else {
		switchTo(event, "pages/doublePages/"+cPage+".xml");
	}
}

/**
* Load previous page.
*
* @param event			event
*
*/
function previousButton(event) {
	// Check if not the first page.
	if (cPage > 1) {
		if (viewOrientation == "vertical" || cPage == 1) {
			cPage--;
		} else {
			if (cPage == 2) {
				cPage--;
			} else {
				cPage = (parseInt(cPage,10)-2);
			}
		}
	} else {
		cPage = tPages;
	}
	
	checkOrientation();
	curPage();
}


/**
* Load next page.
*
* @param event			event
*
*/
function nextButton(event) {
	// Check if not the last page.
	if (cPage < tPages) {
		if (viewOrientation === "vertical" || cPage === 0) {
			cPage++;
		} else {
			if (cPage === 1) {
				cPage++;
			} else {
				cPage = (parseInt(cPage,10)+2);
			}
		}
	} else {
		cPage = 1;
	}
	
	checkOrientation();
	curPage();
}


/**
* Load first page.
*
* @param event			event
*
*/
function firstButton(event) {
	cPage = 1;
	checkOrientation();
	curPage();
}


/**
* Load last page.
*
* @param event			event
*
*/
function lastButton(event) {
	cPage = tPages;
	checkOrientation();
	curPage();
}


/**
* Load specified page.
*
* @param page			The page number to change to.
*
*/
function goToPage(page) {
	cPage = page;
	if (viewOrientation == "vertical" || cPage == 1) {
		switchTo(event, "pages/singlePages/"+page+".xml");
	} else {
		if (page%2 === 0) {
			switchTo(event, "pages/doublePages/"+page+".xml");
		} else {
			switchTo(event, "pages/doublePages/"+(page-1)+".xml");
			cPage--;
		}
	}
	curPage();
}


/**
* Convert array to url ready string.
*
* @var atPage			The current page in the array.
* @var output			The output string.
*
* @param array			The array to convert to a url ready string.
*
* @return				Returns the complete url ready string.
*/
function toUrlVar(array) {
	var output = "";

	try {
		if (array.length === 0) {
			throw "zeroLenArray";
		}
	}
	catch(err) {
		console.log(err);
	}
	
	// Loop through the array and add each to string output with '|' as a divider.
	for (var i = 0; i < array.length; i++) {
		var atPage = array[i];
		output =  output + atPage;
		
		if ( i != (array.length - 1)) {
			output = output + "|";
		}
	}
	
	return output;
}


/**
* Sets up the logo with its image and link target.
*
*/
function logoSetup() {
	$('#top-left a').css('background-image', 'url('+ logoloc +')');
	$('#top-left a').attr('href', logolink);
}