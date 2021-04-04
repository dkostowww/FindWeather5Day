var OpenWeatherAppKey = "2c24436d9d9a44bc6d9eae99d7835bb9";


function getWeatherWithCityName() {
    var cityName = $('#city-name-input').val();
    var queryString =
        'http://api.openweathermap.org/data/2.5/forecast?q='
        + cityName + '&appid=' + OpenWeatherAppKey + '&units=metric';
    $.getJSON(queryString, function (results) {
        showWeatherData(results);
    }).fail(function (jqXHR) {
        $('#error-msg').show();
        $('#error-msg').text("Грешка при получване на данни. " + jqXHR.statusText);
    });
    return false;
}

function showWeatherData(results) {
    if (results) {
        $('#error-msg').hide();

        getGeneralDates(results);
    } else {
        $('#weather-data').hide();
        $('#error-msg').show();
        $('#error-msg').text("Грешка при получване на данни. ");
    }
}

function getWeatherWithGeolocation(lat, lon) {
    var queryString =
        'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + OpenWeatherAppKey + '&units=metric';
    $.getJSON(queryString, function (results) {
        showWeatherData(results);
    }).fail(function (jqXHR) {
        $('#error-msg').show();
        $('#error-msg').text("Грешка при получване на данни. " + jqXHR.statusText);
    });
    return false;
}

function getGeoLocation() {
    //Метод getCurrentPosition вика Cordova Geolocation API
    navigator.geolocation.getCurrentPosition(onGetLocationSuccess, onGetLocationError,{ enableHighAccuracy: true });
    $('#error-msg').show();
    $('#error-msg').text('Определяне на вашата локация ...');
    $('#get-location-btn').prop('disabled', true);
}

function onGetLocationSuccess(position) {
    //Изтегляне на информация за локацията на устройството от обекта position
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    getWeatherWithGeolocation(latitude, longitude);
}

function onGetLocationError(error) {
    $('#error-msg').text('Грешка при получаване на локация');
    $('#get-weather-btn').prop('disabled', false);
}

function getGeneralDates(results) {
    var dates = [];
    var firstDate = [];
    var secondDate = [];
    var thirdDate = [];
    var fourthDate = [];
    var fifthDate = [];

    for (var i = 0; i < results.cnt; i++) {
        var date = results.list[i].dt_txt.substring(0, 10);
        if (dates.indexOf(date) === -1) {
            dates.push(date);
        }
    }

    for (var i = 0; i < results.cnt; i++) {
        var data = results.list[i];
        var date = results.list[i].dt_txt.substring(0, 10);

        switch (date) {
            case dates[0]:
                firstDate.push(data);
                break;
            case dates[1]:
                secondDate.push(data);
                break;
            case dates[2]:
                thirdDate.push(data);
                break;
            case dates[3]:
                fourthDate.push(data);
                break;
            case dates[4]:
                fifthDate.push(data);
                break;
        }
    }

    assignFirstDateData.apply(this, firstDate);
    assignSecondDateData.apply(this, secondDate);
    assignThirdDateData.apply(this, thirdDate);
    assignFourthDateData.apply(this, fourthDate);
    assignFifthDateData.apply(this, fifthDate);

    $('#weather-data1').show();
    $('#title1').text("Дата: " + dates[0]);
    $('#weather-data2').show();
    $('#title2').text("Дата: " + dates[1]);
    $('#weather-data3').show();
    $('#title3').text("Дата: " + dates[2]);
    $('#weather-data4').show();
    $('#title4').text("Дата: " + dates[3]);
    $('#weather-data5').show();
    $('#title5').text("Дата: " + dates[4]);
    //$('#weather-data6').show();
    //$('#title6').text("Дата: " + dates[5]);
}

function assignFirstDateData(...data) {
    $(document).ready(function () {
        for (var i = 0; i < data.length; i++) {
            var block = '<br /><li>Период: ' + data[i].dt_txt + '<ul><li><span id="summary1"><span id="temperature1"></span>Температура: ' + data[i].main.temp + '°C <img src="" /></span></li><li>Вятър: <span id="wind1">' + data[i].wind.speed + '</span> възела</li><li>Влажност: <span id="humidity1">' + data[i].main.humidity + '</span> %</li><li>Видимост: <span id="visibility1">' + data[i].visibility + '</span></li></ul ></li>';
           $('#title1').append(block);
        }
    });
}
function assignSecondDateData(...data) {
    $(document).ready(function () {
        for (var i = 0; i < data.length; i++) {
            var block = '<br /><li>Период: ' + data[i].dt_txt + '<ul><li><span id="summary1"><span id="temperature1"></span>Температура: ' + data[i].main.temp + '°C <img src="" /></span></li><li>Вятър: <span id="wind1">' + data[i].wind.speed + '</span> възела</li><li>Влажност: <span id="humidity1">' + data[i].main.humidity + '</span> %</li><li>Видимост: <span id="visibility1">' + data[i].visibility + '</span></li></ul ></li>';
            $('#title2').append(block);
        }
    });
}
function assignThirdDateData(...data) {
    $(document).ready(function () {
        for (var i = 0; i < data.length; i++) {
            var block = '<br /><li>Период: ' + data[i].dt_txt + '<ul><li><span id="summary1"><span id="temperature1"></span>Температура: ' + data[i].main.temp + '°C <img src="" /></span></li><li>Вятър: <span id="wind1">' + data[i].wind.speed + '</span> възела</li><li>Влажност: <span id="humidity1">' + data[i].main.humidity + '</span> %</li><li>Видимост: <span id="visibility1">' + data[i].visibility + '</span></li></ul ></li>';
            $('#title3').append(block);
        }
    });
}
function assignFourthDateData(...data) {
    $(document).ready(function () {
        for (var i = 0; i < data.length; i++) {
            var block = '<br /><li>Период: ' + data[i].dt_txt + '<ul><li><span id="summary1"><span id="temperature1"></span>Температура: ' + data[i].main.temp + '°C <img src="" /></span></li><li>Вятър: <span id="wind1">' + data[i].wind.speed + '</span> възела</li><li>Влажност: <span id="humidity1">' + data[i].main.humidity + '</span> %</li><li>Видимост: <span id="visibility1">' + data[i].visibility + '</span></li></ul ></li>';
            $('#title4').append(block);
        }
    });
}
function assignFifthDateData(...data) {
    $(document).ready(function () {
        for (var i = 0; i < data.length; i++) {
            var block = '<br /><li>Период: ' + data[i].dt_txt + '<ul><li><span id="summary1"><span id="temperature1"></span>Температура: ' + data[i].main.temp + '°C <img src="" /></span></li><li>Вятър: <span id="wind1">' + data[i].wind.speed + '</span> възела</li><li>Влажност: <span id="humidity1">' + data[i].main.humidity + '</span> %</li><li>Видимост: <span id="visibility1">' + data[i].visibility + '</span></li></ul ></li>';
            $('#title5').append(block);
        }
    });
}