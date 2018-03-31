<?php
echo "test";
    require("include/lib/parser/code_parser.php");

    $parser = new CodeHighlighter("../html/test.html");
    echo "<html><head><link rel='stylesheet' href='../css/style_code.css'/></head><body>" . $parser->highlightCode("JavaScript") . "</body></html>";

?>
