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
