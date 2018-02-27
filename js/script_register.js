var captchaText = "";

// Clear selected select
function clearSelect(id)
{
	var select = document.getElementById(id);
	select.length = 0;
}
// Fill a select either with a range of numbers or a set of objects
function makeSelect(id, from, to, extra)
{
	var select = document.getElementById(id);

	if(from == 0 && to == 0 || from == null && to == null)
	{
		for(var i = 0; i < extra.length; ++i)
		{
			var opt = document.createElement("option");
			opt.text = extra[i];
			opt.value = extra[i];
			select.add(opt);
		}
	}
	else if(extra == null || extra == 0)
	{
		for(var i = from; i > to-1; --i)
		{
			if(i < 10 && i > -10)
				i = "0" + i;
			var opt = document.createElement("option");
			opt.text = i;
			opt.value = i;
			select.add(opt);
		}
	}
}

//
function getMonthNum(month)
{
	var i = 0;

	for(var key in months)
	{
		if(months[key] == month)
			return i;
		i++;
	}
}

//
function setFeb()
{
	var year = getId('year').value;

	days[1] = (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) ? 28 : 29;
}

//
function checkRegister()
{
	setId('error', "");
	document.getElementById('username').style.border = "1px solid #007700";
	document.getElementById('email').style.border = "1px solid #007700";
	document.getElementById('password').style.border = "1px solid #007700";
	document.getElementById('pwconfirm').style.border = "1px solid #007700";
	var error = 0;
	var err = "";
	var war = "";
	if(getId('password').value != getId('pwconfirm').value)
	{
		war += "<span style='color: #FFFF00;'>Passwords are not identical.</span><br>";
		document.getElementById('password').style.border = "1px solid #FFFF00";
		document.getElementById('pwconfirm').style.border = "1px solid #FFFF00";
		error = 1;
	}
	if(!checkEmail(document.getElementById('email').value))
	{
		if(document.getElementById('email').value != "")
		{
			war += "<span style='color: #FFFF00;'>E-Mail is not well formated.</span><br>";
			document.getElementById('email').style.border = "1px solid #FFFF00";
			error = 1;
		}
	}
	if(!checkCaptcha())
	{
		war += "<span style='color: #FFFF00;'>Captcha Text is Incorrect.</span><br>";
		document.getElementById('captchaVal').style.border = "1px solid #FFFF00";
		error = 1;
	}
	if(getId('username').value == "")
	{
		err += " username,";
		document.getElementById('username').style.border = "1px solid #FF0000";
		error = 2;
	}
	if(getId('email').value == "")
	{
		err += " email,";
		document.getElementById('email').style.border = "1px solid #FF0000";
		error = 2;
	}
	if(getId('password').value == "")
	{
		err += " password,";
		document.getElementById('password').style.border = "1px solid #FF0000";
		error = 2;
	}
	if(err[err.length-1] == ',')
	{
		err = err.substring(0, err.length - 1);
		err += ".";
	}
	if(error > 0)
	{
		if(error > 1)
			err = "<span style='color: #FF0000;'>Missing: " + err + "</span><br>";
		err += war;
		setId('error', err);
	}
	else
	{
		var i = getMonthNum(getId('month').value) + 1;
		if(i < 10 && i > -10)
				i = "0" + i;
		var date 	= getId('year').value + "-" + i + "-" + getId('day').value;
		register(getId('username').value, getId('password').value, getId('email').value,
							   getId('realname').value, date, getId('country').value);
	}
}

function checkEmail(email)
{
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function checkPassword()
{
	var meter = document.getElementsByName('meter')[0];
	var pw = document.getElementById('password').value;
	var strength = zxcvbn(pw).score;
	meter.id = "meter" + strength;
}

function checkPasswordConfirm()
{
	var pw = document.getElementById('password');
	var confirm = document.getElementById('pwconfirm');

	if(pw.value == confirm.value)
	{
		confirm.style.borderColor = "#007700";
	}
	else
	{
		confirm.style.borderColor = "#770000";
	}
}

function loadCaptcha()
{
	request = new XMLHttpRequest();
	request.open("POST", "../php/source/forum/captcha/makecaptcha.php", true);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.send(null);
	request.onreadystatechange = function()
		{
			if(request.readyState == 4 && request.status == 200)
			{
				document.getElementById('captchaVal').innerHTML = "";
				document.getElementById('registerregister').style.border = "1px solid #334422";
				var result = request.responseText.split("?IMG?");
				if(result.length > 1)
				{
					captchaText = result[0];
					document.getElementById('captcha').src = "data:image/png;base64," + result[1].replace(" ", "+");
				}
			}
		}
}

function checkCaptcha()
{
	var value = document.getElementById('captchaVal').value;
	if(value === captchaText)
	{
		document.getElementById('registerregister').style.border = "2px solid #007700";
		return true;
	}
	return false;
}