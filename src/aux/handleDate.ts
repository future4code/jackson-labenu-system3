export const formatDateToDB = (dateStr: string): string => {
  const [day, month, year] = dateStr.split("/");
  return `${year}-${month}-${day}`;
}

export const formatDateStr = (date: Date): string => {
  const day: number = date.getDate();
  const month: number = date.getMonth();
  const year: number = date.getFullYear();
  return `${day}/${month}/${year}`
}