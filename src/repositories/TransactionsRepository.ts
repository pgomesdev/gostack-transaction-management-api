import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const initialBalance: Balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    return this.transactions.reduce(
      (acc: Balance, transaction: Transaction): Balance => {
        const { outcome, income, total } = acc;

        if (transaction.type === 'income') {
          return {
            outcome,
            income: income + transaction.value,
            total: total + transaction.value,
          };
        }

        return {
          outcome: outcome + transaction.value,
          income,
          total: total - transaction.value,
        };
      },
      initialBalance,
    );
  }

  public create({ title, type, value }: Omit<Transaction, 'id'>): Transaction {
    const newTransaction = new Transaction({ title, type, value });

    this.transactions.push(newTransaction);

    return newTransaction;
  }
}

export default TransactionsRepository;
