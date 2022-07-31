export const sortAlpha = (a: any, b: any, key: string, obj?: string[]) => {
  const aInitial = a[key];
  const bInitial = b[key];
  if (aInitial && bInitial && obj && Array.isArray(obj)) {
    const aNew = obj?.reduce((newData: any, data: any) => {
      if (newData[data]) {
        newData = newData[data];
      }
      return newData;
    }, aInitial);
    const bNew = obj?.reduce((newData: any, data: any) => {
      if (newData[data]) {
        newData = newData[data];
      }
      return newData;
    }, bInitial);
    return aNew < bNew ? -1 : aNew > bNew ? 1 : 0;
  } else {
    return aInitial < bInitial ? -1 : aInitial > bInitial ? 1 : 0;
  }
};
