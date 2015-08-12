<?php
$dbhost = "";
$dbuser = "";
$dbpassword = "";
$dbdatabase = "";

$db = mysqli_connect($dbhost, $dbuser, $dbpassword);
if(!$db){
    $out['error'] = "couldn't connect to DB";
    die(json_encode($out));
}
if(!mysqli_select_db($db,$dbdatabase)){
    $out['error'] = mysqli_error($db);
    die(json_encode($out));
};
?>