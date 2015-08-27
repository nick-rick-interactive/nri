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
            $sql = "SELECT
                      p.*,
                      i.url AS 'banner_url',
                      c.name AS 'client_name',
                      ci.url AS 'client_img_url'
                    FROM
                      projects AS p
                      LEFT JOIN clients AS c ON c.id = p.client
                      LEFT JOIN images AS ci ON ci.id = c.img
                      LEFT JOIN images AS i ON i.id = p.banner
                    GROUP BY p.id
                    ORDER BY p.timestamp
                    LIMIT 5";

            $res = mysqli_query($db,$sql);
            $out['projects'] = array();

            while($row = mysqli_fetch_assoc($res)){
                $tsql = "SELECT
                          t.*,
                          i.url AS 'tech_img'
                        FROM
                          technology AS t
                          LEFT JOIN images AS i ON t.img = i.id
                        WHERE EXISTS(
                          SELECT
                            *
                          FROM
                            assoc AS a
                          WHERE
                            a.key_field = 'projects' AND
                            a.key_val = '".$row['id']."' AND
                            a.value_field = 'technology' AND
                            a.value_val = t.id
                        )
                        GROUP BY t.id";

                $tres = mysqli_query($db,$tsql);
                $row['technologies'] = array();

                while($trow = mysqli_fetch_assoc($tres)){
                    array_push($row['technologies'],$trow);
                }

                array_push($out['projects'],$row);
            }
            break;
        case "work":
            $sql = "SELECT
                      p.*,
                      i.url AS 'banner_url',
                      c.name AS 'client_name',
                      c.url AS 'client_url',
                      ci.url AS 'client_img_url'
                    FROM
                      projects AS p
                      LEFT JOIN clients AS c ON c.id = p.client
                      LEFT JOIN images AS ci ON ci.id = c.img
                      LEFT JOIN images AS i ON i.id = p.banner
                    WHERE p.slug = '".$_GET['project']."'";

            $res = mysqli_query($db,$sql);
            $row = mysqli_fetch_assoc($res);

            $tsql = "SELECT
                          t.*,
                          i.url AS 'tech_img'
                        FROM
                          technology AS t
                          LEFT JOIN images AS i ON t.img = i.id
                        WHERE EXISTS(
                          SELECT
                            *
                          FROM
                            assoc AS a
                          WHERE
                            a.key_field = 'projects' AND
                            a.key_val = '".$row['id']."' AND
                            a.value_field = 'technology' AND
                            a.value_val = t.id
                        )
                        GROUP BY t.id";
            $tres = mysqli_query($db,$tsql);
            $row['technologies'] = array();

            while($trow = mysqli_fetch_assoc($tres)){
                array_push($row['technologies'],$trow);
            }

            $out['project'] = $row;
            break;
    }
}

echo json_encode($out);