<?php
    $DB_DEFAULT = array (
                            "forum"         => array(
                                                        array("id",         "date",         "visitors", "users",    "sections", "subsections",  "topics",   "entries"),
                                                        array("INT(12)",    "TIMESTAMP",    "INT(12)",  "INT(12)",  "INT(12)",  "INT(12)",      "INT(12)",  "INT(12)"),
                                                        array("NOT NULL",   "NOT NULL",     "NOT NULL", "NOT NULL", "NOT NULL", "NOT NULL",     "NOT NULL", "NOT NULL"),
                                                        array("PRIMARY KEY","",             "",         "",         "",         "",             "",         ""),
                                                        array("",           "",             "",         "",         "",         "",             "",         ""),                                                        array("",           "",             "",         "",         "",         "",             "",         "")
                                                    ),
                            "section"       => array(
                                                        array("id",         "creation",     "name",         "users",    "subsections",  "topics",   "entries"),
                                                        array("INT(12)",    "TIMESTAMP",    "VARCHAR(150)", "INT(12)",  "INT(12)",      "INT(12)",  "INT(12)"),
                                                        array("NOT NULL",   "NOT NULL",     "NOT NULL",     "NOT NULL", "NOT NULL",     "NOT NULL", "NOT NULL"),
                                                        array("PRIMARY KEY","",             "",             "",         "",             "",         ""),
                                                        array("",           "",             "",             "",         "",             "",         ""),
                                                        array("",           "",             "",             "",         "",             "",         "")
                                                    ),
                            "sub_section"   => array(
                                                        array("id",         "creation",     "name",         "users",    "subsections",  "topics",   "entries"),
                                                        array("INT(12)",    "TIMESTAMP",    "VARCHAR(150)", "INT(12)",  "INT(12)",      "INT(12)",  "INT(12)"),
                                                        array("NOT NULL",   "NOT NULL",     "NOT NULL",     "NOT NULL", "NOT NULL",     "NOT NULL", "NOT NULL"),
                                                        array("PRIMARY KEY","",             "",             "",         "",             "",         ""),
                                                        array("",           "",             "",             "",         "",             "",         ""),
                                                        array("",           "",             "",             "",         "",             "",         "")
                                                    ),
                            "topic"         => array(
                                                        array("id",         "creation",     "name",         "users",    "subsections",  "topics",   "entries"),
                                                        array("INT(12)",    "TIMESTAMP",    "VARCHAR(150)", "INT(12)",  "INT(12)",      "INT(12)",  "INT(12)"),
                                                        array("NOT NULL",   "NOT NULL",     "NOT NULL",     "NOT NULL", "NOT NULL",     "NOT NULL", "NOT NULL"),
                                                        array("PRIMARY KEY","",             "",             "",         "",             "",         ""),
                                                        array("",           "",             "",             "",         "",             "",         ""),
                                                        array("",           "",             "",             "",         "",             "",         "")
                                                    ),
                            "entry"         => array(
                                                        array("id",         "creation",     "name",         "users",    "subsections",  "topics",   "entries"),
                                                        array("INT(12)",    "TIMESTAMP",    "VARCHAR(150)", "INT(12)",  "INT(12)",      "INT(12)",  "INT(12)"),
                                                        array("NOT NULL",   "NOT NULL",     "NOT NULL",     "NOT NULL", "NOT NULL",     "NOT NULL", "NOT NULL"),
                                                        array("PRIMARY KEY","",             "",             "",         "",             "",         ""),
                                                        array("",           "",             "",             "",         "",             "",         ""),
                                                        array("",           "",             "",             "",         "",             "",         "")
                                                    ),
                            "user"          => array(
                                                        array("id",         "creation",     "name",         "users",    "subsections",  "topics",   "entries"),
                                                        array("INT(12)",    "TIMESTAMP",    "VARCHAR(150)", "INT(12)",  "INT(12)",      "INT(12)",  "INT(12)"),
                                                        array("NOT NULL",   "NOT NULL",     "NOT NULL",     "NOT NULL", "NOT NULL",     "NOT NULL", "NOT NULL"),
                                                        array("PRIMARY KEY","",             "",             "",         "",             "",         ""),
                                                        array("",           "",             "",             "",         "",             "",         ""),
                                                        array("",           "",             "",             "",         "",             "",         "")
                                                    )
                        );
?>