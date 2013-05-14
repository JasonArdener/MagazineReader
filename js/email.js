function makeEmailXML(to, from, body)
{
	var ret =	"<email>" +
						"<data name=" + "TEMP_NAME" + " copy=" + "TEMP_COPY" + " to=" + to + " body=" + body + " from=" + from + "edition=026e80f9-eefd-4fba-afd2-3803ca531493";
	return ret;
}

function sendXML()
{
	var xmlDocument = makeEmailXML("orhanc1@gmail.com", "orhanc1@gmail.com", "BODY TEXT");
	var httpRequest;

	httpRequest = new XMLHttpRequest();
	httpRequest.open('POST', "http://edition.pagesuite-professional.co.uk/email_friend.aspx", false);
	httpRequest.send(xmlDocument);
	console.log(xmlDocument);
}