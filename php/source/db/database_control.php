<?php

    require_once(dirname(__FILE__) . "/../../include/lib/db/database.php");

    $URL = $_REQUEST;

    if(isset($URL["host"]) && isset($URL["user"]) && isset($URL["pw"]))
    {
        $db = new DB($URL["host"], $URL["user"], $URL["pw"], "");

        if($URL["action"] == "show")
        {
            echo $db->showDatabase($URL["db"]);
        }
        else if($URL["action"] == "create")
        {
            if($db->createDatabase($URL["db"]))
            {
                echo "created<br>";
            }
        }
        else if($URL["action"] == "drop")
        {
            if($db->dropDatabase($URL["db"]))
            {
                echo "deleted<br>";
            }
        }
    }
    else
    {
        $html = "<table>"
            . "<tr><td>host</td></tr>"
            . "<tr><td>user</td></tr>"
            . "<tr><td>pw</td></tr>"
            . "<tr><td>&nbsp;</td></tr>"
            . "<tr><td>action</td><td>show|create|drop</td></tr>"
            . "<tr><td>db</td></tr>"
            . "</table>";
        echo $html;
    }
?>
