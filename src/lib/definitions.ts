type Nutrition = {
  calories: number;
  fat: number;
  sugar: number;
  carbohydrates: number;
  protein: number;
};

export type Fruit = {
  name: string;
  id: number;
  family: string;
  order: string;
  genus: string;
  nutritions: Nutrition;
};

export type GroupByKey = keyof Pick<Fruit, "family" | "genus" | "order">;
export type GroupedFruits = {
  [groupBy in GroupByKey]: {
    [group: Fruit[GroupByKey]]: Fruit[];
  };
};
