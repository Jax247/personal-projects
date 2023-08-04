export const downloadCanvasToImage = (newFileName?: string) => {
  const canvas = document.querySelector("canvas");
  const dataURL = canvas!.toDataURL();
  const link = document.createElement("a");

  link.href = dataURL;
  link.download = newFileName ? `${newFileName}.png` :  "canvas.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const createTimestamp = () => {
  const date = new Date();

  // Get the individual components of the date
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  // Create the timestamp using the individual components
  const timestamp = `${year}_${month}_${day}_${hours}:${minutes}:${seconds}`;
  
  console.log(timestamp); // Output: e.g., 2023-06-01 15:30:45

  return timestamp
}

export const reader = (file: File) =>
  new Promise((resolve, reject) => {
    if(!nullCheck(file)) return 
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.readAsDataURL(file);
  });

export const getContrastingColor = (color: string) => {
  // Remove the '#' character if it exists
  const hex = color.replace("#", "");

  // Convert the hex string to RGB values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate the brightness of the color
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Return black or white depending on the brightness
  return brightness > 128 ? "black" : "white";
};

export const isBool = (value: unknown): value is boolean =>{
  return typeof value === 'boolean';
}
export const isString = (value: unknown): value is string =>{
  return typeof value === 'string';
}

export const nullCheck = <T>(value: T): value is NonNullable<T> => {
  return value !== null && value !== undefined;
}

