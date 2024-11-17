import React from 'react';
import { Carousel } from 'antd';
const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
const CrousalContainer = () => (
  <Carousel autoplay>
    <div>
      <h3 style={contentStyle}><img src="https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/f735c7131595487b.jpeg?q=20" alt=""/></h3>
    </div>
    <div>
      <h3 style={contentStyle}><img src="https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/04bb152bb2d3f429.jpg?q=20" alt=""/></h3>
    </div>
    <div>
      <h3 style={contentStyle}><img src="https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/92adb17c0ef2602f.jpg?q=20" alt=""/></h3>
    </div>
    <div>
      <h3 style={contentStyle}><img src="https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/45491294b0d546c4.jpg?q=20" alt=""/></h3>
    </div>
  </Carousel>
);
export default CrousalContainer;