const formatDate = (dateString, locale = navigator.language || "en-US") => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const formattedDate = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  return formattedDate;
};

export default formatDate
