export const renderUVIndexText = (uv: number | undefined) => {
  if (uv) {
    if (uv >= 6) {
      return 'High';
    } else if (uv <= 2) {
      return 'Low';
    } else if (uv >= 8) {
      return 'Very high';
    }
  }

  return 'Moderate';
};
