type UseFormDateResult = {
  formLocalDate(date: string | number | Date, pattern?: string[]): string;
  convertUTCDateToLocalDate: (date: Date) => Date;
  formDate: (date: string | number | Date, pattern?: string[]) => string;
};

export function useFormDate(): UseFormDateResult {
  const convertUTCDateToLocalDate = (date: Date) => {
    const newDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60 * 1000
    );
    return newDate;
  };

  const formLocalDate = (
    date: string | number | Date,
    pattern = ["date", "month", "year"]
  ): string => {
    const localDate = convertUTCDateToLocalDate(new Date(date));
    const newDate = String(localDate).split(" ");
    const dateObj: {
      [segment: string]: string;
    } = {
      day: newDate[0] + ",",
      date: newDate[2],
      month: newDate[1],
      year: newDate[3],
      time: newDate[4],
    };
    return pattern.map((el) => dateObj[el]).join(" ");
  };

  const formDate = (
    date: string | number | Date,
    pattern = ["date", "month", "year"]
  ): string => {
    const newDate = String(new Date(date)).split(" ");
    const dateObj: {
      [segment: string]: string;
    } = {
      day: newDate[0] + ",",
      date: newDate[2],
      month: newDate[1],
      year: newDate[3],
      time: newDate[4],
    };
    return pattern.map((el) => dateObj[el]).join(" ");
  };

  return {
    formLocalDate,
    convertUTCDateToLocalDate,
    formDate,
  };
}
