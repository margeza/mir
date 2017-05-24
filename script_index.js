(function () {
    //
    // Wykoannie zapytania powinno poczekać aż wszystkie elementy HTML zostaną załadowane po to by mieć pewność że metoda getElementById rzeczywiście znajdzie potrzebny element
    // Gdyby tego nie bylo, mogłoby się zdarzyć, że otrzyma odpowiedź i nie znajdzie miejsca gdzie podpiąć pobrane dane
    //
    window.onload = function () {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "mockups/notify.json", true);
        xhttp.send();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var response = JSON.parse(this.responseText);

                var actualDateTime = new Date(response.actual.date).toLocaleString();
                var previousDateTime = new Date(response.previous.date).toLocaleString();

                var actualTemp = response.actual.TEMPERATURE;
                var previousTemp = response.previous.TEMPERATURE;

                var actualHumidity = response.actual.HUMIDITY;
                var previousHumidity = response.previous.HUMIDITY;

                var actualOpening = response.actual.DOOR_OPEN;
                var previousOpening = response.previous.DOOR_OPEN;

                var actualFlooding = response.actual.FLOOD;
                var previousFlooding = response.previous.FLOOD;

                var actualGasDetection = response.actual.SMOKE;
                var previousGasDetection = response.previous.SMOKE;
                // 
                // Dla zwykłego wyświetlania danych wystarczy innerHTML
                // Dla inputów, będzie trzeba wykorzystać parametr value
                //
                document.getElementById('actualDateTime').innerHTML = actualDateTime;
                document.getElementById('previousDateTime').innerHTML = previousDateTime;

                document.getElementById('actualTemp').innerHTML = actualTemp + " &degC";
                document.getElementById('previousTemp').innerHTML = previousTemp + " &degC";

                document.getElementById('actualHumidity').innerHTML = actualHumidity + "%";
                document.getElementById('previousHumidity').innerHTML = previousHumidity + "%";

                decideYesOrNo(actualOpening, 'actualOpening');
                decideYesOrNo(previousOpening, 'previousOpening');
                decideYesOrNo(actualFlooding, 'actualFlooding');
                decideYesOrNo(previousFlooding, 'previousFlooding');
                decideYesOrNo(actualGasDetection, 'actualGasDetection');
                decideYesOrNo(previousGasDetection, 'previousGasDetection');

            } else
            if (this.readyState == 4 && this.status == 401) {
                window.location = "login.html"
            }
        }


        var yes = '<i class="icon-ok tooltip"></i> <span class="tooltiptext">__DATE__</span>';
        var no = '<i class="icon-cancel"></i>';

        function decideYesOrNo(value, element) {
            if (value) {
                var dates = "";
                value.forEach(function (time) {
                    dates += new Date(time).toLocaleTimeString() + ", ";
                })
                document.getElementById(element).innerHTML = yes.replace("__DATE__", dates.substring(0, dates.length - 2));
			} else {
                document.getElementById(element).innerHTML = no;
            }
        }
    }
})();

