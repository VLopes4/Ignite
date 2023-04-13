import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";
import { createContext, useContext, useEffect, useState } from "react";
import { differenceInSeconds } from 'date-fns'
import NewCycleForm from "./components/NewCycleForm";
import Countdown from "./components/Countdown";
import { CyclesContext } from "../../context/CyclesContext";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import zod from 'zod'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
})

type NemCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export default function Home() {
  const { activeCycle, 
    createNewCycle, interruptCurrentCycle } = useContext(CyclesContext)
  
  const newCycleForm = useForm<NemCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })

  const { handleSubmit, watch, reset } = newCycleForm
  

  const handleCreateNewCycle = (data: NemCycleFormData) => {
    createNewCycle(data)
    reset()
  }

  const handleInterruptCycle = () => {
    interruptCurrentCycle()

    document.title = `Interrompido | Ignite Timer`
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return(
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm/>
        </FormProvider>
        <Countdown/>

        { activeCycle ? (
          <StopCountdownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24}/>
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24}/>
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}