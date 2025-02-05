export interface FindOneOptions<T> {
  where: Partial<T>;
  select?: (keyof T)[];
}
