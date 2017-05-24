(function () {
    //
    // Wykoannie zapytania powinno poczekać aż wszystkie elementy HTML zostaną załadowane po to by mieć pewność że metoda getElementById rzeczywiście znajdzie potrzebny element
    // Gdyby tego nie bylo, mogłoby się zdarzyć, że otrzyma odpowiedź i nie znajdzie miejsca gdzie podpiąć pobrane dane
    //
    window.onload = function () {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "/mockups/user.json", true);
        xhttp.send();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log("T == ", this);
                var response = JSON.parse(this.responseText);
                console.log("T == ==", response);

                var name = response.firstName;
                var surname = response.lastName;
                var phoneNumber = response.phone;
                var mail = response.email;

                var powiadomienieTemp = response.allows.TEMPERATURE;
                var powiadomienieWilg = response.allows.HUMIDITY;
                var powiadomienieZal = response.allows.SMOKE;
                var powiadomienieDrzwi = response.allows.DOOR_OPEN;
                var powiadomienieGaz = response.allows.FLOOD;


                var kontrolneTempOd = response.controlData.TEMPERATURE.min;
                var kontrolneTempDo = response.controlData.TEMPERATURE.max;

                var kontrolneWilgOd = response.controlData.HUMIDITY.min;
                var kontrolneWilgDo = response.controlData.HUMIDITY.max;

                var gdziePowiadomienieTel = response.informMethod.PHONE;
                var gdziePowiadomienieMail = response.informMethod.MAIL;


                //Dane osobowe i konfiguracja powiadomień:
                document.getElementById('name').setAttribute("value", name);
                document.getElementById('surname').setAttribute("value", surname);
                document.getElementById('phoneNumber').setAttribute("value", phoneNumber);
                document.getElementById('e-mail').setAttribute("value", mail);

                //Chcę otrzymywać powiadomienia o:
                if (powiadomienieTemp)
                    document.getElementById("powiadomienieTemp").setAttribute("class", "kolo_klik");
                if (powiadomienieWilg)
                    document.getElementById("powiadomienieWilg").setAttribute("class", "kolo_klik");
                if (powiadomienieZal)
                    document.getElementById("powiadomienieZal").setAttribute("class", "kolo_klik");
                if (powiadomienieDrzwi)
                    document.getElementById("powiadomienieDrzwi").setAttribute("class", "kolo_klik");
                if (powiadomienieGaz)
                    document.getElementById("powiadomienieGaz").setAttribute("class", "kolo_klik");


                //Kiedy powiadomić Cię o przekroczeniu stanu krytycznego?
                document.getElementById('kontrolneTempOd').setAttribute("value", kontrolneTempOd);
                document.getElementById('kontrolneTempDo').setAttribute("value", kontrolneTempDo);

                document.getElementById('kontrolneWilgOd').setAttribute("value", kontrolneWilgOd);
                document.getElementById('kontrolneWilgDo').setAttribute("value", kontrolneWilgDo);


                //Gdzie chcesz otrzymywać powiadomienia?
                if (gdziePowiadomienieTel)
                    document.getElementById("gdziePowiadomienieTel").setAttribute("class", "kolo_klik");
                if (gdziePowiadomienieMail)
                    document.getElementById("gdziePowiadomienieMail").setAttribute("class", "kolo_klik");
            } else if (this.readyState == 4 && this.status == 401) {
                window.location = "login.html"
            }
        }
    }
})();

function sendData()
{
    // Pobranie parametrów do wysłania
    var name = document.getElementById('name').value;
    var surname = document.getElementById('surname').value;
    var phoneNumber = document.getElementById('phoneNumber').value;
    var mail = document.getElementById('e-mail').value;

    var powiadomienieTemp = document.getElementById('powiadomienieTemp').className.indexOf("kolo_klik") >= 0;
    var powiadomienieWilg = document.getElementById('powiadomienieWilg').className.indexOf("kolo_klik") >= 0;
    var powiadomienieZal = document.getElementById('powiadomienieZal').className.indexOf("kolo_klik") >= 0;
    var powiadomienieDrzwi = document.getElementById('powiadomienieDrzwi').className.indexOf("kolo_klik") >= 0;
    var powiadomienieGaz = document.getElementById('powiadomienieGaz').className.indexOf("kolo_klik") >= 0;


    var kontrolneTempOd = document.getElementById('kontrolneTempOd').value;
    var kontrolneTempDo = document.getElementById('kontrolneTempDo').value;

    var kontrolneWilgOd = document.getElementById('kontrolneWilgOd').value;
    var kontrolneWilgDo = document.getElementById('kontrolneWilgDo').value;

    var gdziePowiadomienieTel = document.getElementById('gdziePowiadomienieTel').className.indexOf("kolo_klik") >= 0;
    var gdziePowiadomienieMail = document.getElementById('gdziePowiadomienieMail').className.indexOf("kolo_klik") >= 0;


    // Adres na jaki wysyłane parametry
    var url = "/api/view/user/update";  // np. auth
    var params =
            {
                firstName: name,
                lastName: surname,
                phone: phoneNumber,
                mail: mail,
                allows:
                        {
                            TEMPERATURE: powiadomienieTemp,
                            HUMIDITY: powiadomienieWilg,
                            SMOKE: powiadomienieGaz,
                            DOOR_OPEN: powiadomienieDrzwi,
                            FLOOD: powiadomienieZal
                        },
                controlData:
                        {
                            TEMPERATURE:
                                    {
                                        min: parseFloat(kontrolneTempOd),
                                        max: parseFloat(kontrolneTempDo)
                                    },
                            HUMIDITY:
                                    {
                                        min: parseFloat(kontrolneWilgOd),
                                        max: parseFloat(kontrolneWilgDo)
                                    }
                        },
                informMethod:
                        {
                            PHONE: gdziePowiadomienieTel,
                            MAIL: gdziePowiadomienieMail
                        }
            };

    console.log("t =======   ", params)
    var http = new XMLHttpRequest();
    http.open("PUT", url, true);

    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "appplication/json");
    http.setRequestHeader("Content-length", params.length);

    http.onreadystatechange = function () {//Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            alert(http.responseText);
        }
    }


    // Poniższy fragment musi zostać zakomentowany, do czasu, aż nie powstanie serwer, który będzie w stanie przyjąć te dane.

    http.send(JSON.stringify(params));

    // To zaś dla sprawdzenia czy dane zostały prawidłowo pobrane z formularzu
    console.log(params);
}

function sendNewPassword()
{
    // Pobranie parametrów do wysłania
    var oldPassword = document.getElementById('oldPassword').value;
    var newPassword1 = document.getElementById('newPassword1').value;
    var newPassword2 = document.getElementById('newPassword2').value;

    if (newPassword1 == newPassword2)    {
        // Adres na jaki wysyłane parametry
        var url = "/api/view/user";  // np. auth
        var passwords = {
            oldPassword: oldPassword,
            newPassword: newPassword1,
            newPassword2: newPassword2,
        };

        console.log("t =======   ", passwords)
        var http = new XMLHttpRequest();
        http.open("POST", url, true);

        //Send the proper header information along with the request
        http.setRequestHeader("Content-type", "appplication/json");
        http.setRequestHeader("Content-length", passwords.length);

        http.onreadystatechange = function () {//Call a function when the state changes.
            if (http.readyState == 4 && http.status == 200) {
                alert(http.responseText);
            } else if (this.readyState == 4 && this.status == 303) {
                window.location = "login.html"
            }
        }


        // Poniższy fragment musi zostać zakomentowany, do czasu, aż nie powstanie serwer, który będzie w stanie przyjąć te dane.
        http.send(JSON.stringify(passwords));

        // To zaś dla sprawdzenia czy dane zostały prawidłowo pobrane z formularzu
        console.log(passwords);
    } else
    {
        alert("Pole 'Powtórzone nowe hasło' posiada inne hasło niż pole 'Nowe hasło'. Proszę podnownie wpisać hasło");
    }
}

function kolo_klik(id_element)
{
    var class_element = document.getElementById(id_element).getAttribute("class");

    if (class_element == "kolo")
        document.getElementById(id_element).setAttribute("class", "kolo_klik");
    if (class_element == "kolo_klik")
        document.getElementById(id_element).setAttribute("class", "kolo");
}

