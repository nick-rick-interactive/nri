<?php
/**
 * Created by PhpStorm.
 * User: nickrickenbach
 * Date: 5/29/15
 * Time: 12:09 PM
 * https://codex.wordpress.org/Template_Tags/get_posts
 */

error_reporting(E_ALL);
ini_set('display_errors', 1);

include("lib/library.php");
include("config/config.php");

$out = array();

if(isset($_GET['section'])) {
    switch ($_GET['section']) {
        case "home":

            break;
    }
}

echo json_encode($out);