/************************************************************
*************************************************************

** Contributors:	Jason Ardener

** Handle bookmarks functionality.
** @Functions:	popBookmarks(),			addPage(),
				removePage(num)
				
*************************************************************
************************************************************/

/**
* Launch the bookmarks modal.
*
*/
$('.icon_bookmark').click(function() {
	$('#bookmark_modal').modal('toggle');
	
	// Add the bookmarks to the modal.
	popBookmarks();
});


/**
* Populates the bookmarks popup with the current
* bookmarks in the cookie.
* Includes button functionality.
*
* @var bookmarks			Holds the array of bookmarks. Using method getArray (see cookies.js).
*/
function popBookmarks() {
	var bookmarks = getArray("bookmarks");
	
	$("#book_body").empty();
	
	if (bookmarks === false) {
		$('#delete_bookmarks').toggleClass("disabled", true);
	} else {
		$('#delete_bookmarks').toggleClass("disabled", false);
	}

	if (bookmarks != false) {
		// Loop through each of the bookmarks and add to the interface.
		for (var i=0; i < bookmarks.length; i++) {
			$("#book_body").append('<div class="bookmark_obj" onclick="goToPage('+ bookmarks[i] +'); $(\'#bookmark_modal\').modal(\'toggle\')" style="background: url(pages/singlePages/'+ bookmarks[i] +'_files/7/0_0.jpg)"><div class="page_num"><span>'+ bookmarks[i] +'</span></div><div class="close-icon" onclick="event.stopPropagation(); removePage('+ bookmarks[i] +')"><span>x</span></div></div>');
		}
	}
	
	if (Modernizr.touch){
		$("#book_body").wrap('<div id="scroller" style="float: left" />');
		$("#scroller").wrap('<div id="wrapper" style="height: 300px; float: left" />');
		
		downloadScroll = new iScroll('wrapper', { vScroll: true, vScrollbar: true});
		setTimeout("downloadScroll.refresh()", 1000);
	}
	
	// Adds current page to cookie then reloads list of bookmarks to interface.
	$('#but_bookmark').click(function() {
		addPage();
		popBookmarks();
	});
	
	// Deletes all of the bookmarks (clears the cookie).
	$('#delete_bookmarks').click(function() {
		if ($('#delete_bookmarks').hasClass("disabled")) return false;
		deleteCookie("bookmarks");
		popBookmarks();
	});
	
	//Destroy content when closed.
	$('#bookmark_modal').on('hidden', function () {
		$('#book_body').empty();
	});
}


/**
* Adds the current page the user is viewing
* to the bookmarks cookie.
*
* @var bookmarks			Holds the array of bookmarks. Using method getArray (see cookies.js).
* @var curPage				Converts the current page number to a string for pushing to cookie.
* @var secondPage			Converts the second page number to a string for pushing to cookie.
* @var pagesString			Converts bookmarks array to string.
*/
function addPage() {
	var bookmarks = [];
	var curPage = cPage.toString();
	
	// Check to see if the bookmarks cookie exists.
	if (getArray("bookmarks") != false) {
		bookmarks = getArray("bookmarks");
	}

	// If the reader is vertical or on page 1 then only ever attempt to add a single page.
	if (viewOrientation == "vertical" || cPage == 1) {
	
		// Check to see if current page number is not already in the bookmarks array.
		if (($.inArray(curPage, bookmarks)) == -1) {
			bookmarks.push(cPage);
		}
	}
	// If in horizontal mode, then bookmark two pages.
	else {
		var secondPage = (cPage+1).toString();
		
		// Check to see if current page number is not already in the bookmarks array.
		if (($.inArray(curPage, bookmarks)) == -1) {
			bookmarks.push(cPage);
		}
		
		// Check to see if the second page number is not already in the bookmarks array.
		if (($.inArray(secondPage, bookmarks)) == -1) {
			bookmarks.push(cPage+1);
		}
	}

	var pagesString = bookmarks.toString();
	
	// Create the bookmarks cookie.
	setCookie("bookmarks", pagesString, cookieExp);
}


/**
* Remove a page from the bookmarks cookie.
*
* @var bookmarks			Holds the array of bookmarks. Using method getArray (see cookies.js).
* @var arr					Removes page from array.
*
* @param num				Page number to be removed.
*/
function removePage(num) {
	var bookmarks = getArray("bookmarks");
	var arr = jQuery.grep(bookmarks, function(value) {
		return value != num;
	});
	
	// Create the bookmarks cookie.
	setCookie("bookmarks", arr, cookieExp);
	
	popBookmarks();
}