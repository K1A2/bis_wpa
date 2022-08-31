const body = document.querySelector('body');
const modal = document.querySelector('.modal');

var page = 1;
var busPlace = 0;
var busNumber = 0;
var totalCount = 0;

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeSearchModal();
    }
});

document.querySelector('.modal-button-back').addEventListener('click', (event) => {
    closeSearchModal();
});

$('.modal-scroll-section').on('scroll', function() {
    if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
        if (totalCount <= 10 * page) {
            console.log("no more")
            return;
        }
        page += 1
        requestBusByNumber(busPlace, busNumber, page);
    }
})

$(document).on('click', '.bus-list-item' , function() {
    // alert($(this).children('.bus-list-number').text());
    alert($(this).attr('busId'));
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
    $('.modal-scroll-section').empty();
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
    $('.modal-scroll-section').empty();
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
        if (busDatas.length > 0) {
            busDatas.forEach(function (el, index) {
                let item = '<div class="bus-list-item" busId="' + el.routeid + '">'
                item += '<div class="bus-list-number ' + getBusColor(el.routetp) + '">' + el.routeno + '</div>'
                item += '<div class="bus-list-section">' + el.startnodenm + ' - ' +  el.endnodenm + '</div>'
                item += '</div>'
                $('.modal-scroll-section').append(item);
                console.log(el.routetp);
            });
        } else {
            totalCount = 0;
        }
    } else {
        alert("api가 응답하지 않습니다. 페이지를 새로고침 해주세요.")
    }
}
