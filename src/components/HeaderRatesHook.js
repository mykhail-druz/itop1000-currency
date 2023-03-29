import { useEffect, useState } from 'react';
import axios from 'axios';

const useExchangeRates = () => {
  const [exchangeRatesUsd, setExchangeRatesUsd] = useState(null);
  const [exchangeRatesEur, setExchangeRatesEur] = useState(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      const [usdResponse, eurResponse] = await Promise.all([
        axios.get("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json&valcode=USD"),
        axios.get("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json&valcode=EUR"),
      ]);

      setExchangeRatesUsd(usdResponse.data[0].rate.toFixed(2));
      setExchangeRatesEur(eurResponse.data[0].rate.toFixed(2));
    };

    fetchExchangeRates();
  }, []);

  return [exchangeRatesUsd, exchangeRatesEur];
};

export default useExchangeRates;