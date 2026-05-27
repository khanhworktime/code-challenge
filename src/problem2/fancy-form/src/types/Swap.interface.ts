export interface SwapRequire {
  payToken: string;
  payAmount: number;
  receiveToken: string;
  receiveAmount: number;

  rate?: number;
}
