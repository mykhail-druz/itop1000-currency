import React, { useState } from "react";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import useExchangeRates from "./MainRatesHook";
import CurrencyInput from "./CurrencyInput";

const ConverterBox = () => {
    const [amount1, setAmount1] = useState(0);
    const [amount2, setAmount2] = useState(0);
    const {
      rates,
      currencyFirst,
      currencySecond,
      setCurrencyFirst,
      setCurrencySecond,
    } = useExchangeRates();
  
    function format(number) {
      return number.toFixed(2);
    }
  
    function handleAmount1Change(amount1) {
      if (!isNaN(amount1)) {
        setAmount1(amount1);
        setAmount2(
          format((amount1 * rates[currencyFirst]) / rates[currencySecond])
        );
      }
    }
  
    function handleCurrencyFirstChange(currencyFirst) {
      setCurrencyFirst(currencyFirst);
      setAmount2(
        format((amount1 * rates[currencyFirst]) / rates[currencySecond])
      );
    }
  
    function handleAmount2Change(amount2) {
      if (!isNaN(amount2)) {
        setAmount2(amount2);
        setAmount1(
          format((amount2 * rates[currencySecond]) / rates[currencyFirst])
        );
      }
    }
  
    function handleCurrencySecondChange(currencySecond) {
      setCurrencySecond(currencySecond);
      setAmount1(
        format((amount2 * rates[currencySecond]) / rates[currencyFirst])
      );
    }

    return (
        <div
        className="flex flex-col items-center justify-center lg:w-[400px] lg:h-[400px] 
        w-[350px] h-[350px] bg-gradient-to-tr from-yellow-600 via-yellow-500 to-yellow-600
        rounded-2xl my-[175px]"
        data-aos="flip-left"
        data-aos-offset="500"
      >
        <h1 className="text-2xl pb-16">Currency converter</h1>
        <CurrencyInput
          onAmountChange={handleAmount1Change}
          onCurrencyChange={handleCurrencyFirstChange}
          currencies={Object.keys(rates)}
          amount={parseFloat(amount1)}
          currency={currencyFirst}
        />
        <HiOutlineArrowsUpDown className="w-10 h-10" />
        <CurrencyInput
          onAmountChange={handleAmount2Change}
          onCurrencyChange={handleCurrencySecondChange}
          currencies={Object.keys(rates)}
          amount={parseFloat(amount2)}
          currency={currencySecond}
        />
      </div>
    )
}

export default ConverterBox