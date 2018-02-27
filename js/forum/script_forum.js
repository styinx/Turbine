function pullTopic()
{
	var request = new XMLHttpRequest();
	request.open("POST", "../php/source/script/script_forum.php", true);
	request.setRequestHeader("Content-Type", "application/json");
	request.send(null);
	request.onreadystatechange = function()
		{
			if(request.readyState == 4 && request.status == 200)
			{

			}
		}
}

function pullEntry()
{

}