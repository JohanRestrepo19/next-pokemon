import { ChangeEvent, useState } from 'react'

export function useForm<T>(initialForm: T) {
  const [formState, setFormState] = useState<T>(initialForm)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target
    setFormState({ ...formState, [name]: value })
  }

  const handleResetForm = () => {
    setFormState(initialForm)
  }

  return {
    ...formState,
    formState,
    handleInputChange,
    handleResetForm
  }
}
