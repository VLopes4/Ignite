import { forwardRef, ForwardRefRenderFunction } from "react";
import { FormControl, FormErrorMessage, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps } from "@chakra-ui/react";
import { FieldError } from "react-hook-form";

interface InputProps extends ChakraInputProps {
	name: string;
	label?: string;
	error?: FieldError;
}

export const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, label, error = null, ...rest }, ref) => {
	return(
		<FormControl isInvalid={!!error}>
			{ !!label && <FormLabel htmlFor={name}> {label} </FormLabel> }
			<ChakraInput 
			  size="lg"
			  id={name}
			  name={name} 
			  variant="filled"
			  bgColor="gray.900"
			  focusBorderColor="pink.500"
			  _hover={{ bgColor: 'gray.900' }}
				ref={ref}
				{...rest}
			/>
			{ !!error && (
				<FormErrorMessage>
					{error.message}
				</FormErrorMessage>
			)}
		</FormControl>
	);
}

export const Input = forwardRef(InputBase);