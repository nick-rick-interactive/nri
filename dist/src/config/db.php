<?php
include("db.vars.inc");

$dbhost = (DB_HOST) ? DB_HOST : "";
$dbuser = (DB_USER) ? DB_USER : "";
$dbpassword = (DB_PASS) ? DB_PASS : "";
$dbdatabase = (DB_NAME) ? DB_NAME : "";

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