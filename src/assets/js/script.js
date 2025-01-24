const startColorInput = document.getElementById('startColor');
const endColorInput = document.getElementById('endColor');
const gradientTypeInput = document.getElementById('gradientType');
const directionInput = document.getElementById('direction');
const opacityInput = document.getElementById('opacity');
const opacityValue = document.getElementById('opacityValue');
const gradientPreview = document.querySelector('.gradient-preview');
const cssCodeElement = document.querySelector('.css-code');
const copyButton = document.getElementById('copyButton');
const copyMessage = document.getElementById('copyMessage');
const body = document.body;

function updateGradient() {
  const startColor = startColorInput.value;
  const endColor = endColorInput.value;
  const gradientType = gradientTypeInput.value;
  const direction = directionInput.value;
  const opacity = opacityInput.value;

  let gradient = '';

  if (gradientType === 'linear-gradient') {
    gradient = `linear-gradient(${direction}, ${applyOpacity(startColor, opacity)}, ${applyOpacity(endColor, opacity)})`;
  } else if (gradientType === 'radial-gradient') {
    gradient = `radial-gradient(circle, ${applyOpacity(startColor, opacity)}, ${applyOpacity(endColor, opacity)})`;
  } else if (gradientType === 'conic-gradient') {
    gradient = `conic-gradient(from 0deg, ${applyOpacity(startColor, opacity)}, ${applyOpacity(endColor, opacity)})`;
  } else if (gradientType === 'repeating-linear-gradient') {
    gradient = `repeating-linear-gradient(${direction}, ${applyOpacity(startColor, opacity)}, ${applyOpacity(endColor, opacity)} 20%)`;
  } else if (gradientType === 'repeating-radial-gradient') {
    gradient = `repeating-radial-gradient(circle, ${applyOpacity(startColor, opacity)}, ${applyOpacity(endColor, opacity)} 20%)`;
  }

  gradientPreview.style.background = gradient;
  body.style.background = gradient;

  cssCodeElement.textContent = `background: ${gradient};`;
}

function applyOpacity(color, opacity) {
  const rgb = hexToRgb(color);
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
}

function hexToRgb(hex) {
  const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
  return { r, g, b };
}

function copyToClipboard() {
  navigator.clipboard.writeText(cssCodeElement.textContent).then(() => {
    copyMessage.textContent = 'Copied to clipboard!';
    setTimeout(() => (copyMessage.textContent = ''), 2000);
  });
}

[startColorInput, endColorInput, gradientTypeInput, directionInput, opacityInput].forEach(input =>
  input.addEventListener('input', updateGradient)
);
copyButton.addEventListener('click', copyToClipboard);

updateGradient();
