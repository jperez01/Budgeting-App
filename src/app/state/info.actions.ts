import { createAction, props, Action } from '@ngrx/store';

export const loadInfo = createAction(
  'Load All Info'
);

export const loadInfosSuccess = createAction(
  '[Info] Load Infos Success',
  props<{ data: any }>()
);

export const loadInfosFailure = createAction(
  '[Info] Load Infos Failure',
  props<{ error: any }>()
);

export const loadTransactions = createAction(
  'LOAD_TRANSACTIONS'
);

export const loadBudget = createAction(
  'Load Budget'
);

export const loadAccounts = createAction(
  'Load Accounts'
);

export const changeAllInfo = createAction(
  'Change All Info',
  props<{ data: any[]}>()
);


export const changeAccounts = createAction(
  'Change Accounts',
  props<{ data: any[]}>()
);

export const changeBudget = createAction(
  'Change Budget',
  props<{ data: any[]}>()
)

export class changeTransactions implements Action {
  type = 'CHANGE_TRANSACTIONS';
  constructor(public payload: any[]) {
  }
}

export class addTransaction implements Action {
  type = 'ADD_TRANSACTION';
  constructor(public payload: any) {
  }
}