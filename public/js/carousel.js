const config = {
  type: "carousel",
  perView: 4,
  startAt: 0,
  autoplay: 2000,
  breakpoints: {
    767: {
      perView: 3,
    },
    625: {
      perView: 2,
    },
    410: {
      perView: 1,
    },
  },
};
new Glide(".glide", config).mount();
