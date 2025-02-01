export interface Quota {
    id: number;
    name: string;
    code: string;
    dateReceipt?: string | null;
    hourReceipt?: string | null;
    price: string;
    state: boolean;
    date: string;
    observation?: string | null;
    observationOption?: string | null;
  }
  