import { useState, useEffect } from "react";
import { uniqWith, isEqual } from "lodash";
import "./App.css";

function App() {
  const [stocks, setStockData] = useState(createRandomStocks);
  const [sellStocks, setSellStocks] = useState([]);
  const [buyStocks, setBuyStocks] = useState([]);
  const [holdStocks, setHoldStocks] = useState([]);

  const HoldStock = ({ key, value, tweets, date }) => {
    const holdStock = (
      <div>
        <ul className="Section">
          <div key={key}>
            <div className="Buy">
              <div className="card-header">{`Stock Symbol: ${key}`}</div>
              <div>{`Stock Value: ${value}`}</div>
              <div>{`Twitter Mentions: ${tweets}`}</div>
              <div>{`Date of Stock: ${date}`}</div>
              <div className="card-footer">
                <button className="buy-button">Hold Stock</button>
              </div>
            </div>
          </div>
          <div>&nbsp;</div>
        </ul>
      </div>
    );

    return value > 0.5 && value < 0.7 ? holdStock : null;
  };

  const SellStock = ({ key, value, tweets, date }) => {
    const stockProps = [key, value, tweets, date];

    function handleSellStock(e, stockProps) {
      e.preventDefault();

      // const noDuplicates = uniqWith(sellStocks, isEqual);

      setSellStocks((prevState) => [...prevState, stockProps]);
      let t;
      console.log(sellStocks.filter(((t = {}), (a) => !(t[a] = a in t))));
    }

    // useEffect(() => {}, [stockProps, sellStocks]);

    const sellStock = (
      <ul className="Section">
        <div>
          <div key={key}>
            <div className="Buy">
              <div className="card-header">{`Stock Symbol: ${key}`}</div>
              <div>{`Stock Value: ${value}`}</div>
              <div>{`Twitter Mentions: ${tweets}`}</div>
              <div>{`Date of Stock: ${date}`}</div>
              <div className="card-footer">
                <button
                  className="buy-button"
                  onClick={(e) => handleSellStock(e, stockProps)}
                >
                  Sell Stock
                </button>
              </div>
            </div>
          </div>
          <div>&nbsp;</div>
        </div>
      </ul>
    );

    return value < 0.5 ? sellStock : null;
  };

  const BuyStock = ({ key, value, tweets, date }) => {
    const buyStock = (
      <ul className="Section">
        <div>
          <div key={key}>
            <div className="Buy">
              <div className="card-header">{`Stock Symbol: ${key}`}</div>
              <div>{`Stock Value: ${value}`}</div>
              <div>{`Twitter Mentions: ${tweets}`}</div>
              <div>{`Date of Stock: ${date}`}</div>
              <div className="card-footer">
                <button className="buy-button">Buy Stock</button>
              </div>
            </div>
          </div>
          <div>&nbsp;</div>
        </div>
      </ul>
    );
    return value > 0.7 ? buyStock : null;
  };

  function StockPrices({ stocks }) {
    //I wanted to clone the initialState (stocks) as its bad practice to mutate "state"
    const sortedStocks = [...stocks];
    sortedStocks.sort((b, a) => a.value - b.value);

    return (
      <div className="Parent-Column">
        <div className="Buy-Column">{sortedStocks.map(BuyStock)}</div>
        <div className="Sell-Column">{sortedStocks.map(SellStock)}</div>
        <div className="Hold-Column">{sortedStocks.map(HoldStock)}</div>
      </div>
    );
  }

  return (
    <div className="App">
      <StockPrices stocks={stocks} />
      <SellStock />
    </div>
  );
}

export default App;

const richPeople = {
  NBD: "No Big Deals",
  AAOP: "Always Abbrasive On Point",
  NTDOY: "Nintendo Of America",
  BAB: "Based Abner Blues",
  GOF: "Guns of France",
  RBA: "Record Buyers Anonymous",
  JBW: "Jazz Bros WorldWide",
  GUAV: "Grandmothers United Against Violence",
  BWW: "Bikers World Wide",
  SGA: "Sega of America",
};

function createRandomStocks() {
  //how Im creating my random stocks
  return Object.keys(richPeople).map((key) => ({
    id: Math.floor(Math.random() * Date.now()),
    key: key,
    value: Math.random(),
    tweets: Math.trunc(Math.random() * 50000),
    date: randomDate(),
  }));
}

const randomDate = () => {
  const presentDate = new Date().getTime();
  const newDiff = Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365 * 10);
  return new Date(presentDate + newDiff);
};
