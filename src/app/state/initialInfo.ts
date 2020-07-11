export const initialInfo = {
    accounts: [
    {
        name: 'American Express',
        balance: 1000
    },
    {
        name: 'John Savings',
        balance: 200
    }
    ],
    budget: [
        {
            title: 'Food',
            items: [
            {
                name: 'Groceries',
                budgeted: 100.00,
                received: 200.00
            },
            {
                name: 'Dining Out',
                budgeted: 100.00,
                received: 200.00
            },
            {
                name: 'Snacks',
                budgeted: 300.00,
                received: 200.00
            }
            ],
            total_budgeted: 500.00,
            total_received: 600.00
        },
        {
            title: 'Debts',
            items: [
            {
                name: 'Student Loan',
                budgeted: 100.00,
                received: 200.00
            },
            {
                name: 'Mortgage',
                budgeted: 100.00,
                received: 200.00
            }
            ],
            total_budgeted: 200.00,
            total_received: 400.00
        }
    ],
    transactions: [
        {
            account: 'John Savings',
            date: new Date(2020, 6, 9),
            category: 'Groceries',
            description: 'First Transaction',
            outflow: 10.20,
            inflow: 100.00
        },
        {
            account: 'American Express',
            date: new Date(2020, 6, 9),
            category: 'Student Loan',
            description: 'Second Transaction',
            outflow: 50.00,
            inflow: 23.00
        },
        {
            account: 'John Savings',
            date: new Date(2020, 6, 8),
            category: 'Mortgage',
            description: 'Third Transaction',
            outflow: 130.00,
            inflow: 100.00
        }
    ]
}