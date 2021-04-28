import React, { Component } from 'react';
import Slider from 'react-slick';

//External styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

//Local styles
import './Carousel.scss';

//assets
import DecisionHandler from '../../assets/static/decisionhandler.png';
import Arrow_Left from '../../assets/static/arrow_left.svg';
import Arrow_Right from '../../assets/static/arrow_right.svg';

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <img
      className={className}
      style={{
        ...style,
        display: 'block',
        width: '42px',
        height: '46px',
        padding: '9px 12px',
      }}
      onClick={onClick}
      src={Arrow_Right}
      alt='Flecha siguiente'
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <img
      className={className}
      style={{
        ...style,
        display: 'block',
        width: '42px',
        height: '46px',
        padding: '9px 12px',
      }}
      onClick={onClick}
      src={Arrow_Left}
      alt='Flecha atrás'
    />
  );
}

export default class Carousel extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 800,
      slidesToShow: 4,
      slidesToScroll: 4,
      autoplay: true,
      autoplaySpeed: 2800,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    };
    return (
      <section className='sponsors'>
        <div className='sponsors__container container'>
          <h2> Nuestros patrocinadores</h2>
          <Slider {...settings}>
            <div>
              <img src={DecisionHandler} alt='Desicion handler' />
            </div>
            <div>
              <img src={DecisionHandler} alt='Desicion handler' />
            </div>
            <div>
              <img src={DecisionHandler} alt='Desicion handler' />
            </div>
            <div>
              <img src={DecisionHandler} alt='Desicion handler' />
            </div>
            <div>
              <img src={DecisionHandler} alt='Desicion handler' />
            </div>
            <div>
              <img src={DecisionHandler} alt='Desicion handler' />
            </div>
            <div>
              <img src={DecisionHandler} alt='Desicion handler' />
            </div>
            <div>
              <img src={DecisionHandler} alt='Desicion handler' />
            </div>
            <div>
              <img src={DecisionHandler} alt='Desicion handler' />
            </div>
            <div>
              <img src={DecisionHandler} alt='Desicion handler' />
            </div>
            <div>
              <img src={DecisionHandler} alt='Desicion handler' />
            </div>
            <div>
              <img src={DecisionHandler} alt='Desicion handler' />
            </div>
          </Slider>
        </div>
      </section>
    );
  }
}
