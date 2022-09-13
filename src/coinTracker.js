import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);

  const calculate = (event) => {
    const budget = document.querySelector(".budget").value;
    const coinPrice = parseFloat(event.target.value);
    const answer = Math.floor(budget / coinPrice);
    console.log(answer);
    document.querySelector(
      ".message"
    ).innerText = `You can buy total ${answer} coins`;
  };

  useEffect(() => {
    // use API
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json()) // json 형식으로 바꿈
      .then((json) => {
        setCoins(json); //set coins with json values
        setLoading(false);
      });
  }, []);
  return (
    // challenge: input 만들고 내 돈으로 얼마만큼의 비트코인을 살 수 있는지 알려주기
    <div>
      <h1>Hi Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <input
            className="budget"
            type="number"
            placeholder="your budget"
          ></input>
          <select onChange={calculate}>
            {coins.map((coin) => (
              <option value={coin.quotes.USD.price}>
                {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
          <div className="message"></div>
        </div>
      )}
    </div>
  );
}

export default App;
