import React from 'react';

const GradientPreview = ({ cssGradient, onCopyCss }) => {
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <h3 className="text-3xl font-extrabold text-gray-900 text-center">Gradient Preview</h3>
      <div
        className="w-full h-48 md:h-64 rounded-lg border-4 border-gray-300 shadow-lg"
        style={{ background: cssGradient }}
      ></div>

      <p className="css-code bg-gray-100 p-4 rounded-lg border border-gray-300 font-mono text-sm text-gray-700 w-full text-center break-words select-all overflow-x-auto">
        background: {cssGradient};
      </p>
      
      <button
        onClick={onCopyCss}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
      >
        Copy CSS
      </button>
      <p id="copyMessage" className="text-green-600 text-sm font-semibold invisible">Copied to clipboard!</p>
    </div>
  );
};

export default GradientPreview;