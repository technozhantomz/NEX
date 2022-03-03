export function useFormDate(
  date: string,
  pattern = ["date", "month", "year"]
): string {
  const newDate = String(new Date(date)).split(" ");
  const dateObj: {
    [segment: string]: string;
  } = {
    date: newDate[2],
    month: newDate[1],
    year: newDate[3],
    time: newDate[4],
  };
  return pattern.map((el) => dateObj[el]).join(" ");
}
