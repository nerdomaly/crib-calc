export const getCombinations = <T>(arr: T[], size: number): T[][] => {
  const result: T[][] = [];
  const combo = (index: number, currentCombo: T[]) => {
    if (currentCombo.length === size) {
      result.push(currentCombo);
      return;
    }
    if (index === arr.length) {
      return;
    }
    combo(index + 1, [...currentCombo, arr[index]]);
    combo(index + 1, currentCombo);
  };
  combo(0, []);
  return result;
};
