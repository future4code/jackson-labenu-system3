export const formatDateToDB = (dateStr: string): string => {
  const [day, month, year] = dateStr.split("/");
  return `${year}-${month}-${day}`;
}

export const formatDateStr = (date: Date): string => {
  const day: string = String(date.getDate()).padStart(2, '0');
  const month: string = String(date.getMonth() + 1).padStart(2, '0');
  const year: string = String(date.getFullYear()).padStart(2, '0');
  return `${day}/${month}/${year}`
}