export const getStorageCities = () => {
 const cities = JSON.parse(localStorage.getItem("cities") || "[]");
 return Array.isArray(cities) ? cities : [];
};

export const addCityToStorage = (city: string | undefined) => {
 if (city) {
  const cities = getStorageCities();
  if (!cities.includes(city)) {
   cities.push(city);
   localStorage.setItem("cities", JSON.stringify(cities));
  }
 }
};
