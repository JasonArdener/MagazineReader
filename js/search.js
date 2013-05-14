/************************************************************
*************************************************************

** Contributors:	Jason Ardener

** Handle search functionality.
** @Functions:			runSearch(q)
				
*************************************************************
************************************************************/

/**
* Downloads the XML for the search query and displays it.
*
*/
function runSearch(q) {
	// Downloads the XML.
	$.ajax({
		type: "GET",
		url: "search.php?type=search&q="+q+"&eid="+eid+"&t=e",
		dataType: "xml",
		success: xmlParser
	});
	
	// Parse the XML.
	function xmlParser(xml) {
		// Clear the current search results HTML.
		$("#search_results").empty();
		$('#search input').blur();
		$('#search2 input').blur();
		
		// Add each search result to the modal.
		$(xml).find("result").each(function () {
			$("#search_results").append("<li><a href='' onclick='goToPage("+ $(this).attr('pnum') +")'><div class='search_image'><img src='pages/singlePages/"+ $(this).attr('pnum') +"_files/7/0_0.jpg' alt='' /><p>"+ $(this).attr('pnum') +"</p></div><p>"+ $(this).text() +"</p></a><div style='clear:both'></div></li>");
		});
		
		if (Modernizr.touch){
			$("#search_results").wrap('<div id="scroller" style="float: left" />');
			$("#scroller").wrap('<div id="wrapper" style="height: 300px; float: left" />');
			
			downloadScroll = new iScroll('wrapper', { vScroll: true, vScrollbar: true});
			setTimeout("downloadScroll.refresh()", 1000);
		}
	}
}


/**
* Launch the search modal.
*
* @var query			The search query from the input field.
*
*/
$("#search").bind("submit", function(e) {
	e.preventDefault();
	
	var query = $('#search input').val();
	
	// Clears the input field.
	$('#search input').val('');
	
	// Clears the input field.
	$('#search2 input').val(query);
	
	// Run the search.
	runSearch(query);
	
	// Functionality for search input inside of the modal.
	$("#search2").bind("submit", function(e) {
		e.preventDefault();
		query = $('#search2 input').val();
		runSearch(query);
	});
	
	// Launch the modal.
	$('#search_modal').modal('toggle');
	
	//Destroy content when closed.
	$('#search_modal').on('hidden', function () {
		$('#search_results').empty();
	});
});

/**
* Launches the search modal.
*
*
*/
$('.icon_search').click(function() {
	// Show the modal
	$('#search_modal').modal('toggle');
	
	
	//Destroy content when closed.
	$('#search_modal').on('hidden', function () {
		$('#search_modal .page_list').empty();
	});
});