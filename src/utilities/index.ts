import moment from "moment";

export function GenerateYears() {
  const start = 1900;
  const end = parseInt(moment().format("YYYY"));
  const years: number[] = [];
  for (let yr = end; yr >= start; yr--) {
    years.push(yr);
  }
  return years;
}
