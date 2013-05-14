/************************************************************
*************************************************************

** Contributors:	Jason Ardener

** Handle pages functionality.
** @Functions:			genPage()
				
*************************************************************
************************************************************/


/**
* Adds the pages to the interface.
*
*/
function genPage() {
	// Loop through each page and add it to the interface.
	for (var i = 1; i <= tPages; i++) {
		$("#pages_modal .page_list").append('<div class="bookmark_obj"  onclick="goToPage('+ i +'); $(\'#pages_modal\').modal(\'toggle\')" style="background: url(pages/singlePages/'+ i +'_files/7/0_0.jpg)"><div class="page_num"><span>'+ i +'</span></div></div>');
	}
	
	if (Modernizr.touch){
		$("#pages_modal .page_list").wrap('<div id="scroller" style="float: left" />');
		$("#scroller").wrap('<div id="wrapper" style="height: 300px; float: left" />');
		
		downloadScroll = new iScroll('wrapper', { vScroll: true, vScrollbar: true});
		setTimeout("downloadScroll.refresh()", 1000);
	}
}

/**
* Launches the pages modal.
*
*
*/
$('.icon_pages').click(function() {
	// Show the modal
	$('#pages_modal').modal('toggle');
	
	// Add all the pages to the modal.
	genPage();
	
	//Destroy content when closed.
	$('#pages_modal').on('hidden', function () {
		$('#pages_modal .page_list').empty();
	});
});