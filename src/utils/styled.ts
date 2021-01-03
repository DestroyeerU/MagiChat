export function pxNumber(value?: number) {
  if (!value) {
    return '0px';
  }

  return `${value}px`;
}

export function margin(value?: number | 'auto') {
  if (value === 'auto') {
    return 'auto';
  }

  return pxNumber(value);
}
