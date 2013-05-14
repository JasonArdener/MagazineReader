/************************************************************
*************************************************************

** Contributors:	Jason Ardener

** Handle download functionality.
** @Functions:	downloadPage(pages),		toUrlVar(pages),
				genDownloads()
				
*************************************************************
************************************************************/

/**
* Calls download page to download pdf.
*
* @var baseURL			The ASP download page URL.
* @var theURL			The baseURL with parameters appended.
*
* @param pages			The list of pages to download.
*/
function downloadPages(pages)
{
	var baseUrl = "http://psp3.pagesuite.com/make_pdf_android.aspx";
	var theUrl = baseUrl + "?eid=" + eid + "&pnum=" + toUrlVar(pages);
	
	// Opens the page in a new window.
	window.open(theUrl, "Download", "height=400, width=550");
}

/**
* Adds the pages to the interface.
*
*/
function genDownloads() {
	// Loop through each page and add it to the interface.
	for (var i = 1; i <= tPages; i++) {
		$("#download_modal .page_list").append('<div class="bookmark_obj" style="background: url(pages/singlePages/'+ i +'_files/7/0_0.jpg)"><div class="page_num"><span>'+ i +'</span></div></div>');
	}
	
	// Add a onclick function to each page, toggles the selected_box class the show it is selected.
	$(".bookmark_obj").each(function() {
		$(this).bind("click", function() {
			$(this).toggleClass("selected_box");
			
			if ($(this).hasClass("selected_box")) {
				downloadCount++;
			} else {
				downloadCount--;
			}
			checkDownloads();
		});
	});
	
	if (Modernizr.touch){
		$("#download_modal .page_list").wrap('<div id="scroller" style="float: left" />');
		$("#scroller").wrap('<div id="wrapper" style="height: 300px; float: left" />');
		
		downloadScroll = new iScroll('wrapper', { vScroll: true, vScrollbar: true});
		setTimeout("downloadScroll.refresh()", 1000);
	}
	
	

}

/**
* Checks the count of pages selected.
*
*/
function checkDownloads() {
	$('#but_download').toggleClass('disabled', true);
	$('#download_modal .unselect_but').toggleClass('disabled', true);
	
	if (downloadCount > 0) {
		$('#but_download').toggleClass("disabled");
		$('#download_modal .unselect_but').toggleClass('disabled', false);
	}
}

/**
* Launches the download modal.
* Includes functionality for the buttons in the modal.
*
* @var todownload		Array of page numbers to download.
*
*/
$('.icon_download').click(function() {
	// Show the modal
	$('#download_modal').modal('toggle');
	
	// Functionality for download button.
	$('#but_download').click(function() {
		if (downloadCount === 0) {
			return false;
		}
	
		var todownload = [];
		
		// For every box that is selected, add the contents of the page number span to the todownload array.
		$("#download_modal .selected_box").each(function() {
			todownload.push($(this).find($('span')).text());
		});
		
		// Download the pages as a pdf.
		downloadPages(todownload);
	});
	
	// Functionality for the select all button. Applies the selected_box class to every page.
	$('#download_modal .select_but').click(function() {
		$("#download_modal .bookmark_obj").each(function() {
			$(this).toggleClass("selected_box", true);
		});
		downloadCount++;
		checkDownloads();
	});
	
	// Functionality for the unselect all button. Removes the selected_box class on every page.
	$('#download_modal .unselect_but').click(function() {
		$("#download_modal .bookmark_obj").each(function() {
			$(this).toggleClass("selected_box", false);
		});
		downloadCount = 0;
		checkDownloads();
	});
	
	// Add all the pages to the modal.
	genDownloads();
	
	//Destroy content when closed.
	$('#download_modal').on('hidden', function () {
		$('#download_modal .page_list').empty();
	});
});