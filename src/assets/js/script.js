const startColorInput = document.getElementById('startColor');
const endColorInput = document.getElementById('endColor');
const directionInput = document.getElementById('direction');
const body = document.body;
const gradientPreview = document.querySelector('.gradient-preview');
const cssCodeElement = document.querySelector('.css-code');
const copyButton = document.getElementById('copyButton');
const copyMessage = document.getElementById('copyMessage');

function setGradient() {
  const gradient = `linear-gradient(${directionInput.value}, ${startColorInput.value}, ${endColorInput.value})`;
  body.style.background = gradient;
  gradientPreview.style.background = gradient;
  cssCodeElement.textContent = `background: ${gradient};`;
  copyMessage.textContent = '';
}

function copyGradient() {
  const cssCode = cssCodeElement.textContent;
  navigator.clipboard.writeText(cssCode).then(() => {
    copyMessage.textContent = 'Gradient copied to clipboard!';
  }, () => {
    copyMessage.textContent = 'Failed to copy Gradient.';
  });
}

startColorInput.addEventListener('input', setGradient);
endColorInput.addEventListener('input', setGradient);
directionInput.addEventListener('change', setGradient);
copyButton.addEventListener('click', copyGradient);

setGradient(); 
