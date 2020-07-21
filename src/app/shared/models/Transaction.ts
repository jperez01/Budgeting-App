export interface Transaction {
    account: string;
    date: Date;
    category: string;
    description: string;
    outflow: number;
    inflow: number;
    trans_id:number;
}