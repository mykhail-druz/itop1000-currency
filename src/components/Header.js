import React from "react";
import US from "../images/US.svg";
import EU from "../images/EU.svg";
import useExchangeRates from "./HeaderRatesHook";

const Header = () => {
  const [exchangeRatesUsd, exchangeRatesEur] = useExchangeRates();

  if (!exchangeRatesUsd || !exchangeRatesEur) {
    return <div>Loading...</div>;
  }

  return (
    <header>
      <nav >
        <ul className="flex items-center justify-center w-[400px]">
          {exchangeRatesUsd && (
            <li
              className="mx-4 flex justify-center items-center"
              data-aos="fade-down"
              data-aos-offset="500"
            >
              <img className="w-[35px] h-[25px] m-1" src={US} alt="USA flag" />
              {exchangeRatesUsd} ₴
            </li>
          )}
          {exchangeRatesEur && (
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
              {exchangeRatesEur} ₴
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
