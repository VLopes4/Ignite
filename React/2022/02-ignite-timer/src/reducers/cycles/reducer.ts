import { produce } from 'immer'
import { Cycle } from "../../interfaces/Cycle"
import { ActionTypes } from "./actions"

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function cyclesReducer(state: CyclesState, action: any) {

  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE: {
      // ORIGINAL
      // return {
      //   ...state,
      //   cycles: [...state.cycles, action.payload.newCycle],
      //   activeCycleId: action.payload.newCycle.id
      // }

      // IMMER
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })
    }
      
    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      // ORIGINAL
      // return {
      //   ...state,
      //   cycles: state.cycles.map(cycle => {
      //     if (cycle.id === state.activeCycleId) {
      //       return { ...cycle, interruptedDate: new Date() }
      //     } else {
      //       return cycle
      //     }
      //   }),
      //   activeCycleId: null
      // }

      // IMMER
      const currentCycleIndex = state.cycles.findIndex(cycle => {
        return cycle.id == state.activeCycleId
      })

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.activeCycleId = null
        draft.cycles[currentCycleIndex].interruptedDate = new Date()
      })
    }
      
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      // ORIGINAL
      // return {
      //   ...state,
      //   cycles: state.cycles.map(cycle => {
      //     if (cycle.id === state.activeCycleId) {
      //       return { ...cycle, finishedDate: new Date() }
      //     } else {
      //       return cycle
      //     }
      //   }),
      //   activeCycleId: null
      // }

      // IMMER
      const currentCycleIndex = state.cycles.findIndex(cycle => {
        return cycle.id == state.activeCycleId
      })

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.activeCycleId = null
        draft.cycles[currentCycleIndex].finishedDate = new Date()
      })
    }

    default: 
      return state
  }    
}