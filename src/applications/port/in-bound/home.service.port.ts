export abstract class HomeServicePort {
  getHome: (user_id: number) => Promise<any>;
}
