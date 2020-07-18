export default class FetchMethods {
    constructor() {}
    getGroups(user_id: number): void {
        fetch(`http://localhost:5000/groups/${user_id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json())
        .then(info => {
            if (info.length !== 0) {
                console.log(info);
            } else {
                console.log(`Empty groups list`);
            }
        });
    }

    getTransactions(user_id: number): void {
        fetch(`http://localhost:5000/transactions/${user_id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json())
        .then(info => {
            if (info.length !== 0) {
                console.log(info);
            } else {
                console.log(`Empty groups list`);
            }
        });
    }

    getBudgetItems(group_id: number): void {
        fetch(`http://localhost:5000/items/${group_id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json())
        .then(info => {
            if (info.length !== 0) {
                console.log(info);
            } else {
                console.log(`Empty groups list`);
            }
        });
    }
}