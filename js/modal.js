const body = document.querySelector('body');
const modal = document.querySelector('.modal');

var page = 1;

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeSearchModal();
    }
});

// $(window).on('popstate', function() {
//     alert('Back button was pressed.');
// });

function showSearchModal(busPlace, busNumber) {
    modal.classList.toggle('show');
    if (modal.classList.contains('show')) {
        body.style.overflow = 'hidden';
    }
    page = 1;

    // requestBusByNumber(busPlace, busNumber, page);
}

function closeSearchModal() {
    modal.classList.toggle('show');
    if (!modal.classList.contains('show')) {
        body.style.overflow = 'auto';
    }
    // history.back();
}

function updateBusNumberList(data, status) {
    if (status == "success") {
        console.log(data);
        let busDatas = data["response"]["body"]["items"]["item"]
        return busDatas;
    } else {
        alert("api가 응답하지 않습니다. 페이지를 새로고침 해주세요.")
    }
}
