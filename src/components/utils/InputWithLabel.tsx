import React, { FC } from "react";

interface Props {
	value: string;
	name: string;
	text: string;
	onChange: (value: string) => void;
	type: React.HTMLInputTypeAttribute;
}

export const InputWithLabel: FC<Props> = ({
	onChange,
	text,
	type,
	value,
	name,
}) => {
	return (
		<>
			<label htmlFor={name}>{text}</label>
			<input
				type={type}
				name={name}
				value={value}
				onChange={(e) => {
					onChange(e.target.value);
				}}
			/>
		</>
	);
};
