import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Omit<Transaction, 'id'>): Transaction {
    const { total } = this.transactionsRepository.getBalance();

    if (type === 'outcome' && total < value) {
      throw new Error(
        "Can't create new outcome transaction where the value is higher than the total balance",
      );
    }

    return this.transactionsRepository.create({ title, type, value });
  }
}

export default CreateTransactionService;
