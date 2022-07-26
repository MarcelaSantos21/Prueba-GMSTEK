import { Merchant } from "./Merchant";

export interface Transaction {
  date: number;
  merchInvoice: number;
  merchant: string;
  location: string;
  icao: string;
  dodaac: string;
  tail: string;
  item: string;
  total : number;
  card: string;
  status: string;
  merchantData: Merchant[];
}
