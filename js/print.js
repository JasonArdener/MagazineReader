/************************************************************
*************************************************************

** Contributors:	Jason Ardener

** Handle print functionality.
** @Functions:	printPages(),    toUrlVar(pages),
				
*************************************************************
************************************************************/

/**
* Calls the print ASP page with the pages string that need to be printed.
*
* @var baseURL			The base URL for the print ASP page.
* @var pages			String of pages.
* @var theURL			The complete appended URL to open in new window.
*/
function printPages(pages)
{
	var baseUrl = "http://edition.pagesuite-professional.co.uk/print_from_as2.aspx?";
	var printPagesList = toUrlVar(printPagesList);
	var theUrl = baseUrl + "edid=" + eid + "&type=swf&pages=" + printPagesList;
	
	// Open the URL to print in a new window.
	window.open(theUrl, "PageSuite - Print", "height=400, width=550");
}

/**
* Checks the count of pages selected.
*
*/
function checkPrints() {
	$('#but_print').toggleClass('disabled', true);
	$('#print_modal .unselect_but').toggleClass('disabled', true);
	if (printCount > 0) {
		$('#but_print').toggleClass("disabled");
		$('#print_modal .unselect_but').toggleClass('disabled', false);
	}
}

/**
* Adds the pages to the interface.
*
*/
function genPrint() {
	// Loop through each page and add it to the interface.
	for (var i = 1; i <= tPages; i++) {
		$("#print_modal .page_list").append('<div class="bookmark_obj" style="background: url(pages/singlePages/'+ i +'_files/7/0_0.jpg)"><div class="page_num"><span>'+ i +'</span></div></div>');
	}
	
	// Add a onclick function to each page, toggles the selected_box class the show it is selected.
	$(".bookmark_obj").each(function() {
		$(this).bind("click", function() {
			$(this).toggleClass("selected_box");
			
			if ($(this).hasClass("selected_box")) {
				printCount++;
			} else {
				printCount--;
			}
			checkPrints();
		});
	});
	
	if (Modernizr.touch){
		$("#print_modal .page_list").wrap('<div id="scroller" style="float: left" />');
		$("#scroller").wrap('<div id="wrapper" style="height: 300px; float: left" />');
		
		downloadScroll = new iScroll('wrapper', { vScroll: true, vScrollbar: true});
		setTimeout("downloadScroll.refresh()", 1000);
	}
}

/**
* Launches the print modal.
*
* @var toprint			Array of pages to print.
*
*/
$(".icon_print").click(function() {
	// Handle print button functionality. Calls the print function.
	$('#but_print').click(function() {
		if (printCount === 0) {
			return false;
		}
	
		var toprint = [];
		
		// Check each page to see if it has selected_box class.
		$("#print_modal .selected_box").each(function() {
			toprint.push($(this).find($('span')).text());
		});
		
		// Print the pages.
		printPages(toprint);
	});
	
	// Apply selected class to each page.
	$('#print_modal .select_but').click(function() {
		$("#print_modal .bookmark_obj").each(function() {
			$(this).toggleClass("selected_box", true);
		});
		printCount++;
		checkPrints();
	});

	// Remove selected class to each page.
	$('#print_modal .unselect_but').click(function() {
		$("#print_modal .bookmark_obj").each(function() {
			$(this).toggleClass("selected_box", false);
		});
		printCount = 0;
		checkPrints();
	});
	
	// Add pages to the modal.
	genPrint();
	
	//Launches the modal.
	$('#print_modal').modal('toggle');
	
	//Destroy content when closed.
	$('#print_modal').on('hidden', function () {
		$('#download_modal .page_list').empty();
	});
});