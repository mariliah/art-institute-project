<?php
$url = "https://api.artic.edu/api/v1/artworks/search?query[term][is_public_domain]=true&limit=0";

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);

$response = curl_exec($ch);

if(curl_errno($ch)){
    echo 'Error: ' . curl_error($ch);
}

curl_close($ch);

// process the response
$responseArray = json_decode($response, true);

// use data in $responseArray as needed
?>