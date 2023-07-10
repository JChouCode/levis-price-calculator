'use client'
import { Dropdown, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import FormInput from './FormInput';
import toast, { Toaster } from 'react-hot-toast';

// Be able to copy number 
// Show total percentage off
// Show the total and new total

enum Discount {
    BUY_1_GET_1_FREE = "Buy 1 Get 1 Free",
    BUY_1_GET_1_50_OFF = "Buy 1 Get 1 50% Off",
    BUY_2_GET_1_FREE = "Buy 2 Get 1 Free",
    BUY_2_GET_2_FREE = "Buy 2 Get 2 Free",
};

export default function Calculator() {
    const [discount, setDiscount] = useState(Discount.BUY_1_GET_1_FREE);
    const [input_1, setInput1] = useState("");
    const [input_2, setInput2] = useState("");
    const [input_3, setInput3] = useState("");
    const [input_4, setInput4] = useState("");
    const [output_1, setOutput1] = useState("");
    const [output_2, setOutput2] = useState("");
    const [output_3, setOutput3] = useState("");
    const [output_4, setOutput4] = useState("");
    const [receipt, setReceipt] = useState("");

    function handleClear() {
        setInput1("");
        setInput2("");
        setInput3("");
        setInput4("");
        setOutput1("");
        setOutput2("");
        setOutput3("");
        setOutput4("");
        setReceipt("");
    }

    function handleInput1Change(event: any) {
        setInput1(event.target.value);
    }

    function handleInput2Change(event: any) {
        setInput2(event.target.value);
    }

    function handleInput3Change(event: any) {
        setInput3(event.target.value);
    }

    function handleInput4Change(event: any) {
        setInput4(event.target.value);
    }

    function round(value: number, decimals = 2): number {
        return Number(Math.round(Number(String(value) + 'e' + String(decimals))) + 'e-' + decimals);
    }

    function calcDiscount(total: number, new_total: number) {
        let ratio = new_total / total
        let output_1 = round(Number(input_1) * ratio)
        let output_2 = round(Number(input_2) * ratio)
        let output_3 = round(Number(input_3) * ratio)
        let output_4 = round(Number(input_4) * ratio)
        let calc_total = output_1 + output_2 + output_3 + output_4
        if (calc_total != new_total) { // account for 1 cent error
            output_1 = round(output_1 + (new_total - calc_total))
        }
        setOutput1(String(output_1))
        setOutput2(String(output_2))
        setOutput3(String(output_3))
        setOutput4(String(output_4))

        let percent_off = round((1 - ratio) * 100)
        setReceipt(`Original Price: $${total}\nDiscounted Price: $${calc_total}\nFinal Discount: ${percent_off}%`)
    }

    function calculate(e: any) {
        e.preventDefault()

        let prices: number[] = [input_1, input_2, input_3, input_4].map(Number).filter(x => x != 0).sort((a, b) => a - b)
        let total = prices.reduce((a, b) => a + b, 0)

        switch (discount) {
            case Discount.BUY_1_GET_1_FREE: {
                if (prices.length < 2) {
                    toast.error("Missing " + (2 - prices.length) + " entries")
                    return
                }
                let new_total = total - prices[0]
                calcDiscount(total, new_total)
                break
            }
            case Discount.BUY_1_GET_1_50_OFF: {
                if (prices.length < 2) {
                    toast.error("Missing " + (2 - prices.length) + " entries")
                    return
                }
                let new_total = total - prices[0] * 0.5
                calcDiscount(total, new_total)
                break
            }
            case Discount.BUY_2_GET_1_FREE: {
                if (prices.length < 3) {
                    toast.error("Missing " + (3 - prices.length) + " entries")
                    return
                }
                let new_total = total - prices[0]
                calcDiscount(total, new_total)
                break
            }
            case Discount.BUY_2_GET_2_FREE: {
                if (prices.length < 4) {
                    toast.error("Missing " + (4 - prices.length) + " entries")
                    return
                }
                let new_total = total - prices[0] - prices[1]
                calcDiscount(total, new_total)
                break
            }
        }
    }

    return (
        <div className="w-100">
            <Toaster />
            <Dropdown className='flex'>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {discount}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => { setDiscount(Discount.BUY_1_GET_1_FREE); setInput3(""); setInput4(""); setReceipt(""); }}>{Discount.BUY_1_GET_1_FREE}</Dropdown.Item>
                    <Dropdown.Item onClick={() => { setDiscount(Discount.BUY_1_GET_1_50_OFF); setInput3(""); setInput4(""); setReceipt(""); }}>{Discount.BUY_1_GET_1_50_OFF}</Dropdown.Item>
                    <Dropdown.Item onClick={() => { setDiscount(Discount.BUY_2_GET_1_FREE); setInput4(""); setReceipt(""); }}>{Discount.BUY_2_GET_1_FREE}</Dropdown.Item>
                    <Dropdown.Item onClick={() => { setDiscount(Discount.BUY_2_GET_2_FREE); setReceipt(""); }}>{Discount.BUY_2_GET_2_FREE}</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Form onSubmit={calculate}>
                <FormInput input={input_1} handleInput={handleInput1Change} output={output_1} />
                <FormInput input={input_2} handleInput={handleInput2Change} output={output_2} />
                {(discount == Discount.BUY_2_GET_1_FREE || discount == Discount.BUY_2_GET_2_FREE) &&
                    <FormInput input={input_3} handleInput={handleInput3Change} output={output_3} />}
                {(discount == Discount.BUY_2_GET_2_FREE) &&
                    <FormInput input={input_4} handleInput={handleInput4Change} output={output_4} />}
                <div className="flex flex-row justify-between">
                    <Button type="submit" className="mt-3">
                        Calculate
                    </Button>
                    <Button type="reset" onClick={handleClear} variant="danger" className="mt-3 ml-3">
                        Clear
                    </Button>
                </div>
            </Form>

            {
                receipt &&
                < Form className='mt-4 font-mono text-xs'>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        type="text"
                        value={receipt}
                        readOnly
                        disabled
                    />
                </Form>
            }
        </div >
    )
}
