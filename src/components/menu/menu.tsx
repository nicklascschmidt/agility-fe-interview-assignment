import React from 'react';
import { useSelector } from 'react-redux';
import './menu.css';
import TriangleIcon from '../../icons/TriangleIcon';
import { SPACING_LG, SPACING_MD } from '../../constants/styleConstants';

const MENU_WIDTH = '300px';

const Menu = () => {
  const { annotations } = useSelector((state) => state);
  console.log('annotations', annotations);

  return (
    <div
      className='menu'
      style={{
        width: MENU_WIDTH,
        height: MENU_WIDTH, // TODO: height should expand with the container and be capped at X height
        border: '2px solid black',
        position: 'absolute',
        bottom: SPACING_LG,
        left: SPACING_MD,
      }}
    >
      Menu here
      <TriangleIcon />
    </div>
  );
};

export default Menu;
