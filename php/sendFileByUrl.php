<?php

$idInstance = $_GET['idInstance'];
$apiTokenInstance = $_GET['apiTokenInstance'];

$data = json_decode(file_get_contents('php://input'), true);
$chatId = $data['chatId'];
$fileUrl = $data['fileUrl'];

$url = "https://api.greenapi.com/waInstance{$idInstance}/sendFileByUrl/{$apiTokenInstance}";

$postData = array(
    'chatId' => $chatId,
    'urlFile' => $fileUrl,
    'fileName' => $fileUrl
);

$options = array(
    'http' => array(
        'header' => "Content-Type: application/json\r\n",
        'method' => 'POST',
        'content' => json_encode($postData)
    )
);

$context = stream_context_create($options);
$response = file_get_contents($url, false, $context);
echo $response;
?>
