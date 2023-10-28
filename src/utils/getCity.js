import cities from "../global/data/VNLocaion.json";

export const getCity = (slug) => {
  const city = cities.find((city) => city.slug === slug);
  return city.name;
};
