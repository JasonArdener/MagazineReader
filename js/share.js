/************************************************************
*************************************************************

** Contributors:	Jason Ardener

** Handle share functionality.
** @Functions:	shareAtts()
				
*************************************************************
************************************************************/

/**
* Launch the share modal.
*
*/
$('.icon_share').click(function() {
	shareAtts();
	
	$('#share_modal').modal('toggle');
});

/**
* Set the share attributes.
*
*/
function shareAtts() {

	$("#share_modal span").attr("st_title", "Placeholder Title");
	$("#share_modal span").attr("st_image", "http://jasard.co.uk/misc/reader/pages/singlePages/1_files/8/0_0.jpg");

}