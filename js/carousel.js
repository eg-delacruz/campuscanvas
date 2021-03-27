window.addEventListener("load", function () {
  new Glider(document.querySelector(".carousel__list"), {
    slidesToShow: 1,
    slidesToScroll: 1,
    duration: 0.8,
    dots: ".carousel__indicators",
    draggable: true,
    arrows: {
      prev: ".carousel__back",
      next: ".carousel__next",
    },
    responsive: [
      {
        // screens greater than >= 775px
        breakpoint: 450,
        settings: {
          // Set to `auto` and provide item width to adjust to viewport
          slidesToShow: 2,
          slidesToScroll: 2,
          // itemWidth: 150,
          // duration: 0.25,
        },
      },
      {
        // screens greater than >= 1024px
        breakpoint: 767,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          itemWidth: 150,
          duration: 0.25,
        },
      },
    ],
  });
});
