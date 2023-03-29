import { useState, useEffect } from "react";
import axios from "axios";

const useExchangeRates = () => {
  const [currencyFirst, setCurrencyFirst] = useState("");
  const [currencySecond, setCurrencySecond] = useState("");
  const [currencies, setCurrencies] = useState([]);
  const [rates, setRates] = useState({});

  useEffect(() => {
    axios
      .get("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
      .then((response) => {
        const currencyUah = { cc: "UAH", txt: "Українська гривня", rate: 1 };
        const currencies = [
          currencyUah.cc,
          ...response.data.map((currency) => currency.cc),
        ];
        const rates = {
          ...response.data.reduce((acc, currency) => {
            acc[currency.cc] = currency.rate;
            return acc;
          }, {}),
          [currencyUah.cc]: currencyUah.rate,
        };
        setRates(rates);
        setCurrencies(currencies);
        setCurrencyFirst(currencies[0]);
        setCurrencySecond(currencies[25]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return {
    rates,
    currencyFirst,
    currencySecond,
    setCurrencyFirst,
    setCurrencySecond,
    currencies,
  };
};

export default useExchangeRates;
