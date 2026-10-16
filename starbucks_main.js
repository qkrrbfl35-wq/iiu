/* 프로모션 아이콘 이미지 */

var ICON_UP = "https://image.istarbucks.co.kr/common/img/common/btn_prom_up.png";
var ICON_DOWN = "https://image.istarbucks.co.kr/common/img/common/btn_prom_down.png";


/* Slick 슬라이더 */

$(function () {

    /* ----- 프로모션 슬라이드 ----- */
    $('.center').slick({
        centerMode: true,           // 가운데 슬라이드 기준, 양옆이 살짝 보임
        centerPadding: '22%',       // 양옆 여백 (가운데 사진 너비가 결정됨)
        slidesToShow: 1,
        speed: 500,                 // 넘어가는 속도

        // 좌우 화살표를 이미지 버튼으로
        prevArrow: '<button type="button" class="arrow prev"><img src="https://www.starbucks.co.kr/common/img/common/arrow_left_on.png" alt="이전"></button>',
        nextArrow: '<button type="button" class="arrow next"><img src="https://www.starbucks.co.kr/common/img/common/arrow_right_on.png" alt="다음"></button>',

        // 아래 동그라미를 .controls 안에 넣기
        dots: true,
        appendDots: $('.controls'),
        autoplay: false,
        autoplaySpeed: 3000,
        pauseOnHover: false,
        pauseOnFocus: false,
        pauseOnDotsHover: false
    });



/* ----- 공지사항 세로 롤링 (공지 3개가 3초마다 위로 넘어감) ----- */

$('.notice-slider').slick({
    vertical: true,
    slidesToShow: 1,
    slidesToScroll: 1,

    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,

    arrows: false,
    dots: false,
    infinite: true,
    pauseOnHover: false
});



    /* ----- 프로모션 재생 / 일시정지 버튼 ----- */

    var playing = false;

    $('#playBtn').on('click', function () {

        if (playing) {
            $('.center').slick('slickPause');   // 멈춤
        } else {
            $('.center').slick('slickPlay');    // 재생
        }

        playing = !playing;
        $(this).toggleClass('playing', playing);   // 버튼 모양 ▶ <-> ||
    });


    /* ----- 프로모션 열기 / 닫기 (아이콘 클릭) ----- */

    $('#toggleIcon').on('click', function () {

        var isOpen = $('#promo').toggleClass('open').hasClass('open');

        this.src = isOpen ? ICON_UP : ICON_DOWN;   // 아이콘 이미지 교체

        $('.center').slick('setPosition');         // 다시 열릴 때 슬라이드 크기 재계산
    });

});



/* PICK YOUR FAVORITE 애니메이션 */

const pick = document.querySelector(".pick");

if (pick) {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                // 화면에 들어오면 애니메이션 실행
                pick.classList.add("show");

            } else {

                // 화면에서 벗어나면 처음 상태로 돌아가기
                pick.classList.remove("show");

            }

        });

    }, {
        threshold: 0.3
    });

    observer.observe(pick);
}



/* 원두 배너 스크롤 등장 효과 */

const beansSection = document.querySelector('.beans');
const beansImage = document.querySelector('.beans-image');
const beansContent = document.querySelector('.beans-content');

if (beansSection && beansImage && beansContent) {

    let beansTimer;

    const beansObserver = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                // 원두 이미지 먼저 등장
                beansImage.classList.add('show');

                // 0.3초 후 글씨와 버튼 등장
                beansTimer = setTimeout(() => {
                    beansContent.classList.add('show');
                }, 300);

            } else {

                // 예약된 애니메이션 취소
                clearTimeout(beansTimer);

                // 화면에서 벗어나면 처음 상태로 돌아가기
                beansImage.classList.remove('show');
                beansContent.classList.remove('show');

            }

        });

    }, {
        threshold: 0.3
    });

    beansObserver.observe(beansSection);
}
