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

export const handleApplicationNotification = (data) => {
  const { status } = data;
  let btnText = "";
  switch (status) {
    case "sent":
      btnText = `${data.applicant} has applied for job title "${data.jobTitle}"`;
      break;
    case "cancelled":
      btnText = `${data.applicant} has cancelled application for job title "${data.jobTitle}"`;
      break;
    case "confirmed":
      btnText = `Application accepted for job title "${data.jobTitle}"`;
      break;
    case "rejected":
      btnText = `Application rejected for  job title "${data.jobTitle}"`;
      break;
  }
  return btnText;
};
