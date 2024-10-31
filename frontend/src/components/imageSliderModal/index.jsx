import React from 'react';
import Slider from 'react-slick';
import Zoom from 'react-medium-image-zoom';

import './styles.scss';

const ImageSliderModal = ({ images, initialSlide = 0 }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide,
    arrows: true,
  };

  return (
    <div className='image-slider-modal' onClick={(e) => e.stopPropagation()}>
      <Slider {...sliderSettings}>
        {images.map((item) => (
          <div key={item.id} className='image-slider-modal__slide'>
            <Zoom>
              <img
                src={item.image_data}
                alt={`Image ${item.id}`}
                className='image-slider-modal__image'
              />
            </Zoom>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSliderModal;
