/**
 *
 */

function getId(id)
{
	return document.getElementById(id);
}

function getTag(id, all)
{
	if(all)
	{
		return document.getElementsByTagName(id);
	}
	else
	{
		return document.getElementsByTagName(id)[0];
	}
}

function getClass(id, all)
{
	if(all)
	{
		return document.getElementsByClassName(id);
	}
	else
	{
		return document.getElementsByClassName(id)[0];
	}
}

/**
 *
 */

var http_object =
	[
		"origin"	= "script.js",
		"target"	= "ajax.php",
		"header"	= ["Content-Type", "application/x-www-form-urlencoded"],
		"params"	= {"request" : true},
	]

function http(target, callback, data)
{
	var header = ["Content-Type", "application/x-www-form-urlencoded"];
	if(data["header"] != [])
	{
		header = [data["header"][0], data["header"][1]];
	}
	var params = null;
	if(data["params"] != {})
	{
		for(var param in data["params"])
		{
			params += param + data["params"][param] + "&";
		}
		params = param.substring(0, param.length - 1);
	}

	var request = new XMLHttpRequest();
	request.open("POST", target, true);
	request.setRequestHeader("", "");
	request.send(params);
	request.onreadystatechange = function()
		{
			if(request.readyState == 4 && request.status == 200)
			{
				callback();
			}
		}
}