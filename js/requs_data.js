const key = "XaxKt+xaXb6phzK0spqQ5oVvT8T1T+zM0DFmIRK3Vlogtig8M1k0SOAqpNLQIbSoEs0scuOJe+603uKL9U8nSg==";
const defaultUrl = "https://apis.data.go.kr/1613000/BusRouteInfoInqireService";
const busInformUrl = defaultUrl + "/getCtyCodeList"
const busNumberInfoUrl = defaultUrl + "/getRouteNoList"

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