export const getStorageCities = () => {
  const cities = JSON.parse(localStorage.getItem('cities') || '[]');
  return Array.isArray(cities) ? cities : [];
};

export const addCityToStorage = (city: string | undefined) => {
  if (city) {
    const cities = getStorageCities();
    if (!cities.includes(city)) {
      cities.push(city);
      localStorage.setItem('cities', JSON.stringify(cities));
    }
  }
};

export const removeCityFromStorage = (city: string) => {
  const storage = JSON.parse(localStorage.getItem('cities') || '[]');
  const index = storage.indexOf(city);

  if (index !== -1) {
    storage.splice(index, 1);
  }
  localStorage.setItem('cities', JSON.stringify(storage));
};
