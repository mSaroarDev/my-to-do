export default function DateConvert(dbDate) {
  function formatDate(inputDate) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const date = new Date(inputDate);

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format

    const formattedDate = `${day} ${month}, ${year} at ${formattedHours}:${
      minutes < 10 ? "0" : ""
    }${minutes} ${ampm}`;

    return formattedDate;
  }

  // Usage
  const inputDate = new Date(dbDate);
  const formattedDate = formatDate(inputDate);

  return formattedDate;
}
