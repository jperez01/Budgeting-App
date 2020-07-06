import { BudgetItem } from './BudgetItem';

export interface BudgetGroup {
    title:string;
    items:BudgetItem[];
    total_budgeted:number;
    total_received:number;
}