export const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatDate = (inputDate) => {
  {
    console.log("inputDate", inputDate);
    return new Date(inputDate).toLocaleDateString("vn-VN", {
      //   minute: "2-digit",
      //   hour: "2-digit",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  }
};
