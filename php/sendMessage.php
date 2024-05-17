<?php

$idInstance = $_GET['idInstance'];
$apiTokenInstance = $_GET['apiTokenInstance'];

$data = json_decode(file_get_contents('php://input'), true);
$chatId = $data['chatId'];
$message = $data['message'];

$url = "https://api.greenapi.com/waInstance{$idInstance}/sendMessage/{$apiTokenInstance}";

$postData = array(
    'chatId' => $chatId,
    'message' => $message
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
