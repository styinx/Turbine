<?php
    $DB_DEFAULT = array (
                            "forum"         => array(
                                                        array("id",         "date",         "visitors", "users",    "sections", "subsections",  "topics",   "entries",  "comments"),
                                                        array("INT(12)",    "TIMESTAMP",    "INT(12)",  "INT(12)",  "INT(12)",  "INT(12)",      "INT(12)",  "INT(12)",  "INT(12)"),
                                                        array("NOT NULL",   "NOT NULL",     "NOT NULL", "NOT NULL", "NOT NULL", "NOT NULL",     "NOT NULL", "NOT NULL", "NOT NULL"),
                                                        array("PRIMARY KEY","",             "",         "",         "",         "",             "",         "",         ""),
                                                        array("",           "",             "",         "",         "",         "",             "",         "",         ""),
                                                        array("",           "",             "",         "",         "",         "",             "",         "",         "")
                                                    ),
                            "section"       => array(
                                                        array("id",         "creation",     "name",         "description",      "users",    "subsections",  "topics",   "entries"),
                                                        array("INT(12)",    "TIMESTAMP",    "VARCHAR(150)", "VARCHAR(150)",     "INT(12)",  "INT(12)",      "INT(12)",  "INT(12)"),
                                                        array("NOT NULL",   "NOT NULL",     "NOT NULL",     "NOT NULL",         "NOT NULL", "NOT NULL",     "NOT NULL", "NOT NULL"),
                                                        array("PRIMARY KEY","",             "",             "",                 "",         "",             "",         ""),
                                                        array("",           "",             "",             "",                 "",         "",             "",         ""),
                                                        array("",           "",             "",             "",                 "",         "",             "",         "")
                                                    ),
                            "sub_section"   => array(
                                                        array("id",         "creation",     "name",         "description",      "users",    "section",      "topics",   "entries"),
                                                        array("INT(12)",    "TIMESTAMP",    "VARCHAR(150)", "VARCHAR(150)",     "INT(12)",  "INT(12)",      "INT(12)",  "INT(12)"),
                                                        array("NOT NULL",   "NOT NULL",     "NOT NULL",     "NOT NULL",         "NOT NULL", "NOT NULL",     "NOT NULL", "NOT NULL"),
                                                        array("PRIMARY KEY","",             "",             "",                 "",         "",             "",         ""),
                                                        array("",           "",             "",             "",                 "",         "",             "",         ""),
                                                        array("",           "",             "",             "",                 "",         "",             "",         "")
                                                    ),
                            "topic"         => array(
                                                        array("id",         "creation",     "name",         "user",     "users",    "section",      "subsection",   "entries"),
                                                        array("INT(12)",    "TIMESTAMP",    "VARCHAR(150)", "INT(12)",  "INT(12)",  "INT(12)",      "INT(12)",      "INT(12)"),
                                                        array("NOT NULL",   "NOT NULL",     "NOT NULL",     "NOT NULL", "NOT NULL", "NOT NULL",     "NOT NULL",     "NOT NULL"),
                                                        array("PRIMARY KEY","",             "",             "",         "",         "",             "",             ""),
                                                        array("",           "",             "",             "",         "",         "",             "",             ""),
                                                        array("",           "",             "",             "",         "",         "",             "",             "")
                                                    ),
                            "entry"         => array(
                                                        array("id",         "creation",     "name",         "user",     "subsection",   "topic",    "section",  "content"),
                                                        array("INT(12)",    "TIMESTAMP",    "VARCHAR(150)", "INT(12)",  "INT(12)",      "INT(12)",  "INT(12)",  "VARCHAR(2000)"),
                                                        array("NOT NULL",   "NOT NULL",     "NOT NULL",     "NOT NULL", "NOT NULL",     "NOT NULL", "NOT NULL", "NOT NULL"),
                                                        array("PRIMARY KEY","",             "",             "",         "",             "",         "",         ""),
                                                        array("",           "",             "",             "",         "",             "",         "",         ""),
                                                        array("",           "",             "",             "",         "",             "",         "",         "")
                                                    ),
                            "user"          => array(
                                                        array("id",         "creation",     "name",         "email",            "topics",   "entries"),
                                                        array("INT(12)",    "TIMESTAMP",    "VARCHAR(150)", "VARCHAR(150)",     "INT(12)",  "INT(12)"),
                                                        array("NOT NULL",   "NOT NULL",     "NOT NULL",     "NOT NULL",         "NOT NULL", "NOT NULL"),
                                                        array("PRIMARY KEY","",             "",             "",                 "",         ""),
                                                        array("",           "",             "",             "",                 "",         ""),
                                                        array("",           "",             "",             "",                 "",         "")
                                                    ),
                            "comment"       => array(
                                                        array("id",         "creation",     "user",         "content",          "topic",    "entry"),
                                                        array("INT(12)",    "TIMESTAMP",    "INT(12)",      "VARCHAR(2000)",    "INT(12)",  "INT(12)"),
                                                        array("NOT NULL",   "NOT NULL",     "NOT NULL",     "NOT NULL",         "NOT NULL", "NOT NULL"),
                                                        array("PRIMARY KEY","",             "",             "",                 "",         ""),
                                                        array("",           "",             "",             "",                 "",         ""),
                                                        array("",           "",             "",             "",                 "",         "")
                                                    ),
                            "news"         => array(
                                                        array("id",         "creation",     "title",            "content"),
                                                        array("INT(12)",    "TIMESTAMP",    "VARCHAR(150)",     "VARCHAR(2000)"),
                                                        array("NOT NULL",   "NOT NULL",     "NOT NULL",         "NOT NULL"),
                                                        array("PRIMARY KEY","",             "",                 ""),
                                                        array("",           "",             "",                 ""),
                                                        array("",           "",             "",                 "")
                                                    )
                        );
?>
