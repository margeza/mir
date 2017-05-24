function findInHistory()
{
    // Pobranie parametrów do wysłania
    var dateFromElements = document.getElementById('dateFrom').value.split("-");
    var timeFromElements = document.getElementById('timeFrom').value.split(":");
    var dateToElements = document.getElementById('dateTo').value.split("-");
    var timeToElements = document.getElementById('timeTo').value.split(":");

    var offset = new Date().getTimezoneOffset(); // minutes
    offset = offset * 60 * 1000; // milisecundes

    console.log("t =======   ", dateFromElements, timeFromElements, dateToElements, timeToElements, offset);

    var dataHistory = {
        dateFrom: new Date(dateFromElements[0], dateFromElements[1] - 1, dateFromElements[2], timeFromElements[0], timeFromElements[1]).getTime(),
        dateTo: new Date(dateToElements[0], dateToElements[1] - 1, dateToElements[2], timeToElements[0], timeToElements[1]).getTime()
    };
    var dataHistoryParams =
            "/" + dataHistory.dateFrom +
            "/" + dataHistory.dateTo;
    console.log("t =======   ", dataHistory)

    pobierzdane(dataHistoryParams);
    viewTheTable("#excelDataTable", dataHistoryParams);
}





function viewTheChart(selector, l, d1, d2) {

    var ctx = document.getElementById(selector);
    var data = {
        labels: l,
        datasets: [
            {
                yAxisID: "oy1",
                label: "Temperatura",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,1)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: d1,
                spanGaps: false

            },
            {
                yAxisID: "oy2",
                label: "Wilgotność",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(179,181,198,1)",
                borderColor: "rgba(179,181,198,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(179,181,198,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(179,181,198,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: d2,
                spanGaps: false

            }
        ]
    };
    var myLineChart = new Chart(ctx, {
        type: "line",
        data: data,
        options: {
            title: {
                display: true,
                text: 'Wykres wilgotności i temperatury',
                fontSize: 20
            },
            scales: {
                xAxes: [{
                        stacked: true
                    }],
                yAxes: [{
                        position: "left",
                        id: 'oy1',
                        stacked: false,
                        scaleLabel: {
                            display: true,
                            labelString: 'Temperatura'
                        }
                    }, {
                        position: "right",
                        id: 'oy2',
                        stacked: false,
                        scaleLabel: {
                            display: true,
                            labelString: 'Wilgotność'
                        }
                    }]
            }
        }

    });
}


function buildHtmlTable(myList, selector) {
    $(selector).empty();
//    var columns = addAllColumnHeaders(myList, selector);

    var yes = '<i class="icon-ok"></i>';
    var no = '<i class="icon-cancel"></i>';

    for (var i = 0; i < myList.length; i++) {
        var row$ = $('<tr/>');
        row$.append($('<td/>').html(new Date(myList[i].date).toLocaleString()));
        row$.append($('<td/>').html(myList[i].eventType == "SMOKE" ? yes : no));
        row$.append($('<td/>').html(myList[i].eventType == "DOOR_OPEN" ? yes : no));
        row$.append($('<td/>').html(myList[i].eventType == "FLOOD" ? yes : no));
        row$.append($('<td/>').html(myList[i].eventType == "ARMOR" && myList[i].eventValue == "true" ? yes : no));
        row$.append($('<td/>').html(myList[i].eventType == "ARMOR" && myList[i].eventValue == "false" ? yes : no));
        $(selector).append(row$);
    }
}

function viewTheTable(selector, dataHistory) {

    var xhttp = new XMLHttpRequest();
    //xhttp.open("GET", "/mockups/history.json" + dataHistory, true);
    xhttp.open("GET", "/mir/mockups/history.json", true);
    
	xhttp.send(null);

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            document.getElementById('showTable').setAttribute("class",
                    document.getElementById('showTable').getAttribute("class").replace("hidden", ""));
            var response = JSON.parse(this.responseText);
            buildHtmlTable(response, selector);
        }
    }
}



function tabliceDanych(myList) {
//    var columns = zliczKolumny(myList);
    var DateTime = new Array();
    var Temperature = new Array();
    var Humidity = new Array();
    for (var i = 0; i < myList.length; i++) {
        var dateValue = new Date(myList[i].date);
        DateTime.push(new Date(dateValue).toLocaleString());

        var tempValue = myList[i].TEMPERATURE;
        Temperature.push(tempValue);
        var humidityValue = myList[i].HUMIDITY;
        Humidity.push(humidityValue);
    }

    return [DateTime, Temperature, Humidity];
}

function pobierzdane(dataHistory) {
    var xhttp = new XMLHttpRequest();
    //xhttp.open("GET", "/mockups/chart.json" + dataHistory, true);
    xhttp.open("GET", "/mir/mockups/chart.json", true);
	xhttp.send(null);

    xhttp.onreadystatechange = function ()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            document.getElementById('showChart').setAttribute("class", "");
            var response = JSON.parse(this.responseText);
            var Tablice_danych = tabliceDanych(response);
            var data_czas = Tablice_danych[0];
            var temp = Tablice_danych[1];
            var wilg = Tablice_danych[2];
            viewTheChart("myChart", data_czas, temp, wilg);
        }
    }
}



//function addAllColumnHeaders(myList, selector)
//{
//    var columnSet = [];
//    var headerTr$ = $('<tr/>');
//
//    for (var i = 0; i < myList.length; i++) {
//        var rowHash = myList[i];
//        for (var key in rowHash) {
//            if ($.inArray(key, columnSet) == -1) {
//                columnSet.push(key);
//                //headerTr$.append($('<th/>').html(key));
//            }
//        }
//    }
//    $(selector).append(headerTr$);
//
//    return columnSet;
//}
//
//function zliczKolumny(myList)
//{
//    var columnSet = [];
//
//
//    for (var i = 0; i < myList.length; i++) {
//        var rowHash = myList[i];
//        for (var key in rowHash) {
//            if ($.inArray(key, columnSet) == -1) {
//                columnSet.push(key);
//
//            }
//        }
//    }
//
//
//    return columnSet;
//}

