function sendDataLog()
{
	window.location = "index.html"
    // Pobranie parametrów do wysłania
	/*
    var Login_loguj = document.getElementById('Login_loguj').value;
    var Password = document.getElementById('Password').value;

    // Adres na jaki wysyłane parametry
    var http = new XMLHttpRequest();
    var url = "/api/view/auth";  // np. auth
    var dataLog =
            {
                login: Login_loguj,
                password: Password,
            };

    console.log("t =======   ", dataLog)
    http.open("POST", url, true);

    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "appplication/json");
    http.setRequestHeader("Content-length", dataLog.length);

    http.onreadystatechange = function () {//Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            window.location = "index.html"
        } else if (http.readyState == 4 && http.status == 403) {
            alert("Błędne dane logowania");
        }
    }
	*/


    // Poniższy fragment musi zostać zakomentowany, do czasu, aż nie powstanie serwer, który będzie w stanie przyjąć te dane.

    //http.send(JSON.stringify(dataLog));

    // To zaś dla sprawdzenia czy dane zostały prawidłowo pobrane z formularzu
    //console.log(dataLog);
}

function sendDataReset()
{
    // Pobranie parametrów do wysłania
    var Login_resetuj = document.getElementById('Login_resetuj').value;
    var mail = document.getElementById('E-mail').value;

    // Adres na jaki wysyłane parametry
    var http = new XMLHttpRequest();
    var url = "/api/view/auth/remind";  // np. auth
    var dataLog =
            {
                login: Login_resetuj,
                mail: mail,
            };

    console.log("t =======   ", dataLog)
    http.open("POST", url, true);

    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "appplication/json");
    http.setRequestHeader("Content-length", dataLog.length);

    http.onreadystatechange = function () {//Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            alert(http.responseText);

        }
    }


    // Poniższy fragment musi zostać zakomentowany, do czasu, aż nie powstanie serwer, który będzie w stanie przyjąć te dane.

     http.send(JSON.stringify(dataLog));

    // To zaś dla sprawdzenia czy dane zostały prawidłowo pobrane z formularzu
    console.log(dataLog);
}

function setLogin(isTrue)
{
    console.log("Ustawiam logowanie na -> ", isTrue, document.getElementById('loguj'));
    if (isTrue) {
        document.getElementById('loguj').setAttribute("class", "");
        document.getElementById('resetuj').setAttribute("class", "hidden");
        fokus('Login_loguj');
    } else {
        document.getElementById('loguj').setAttribute("class", "hidden");
        document.getElementById('resetuj').setAttribute("class", "");
        fokus('Login_resetuj');
    }
}

function fokus(AElementID)
{
    var el = document.getElementById(AElementID);
    el.focus();
}


