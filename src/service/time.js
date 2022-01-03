// yyyymmdd 생성
export const getFormatDate = (today) => {
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  month = month >= 10 ? month : "0" + month;
  let day = today.getDate();
  day = day >= 10 ? day : "0" + day;
  return year + "" + month + "" + day;
};
export const getStartTime = (today, h, m) => {
  return (
    getFormatDate(today) +
    " " +
    (h < 10 ? "0" + h : h) +
    ":" +
    (m < 10 ? "0" + m : m)
  );
};
export const getEndTime = (today, h, m) => {
  return (
    getFormatDate(today) +
    " " +
    // (h < 10 ? "0" + h : h) +
    (h < 10 ? "0" + (h + 1) : h + 1) +
    ":" +
    (m < 10 ? "0" + m : m)
  );
};
