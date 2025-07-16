import React from 'react';
import { RgbaColorPicker } from 'react-colorful';

const CustomColorPicker = ({ color, onChange }) => {
  return (
    <div className="w-full flex justify-center">
      <RgbaColorPicker
        color={color}
        onChange={onChange}
        className="!w-full !h-52"
      />
    </div>
  );
};

export default CustomColorPicker;