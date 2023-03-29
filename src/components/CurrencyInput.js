import PropTypes from "prop-types";

function CurrencyInput(props) {
  return (
    <div className="m-2">
      <input
        className="w-52 h-10 rounded-l-md p-2"
        type="number"
        value={props.amount}
        onChange={(ev) => props.onAmountChange(ev.target.value)}
      />
      <select
        className="h-10 rounded-r-md bg-stone-200"
        value={props.currency}
        onChange={(ev) => {
          props.onCurrencyChange(ev.target.value);
        }}
      >
        {props.currencies.map((currency, index) => (
          <option key={index} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
}

CurrencyInput.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  currencies: PropTypes.array,
  onAmountChange: PropTypes.func,
  onCurrencyChange: PropTypes.func,
};

export default CurrencyInput;
