export interface Trade {
  id: number;
  pair: string;
  direction: string;
  strategy: string;
  session: string;
  risk_amount: number;
  pnl: number;
  status: string;
  comments: string;
  entry_date: string;
  setup_grade?: string;
}