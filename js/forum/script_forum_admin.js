function changeEntry()
{
    var request = new XMLHttpRequest();
    request.open("POST", "../php/source/script/script_forum_admin.php", true);
	request.setRequestHeader("Content-Type", "application/json");
	request.send(null);
	request.onreadystatechange = function()
        {
            if(request.status == 200 && request.readyState == 4)
            {

            }
        }
}