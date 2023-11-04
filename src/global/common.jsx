import cities from "../global/data/VNLocaion.json";

export const capitalizeFirstLetter = (str) => {
  return str && str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatDate = (inputDate) => {
  {
    return new Date(inputDate).toLocaleDateString("vn-VN", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  }
};

export const getCityNameFromSlug = (slug) => {
  const filteredCity = cities.filter((city) => city.slug === slug);
  return filteredCity[0].name;
};
