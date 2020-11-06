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

export const getAge = (birthdate: Date): number => {
  // const birthdate: Date = new Date(birthdateStr)
  const ageInMS: number = Date.now() - birthdate.getTime();
  return Math.floor(ageInMS / 1000 / 60 / 60 / 24 / 365);
}