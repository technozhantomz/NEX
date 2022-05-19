const id_regex = /\b\d+\.\d+\.(\d+)\b/;

export const utils = {
  sortID(a: string, b: string, inverse = false): number {
    // inverse = false => low to high
    const intA = parseInt(a.split(".")[2], 10);
    const intB = parseInt(b.split(".")[2], 10);

    return inverse ? intB - intA : intA - intB;
  },
  is_object_id: (obj_id: string): boolean => {
    if ("string" != typeof obj_id) return false;
    const match = id_regex.exec(obj_id);
    return match !== null && obj_id.split(".").length === 3;
  },
  trimNum: (num: number, digits: number): number => {
    // Early return if NaN
    if (isNaN(num)) {
      return 0;
    }
    const numString = num.toString();
    const decimalIndex = numString.indexOf(".");
    const subString =
      decimalIndex > 0
        ? numString.substring(0, decimalIndex + (digits + 1))
        : num;
    return parseFloat(subString as string);
  },
};
