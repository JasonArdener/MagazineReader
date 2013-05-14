<?php 
	switch ($_GET['type']) {
		case 'search':
			$q = $_GET['q'];
			$eid = $_GET['eid'];
			$t = $_GET['t'];
			$data = file_get_contents("http://html5.pagesuite-professional.co.uk/search.aspx?q=". $q ."&eid=". $eid ."&t=". $t); 
			print $data;
			break;
		case 'links':
			$eid = $_GET['eid'];
			$p = $_GET['pnum'];
			$data = file_get_contents("http://edition.pagesuite-professional.co.uk/reader6/get_pxml.aspx?edid=".$eid."&pnum=" .$p); 
			print $data;
			break;
	}
?>