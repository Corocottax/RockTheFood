export const toggleCheckboxFamily = (e, element, array) => {
  e.target.checked
    ? array.push(element)
    : array.splice(array.indexOf(element), 1);
};
