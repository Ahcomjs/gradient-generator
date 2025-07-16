import React, { useState, useEffect, useRef, useCallback } from 'react';
import ColorPicker from './components/ColorPicker';
import GradientControls from './components/GradientControls';
import ColorStopEditor from './components/ColorStopEditor';
import GradientPreview from './components/GradientPreview';
import { rgbaToString, hexToRgba, rgbaToHex } from './utils/colorUtils';

function App() {
  const [gradientType, setGradientType] = useState('linear-gradient');
  const [angle, setAngle] = useState(90);
  const [colorStops, setColorStops] = useState([
    { id: 1, color: '#2A7B9B', position: 0, rgba: hexToRgba('#2A7B9B') },
    { id: 2, color: '#57C785', position: 50, rgba: hexToRgba('#57C785') },
    { id: 3, color: '#EDDD53', position: 100, rgba: hexToRgba('#EDDD53') },
  ]);
  const [activeColor, setActiveColor] = useState(colorStops[0].rgba);
  const [activeColorIndex, setActiveColorIndex] = useState(0);

  const progressBarRef = useRef(null);
  const [draggingStopId, setDraggingStopId] = useState(null);

  useEffect(() => {
    if (colorStops.length > 0) {
      if (activeColorIndex < colorStops.length) {
        if (JSON.stringify(activeColor) !== JSON.stringify(colorStops[activeColorIndex].rgba)) {
          setActiveColor(colorStops[activeColorIndex].rgba);
        }
      } else {
        if (activeColorIndex !== 0) {
          setActiveColorIndex(0);
        }
        if (JSON.stringify(activeColor) !== JSON.stringify(colorStops[0].rgba)) {
          setActiveColor(colorStops[0].rgba);
        }
      }
    } else {
    }
  }, [colorStops, activeColorIndex, activeColor]);

  const handleColorStopChange = useCallback((updatedStops) => {
    const sortedStops = [...updatedStops].sort((a, b) => a.position - b.position);
    setColorStops(sortedStops);
  }, []);

  const handleAddColorStop = useCallback((newStop) => {
    const newId = Date.now();
    const stopToAdd = { ...newStop, id: newId, rgba: hexToRgba(newStop.color) };
    setColorStops((prevStops) => {
      const updatedStops = [...prevStops, stopToAdd];
      const sortedStops = updatedStops.sort((a, b) => a.position - b.position);
      const newIndex = sortedStops.findIndex(s => s.id === newId);
      if (newIndex !== -1) {
        setActiveColorIndex(newIndex);
        setActiveColor(stopToAdd.rgba);
      }
      return sortedStops;
    });
  }, []);

  const handleRemoveColorStop = useCallback((idToRemove) => {
    setColorStops((prevStops) => {
      const filteredStops = prevStops.filter((stop) => stop.id !== idToRemove);
      if (filteredStops.length < 2) {
        return [
          { id: Date.now(), color: '#000000', position: 0, rgba: hexToRgba('#000000') },
          { id: Date.now() + 1, color: '#FFFFFF', position: 100, rgba: hexToRgba('#FFFFFF') },
        ];
      }
      let newActiveIndex = activeColorIndex;
      const removedIndex = prevStops.findIndex(stop => stop.id === idToRemove);

      if (removedIndex === activeColorIndex) {
          newActiveIndex = Math.max(0, activeColorIndex - 1);
      } else if (removedIndex < activeColorIndex) {
          newActiveIndex = activeColorIndex - 1;
      }
      
      if (newActiveIndex !== activeColorIndex) {
        setActiveColorIndex(newActiveIndex);
      }
      if (filteredStops[newActiveIndex]) {
        setActiveColor(filteredStops[newActiveIndex].rgba);
      }

      return filteredStops;
    });
  }, [activeColorIndex]);

  const handleActiveColorChange = useCallback((newRgba) => {
    setActiveColor(newRgba);
    if (activeColorIndex !== null && colorStops[activeColorIndex]) {
      setColorStops((prevStops) => {
        const updatedStops = [...prevStops];
        updatedStops[activeColorIndex] = {
          ...updatedStops[activeColorIndex],
          rgba: newRgba,
          color: rgbaToHex(newRgba),
        };
        return updatedStops;
      });
    }
  }, [activeColorIndex, colorStops]);

  const handleSelectColorStop = useCallback((id) => {
    const index = colorStops.findIndex(stop => stop.id === id);
    if (index !== -1 && index !== activeColorIndex) {
      setActiveColorIndex(index);
    }
  }, [colorStops, activeColorIndex]);

  const handleMouseDownOnStop = useCallback((e, stopId) => {
    e.stopPropagation();
    setDraggingStopId(stopId);
    handleSelectColorStop(stopId);
  }, [handleSelectColorStop]);

  const handleMouseMove = useCallback((e) => {
    if (!draggingStopId || !progressBarRef.current) return;

    const progressBarRect = progressBarRef.current.getBoundingClientRect();
    const mouseX = e.clientX;
    const newPosition = ((mouseX - progressBarRect.left) / progressBarRect.width) * 100;
    const clampedPosition = Math.max(0, Math.min(100, newPosition));

    setColorStops((prevStops) => {
      const updatedStops = prevStops.map((stop) =>
        stop.id === draggingStopId ? { ...stop, position: parseFloat(clampedPosition.toFixed(2)) } : stop
      );
      return updatedStops.sort((a, b) => a.position - b.position);
    });
  }, [draggingStopId]);

  const handleMouseUp = useCallback(() => {
    setDraggingStopId(null);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);


  const handleProgressBarClick = useCallback((e) => {
    if (!progressBarRef.current || draggingStopId) return;

    const progressBarRect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX;
    const newPosition = ((clickX - progressBarRect.left) / progressBarRect.width) * 100;
    const clampedPosition = Math.max(0, Math.min(100, newPosition));

    const newStop = {
      color: rgbaToHex(activeColor),
      position: parseFloat(clampedPosition.toFixed(2)),
      rgba: activeColor,
    };
    handleAddColorStop(newStop);
  }, [activeColor, handleAddColorStop, draggingStopId]);


  const generateCssGradient = useCallback(() => {
    const stops = colorStops
      .map((stop) => `${rgbaToString(stop.rgba)} ${stop.position}%`)
      .join(', ');

    if (gradientType === 'linear-gradient') {
      return `linear-gradient(${angle}deg, ${stops})`;
    } else if (gradientType === 'radial-gradient') {
      return `radial-gradient(circle, ${stops})`;
    }
    return '';
  }, [colorStops, gradientType, angle]);

  const cssGradient = generateCssGradient();

  const copyCssToClipboard = () => {
    navigator.clipboard.writeText(`background: ${cssGradient};`).then(() => {
      const messageElement = document.getElementById('copyMessage');
      if (messageElement) {
        messageElement.textContent = 'Copied to clipboard!';
        messageElement.classList.remove('invisible');
        setTimeout(() => messageElement.classList.add('invisible'), 2000);
      }
    }).catch(err => {
      console.error('Error al copiar:', err);
      const messageElement = document.getElementById('copyMessage');
      if (messageElement) {
        messageElement.textContent = 'Error al copiar.';
        messageElement.classList.remove('invisible');
        messageElement.classList.add('text-red-600');
        setTimeout(() => {
          messageElement.classList.add('invisible');
          messageElement.classList.remove('text-red-600');
        }, 2000);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 flex flex-col gap-6">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4 text-center">Gradient Generator</h1>
          
          <div
            ref={progressBarRef}
            className="relative w-full h-8 rounded-full shadow-inner border border-gray-200 overflow-hidden mb-4 cursor-pointer"
            style={{ background: cssGradient }}
            onClick={handleProgressBarClick}
          >
            <div style={{ background: cssGradient }} className="w-full h-full"></div>
            {colorStops.map((stop, index) => (
              <div
                key={stop.id}
                className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow-md transition
                  ${activeColorIndex === index ? 'scale-150 ring-2 ring-blue-500' : 'scale-100'}
                  ${draggingStopId === stop.id ? 'z-20 cursor-grabbing' : 'z-10 cursor-grab'}`}
                style={{
                  left: `${stop.position}%`,
                  backgroundColor: stop.color,
                  transform: `translateX(-50%) translateY(-50%) scale(${activeColorIndex === index ? 1.4 : 1})`,
                  transition: 'transform 0.2s ease-in-out, ring 0.2s ease-in-out'
                }}
                onMouseDown={(e) => handleMouseDownOnStop(e, stop.id)}
                onClick={(e) => { e.stopPropagation(); handleSelectColorStop(stop.id); }}
              ></div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-extrabold text-gray-900  text-center">Color Picker</h2>
              <ColorPicker color={activeColor} onChange={handleActiveColorChange} />
              
              <div className="flex flex-col gap-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label className="block text-sm font-medium text-gray-700">HEX:</label>
                <input
                  type="text"
                  value={rgbaToHex(activeColor).toUpperCase()}
                  onChange={(e) => handleActiveColorChange(hexToRgba(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-md font-mono"
                />
                <div className="grid grid-cols-4 gap-2 text-sm">
                  <div>R: <input type="number" min="0" max="255" value={activeColor.r} onChange={(e) => handleActiveColorChange({...activeColor, r: parseInt(e.target.value)})} className="w-full p-1 border rounded-md" /></div>
                  <div>G: <input type="number" min="0" max="255" value={activeColor.g} onChange={(e) => handleActiveColorChange({...activeColor, g: parseInt(e.target.value)})} className="w-full p-1 border rounded-md" /></div>
                  <div>B: <input type="number" min="0" max="255" value={activeColor.b} onChange={(e) => handleActiveColorChange({...activeColor, b: parseInt(e.target.value)})} className="w-full p-1 border rounded-md" /></div>
                  <div>A: <input type="number" min="0" max="1" step="0.01" value={activeColor.a.toFixed(2)} onChange={(e) => handleActiveColorChange({...activeColor, a: parseFloat(e.target.value)})} className="w-full p-1 border rounded-md" /></div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <GradientControls
                gradientType={gradientType}
                onGradientTypeChange={setGradientType}
                angle={angle}
                onAngleChange={setAngle}
              />
              <ColorStopEditor
                colorStops={colorStops}
                onColorStopChange={handleColorStopChange}
                onRemoveColorStop={handleRemoveColorStop}
                onAddColorStop={handleAddColorStop}
                onSelectColorStop={handleSelectColorStop}
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 flex flex-col items-center gap-6 p-6 bg-gray-50 rounded-lg shadow-inner border border-gray-200">
          <GradientPreview cssGradient={cssGradient} onCopyCss={copyCssToClipboard} />
        </div>
      </div>
    </div>
  );
}

export default App;