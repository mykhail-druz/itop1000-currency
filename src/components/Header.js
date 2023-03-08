import React, { useState, useEffect } from "react";
import US from "../images/US.svg";
import EU from "../images/EU.svg";

const Header = () => {
  const [exchangeRatesUsd, setExchangeRatesUsd] = useState({});
  const [exchangeRatesEur, setExchangeRatesEur] = useState({});

  useEffect(() => {
    const fetchExchangeRatesUsd = async () => {
      const response = await fetch(
        "https://api.apilayer.com/fixer/latest?symbols=UAH,USD,EUR&base=USD&apikey=iwPdX7hkeAR1rrt7fdF5TAmNwiftUCUo"
      );
      const data = await response.json();
      setExchangeRatesUsd(data.rates);
    };

    fetchExchangeRatesUsd();
  }, []);

  useEffect(() => {
    const fetchExchangeRatesEur = async () => {
      const response = await fetch(
        "https://api.apilayer.com/fixer/latest?symbols=UAH,USD,EUR&base=EUR&apikey=iwPdX7hkeAR1rrt7fdF5TAmNwiftUCUo"
      );
      const data = await response.json();
      setExchangeRatesEur(data.rates);
    };

    fetchExchangeRatesEur();
  }, []);

  return (
    <header>
      <nav>
        <ul className="flex items-center justify-center w-[400px]">
          {exchangeRatesUsd.UAH && (
            <li
              className="mx-4 flex justify-center items-center"
              data-aos="fade-down"
              data-aos-offset="500"
            >
              <img className="w-[35px] h-[25px] m-1" src={US} alt="USA flag" />
              {exchangeRatesUsd.UAH.toFixed(2)} ₴
            </li>
          )}
          {exchangeRatesEur.UAH && (
            <li
              className="mx-4 flex justify-center items-center"
              data-aos="fade-down"
              data-aos-offset="600"
            >
              <img
                className="w-[35px] h-[25px] m-1 rounded-sm"
                src={EU}
                alt="EU flag"
              />
              {exchangeRatesEur.UAH.toFixed(2)} ₴
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
