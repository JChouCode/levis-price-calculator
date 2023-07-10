import Form from 'react-bootstrap/Form'
import { SetStateAction, Dispatch } from "react";

interface FormInputProps {
    input: string
    handleInput: (event: any) => void
    output: string
}

export default function FormInput({ input, handleInput, output }: FormInputProps) {
    return (
        <div className='flex flex-row justify-between items-center mt-3'>
            <Form.Control
                type="number"
                onChange={handleInput}
                value={input}
                placeholder="0.00"
            />
            <div className='ml-2 mr-2'> → </div>
            <Form.Control
                type="text"
                value={output}
                readOnly
                disabled
            />
        </div>
    )

}
