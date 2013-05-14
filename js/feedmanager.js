function getCount(){
	if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlcount=new XMLHttpRequest();
	}
	else{// code for IE6, IE5
		xmlcount=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlcount.open("GET","pages/list_pages.xml",false);
	xmlcount.send();
	pageCountXML=xmlcount.responseXML;
	tPages = (pageCountXML.getElementsByTagName("pages")[0].getAttribute("count"));
}