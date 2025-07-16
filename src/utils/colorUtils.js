export const rgbaToHex = ({ r, g, b, a }) => {
  const toHex = (c) => `0${c.toString(16)}`.slice(-2);
  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  return hex;
};

export const hexToRgba = (hex) => {
  let c = hex.substring(1).split('');
  if (c.length === 3) {
    c = [c[0], c[0], c[1], c[1], c[2], c[2]];
  }
  c = '0x' + c.join('');
  return {
    r: (c >> 16) & 255,
    g: (c >> 8) & 255,
    b: c & 255,
    a: 1 // Default alpha to 1
  };
};

export const rgbaToString = ({ r, g, b, a }) => {
  return `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
};