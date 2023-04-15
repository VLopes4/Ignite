import { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext } from 'use-context-selector'
import { api } from "../lib/axios";


interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome',
  category: string
  price: number
  createdAt: string
}

interface TransactionContextType {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransaction ) => Promise<void>
}

interface TransactionsProviderProps {
  children: ReactNode
}

interface CreateTransaction {
  description: string
  type: 'income' | 'outcome',
  category: string
  price: number
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const createTransaction = useCallback(async (data: CreateTransaction) => {
    const response = await api.post('/transactions', { 
      ...data,
      createdAt: new Date()
    })

    setTransactions(state => [response.data, ...state])
  },[])

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc', 
        q: query,
      }
    })

    setTransactions(response.data)
  }, [])

  useEffect(() => {
    fetchTransactions()
  },[fetchTransactions])
  
  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}