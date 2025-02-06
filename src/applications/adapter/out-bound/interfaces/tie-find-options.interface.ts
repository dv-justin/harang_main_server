export interface FindOptions<T> {
  where: {
    man_user?: {
      id: number;
    };
    female_user?: {
      id: number;
    };
  };
  select?: (keyof T)[];
}
