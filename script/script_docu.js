function pullDocuElements()
{
	var requestJSON = null;
//	requestJSON["db"] = "docu";
	var request = new XMLHttpRequest();
	request.open("POST", "php/src/script/script_docu.php" ,true);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
	request.send(null);
	request.onreadystatechange = function()
		{
			if(request.readyState == 4 && request.status == 200)
			{
				document.write(request.responseText);
			}
		}
}