<?php

//$directory = $_GET['location'] || die("location not defined!");
$arrayContents = array();
for ($i=1; $i<=128; $i++) {

    for ($j=0; $j<11; $j++) {
    
        $directory = "pages/singlePages/".$i."_files/".$j."/";
        $dirContents = scandir($directory);
        
        
        foreach($dirContents as $image) {
            if (isImageFile($image)) {
                array_push($arrayContents, $directory.$image);
            }
        }
    }

}

print json_encode($arrayContents);

// Define function to confirm each
// filename is a valid image name/extension:
function isImageFile($src) {
    return preg_match('/^.+\.(gif|png|jpe?g|bmp|tif)$/i', $src);
}

?>