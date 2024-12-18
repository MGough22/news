export const formatCreatedAtDate = inputDate => {
  const date = new Date(inputDate);
  return date.toLocaleString("en-GB", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "GMT",
  });
};
