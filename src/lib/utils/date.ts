export const formatDateToString = (
  date: string | Date,
) => {
  return new Date(date).toLocaleDateString()
};
