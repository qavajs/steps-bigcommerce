export interface Promotion {
  id?: number;
  name: string;
  rules: Array<unknown>;
  redemption_type: string;
  stop: boolean;
  status: string;
}
