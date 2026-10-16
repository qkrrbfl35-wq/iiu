const imagesList = [
  {
    src: "https://image.istarbucks.co.kr/upload/banner/zX1K4u_20260928110649264.jpg",
    alt: "",
    name: "",
    link: "",
  },
];

// 슬라이더를 생성하고 동작시키는 함수
// selector: 슬라이더 요소의 선택자
// imagesList: 슬라이드에 사용할 이미지 목록
// options: 자동 재생, 전환 시간 등 설정
function simpleSlider(selector, imagesList, options = {}) {
  // 선택자가 문자열이면 해당 요소를 찾고, 아니면 전달받은 요소를 사용
  const slider =
    typeof selector === "string" ? document.querySelector(selector) : selector;

  // 슬라이더 요소가 없거나 이미지 목록이 비어 있으면 실행 중단
  if (!slider || !Array.isArray(imagesList) || imagesList.length === 0) {
    console.warn("simpleSlider: Invalid slider element or empty images list.");
    return null;
  }

  // 슬라이더의 기본 설정값 지정
  const {
    startIndex = 0, // 처음 표시할 슬라이드 번호
    animationClass = "animated", // 슬라이드에 적용할 애니메이션 클래스
    autoplay = false, // 자동 재생 여부
    autoplayDelay = 3000, // 자동 전환 간격(밀리초)
    pauseOnHover = true, // 마우스를 올렸을 때 정지할지 여부
  } = options;

  // 슬라이더 내부에서 필요한 요소를 선택
  const track = slider.querySelector(".hcg-slider-track");
  const dotsContainer = slider.querySelector(".hcg-slide-dot-control");
  const prevBtn = slider.querySelector("#hcg-slide-prev");
  const nextBtn = slider.querySelector("#hcg-slide-next");

  // 현재 슬라이드 번호와 전체 슬라이드 개수, 자동 재생 타이머 변수
  let index = startIndex;
  const total = imagesList.length;
  let autoplayTimer = null;

  // 이미지 목록을 바탕으로 슬라이드 HTML을 생성
  track.innerHTML = imagesList
    .map(
      (img, i) => `
    <a ${img.link ? `href="${img.link}" target="_blank"` : ""} class="hcg-slides ${animationClass}">
      <img src="${img.src}" alt="${img.alt || ""}">
    </a>
    `,
    )
    .join("");

  // 이미지 개수에 맞춰 아래쪽 페이지 표시 점 생성
  dotsContainer.innerHTML = imagesList
    .map(
      (_, i) => `
    <a href="#" class="hcg-slide-dot" data-id="${i}"></a>
    `,
    )
    .join("");

  // 생성된 슬라이드와 페이지 표시 점을 다시 선택
  const slides = slider.querySelectorAll(".hcg-slides");
  const dots = slider.querySelectorAll(".hcg-slide-dot");

  // 지정한 번호의 슬라이드를 표시하는 함수
  const showSlide = (i, animate = false) => {
    // 마지막 다음은 처음으로, 처음 이전은 마지막으로 순환
    index = (i + total) % total;

    // 선택한 슬라이드를 화면에 표시
    const currentSlide = slides[index];
    currentSlide.style.display = "flex";

    // 현재 선택된 점 표시
    dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === index);
    });

    // animate가 true이면 페이드 애니메이션 실행
    if (animate) {
      currentSlide.classList.remove("fade-effect");
      void currentSlide.offsetWidth;
      currentSlide.classList.add("fade-effect");
    }
  };

  // 자동 슬라이드 시작 함수
  const startAutoplay = () => {
    // 자동 재생이 꺼져 있거나 이미 실행 중이면 시작하지 않음
    if (!autoplay || autoplayTimer) return;
    // 설정한 시간마다 다음 슬라이드 표시
    autoplayTimer = setInterval(() => {
      showSlide(index + 1);
    }, autoplayDelay);
  };
  // 자동 슬라이드 정지 함수
  const stopAutoplay = () => {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  };

  // Controls
  prevBtn.addEventListener("click", (e) => {
    e.preventDefault();
    showSlide(index - 1, true);
  });

  // 다음 버튼을 클릭하면 다음 슬라이드 표시
  nextBtn.addEventListener("click", (e) => {
    e.preventDefault();
    showSlide(index + 1, true);
  });

  // 페이지 표시 점을 클릭하면 해당 번호의 슬라이드 표시
  dotsContainer.addEventListener("click", (e) => {
    const dot = e.target.closest(".hcg-slide-dot");
    if (!dot) return;
    e.preventDefault();
    showSlide(+dot.dataset.id);
  });

  // 마우스를 올리면 자동 재생을 멈추고, 벗어나면 다시 시작
  if (pauseOnHover && autoplay) {
    slider.addEventListener("mouseenter", stopAutoplay);
    slider.addEventListener("mouseleave", startAutoplay);
  }

  // 처음 슬라이드를 표시하고 자동 재생 시작
  showSlide(index);
  startAutoplay();

  // 다른 코드에서 슬라이더를 제어할 수 있도록 기능 반환
  return {
    next: () => showSlide(index + 1),
    prev: () => showSlide(index - 1),
    goTo: (i) => showSlide(i),
    play: startAutoplay,
    pause: stopAutoplay,
    getIndex: () => index,
  };
}

// HTML의 #hcg-slider-1 요소에 슬라이더 적용
// 자동 재생은 끄고, 마우스 오버 정지 기능은 설정
const slider = simpleSlider("#hcg-slider-1", imagesList, {
  autoplay: false,
  autoplayDelay: 2000,
  pauseOnHover: true,
});

// 전체보기 영역과 버튼 요소 선택
const promotionArea = document.querySelector("#promotionArea");
const promotionBtn = document.querySelector("#promotionBtn");

// 전체보기 버튼을 클릭하면 open 클래스를 추가하거나 제거
promotionBtn.addEventListener("click", function (e) {
  e.preventDefault();
  promotionArea.classList.toggle("open");
});

// HTML 문서의 로딩이 완료되면 뉴스 전환 기능 실행
document.addEventListener("DOMContentLoaded", function () {
  // 뉴스 문구를 감싸는 요소 선택
  const newsText = document.querySelector(".newsText");
  // 뉴스 요소가 없거나 자식 요소가 2개 미만이면 실행 중단
  if (!newsText || newsText.children.length < 2) return;
  // 뉴스 문구들을 하나로 묶을 컨테이너 생성
  const track = document.createElement("div");
  track.className = "newsTextTrack";
  // 기존 뉴스 문구들을 새 컨테이너 안으로 이동
  while (newsText.firstElementChild) {
    track.appendChild(newsText.firstElementChild);
  }
  // 생성한 컨테이너를 뉴스 영역 안에 추가
  newsText.appendChild(track);
  // 3초마다 다음 뉴스 문구로 전환
  setInterval(function () {
    // 컨테이너를 위쪽으로 30px 이동시키는 애니메이션 적용
    track.style.transition = "transform 0.5s ease";
    track.style.transform = "translateY(-30px)";
    // 이동 애니메이션이 끝나면 실행
    track.addEventListener("transitionend", function handler() {
      // 이벤트가 반복 등록되지 않도록 현재 이벤트 제거
      track.removeEventListener("transitionend", handler);
      // 애니메이션 없이 첫 번째 문구를 맨 뒤로 이동
      track.style.transition = "none";
      // 위치를 원래대로 초기화
      track.appendChild(track.firstElementChild);
      // 위치 변경을 브라우저에 반영
      track.style.transform = "translateY(0)";

      track.offsetHeight;
    });
  }, 3000);
});
