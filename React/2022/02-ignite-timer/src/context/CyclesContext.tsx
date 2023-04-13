import React, { ReactNode, createContext, useEffect, useReducer, useState } from "react"
import { CreateCycleData, Cycle } from "../interfaces/Cycle"
import { cyclesReducer } from "../reducers/cycles/reducer"
import { ActionTypes, addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions"
import { differenceInSeconds } from "date-fns"

type CyclesContextType = {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

interface CyclesProviderProps {
  children: ReactNode
}

export const CyclesContext = createContext({} as CyclesContextType)

export const CyclesProvider: React.FC<CyclesProviderProps> = ({ children }) => {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, { 
    cycles: [], 
    activeCycleId: null 
  }, (initialState) => {
    const storedStateJSON = localStorage.getItem('@ignite-timer:cycles-state-1.0.0')
    
    if (storedStateJSON) {
      return JSON.parse(storedStateJSON)
    }

    return initialState
  })

  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
  },[cyclesState])
  
  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())
  } 

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  const createNewCycle = (data: CreateCycleData) => {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))

    setSecondsPassed(0)
  }

  const interruptCurrentCycle = () => {
    dispatch(interruptCurrentCycleAction())
  }

  return (
    <CyclesContext.Provider value={{ cycles, activeCycle, activeCycleId, amountSecondsPassed, 
      markCurrentCycleAsFinished, setSecondsPassed, createNewCycle, interruptCurrentCycle }}>
      {children}
    </CyclesContext.Provider>
  )
}