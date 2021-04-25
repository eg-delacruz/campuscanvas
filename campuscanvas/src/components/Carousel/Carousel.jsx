import React, { Component } from 'react';
import Slider from 'react-slick';

//External styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

//Local styles
import './Carousel.scss';

//assets
// import DecisionHandler from '../../assets/static/decisionhandler.png';
// import Arrow_Left from '../../assets/static/arrow_left.svg';
// import Arrow_Right from '../../assets/static/arrow_right.svg';

export default class Carousel extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <section className='sponsors'>
        <div className='sponsors__container container'>
          <h2> Nuestros patrocinadores</h2>
          <Slider {...settings}>
            <div>
              <h3>1</h3>
            </div>
            <div>
              <h3>2</h3>
            </div>
            <div>
              <h3>3</h3>
            </div>
            <div>
              <h3>4</h3>
            </div>
            <div>
              <h3>5</h3>
            </div>
            <div>
              <h3>6</h3>
            </div>
          </Slider>
        </div>
      </section>
    );
  }
}
