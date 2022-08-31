let key = "XaxKt+xaXb6phzK0spqQ5oVvT8T1T+zM0DFmIRK3Vlogtig8M1k0SOAqpNLQIbSoEs0scuOJe+603uKL9U8nSg==";
let busInformUrl = "https://apis.data.go.kr/1613000/BusRouteInfoInqireService/getCtyCodeList"

$(document).ready(function() {
    getPlaceList();
});

function getPlaceList() {
    $.get(
        busInformUrl,
        {serviceKey: key, _type: "json"},
        function(data, status) {
            if (status == "success") {
                let places = data["response"]["body"]["items"]["item"]
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