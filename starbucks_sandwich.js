const track = document.querySelector(".slideTrack");
const dots = document.querySelectorAll(".dot");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const pause = document.querySelector(".pause");
let isPlaying = true;
let slideTimer;

let currentPage = 0;
const totalPages = 3;

// 페이지 이동
function moveSlide(page) {
  currentPage = page;

  track.style.transform = `translateX(-${currentPage * 100}%)`;

  // 현재 페이지의 점 표시
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentPage);
  });
}
// 자동 넘김 시작
function startSlide() {
  clearInterval(slideTimer);
  isPlaying = true;
  pause.style.backgroundPosition = "left 0";

  slideTimer = setInterval(() => {
    moveSlide((currentPage + 1) % totalPages);
  }, 3000);
}

// 자동 넘김 정지
function stopSlide() {
  clearInterval(slideTimer);
  isPlaying = false;
  pause.style.backgroundPosition = "right 0";
}

// 다음 페이지
next.addEventListener("click", () => {
  moveSlide((currentPage + 1) % totalPages);
});

// 이전 페이지
prev.addEventListener("click", () => {
  moveSlide((currentPage - 1 + totalPages) % totalPages);
});

// 점을 클릭하면 해당 페이지로 이동
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    moveSlide(index);
  });
});
// 일시정지 / 재생 버튼
pause.addEventListener("click", () => {
  if (isPlaying) {
    stopSlide();
  } else {
    startSlide();
  }
});

// 화살표나 페이지 점을 누르면 자동 넘김 정지
prev.addEventListener("click", stopSlide);
next.addEventListener("click", stopSlide);

dots.forEach((dot) => {
  dot.addEventListener("click", stopSlide);
});

// 처음에는 자동 넘김 시작
startSlide();
console.log("자동재생 시작");
console.log("slideTimer:", slideTimer);
