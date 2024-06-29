export const findIndexCategory = (categories, categoryName) => {
  const index = categories.findIndex((c) => c === categoryName);
  return index;
};

export const indexToCategory = (categories, index) => {
  
  const category = categories[index];
  return category;
};
