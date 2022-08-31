const body = document.querySelector('body');
const modal = document.querySelector('.modal');

var page = 1;
var routPage = 1;

var busPlace = 0;
var nowBusId = '';
var busNumber = 0;

var totalCount = 0;
var totalRouteCount = 0;

var pageNow = 'bus';

function initModal() {
    page = 1;
    routPage = 1;
    busPlace = 0;
    nowBusId = '';
    busNumber = 0;
    totalCount = 0;
    totalRouteCount = 0;
    pageNow = 'bus';
    modalTitle.html('버스 선택');
    $('.modal-station-list').css('display', 'none');
    $('.modal-bus-list').css('display', 'flex');
    $('.text-no').text('취소');
}

let modalTitle = $('.modal-title')

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeSearchModal();
    }
});

document.querySelector('.modal-button-back').addEventListener('click', (event) => {
    console.log(pageNow);
    if (pageNow === 'bus') {
        closeSearchModal();
    } else {
        pageNow = 'bus';
        $('.modal-station-list').css('display', 'none');
        $('.modal-bus-list').css('display', 'flex');
        $('.text-no').text('취소');
        modalTitle.html('버스 선택');
        $('.modal-station-list').empty();
    }
});

$('.modal-bus-list').on('scroll', function() {
    if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
        if (totalCount <= 10 * page) {
            console.log("no more")
            return;
        }
        page += 1
        requestBusByNumber(busPlace, busNumber, page);
    }
})

$('.modal-station-list').on('scroll', function() {
    if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
        console.log('ndfj')
        if (totalRouteCount <= 25 * routPage) {
            console.log("no more")
            return;
        }
        routPage += 1
        requestRouteByBusId(busPlace, nowBusId, routPage);
    }
})

$(document).on('click', '.bus-list-item' , function() {
    // alert($(this).children('.bus-list-number').text());
    // alert($(this).attr('busId'));
    if (pageNow == 'bus') {
        nowBusId = $(this).attr('busId');
        console.log(nowBusId)
        console.log($(this).attr('busId'))
        routPage = 1;
        totalRouteCount = 0;
        const color = $(this).children('.bus-list-number').attr('class').split(' ')[1]
        console.log(color)
        modalTitle.html('<span class="' + color + '">' + $(this).children('.bus-list-number').text() + '</span>  정류장 선택');
        $('.modal-station-list').css('display', 'flex');
        $('.modal-bus-list').css('display', 'none');
        $('.text-no').text('뒤로가기');
        pageNow = 'station';
        requestRouteByBusId(busPlace, nowBusId, routPage);
    } else {
        let busNum = modalTitle.children('span').text()
        const next = $(this).next().children('.bus-list-number');
        var nextStation = '';
        nextStation = next.text();
        if (nextStation === '') {
            nextStation = '종점'
        }
        console.log(nextStation);
        const color = modalTitle.children('span').attr('class')
        addBusStation(busPlace, $(this).attr('stationId'), nowBusId, busNum, nextStation, $(this).children('.bus-list-number').text(), color);
        closeSearchModal()
    }
});

function getBusColor(bustype) {
    if (bustype.includes('일반') || bustype.includes('지선') || bustype.includes('순환')) {
        return 'bus-ilban'
    } else if (bustype.includes('광역') || bustype.includes('직행')) {
        return 'bus-ganhuk'
    } else if (bustype.includes('마을')) {
        return 'bus-maul'
    } else if (bustype.includes('급행')) {
        return 'bus-geephang'
    } else {
        return 'bus-gansun'
    }
}

function showSearchModal(busPlace, busNumber) {
    $('.modal-bus-list').empty();
    $('.modal-station-list').empty();
    initModal();
    modal.classList.toggle('show');
    if (modal.classList.contains('show')) {
        body.style.overflow = 'hidden';
    }
    $('.modal-button-next').css('display', 'none');
    page = 1;
    this.busPlace = busPlace;
    this.busNumber = busNumber;

    requestBusByNumber(busPlace, busNumber, page);
}

function closeSearchModal() {
    $('.modal-bus-list').empty();
    $('.modal-station-list').empty();
    modal.classList.toggle('show');
    if (!modal.classList.contains('show')) {
        body.style.overflow = 'auto';
    }
    $('.modal-button-next').css('display', '');
}

function updateBusNumberList(data, status) {
    if (status == "success") {
        console.log(data);
        let busDatas = data["response"]["body"]["items"]["item"]
        totalCount = data["response"]["body"]["totalCount"]
        if (busDatas !== undefined) {
            busDatas.forEach(function (el, index) {
                let item = '<div class="bus-list-item" busId="' + el.routeid + '">'
                item += '<div class="bus-list-number ' + getBusColor(el.routetp) + '">' + el.routeno + '</div>'
                item += '<div class="bus-list-section">' + el.startnodenm + ' - ' +  el.endnodenm + '</div>'
                item += '</div>'
                $('.modal-bus-list').append(item);
                console.log(el.routetp);
            });
        } else {
            totalCount = 0;
        }
    } else {
        alert("api가 응답하지 않습니다. 페이지를 새로고침 해주세요.")
    }
}

function updateStationNumberList(data, status) {
    if (status == "success") {
        console.log(data);
        let busDatas = data["response"]["body"]["items"]["item"]
        totalRouteCount = data["response"]["body"]["totalCount"]
        if (busDatas !== undefined) {
            busDatas.forEach(function (el, index) {
                let item = '<div class="bus-list-item" stationId="' + el.nodeid + '">'
                // (el.updowncd === '0' ? '(상)' : '(하)')
                item += '<div class="bus-list-number">' + el.nodenm  + '</div>'
                // item += '<div class="bus-list-section">' + el.startnodenm + ' - ' +  el.endnodenm + '</div>'
                item += '</div>'
                $('.modal-station-list').append(item);
                console.log(el.routetp);
            });
        } else {
            totalRouteCount = 0;
        }
    } else {
        alert("api가 응답하지 않습니다. 페이지를 새로고침 해주세요.")
    }
}
