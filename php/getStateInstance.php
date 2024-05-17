<?php

$idInstance = $_GET['idInstance'];
$apiTokenInstance = $_GET['apiTokenInstance'];

$url = "https://api.greenapi.com/waInstance{$idInstance}/getStateInstance/{$apiTokenInstance}";

$options = array(
    'http' => array(
        'header' => "Content-Type: application/json\r\n",
        'method' => 'GET'
    )
);

$context = stream_context_create($options);
$response = file_get_contents($url, false, $context);
echo $response;
?>