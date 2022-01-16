import { useState } from 'react'
//https://github.com/G00Z-G00Z/custom-hooks-react/tree/main/src/hooks/useForm

const useForm = <T extends Object>(initialState: T) => {
  const [formulario, setFormulario] = useState<T>(initialState);

  const onChange = (newValue: string, campo: keyof T) => {
    setFormulario({
      ...formulario,
      [campo]: newValue,
    });
  };

  const reset = () => {
    setFormulario(initialState);
  };
  return {
    ...formulario,
    formulario,
    onChange,
    reset,
  };
};

export default useForm;
