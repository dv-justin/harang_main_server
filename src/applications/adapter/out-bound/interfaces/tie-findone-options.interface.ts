export interface FindOneOptions<T> {
  where: {
    id?: number;
    man_user?: {
      id: number;
    };
    female_user?: {
      id: number;
    };
  };
  select?: (keyof T)[];
}
