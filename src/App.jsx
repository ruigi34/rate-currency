import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [rates, setRates] = useState([]);
  const [loading, setIsLoading] = useState(false);

  async function getRates() {
    setIsLoading(true);
    try {
      const response = await fetch(
        'https://api.currencyfreaks.com/v2.0/rates/latest?apikey=' + import.meta.env.VITE_API_KEY
      );
      const data = await response.json();
      setRates(data.rates);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  function getWeBuy(rate) {
    let nRate = Number(rate);
    return String(nRate + nRate / 5);
  }

  function getWeSell(rate) {
    let nRate = Number(rate);
    return String(nRate - nRate / 5);
  }

  useEffect(() => {
    getRates();
  }, []);

  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            <th>Currency</th>
            <th>We Buy</th>
            <th>Exchage Rate</th>
            <th>We Sell</th>
          </tr>
        </thead>
        {loading ? (
          <tbody>
            <tr>
              <th align="center" colSpan="4">
                Loading...
              </th>
            </tr>
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td>CAD</td>
              <td>{getWeBuy(rates['CAD'])}</td>
              <td>{rates['CAD']}</td>
              <td>{getWeSell(rates['CAD'])}</td>
            </tr>
            <tr>
              <td>EUR</td>
              <td>{getWeBuy(rates['EUR'])}</td>
              <td>{rates['EUR']}</td>
              <td>{getWeSell(rates['EUR'])}</td>
            </tr>
            <tr>
              <td>IDR</td>
              <td>{getWeBuy(rates['IDR'])}</td>
              <td>{rates['IDR']}</td>
              <td>{getWeSell(rates['IDR'])}</td>
            </tr>
            <tr>
              <td>JPY</td>
              <td>{getWeBuy(rates['JPY'])}</td>
              <td>{rates['JPY']}</td>
              <td>{getWeSell(rates['JPY'])}</td>
            </tr>
            <tr>
              <td>CHF</td>
              <td>{getWeBuy(rates['CHF'])}</td>
              <td>{rates['CHF']}</td>
              <td>{getWeSell(rates['CHF'])}</td>
            </tr>
            <tr>
              <td>GBP</td>
              <td>{getWeBuy(rates['GBP'])}</td>
              <td>{rates['GBP']}</td>
              <td>{getWeSell(rates['GBP'])}</td>
            </tr>
          </tbody>
        )}
      </table>
      <p>Rates are based from 1 USD</p>
      <p>The application uses API from https://currencyfreaks.com</p>
    </div>
  );
}

export default App;
