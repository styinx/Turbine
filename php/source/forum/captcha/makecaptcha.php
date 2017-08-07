<?php
    require(dirname(__FILE__) . "/../../../include/lib/captcha/captcha.php");

    header("Content-type: application/x-www-form-urlencoded");

	$captcha = new Captcha();
	$image = $captcha->makeCaptchaDefault();
	echo $image[1] . "?IMG?" . $image[0];
?>