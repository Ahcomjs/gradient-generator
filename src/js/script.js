const heading = document.querySelector('.heading span');
const startColorInput = document.getElementById('startColor');
const endColorInput = document.getElementById('endColor');
const body = document.body;
const gradientPreview = document.querySelector('.gradient-preview');

function setGradient() {
  heading.style.backgroundImage = `linear-gradient(to right, ${startColorInput.value}, ${endColorInput.value})`;
  heading.style.backgroundClip = 'text';
  heading.style.webkitTextFillColor = 'transparent';
  heading.style.mozTextFillColor = 'transparent';
  body.style.background = `linear-gradient(to right, ${startColorInput.value}, ${endColorInput.value})`;
  gradientPreview.textContent = `linear-gradient(to right, ${startColorInput.value}, ${endColorInput.value})`;
}

startColorInput.addEventListener('input', setGradient);
endColorInput.addEventListener('input', setGradient);
