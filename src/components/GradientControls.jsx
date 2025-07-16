import React from 'react';

const GradientControls = ({ gradientType, onGradientTypeChange, angle, onAngleChange }) => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <label htmlFor="gradientType" className="block text-sm font-medium text-gray-700 mb-1">Gradient Type:</label>
        <select
          id="gradientType"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          value={gradientType}
          onChange={(e) => onGradientTypeChange(e.target.value)}
        >
          <option value="linear-gradient">Linear</option>
          <option value="radial-gradient">Radial</option>
        </select>
      </div>

      {gradientType === 'linear-gradient' && (
        <div>
          <label htmlFor="angle" className="block text-sm font-medium text-gray-700 mb-1">Angle (degrees):</label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              id="angle"
              min="0"
              max="360"
              step="1"
              value={angle}
              onChange={(e) => onAngleChange(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <input
              type="number"
              min="0"
              max="360"
              value={angle}
              onChange={(e) => onAngleChange(parseInt(e.target.value))}
              className="w-20 p-1 border border-gray-300 rounded-md text-center"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GradientControls;
