import moment from "moment-timezone";

export const dateFormat = (date) => {
  // 주어진 날짜를 서울 시간대로 변환하고, "YYYY/MM/DD" 형식으로 포맷팅
  return moment.tz(date, "Asia/Seoul").format("YYYY-MM-DD");
};
