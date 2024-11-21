export const removeIngredientsDuplicates = (arrayDuplicates) => {
  for (let i = arrayDuplicates.length - 1; i >= 0; i--) {
    let greenLight = true;
    while (greenLight) {
      const elRepeat = arrayDuplicates.find(
        (el, j) => i !== j && el.ingredient === arrayDuplicates[i].ingredient
      );

      const dup = arrayDuplicates.indexOf(elRepeat);
      if (dup === -1) {
        greenLight = false;
      } else {
        arrayDuplicates.splice(dup, 1);
        i--;
      }
    }
  }
  
  return arrayDuplicates
};
