export const isObject = <T>(value: T): boolean => {
  return Object.prototype.toString.call(value) === "[object Object]";
};

export const isArray = <T>(value: T[]): boolean => {
  return Array.isArray(value);
};

export const isArrayNotEmpty = <T>(list: T[]): boolean => {
  return list.length > 0;
};
