$("#search").bind("submit", function( e) {
	e.preventDefault();
	$('#search_modal').modal('toggle');
});

$(".icon_print").click(function() {
	//Sets up the modal
	$('#print_modal').modal('toggle');

	$('#but_print').click(function() {
		var myArray = [];		// regular array (add an optional integer
		myArray[0]="1";			// argument to control array's size)
		printPages(myArray);
	});
});

$('.icon_download').click(function() {
	$('#download_modal').modal('toggle');
	
	$('#but_download').click(function() {
		var myArray = [];		// regular array (add an optional integer
		myArray[0]="1";			// argument to control array's size)
		myArray[1]="2";			// argument to control array's size)
		myArray[2]="3";			// argument to control array's size)
		downloadPages(myArray);
	});
});

$('.icon_share').click(function() {
	$('#share_modal').modal('toggle');
});

$('.icon_bookmark').click(function() {
	$('#bookmark_modal').modal('toggle');
	popBookmarks();
});

function popBookmarks() {
	
	var bookmarks = getArray("bookmarks");
	$("#book_body").empty();
	
	if (bookmarks[0] !== "") {
		for (var i=0; i < bookmarks.length; i++) {
			$("#book_body").append('<div class="bookmark_obj" onclick="goToBookmark('+ bookmarks[i] +')" style="background: url(pages/singlePages/'+ bookmarks[i] +'_files/7/0_0.jpg)"><div class="page_num"><span>'+ bookmarks[i] +'</span></div><div class="close-icon" onclick="removePage('+ bookmarks[i] +')"><span>x</span></div></div>');
		}
	}
	
	$('#but_bookmark').click(function() {
		addPage();
		var bookmarks = getArray("bookmarks");	
		$("#book_body").empty();
		
		for (var i=0; i < bookmarks.length; i++) {
			$("#book_body").append('<div class="bookmark_obj" onclick="goToBookmark('+ bookmarks[i] +')" style="background: url(pages/singlePages/'+ bookmarks[i] +'_files/7/0_0.jpg)"><div class="page_num"><span>'+ bookmarks[i] +'</span></div><div class="close-icon" onclick="removePage('+ bookmarks[i] +')"><span>x</span></div></div>');
		}
	});

}


// Set the attributes of the share elements.
function shareAtts() {

	$("#share_modal span").attr("st_title", "Placeholder Title");
	$("#share_modal span").attr("st_image", "http://jasard.co.uk/misc/reader/pages/singlePages/1_files/8/0_0.jpg");

}