export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const formats = `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })}`;
  return formats;
};

export const thousandFormatter = (num: number) => new Intl.NumberFormat().format(num);

export const capitalizeFirstLetter = (input: string): string => {
  return input.length > 0 ? input.charAt(0).toUpperCase() + input.slice(1).toLowerCase() : input;
};
export const formatID = (uuid: string): string => {
  // Extract the first 6 characters, convert to uppercase, and append "XX"
  return `${uuid.slice(0, 6).toUpperCase()}XX`;
};
