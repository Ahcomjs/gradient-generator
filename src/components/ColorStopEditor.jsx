import React, { useState, useEffect } from 'react';
import { rgbaToHex, hexToRgba } from '../utils/colorUtils';

const ColorStopEditor = ({ colorStops, onColorStopChange, onRemoveColorStop, onAddColorStop, onSelectColorStop }) => {
  const [newColorStopPosition, setNewColorStopPosition] = useState(100);

  const handlePositionChange = (index, value) => {
    const updatedStops = [...colorStops];
    updatedStops[index] = { ...updatedStops[index], position: Math.max(0, Math.min(100, parseInt(value || 0))) };
    onColorStopChange(updatedStops);
  };

  const handleColorChange = (index, hexColor) => {
    const updatedStops = [...colorStops];
    updatedStops[index] = { ...updatedStops[index], color: hexColor };
    onColorStopChange(updatedStops);
  };

  const handleAddStop = () => {
    const newStop = {
      color: '#FFFFFF',
      position: Math.max(0, Math.min(100, parseInt(newColorStopPosition || 0))),
    };
    onAddColorStop(newStop);
    setNewColorStopPosition(
      Math.min(100, Math.max(0, parseInt(newColorStopPosition) + 10))
    );
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Color Stops</h3>
      <div className="flex flex-col gap-3">
        {colorStops.map((stop, index) => (
          <div key={stop.id} className="flex items-center gap-2 bg-gray-50 p-2 rounded-md border border-gray-200">
            <div
              className="w-8 h-8 rounded-full border border-gray-300 cursor-pointer shadow-sm"
              style={{ backgroundColor: stop.color }}
              onClick={() => onSelectColorStop(stop.id)}
            ></div>
            <input
              type="text"
              value={stop.color}
              onChange={(e) => handleColorChange(index, e.target.value)}
              className="w-24 p-1 border border-gray-300 rounded-md text-sm"
            />
            <input
              type="number"
              min="0"
              max="100"
              value={stop.position}
              onChange={(e) => handlePositionChange(index, e.target.value)}
              className="w-16 p-1 border border-gray-300 rounded-md text-sm text-center"
            />
            <span className="text-gray-600">%</span>
            {colorStops.length > 2 && (
              <button
                onClick={() => onRemoveColorStop(stop.id)}
                className="ml-auto p-1 text-red-500 hover:text-red-700 rounded-full hover:bg-red-100 transition"
                title="Eliminar parada"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            )}
          </div>
        ))}
        <div className="flex items-center gap-2 mt-2">
            <input
                type="number"
                min="0"
                max="100"
                value={newColorStopPosition}
                onChange={(e) => setNewColorStopPosition(parseInt(e.target.value))}
                className="w-16 p-1 border border-gray-300 rounded-md text-sm text-center"
                placeholder="Posición"
            />
            <button
                onClick={handleAddStop}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition"
            >
                Add Stop
            </button>
        </div>
      </div>
    </div>
  );
};

export default ColorStopEditor;