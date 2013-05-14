/************************************************************
*************************************************************

** Contributors:	Jason Ardener

** Handle links functionality.
** @Functions:	getLinks(),    createLinkOverlay(ratioLeft, ratioTop, ratioWidth, ratioHeight, linkTo, bgAlpha, bgColour)
				
*************************************************************
************************************************************/

/**
* Grabs the links from the XML and calls createLinkOverlay() for each link.
*
* @TODO Horizontal links.
* @TODO The y positioning of links is broken.
*
* @var pageLinksXML		The parsed XML.
* @var mediaType		The type of media the item is.
*
* @var ratioLeft		Ratio to the page to position the left of the overlay.
* @var ratioTop			Ratio to the page to position the top of the overlay.
* @var ratioWidth		Ratio to the page the width of the overlay.
* @var ratioHeight		Ratio to the page the height of the overlay.
* @var target			The link URL target of the overlay.
* @var bgAlpha			The alpha of the background of the overlay.
* @var bgColour			The colour of the background of the overlay.
*
*/
var xml1;
var xml2;
function getMedia() {
	var pageLinksXML;
	var tPage = cPage;

	
	// Grab the XML.
	$.ajax({
		type: "GET",
		url: "search.php?type=links&eid="+eid+"&pnum="+tPage,
		dataType: "xml",
		success: xml1Store
	});
	
	function xml1Store(xml)
	{
		xml1 = xml;
		if((viewOrientation == "vertical") || (tPage == 1))
		{
			singlePageLinkParser(xml1);
		}
		else
		{
			tPage = tPage + 1;
			// Grab the XML.
			$.ajax({
				type: "GET",
				url: "search.php?type=links&eid="+eid+"&pnum="+tPage,
				dataType: "xml",
				success: xml2Store
			});
		}
	}
	
	function xml2Store(xml, textStatus, jqXHR)
	{
		xml2 = xml;
		$(xml1).find("itemData").each(function()
		{
			var mediaType = $($(this)).find("type").text();
			// Different functionality for different media.
			switch (mediaType) {
				case "LINK" :
					var ratioLeft 	= ($($(this)).find("xpos").text() / 200); 
					var ratioTop 	= ($($(this)).find("ypos").text() / 160); //WIZARD
					var ratioWidth 	= ($($(this)).find("width").text() / 200); 
					var ratioHeight = ($($(this)).find("height").text() / 200);
					var target 		= ($($(this)).find("target").text());
					var bgAlpha 	= ($($(this)).find("bgAlpha").text());
					var bgColour 	= ($($(this)).find("bgColour").text());
					
					// Create the overlay for the link.
					createLinkOverlay(ratioLeft, ratioTop, ratioWidth, ratioHeight, target, bgAlpha, bgColour);
					break;
			}
		});
		$(xml2).find("itemData").each(function()
		{
			var mediaType = $($(this)).find("type").text();
			// Different functionality for different media.
			switch (mediaType) {
				case "LINK" :
					var ratioLeft 	= ($($(this)).find("xpos").text() / 200) +0.5; 
					var ratioTop 	= ($($(this)).find("ypos").text() / 160); //WIZARD
					var ratioWidth 	= ($($(this)).find("width").text() / 200); 
					var ratioHeight = ($($(this)).find("height").text() / 200);
					var target 		= ($($(this)).find("target").text());
					var bgAlpha 	= ($($(this)).find("bgAlpha").text());
					var bgColour 	= ($($(this)).find("bgColour").text());
					
					// Create the overlay for the link.
					createLinkOverlay(ratioLeft, ratioTop, ratioWidth, ratioHeight, target, bgAlpha, bgColour);
					break;
			}
		});
	}
	
	// Process the XML and add to the interface.
	function singlePageLinkParser(xml) {
		// Search for each data item in the XML.
		$(xml).find("itemData").each(function()
		{
			var mediaType = $($(this)).find("type").text();
			// Different functionality for different media.
			switch (mediaType) {
				case "LINK" :
					var ratioLeft	= ($($(this)).find("xpos").text() / 100);
					var ratioTop	= ($($(this)).find("ypos").text() / 80); //WIZARD
					var ratioWidth	= ($($(this)).find("width").text() / 100);
					var ratioHeight = ($($(this)).find("height").text() / 100);
					var target		= ($($(this)).find("target").text());
					var bgAlpha		= ($($(this)).find("bgAlpha").text());
					var bgColour	= ($($(this)).find("bgColour").text());
					
					// Create the overlay for the link.
					createLinkOverlay(ratioLeft, ratioTop, ratioWidth, ratioHeight, target, bgAlpha, bgColour);
					break;
				case "VIDEO":
					var ratioLeft	= ($($(this)).find("xpos").text() / 100);
					var ratioTop	= ($($(this)).find("ypos").text() / 80); //WIZARD
					var ratioWidth	= ($($(this)).find("width").text() / 100);
					var ratioHeight = ($($(this)).find("height").text() / 100);
					var param1		= ($($(this)).find("param1").text());
					var bgAlpha		= ($($(this)).find("bgAlpha").text());
					var bgColour	= ($($(this)).find("bgColour").text());
				
					// Create the overlay for the link.
					createVideoOverlay(ratioLeft, ratioTop, ratioWidth, ratioHeight, param1, bgAlpha, bgColour);
					break;
			}
		});
	}
}

function updateVideo(){
	
}

/**
* Adds a video overlay to the reader
*/
function createVideoOverlay(ratioLeft, ratioTop, ratioWidth, ratioHeight, param1, bgAlpha, bgColour)
{
	var div = new Seadragon.Button("Video", null, null, null, null, null, alert, null, null, null );
	var rect = new Seadragon.Rect(ratioLeft, ratioTop, ratioWidth, ratioHeight);
	function getWidth()
	{
		return this.width;
	}
	// Set the style of the link.
	div.elmt.videoLink = param1;
	
	if (param1.match(/\/v\//)) {
		param1 = param1.replace(/\/v\//, "/embed/");
	}
	
	div.elmt.innerHTML = "<iframe width=\"100%\" height=\"100%\" src=\""+param1+"\" frameborder=\"0\" allowfullscreen></iframe>";

	// Add the overlay.
	viewer.drawer.addOverlay(div.elmt, rect);
}


/**
* Adds a link overlay to the reader.
*
* @var linkFunction		Function for opening up links in a new window.
* @var div				The button to be added to a rectangle.
* @var rect				The element that is added to the reader.
*
* @param ratioLeft		Ratio to the page to position the left of the overlay.
* @param ratioTop		Ratio to the page to position the top of the overlay.
* @param ratioWidth		Ratio to the page the width of the overlay.
* @param ratioHeight	Ratio to the page the height of the overlay.
* @param target			The link URL target of the overlay.
* @param bgAlpha		The alpha of the background of the overlay.
* @param bgColour		The colour of the background of the overlay.
*
*/
function createLinkOverlay(ratioLeft, ratioTop, ratioWidth, ratioHeight, linkTo, bgAlpha, bgColour) {
	var linkFunction = function(){
		window.open(linkTo, "Linked from PAGESUITE");
	};
	
	var div = new Seadragon.Button("Click to go", null, null, null, null, null, linkFunction, null, null, null );
	var rect = new Seadragon.Rect(ratioLeft, ratioTop, ratioWidth, ratioHeight);

	// Set the style of the link.
	div.elmt.style.background = "#" + bgColour;
	div.elmt.style.opacity = bgAlpha;
	div.elmt.className="overlay";
	
	// Add the overlay.
	viewer.drawer.addOverlay(div.elmt, rect);
}