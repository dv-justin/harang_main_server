export interface FindNotificationInterface<T> {
  where: {
    user_id: number;
  };
  select?: (keyof T)[];
  order: {
    created_at: 'ASC' | 'DESC';
  };
}
