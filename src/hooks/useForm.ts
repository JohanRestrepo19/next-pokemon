import { ChangeEvent, useState } from 'react'

export function useForm<T>(initialForm: T) {
  const [formState, setFormState] = useState<T>(initialForm)

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target
    setFormState({ ...formState, [name]: value })
  }

  const onResetForm = () => {
    setFormState(initialForm)
  }

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm
  }
}
