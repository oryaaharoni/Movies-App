export const findIndexCategory = (categories, categoryName) => {
  const index = categories.findIndex((c) => c === categoryName);
  return index;
};

export const indexToCategory = (categories, index) => {
  console.log("indexToCategory");
  console.log({ categories });
  console.log({ index });
  const category = categories[index];
  console.log({ category });
  return category;
};
