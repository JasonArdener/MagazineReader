/************************************************************
*************************************************************

** Contributors:	Jason Ardener

** Handle goto page modal functionality.

*************************************************************
************************************************************/

$('.page-num').click(function() {
	loadGoTo();
});

$('.icon_goto').click(function() {
	loadGoTo();
});

function loadGoTo() {
	$('#goto_modal input').val(cPage);

	// Go to the page when goto button is pressed.
	$('#but_goto').click(function() {
		// Set the current page to the value of the input field.
		cPage = $('#goto_modal input').val();

		// Go to the page.
		goToPage(cPage);
	});

	// Go to the page when field is submitted.
	$('#goto_form').bind("submit", function(e) {
		// Set the current page to the value of the input field.
		cPage = $('#goto_modal input').val();

		// Go to the page.
		goToPage(cPage);
	});
	
	$('#goto_form input').change(function() {
		if ($(this).val() < 0) ($(this).val(1));
		if ($(this).val() > tPages) ($(this).val(tPages));
	});
	
	// Launch the modal.
	$('#goto_modal').modal('toggle');
}