import Form from 'react-bootstrap/Form'

export default function FormInput({ input, setInput, output, label }) {
    return (
        <div className='flex flex-row justify-between items-center mt-3'>
            <Form.Control
                type="number"
                onChange={setInput}
                value={input}
                placeholder="0.00"
            />
            <div className='ml-2 mr-2'> → </div>
            <Form.Control
                type="text"
                value={output}
                pattern="^\d*(\.\d{0,2})?$"
                readOnly
                disabled
            />
        </div>
    )

}
