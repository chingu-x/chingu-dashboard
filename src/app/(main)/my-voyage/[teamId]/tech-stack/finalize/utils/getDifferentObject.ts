interface GetDifferentObjectProps {
  prev: {
    [key: number]: number;
  };
  curr: {
    [key: number]: number;
  };
}

export interface DifferentObjectKeys {
  key: number;
  previousValue: number;
  currentValue: number;
}

export function getDifferentObject({
  prev,
  curr,
}: GetDifferentObjectProps): DifferentObjectKeys[] {
  const differingKeys: DifferentObjectKeys[] = [];

  for (const key in prev) {
    if (curr.hasOwnProperty(key)) {
      const numKey = Number(key);

      if (prev[numKey] !== curr[numKey]) {
        differingKeys.push({
          key: numKey,
          previousValue: prev[key],
          currentValue: curr[key],
        });
      }
    }
  }

  return differingKeys;
}
