export const formatTime = (time: Date | undefined) => {
  if (time) {
    const formattedTime = new Date(time).toLocaleString("de-DE", {
      day: "numeric",
      month: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    return formattedTime + " Uhr";
  }
};
export default formatTime;
