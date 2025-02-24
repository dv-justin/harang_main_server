export interface FindOptions<T> {
  where: {
    man_user?: {
      id: number;
    };
    female_user?: {
      id: number;
    };
    is_failed?: boolean;
  };
  select?: (keyof T)[];
}
