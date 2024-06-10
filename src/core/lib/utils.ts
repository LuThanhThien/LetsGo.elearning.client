import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function cleanPath(path : string) {
  // Replace multiple consecutive slashes with a single slash
  const cleanedPath = path.replace(/\/+/g, '/');
  
  // Remove trailing slashes at the end of the path
  const trimmedPath = cleanedPath.replace(/\/+$/, '');
  
  return trimmedPath.trim();
}


export function randomChoice(...choices: any[]) {
  return choices[Math.floor(Math.random() * choices.length)];
}

export function datetime() {
  var currentdate = new Date(); 
  var datetime = "Last Sync: " + currentdate.getDate() + "/"
                  + (currentdate.getMonth()+1)  + "/" 
                  + currentdate.getFullYear() + " @ "  
                  + currentdate.getHours() + ":"  
                  + currentdate.getMinutes() + ":" 
                  + currentdate.getSeconds();
  return datetime;
}

export function isValid(value : any) {
  return value !== null && value !== undefined && value !== "null" && value !== "undefined";
}

export function hasUppercase(username : string) {
  return /[A-Z]/.test(username);
};


export const useDebounce = (callback: Function, delay: number) => {
  let timeout: NodeJS.Timeout;
  return function (...args: any) {
      clearTimeout(timeout);
      timeout = setTimeout(() => callback(...args), delay);
  };
}

export const doFormatPhoneNumber = (value: string | undefined, firstSub: number) => {
  if (!value) return "";
  let formattedValue = "";
  const digitOnly = value.replace(/\D/g, "");
  if (digitOnly.length > 4) {
      formattedValue = digitOnly.substring(0, firstSub) + " " + doFormatPhoneNumber(digitOnly.substring(firstSub) , 4);
  } else {
      formattedValue = digitOnly;
  }
  return formattedValue;
}

export const doFormatUppercase = (value: string | undefined) => {
  if (!value) return "";
  // Convert the alphanumeric value to uppercase
  const alphanumericValue = value.replace(/[^a-zA-Z0-9\s]/g, '');
  const formattedValue = alphanumericValue.toUpperCase();
  return formattedValue;
}


export const doFormatCurrency = (value: string | number | undefined) => {
  if (value === 0) return "0";
  if (!value) return "";
  // Convert the currency value to a string
  return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  // value = value.toString();
  // const currencyValue = value.replace(/[^0-9.]/g, '');
  
  // // Split the currency value into integer and decimal parts
  // const [integerPart, decimalPart] = currencyValue.split('.');

  // // Format the integer part with commas every three digits from the right
  // const formattedIntegerPart = addCommasToNumber(integerPart);

  // // Combine the formatted integer part with the decimal part (if exists)
  // const formattedValue = decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;

  // return formattedValue;
}

export const doFormatDatetime = (value: string | Date | undefined, options?: any) => {
  if (!value) return "";
  // Convert the date and time value to a string
  const dateValue = new Date(value);
  var defaultOptions : {} = options || { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }
  return dateValue.toLocaleString('vi-VN', defaultOptions);
}

export const doFormatDate = (value: string | Date |undefined, options?: any) => {
  if (!value) return "";
  var defaultOptions : {} = options || { year: 'numeric', month: 'numeric', day: 'numeric' } 
  // Convert the date value to a string
  const dateValue = new Date(value);
  const formattedValue = dateValue.toLocaleDateString("vi-VN", defaultOptions);
  return formattedValue;
}


export const addDays = (date: Date | string, days: number) : Date => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export const doFormatTime = (value: string | Date | undefined, options?: any) => {
  if (!value) return "";
  // Convert the time value to a string
  const dateValue = new Date(value);
  const defaultOptions : {} = options || { hour: 'numeric', minute: 'numeric', second: 'numeric' }
  const formattedValue = dateValue.toLocaleTimeString('vi-VN', defaultOptions);
  return formattedValue;
}

// Helper function to add commas to a number every three digits from the right
const addCommasToNumber = (number: string) => {
  const reversedNumber = number.split('').reverse().join('');
  const parts = [];

  for (let i = 0; i < reversedNumber.length; i += 3) {
      parts.push(reversedNumber.substring(i, i + 3));
  }

  return parts.join(',').split('').reverse().join('');
};

export const compareDateLarger = (date1: Date | string, date2: Date | string) => {
  if (typeof date1 === "string") date1 = new Date(date1);
  if (typeof date2 === "string") date2 = new Date(date2);
  return date1.getTime() > date2.getTime();
}

export const compareDateEqual = (date1: Date | string, date2: Date | string) => {
  if (typeof date1 === "string") date1 = new Date(date1);
  if (typeof date2 === "string") date2 = new Date(date2);
  return date1.getTime() === date2.getTime();
}

export const compareDateSmaller = (date1: Date | string, date2: Date | string) => {
  if (typeof date1 === "string") date1 = new Date(date1);
  if (typeof date2 === "string") date2 = new Date(date2);
  return date1.getTime() < date2.getTime();
}


export const getEnumValue = (enumObject: any, key?: string | null) => {
  if (!key) return null;
  return enumObject[key];
}

export const getEnumKey = (enumObject: any, value?: string| null) => {
  if (!value) return null;
  return Object.keys(enumObject).find(key => enumObject[key] === value);
}

export const findEnumValue = (enumObject: any, key?: string| null) => {
  if (!key) return null;
  return enumObject[key];
}