//https://github.com/G00Z-G00Z/custom-hooks-react/tree/main/src/hooks/useForm
import { useState } from "react";

const useForm = <T extends Object>(initialState: T) => {
	const [formulario, setFormulario] = useState<T>(initialState);

	const onChange = (newValue: string, campo: keyof T) => {
		setFormulario({
			...formulario,
			[campo]: newValue,
		});
	};

	return {
		...formulario,
		formulario,
		onChange,
	};
};

export default useForm;
