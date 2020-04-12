<?php
$url='https://api.dev.icam.org.pt/api/authenticate';
$data_array =  array(
      "username"=> "user",
      "password"=> "user"
);
$data=json_encode($data_array);
$curl = curl_init();
curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($curl, CURLOPT_HTTPHEADER, array(                                                                          
    'Content-Type: application/json',                                                                                
    'Content-Length: ' . strlen($data))                                                                       
); 
$result = curl_exec($curl);
if(!$result){die("Connection Failure");}
curl_close($curl);
$response = json_decode($result, true);

$id_token=$response['id_token'];


?>
