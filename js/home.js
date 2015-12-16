var currenttest = 0;

function loadmainsection( url, params, methodget )
{
    var xhr = new XMLHttpRequest();

    if ( url === undefined || params === undefined )
    {
	url = "error.cgi";
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
	    console.log(xhr.responseText);
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
    currentest = number;
}

function gettheme()
{
    var cboxes = document.getElementsByName('tcb[]');
    var len = cboxes.length;
    var theme = "theme=";
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
    var url = "generate.cgi?" + gettheme();
    xhr.open('GET', url);
    
    xhr.onreadystatechange = function() 
    {
	{
	    var div = document.getElementById('wrapper');
	    div.innerHTML = xhr.responseText;
	    console.log(xhr.responseText);
	}
    }
    
    xhr.send(null);
}

function submit(answer)
{
    if ( currenttest == 0 )
	console.log("error: submit" + answer);
    else
    {
	var link = document.getElementsById("link"+currenttest);
	var xhr = new XMLHttpRequest();
	var url = "submission.cgi?" + answer;
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
    var answer = "answer=";
    for (var i = 0; i < radios.length; i++) {       
	if (radios[i].checked) {
	    answer = answer + i + "-";
	}
    }
    console.log(answer);
    
    submit(answer);
}

function code_submit(theme, test) {
    console.log("[" + theme + "]" + test + " : ");
    submit();
}

function text_submit(theme, test) {
    console.log("[" + theme + "]" + test + " : ");
    submit();
}

