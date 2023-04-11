import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import imgClose from '../../assets/close.svg';
import imgIncome from '../../assets/income.svg'
import imgOutcome from '../../assets/outcome.svg'
import { useTransactions } from '../../hooks/useTransactions';
import { Conatiner, RadioBox, TransactionTypeContainer } from './styles';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

Modal.setAppElement('#root')

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
    const { createTransaction } = useTransactions();
    
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [type, setType] = useState('deposit');
    
    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();

        await createTransaction({
            title,
            amount,
            category,
            type
        })

        setTitle('');
        setAmount(0);
        setCategory('');
        setType('deposit');
        onRequestClose();
    }

    return(
        <Modal 
          isOpen={isOpen} 
          onRequestClose={onRequestClose}
          overlayClassName='react-modal-overlay'
          className='react-modal-content'
      >
          <button type='button' onClick={onRequestClose} className='react-modal-close'>
              <img src={imgClose} alt="Fechar modal" />
          </button>

          <Conatiner onSubmit={handleCreateNewTransaction}>
            <h2>Cadastrar transação</h2>
            <input 
                type="text" 
                value={title}
                placeholder='Título'
                onChange={event => setTitle(event.target.value)}
            />
            <input 
                type="number" 
                value={amount}
                placeholder='Valor'
                onChange={event => setAmount(Number(event.target.value))}
            />
            <TransactionTypeContainer>
                <RadioBox 
                    type='button'
                    activeColor='green'
                    isActive={type === 'deposit'}
                    onClick={() => setType('deposit')}
                >
                    <img src={imgIncome} alt="Entrada" />
                    <span>Entrada</span>
                </RadioBox>
                <RadioBox 
                    type='button'
                    activeColor='red'
                    isActive={type === 'withdraw'}
                    onClick={() => setType('withdraw')}
                >
                    <img src={imgOutcome} alt="Saída" />
                    <span>Saída</span>
                </RadioBox>
            </TransactionTypeContainer>
            <input 
                type="text" 
                value={category}
                placeholder='Categoia'
                onChange={event => setCategory(event.target.value)}
            />
            <button type='submit'>
                Cadastrar
            </button>
          </Conatiner>
      </Modal>
    );
}