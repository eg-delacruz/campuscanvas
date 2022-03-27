import React, { Component } from 'react';
import Slider from 'react-slick';

//External styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

//Local styles
//Styles can be found at styles/Globals.scss

//assets
import DecisionHandler from '../../../assets/GeneralUse/Sponsors/decisionhandler.png';
import Arrow_Left from '../../../assets/GeneralUse/IconsAndButtons/arrow_left.svg';
import Arrow_Right from '../../../assets/GeneralUse/IconsAndButtons/arrow_right.svg';

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <img
      className={className}
      style={{
        ...style,
        display: 'block',
        width: '45px',
        height: '46px',
        padding: '6px 4px 6px 6px',
        border: '1px solid rgba(255, 255, 255, 0.5',
        borderRadius: '5px',
        boxShadow: '0 1px 6px 0 #20212447',
        right: 0,
        zIndex: '1',
      }}
      onClick={onClick}
      src={Arrow_Right.src}
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
        width: '45px',
        height: '46px',
        padding: '6px 6px 6px 4px',
        border: '1px solid rgba(255, 255, 255, 0.5',
        borderRadius: '5px',
        boxShadow: '0 1px 6px 0 #20212447',
        left: 0,
        zIndex: '1',
      }}
      onClick={onClick}
      src={Arrow_Left.src}
      alt='Flecha atrás'
    />
  );
}

export default class Carousel extends Component {
  render() {
    const { titulo } = this.props;

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

      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            //infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 625,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 410,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 383,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
          },
        },
      ],
    };

    return (
      <section className='sponsors'>
        <div className='sponsors__container container'>
          <h2> {titulo}</h2>
          <Slider {...settings}>
            <div>
              <img src={DecisionHandler.src} alt='Desicion handler' />
            </div>
            <div>
              <img src={DecisionHandler.src} alt='Desicion handler' />
            </div>
            <div>
              <img src={DecisionHandler.src} alt='Desicion handler' />
            </div>
            <div>
              <img src={DecisionHandler.src} alt='Desicion handler' />
            </div>
            <div>
              <img src={DecisionHandler.src} alt='Desicion handler' />
            </div>
            <div>
              <img src={DecisionHandler.src} alt='Desicion handler' />
            </div>
            <div>
              <img src={DecisionHandler.src} alt='Desicion handler' />
            </div>
            <div>
              <img src={DecisionHandler.src} alt='Desicion handler' />
            </div>
            <div>
              <img src={DecisionHandler.src} alt='Desicion handler' />
            </div>
            <div>
              <img src={DecisionHandler.src} alt='Desicion handler' />
            </div>
            <div>
              <img src={DecisionHandler.src} alt='Desicion handler' />
            </div>
            <div>
              <img src={DecisionHandler.src} alt='Desicion handler' />
            </div>
          </Slider>
        </div>
      </section>
    );
  }
}
