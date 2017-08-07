<?php
    header("Content-Type: application/json");

    $REQ = $_REQUEST;

    if(isset($REQ["action"]))
    {
        require_once(dirname(__FILE__) . "/../forum/manager.php");
        if($REQ["action"] == "create")
        {
            if($REQ["type"] == "user")
            {
                $user = array("name"        =>  $REQ["user_username"],
                              "firstname"   =>  $REQ["user_firstname"],
                              "lastname"    =>  $REQ["user_lastname"],
                              "birthday"    =>  $REQ["user_birthday"],
                              "access"      =>  $REQ["user_access"],
                              "role"        =>  $REQ["user_role"]);
                $forum->createUser($user);
            }
            else if($REQ["type"] == "news")
            {
                $news = array("name"        =>  $REQ["news_title"],
                              "content"     =>  $REQ["news_content"]);
                $forum->createNews($news);
            }
            else if($REQ["type"] == "section")
            {
                $section = array("name"        =>  $REQ["section_name"],
                                 "description" =>  $REQ["section_description"]);
                $forum->createSection($news);
            }
            else if($REQ["type"] == "subsection")
            {
                $subsection = array("name"          =>  $REQ["subsection_name"],
                                    "description"   =>  $REQ["subsection_description"]);
                $forum->createSubSection($subsection);
            }
            else if($REQ["type"] == "topic")
            {
                $topic = array("name"          =>  $REQ["topic_name"],
                               "description"   =>  $REQ["topic_description"]);
                $forum->createTopic($topic);
            }
            else if($REQ["type"] == "entry")
            {
                $entry = array("name"          =>  $REQ["entry_name"],
                               "description"   =>  $REQ["entry_content"]);
                $forum->createEntry($entry);
            }
        }
        else if(isset($_REQ["action"]) && $REQ["action"] == "update")
        {
            if($REQ["type"] == "user")
            {
                $user = array("name"        =>  $REQ["user_username"],
                              "firstname"   =>  $REQ["user_firstname"],
                              "lastname"    =>  $REQ["user_lastname"],
                              "birthday"    =>  $REQ["user_birthday"],
                              "access"      =>  $REQ["user_access"],
                              "role"        =>  $REQ["user_role"]);
                $forum->updateUser($user)
            }
            else if($REQ["type"] == "news")
            {

            }
            else if($REQ["type"] == "section")
            {

            }
            else if($REQ["type"] == "subsection")
            {

            }
            else if($REQ["type"] == "topic")
            {

            }
            else if($REQ["type"] == "entry")
            {

            }
        }
    }
?>