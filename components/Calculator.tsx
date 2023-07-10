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

    function handleClear() {
        setInput1("");
        setInput2("");
        setInput3("");
        setInput4("");
        setOutput1("");
        setOutput2("");
        setOutput3("");
        setOutput4("");
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
        return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
    }

    function calculate(e: any) {
        e.preventDefault()

        let prices: number[] = [input_1, input_2, input_3, input_4].map(Number).filter(x => x != 0).sort((a, b) => a - b)
        let total = prices.reduce((a, b) => a + b, 0)

        console.log(prices)
        console.log(total)

        switch (discount) {
            case Discount.BUY_1_GET_1_FREE: {
                if (prices.length < 2) {
                    toast.error("Missing " + (2 - prices.length) + " entries")
                    return
                }
                let new_total = total - prices[0]
                let ratio = new_total / total
                setOutput1(String(round(Number(input_1) * ratio)))
                setOutput2(String(round(Number(input_2) * ratio)))
                break;
            }
            case Discount.BUY_1_GET_1_50_OFF: {
                if (prices.length < 2) {
                    toast.error("Missing " + (2 - prices.length) + " entries")
                    return
                }
                let new_total = total - prices[0] * 0.5
                let ratio = new_total / total
                setOutput1(String(round(Number(input_1) * ratio)))
                setOutput2(String(round(Number(input_2) * ratio)))
                break;
            }
            case Discount.BUY_2_GET_1_FREE: {
                if (prices.length < 3) {
                    toast.error("Missing " + (3 - prices.length) + " entries")
                    return
                }
                let new_total = total - prices[0]
                let ratio = new_total / total
                setOutput1(String(round(Number(input_1) * ratio)))
                setOutput2(String(round(Number(input_2) * ratio)))
                setOutput3(String(round(Number(input_3) * ratio)))
                break;
            }
            case Discount.BUY_2_GET_2_FREE: {
                if (prices.length < 4) {
                    toast.error("Missing " + (4 - prices.length) + " entries")
                    return
                }
                let new_total = total - prices[0] - prices[1]
                let ratio = new_total / total
                setOutput1(String(round(Number(input_1) * ratio)))
                setOutput2(String(round(Number(input_2) * ratio)))
                setOutput3(String(round(Number(input_3) * ratio)))
                setOutput4(String(round(Number(input_4) * ratio)))
                break;
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
                    <Dropdown.Item onClick={() => { setDiscount(Discount.BUY_1_GET_1_FREE) }}>{Discount.BUY_1_GET_1_FREE}</Dropdown.Item>
                    <Dropdown.Item onClick={() => { setDiscount(Discount.BUY_1_GET_1_50_OFF) }}>{Discount.BUY_1_GET_1_50_OFF}</Dropdown.Item>
                    <Dropdown.Item onClick={() => { setDiscount(Discount.BUY_2_GET_1_FREE) }}>{Discount.BUY_2_GET_1_FREE}</Dropdown.Item>
                    <Dropdown.Item onClick={() => { setDiscount(Discount.BUY_2_GET_2_FREE) }}>{Discount.BUY_2_GET_2_FREE}</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Form onSubmit={calculate}>
                <FormInput input={input_1} setInput={handleInput1Change} output={output_1} label="Price of Item #1" />
                <FormInput input={input_2} setInput={handleInput2Change} output={output_2} label="Price of Item #2" />
                {(discount == Discount.BUY_2_GET_1_FREE || discount == Discount.BUY_2_GET_2_FREE) &&
                    <FormInput input={input_3} setInput={handleInput3Change} output={output_3} label="Price of Item #3" />}
                {(discount == Discount.BUY_2_GET_2_FREE) &&
                    <FormInput input={input_4} setInput={handleInput4Change} output={output_4} label="Price of Item #4" />}
                <div className="flex flex-row justify-between">
                    <Button type="submit" className="mt-3">
                        Calculate
                    </Button>
                    <Button type="reset" onClick={handleClear} variant="danger" className="mt-3 ml-3">
                        Clear
                    </Button>
                </div>
            </Form>
        </div>
    )
}
