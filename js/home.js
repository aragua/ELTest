function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}


function loadmainsection( url, params, methodget )
{
    var xhr = new XMLHttpRequest();

    if ( url === undefined || params === undefined )
    {
	url = "cgi/error.cgi";
	params = "function=getremotecontent";
	methodget=true;
    }
    
    if (methodget)
    {
	if ( params == null )
	    xhr.open('GET', url);
	else
	    xhr.open('GET', url+'?'+params);
    }
    else
	xhr.open('POST', url);
    //xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() 
    {
	{
	    var div = document.getElementById('main_section');
	    div.innerHTML = xhr.responseText;
	    //console.log(xhr.responseText);
	}
    }
    
    if (methodget)
	xhr.send(null);
    else
	xhr.send(params);
}

function loadsection( page_name )
{
    console.log(page_name);
    loadmainsection(page_name,null, true);
}

function loadtest( number, page_name )
{
    loadsection( page_name );
    createCookie("currenttest",number,1);
}

function loadreport()
{
    var xhr = new XMLHttpRequest();
    var url = "cgi/report.cgi";
    xhr.open('GET', url);
    
    xhr.onreadystatechange = function() 
    {
	{
	    var div = document.getElementById('main_section');
	    div.innerHTML = xhr.responseText;
	    console.log(xhr.responseText);
	    createCookie("currenttest",0,1);
	}
    }
    
    xhr.send(null);
}

function getdata()
{
    var cboxes = document.getElementsByName('tcb[]');
    var name = document.getElementById('name').value;
    var len = cboxes.length;
    var theme = "name=" + name + "&theme=";
    for (var i=0; i<len; i++) {
	if ( cboxes[i].checked ) {
            theme = theme + cboxes[i].value + "-";
	}
    }
    console.log(theme);
    return theme;
}

function start()
{
    var xhr = new XMLHttpRequest();
    var url = "cgi/generate.cgi?" + getdata();
    xhr.open('GET', url);
    
    xhr.onreadystatechange = function() 
    {
	{
	    var div = document.getElementById('wrapper');
	    div.innerHTML = xhr.responseText;
	    console.log(xhr.responseText);
	    createCookie("currenttest",0,1);
	}
    }
    
    xhr.send(null);
}

function submit(answer)
{
    var currenttest = readCookie("currenttest");
    if ( currenttest == 0 )
	console.log("error: submit" + answer);
    else
    {
	var link = document.getElementById("link"+currenttest);
	var xhr = new XMLHttpRequest();
	var url = "cgi/submission.cgi?" + answer;
	xhr.open('GET', url);
    
	xhr.onreadystatechange = function() 
	{
	    {
		var div = document.getElementById('main_section');
		div.innerHTML = xhr.responseText;
		console.log(xhr.responseText);
	    }
	}
	
	xhr.send(null)
	link.href="javascript:void(0)";
	//loadsection('Introduction.html');
    }
}

function qcm_submit(theme, test) {
    var radios = document.getElementsByName("qcm");
    var answer = theme + "-" + test + "=";
    for (var i = 0; i < radios.length; i++) {       
	if (radios[i].checked) {
	    answer = answer + i + "-";
	}
    }
    console.log(answer);
    
    submit(answer);
}

function code_compile()
{    
    var xhr = new XMLHttpRequest();

    params = document.getElementById('codetextarea').value;
    
    xhr.open('POST', 'cgi/compile.cgi');
    xhr.onreadystatechange = function() 
    {
	{
	    var ta = document.getElementById('outputtextarea');
	    ta.value = xhr.responseText;
	}
    }
    
    xhr.send(params);
}

function code_test ()
{
    var xhr = new XMLHttpRequest();
    xhr.open('GET', "cgi/testcode.cgi" );
    
    xhr.onreadystatechange = function() 
    {
	{
	    var ta = document.getElementById('testtextarea');
	    ta.value = xhr.responseText;
	}
    }
    
    xhr.send(null);
}

function code_submit(theme, test) {
    var currenttest = readCookie("currenttest");
    if ( currenttest == 0 )
	console.log("error: submit" + answer);
    else
    {
	var link = document.getElementById("link"+currenttest);
	var xhr = new XMLHttpRequest();
	params = theme + "-" + test + "=" + document.getElementById('codetextarea').value;
        xhr.open('POST', 'cgi/post_submission.cgi');
	xhr.onreadystatechange = function() 
	{
	    {
		var div = document.getElementById('main_section');
		div.innerHTML = xhr.responseText;
	    }
	}    
	xhr.send(params);
	link.href="javascript:void(0)";
    }
}

function text_submit(theme, test) {
    var currenttest = readCookie("currenttest");
    if ( currenttest == 0 )
	console.log("error: submit" + answer);
    else
    {
	var link = document.getElementById("link"+currenttest);
	var xhr = new XMLHttpRequest();
	params = theme + "-" + test + "=" + document.getElementById('answertextarea').value;
        xhr.open('POST', 'cgi/post_submission.cgi');
	xhr.onreadystatechange = function() 
	{
	    {
		var div = document.getElementById('main_section');
		div.innerHTML = xhr.responseText;
	    }
	}    
	xhr.send(params);
	link.href="javascript:void(0)";
    }
}

