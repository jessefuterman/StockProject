import { useState } from "react";
import "./App.css";

const StockInformation = ({ key, value, tweets }) => {
  //decides whether to render jsx if worth buying, or selling
  return value > 0.7 ? (
    <div>
      <div key={key}>
        <div className="Buy">{`Stock Symbol: ${key}`}</div>
        <div>{`Stock Value: ${value}`}</div>
        <div>{`Twitter Mentions: ${tweets}`}</div>
      </div>
      <div>&nbsp;</div>
    </div>
  ) : (
    <div>
      <div key={key}>
        <div className="StockSymbol">{`Stock Symbol: ${key}`}</div>
        <div>{`Stock Value: ${value}`}</div>
        <div>{`Twitter Mentions: ${tweets}`}</div>
      </div>
      <div>&nbsp;</div>
    </div>
  );
};

function StockPrices({ stocks }) {
  //I wanted to clone the initialState (stocks) as its bad practice to mutate "state"
  const sortedStocks = [...stocks];
  sortedStocks.sort((b, a) => a.value - b.value);

  return <div>{sortedStocks.map(StockInformation)}</div>;
}

function App() {
  const [stocks, setStockData] = useState(createRandomStocks);
  return (
    <div className="App">
      <header className="Wrapper">
        <div className="Header">
          <h1>Stock Market Recommender </h1>
          <strong>Ranked highest to lowest value</strong>
          <div>&nbsp;</div>
          <strong className="LegendBuy"> ■ = BUY</strong>
          <div>&nbsp;</div>
          <strong className="LegendSell"> ■ = SELL</strong>
        </div>

        <div>&nbsp;</div>
        <StockPrices stocks={stocks} />
      </header>
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
    key: key,
    value: Math.random(),
    tweets: Math.trunc(Math.random() * 50000),
    date: randomDate(),
  }));
}

const randomDate = () => {
  //was planning on adding this to the dates as specified, but got caught up in other logic.
  const presentDate = new Date().getTime();
  const newDiff = parseInt(Math.random() * 1000 * 60 * 60 * 24 * 365, 10);
  return new Date(presentDate + newDiff);
};
