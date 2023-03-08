import "./index.css";
import Aos from "aos";
import "aos/dist/aos.css";
import CurrencyInput from "./components/CurrencyInput";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";

function App() {
  Aos.init({
    duration: 1800,
    offset: 100,
  });

  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState("USD");
  const [currency2, setCurrency2] = useState("UAH");
  const [rates, setRates] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.apilayer.com/fixer/latest?symbols=UAH,USD,EUR&base=UAH&apikey=iwPdX7hkeAR1rrt7fdF5TAmNwiftUCUo"
      )
      .then((response) => {
        setRates(response.data.rates);
      });
  }, []);

  useEffect(() => {
    if (!!rates) {
      function init() {
        handleAmount1Change(1);
      }
      init();
    }
  }, [rates]);

  function format(number) {
    return number.toFixed(2);
  }

  function handleAmount1Change(amount1) {
    setAmount2(format((amount1 * rates[currency2]) / rates[currency1]));
    setAmount1(amount1);
  }

  function handleCurrency1Change(currency1) {
    setAmount2(format((amount1 * rates[currency2]) / rates[currency1]));
    setCurrency1(currency1);
  }

  function handleAmount2Change(amount2) {
    setAmount1(format((amount2 * rates[currency1]) / rates[currency2]));
    setAmount2(amount2);
  }

  function handleCurrency2Change(currency2) {
    setAmount1(format((amount2 * rates[currency1]) / rates[currency2]));
    setCurrency2(currency2);
  }

  return (
    <section className="flex flex-row items-center justify-center h-[850px]">
      <div
        className="flex items-center justify-center fixed top-0 
        w-full bg-gray-300 shadow-lg z-10 h-12"
      >
        <Header />
      </div>
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
          onCurrencyChange={handleCurrency1Change}
          currencies={Object.keys(rates)}
          amount={parseFloat(amount1)}
          currency={currency1}
        />
        <HiOutlineArrowsUpDown className="w-10 h-10" />
        <CurrencyInput
          onAmountChange={handleAmount2Change}
          onCurrencyChange={handleCurrency2Change}
          currencies={Object.keys(rates)}
          amount={parseFloat(amount2)}
          currency={currency2}
        />
      </div>
    </section>
  );
}

export default App;
