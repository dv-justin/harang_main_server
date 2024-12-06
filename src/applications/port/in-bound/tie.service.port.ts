export abstract class TieServicePort {
  getTies: (user_id: number) => Promise<any>;
}
