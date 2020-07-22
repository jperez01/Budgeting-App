import { infoReducer } from './info.reducer';

export default class FetchMethods {
    groups_string:string;
    items_string:string;
    trans_string:string;
    accounts_string:string;

    constructor() {
        this.groups_string = 'http://localhost:5000/groups';
        this.items_string = 'http://localhost:5000/items';
        this.trans_string = 'http://localhost:5000/transactions';
        this.accounts_string = 'http://localhost:5000/accounts';
    }

    getGroups(user_id: number) {
        return fetch(`${this.groups_string}/${user_id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json())
        .then(info => {
            if (info.length !== 0) {
                console.log(info);
                return info;
            } else {
                return [];
            }
        });
    }

    createGroup(info): Promise<any> {
        return fetch(`${this.groups_string}/create`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(info)
        }).then(res => res.json())
        .then(info => {
            return info;
        });
    }

    updateGroup(info): void {
        fetch(`${this.groups_string}/update`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(info)
        }).then(res => res.json())
        .then(result => console.log(''));
    }

    deleteGroup(group_id: number): void {
        fetch(`${this.groups_string}/delete/${group_id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json())
        .then(result => console.log(result));
    }

    getTransactions(user_id: number) {
        return fetch(`${this.trans_string}/${user_id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json())
        .then(info => {
            if (info.length !== 0) {
                console.log(info);
                return info;
            } else {
                return [];
            }
        });
    }

    async createTransaction(info): Promise<any> {
        return fetch(`${this.trans_string}/create`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(info)
        }).then(res => res.json())
        .then(result => {
            return result;
        });
    }

    updateTransaction(info): void {
        fetch(`${this.trans_string}/update`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(info)
        }).then(res => res.json())
        .then(result => console.log(result));
    }

    deleteTransaction(trans_id: number): void {
        fetch(`${this.trans_string}/delete/${trans_id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json())
        .then(result => console.log(result));
    }

    getItems(group_id: number) {
        return fetch(`${this.items_string}/${group_id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json())
        .then(info => {
            if (info.length !== 0) {
                console.log(info);
                return info;
            } else {
                return [];
            }
        });
    }

    createItem(info) {
        return fetch(`${this.items_string}/create`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(info)
        }).then(res => res.json())
        .then(result => {
            return result;
        });
    }

    updateItem(info): void {
        fetch(`${this.items_string}/update`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(info)
        }).then(res => res.json())
        .then(result => console.log(''));
    }

    deleteItem(item_id: number): void {
        fetch(`${this.items_string}/delete/${item_id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json())
        .then(result => console.log(result));
    }

    getAccounts(user_id: number) {
        return fetch(`${this.accounts_string}/${user_id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json())
        .then(info => {
            if (info.length !== 0) {
                console.log(info);
                return info;
            } else {
                return [];
            }
        });
    }

    createAccount(info): Promise<any> {
        return fetch(`${this.accounts_string}/create`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(info)
        }).then(res => res.json())
        .then(result => {
            return result;
        });
    }

    updateAccount(info): void {
        fetch(`${this.accounts_string}/update`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(info)
        }).then(res => res.json())
        .then(result => console.log(''));
    }
}