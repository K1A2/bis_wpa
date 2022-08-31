const key = "XaxKt+xaXb6phzK0spqQ5oVvT8T1T+zM0DFmIRK3Vlogtig8M1k0SOAqpNLQIbSoEs0scuOJe+603uKL9U8nSg==";
const defaultUrl = "https://apis.data.go.kr/1613000/BusRouteInfoInqireService";
const busInformUrl = defaultUrl + "/getCtyCodeList"
const busNumberInfoUrl = defaultUrl + "/getRouteNoList"
const busRouteInfoUrl = defaultUrl + "/getRouteAcctoThrghSttnList"
const busTinmeUrl = "https://apis.data.go.kr/1613000/ArvlInfoInqireService/getSttnAcctoSpcifyRouteBusArvlPrearngeInfoList"

$(document).ready(function() {
    // getPlaceList();
});

function getPlaceList() {
    $.get(
        busInformUrl,
        {serviceKey: key, _type: "json"},
        function(data, status) {
            if (status == "success") {
                let places = data["response"]["body"]["items"]["item"]
                places.sort(function compare(a, b) {
                    if ( a.cityname < b.cityname ){
                      return -1;
                    }
                    if ( a.cityname > b.cityname ){
                      return 1;
                    }
                    return 0;
                });
                places.forEach(function (el, index) {
                    let item = '<option value="' + el.citycode + '">' + el.cityname + '</option>'
                    $('#search-place-selector').append(item);
                });
            } else {
                alert("api가 응답하지 않습니다. 페이지를 새로고침 해주세요.")
            }
        }
    );
}

function searchBusByNumber() {
    let searchDatas = $('#search-form').serializeArray();
    let busPlace = searchDatas[0].value;
    let busNumber = searchDatas[1].value;
    if (busNumber === "") {
        alert("버스 번호를 입력해주세요.")
    } else {
        if(typeof(history.pushState) == 'function') {
            showSearchModal(busPlace, busNumber);
            history.pushState(null, null, '#search');
        } else {

        }
    }
}

function requestBusByNumber(busPlace, busNumber, page) {
    $.get(
        busNumberInfoUrl,
        {serviceKey: key, _type: "json",
        cityCode: busPlace, routeNo: busNumber,
        numOfRows: 10, pageNo: page},
        updateBusNumberList
    );
}

function requestRouteByBusId(busPlace, busId, page) {
    console.log(busId)
    $.get(
        busRouteInfoUrl,
        {serviceKey: key, _type: "json",
        cityCode: busPlace, routeId: busId,
        numOfRows: 25, pageNo: page},
        updateStationNumberList
    );
}

function addBusStation(placeNo, stationId, routeId, busNum, nextBusStation, nowBusStation, color) {
    $.get(
        busTinmeUrl,
        {serviceKey: key, _type: "json",
        cityCode: placeNo, routeId: routeId, nodeId: stationId, 
        numOfRows: 10, pageNo: 1},
        function(data, status) {
            if (status == "success") {
                console.log(data);
                let busDatas = data["response"]["body"]["items"]["item"]
                let totalCount = data["response"]["body"]["totalCount"]
                nextBusStation += ' 방면'
                if (busDatas !== undefined) {
                    console.log(busDatas)
                    if (Array.isArray(busDatas)) {
                        console.log('list')
                        let item = '<div class="layout-main layout-card"><div class="bus-title">'
                        item += '<div class="bus-number bus-number-card ' + color + '">' + busNum + '</div>'
                        item += '<div class="bus-station">' + nowBusStation + '</div></div>'
                        item += '<div class="bus-direction">' + nextBusStation + '</div><div class="bus-time-list">'
                        item += '<div class="bus-time-first bus-time-item"><div class="bus-time-left">' + Math.ceil(busDatas[0].arrtime / 60) + '분</div>'
                        item += '<div class="bus-statin-left">' + busDatas[0].arrprevstationcnt +'정류장</div>'
                        item += '<div class="bus-seat-left">' + '' + '</div></div>'
                        item += '<div class="bus-time-second bus-time-item"><div class="bus-time-left">' + Math.ceil(busDatas[1].arrtime / 60) + '분</div>'
                        item += '<div class="bus-statin-left">' + busDatas[1].arrprevstationcnt +'정류장</div>'
                        item += '<div class="bus-seat-left">' + '' + '</div></div></div></div>'
                        $('.layout-bus-times').append(item);
                    } else {
                        let item = '<div class="layout-main layout-card"><div class="bus-title">'
                        item += '<div class="bus-number bus-number-card ' + color + '">' + busNum + '</div>'
                        item += '<div class="bus-station">' + nowBusStation + '</div></div>'
                        item += '<div class="bus-direction">' + nextBusStation + '</div><div class="bus-time-list">'
                        item += '<div class="bus-time-first bus-time-item"><div class="bus-time-left">' + Math.ceil(busDatas.arrtime / 60) + '분</div>'
                        item += '<div class="bus-statin-left">' + busDatas.arrprevstationcnt +'정류장</div>'
                        item += '<div class="bus-seat-left">' + '' + '</div></div>'
                        item += '<div class="bus-time-second bus-time-item"><div class="bus-time-left"></div>'
                        item += '<div class="bus-statin-left"></div>'
                        item += '<div class="bus-seat-left"></div></div></div></div>'
                        $('.layout-bus-times').append(item);
                        console.log('finish')
                    }
                } else {
                    let item = '<div class="layout-main layout-card"><div class="bus-title">'
                    item += '<div class="bus-number bus-number-card ' + color + '">' + busNum + '</div>'
                    item += '<div class="bus-station">' + nowBusStation + '</div></div>'
                    item += '<div class="bus-direction">' + nextBusStation + '</div><div class="bus-time-list">'
                    item += '<div class="bus-time-first bus-time-item"><div class="bus-time-left"> - 분</div>'
                    item += '<div class="bus-statin-left"> - 정류장</div>'
                    item += '<div class="bus-seat-left">' + '' + '</div></div>'
                    item += '<div class="bus-time-second bus-time-item"><div class="bus-time-left"></div>'
                    item += '<div class="bus-statin-left"></div>'
                    item += '<div class="bus-seat-left"></div></div></div></div>'
                    $('.layout-bus-times').append(item);
                    totalCount = 0;
                }
            } else {
                alert("api가 응답하지 않습니다. 페이지를 새로고침 해주세요.")
            }
        }
    );
}
