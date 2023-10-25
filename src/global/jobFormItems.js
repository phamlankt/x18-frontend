import {
  FaCalendar,
  FaDollarSign,
  FaImage,
  FaUser,
  FaMapMarkerAlt,
  FaAlignLeft,
  FaBriefcase,
  FaCity,
  FaTags,
} from "react-icons/fa6";

const jobFormItems = [
  {
    label: "Title",
    fieldName: "title",
    fieldIcon: <FaUser />,
    fieldType: "text",
    type: "input",
    info: "The title must clearly state the vacancy such as Full-stack Developer, Marketing Specialist, etc",
  },
  {
    label: "Company Logo",
    fieldName: "companyLogo",
    fieldIcon: <FaImage />,
    fieldType: "image",
    type: "input",
    info: "Prioritize images with small sizes, larger sizes can cause slow or impossible loading. Photos need to be clear including JPG, PNG, GIF, JPEG image formats.",
  },
  {
    label: "Deadline",
    fieldName: "deadline",
    fieldIcon: <FaCalendar />,
    fieldType: "date",
    type: "date",
    info: "The deadline must be in the future - the date that job will be closed.",
  },
  {
    label: "Salary",
    fieldName: "salary",
    fieldIcon: <FaDollarSign />,
    fieldType: "select",
    type: "select",
    info: "The salary must be a number.",
    options: [
      "negotiable",
      "0-100",
      "100-200",
      "200-400",
      "400-600",
      "600-800",
      "800-1000",
      "1000-3000",
      "3000+",
    ],
  },
  {
    label: "Location",
    fieldName: "location",
    fieldIcon: <FaMapMarkerAlt />,
    fieldType: "text",
  },
  {
    label: "City",
    fieldName: "city",
    fieldIcon: <FaCity />,
    fieldType: "text",
  },
  {
    label: "Position",
    fieldName: "position",
    fieldIcon: <FaBriefcase />,
    fieldType: "text",
  },
  {
    label: "Description",
    fieldName: "description",
    fieldIcon: <FaAlignLeft />,
    fieldType: "text",
  },
  {
    label: "Sectors",
    fieldName: "sectors",
    fieldIcon: <FaTags />,
    fieldType: "array",
  },
];

export default jobFormItems;
