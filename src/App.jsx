import Orders from "./components/Orders";
import Filter from "./components/Filter";
import { useState, useEffect } from "react";

function App() {
  const [orders, setOrders] = useState([]);
  const [maxIndex, setMaxIndex] = useState(null);
  const [totalCities, setTotalCities] = useState(null);
  const [maxTotal, setMaxTotal] = useState(null);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/vikikota/szgyf/main/src/database/orders.json"
    )
      //fetch("szgyf/src/database/orders.json")
      .then((response) => response.json())
      .then((responseJSON) => setOrders(responseJSON));
  }, []);

  return (
    <div>
      <Filter
        orders={orders}
        setMaxIndex={setMaxIndex}
        setMaxTotal={setMaxTotal}
        setTotalCities={setTotalCities}
      />
      {maxIndex != null && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ fontWeight: 700 }}>
            LEGNAGYOBB ÖSSZÉRTÉKBEN RENDELŐ USER
          </div>
          <div>Név: {maxIndex[0].customer.name}</div>
          <div>Email: {maxIndex[0].customer.mail}</div>
          <div>Telefon: {maxIndex[0].customer.phone}</div>
          <div>Rendelések összértéke: {maxTotal.toLocaleString()} $</div>
        </div>
      )}
      {totalCities && (
        <div>
          <div style={{ fontWeight: 700 }}>LEGTÖBB RENDELÉS VÁROS SZERINT</div>
          {totalCities
            .reduce((uniqueCities, cityData) => {
              if (!uniqueCities.includes(cityData.customer.address.city)) {
                uniqueCities.push(cityData.customer.address.city);
              }
              return uniqueCities;
            }, [])
            .map((city, index) => {
              const ordersInCity = totalCities.filter(
                (data) => data.customer.address.city === city
              );
              const orderCount = ordersInCity.length;
              return (
                <div
                  style={{ display: "flex", flexDirection: "row" }}
                  key={index}
                >
                  <div>
                    <b>Város:</b> {city}
                  </div>
                  <div>
                    <b>&nbsp; - Rendelések száma: </b>
                    {orderCount}
                  </div>
                </div>
              );
            })}
        </div>
      )}
      <Orders orders={orders} maxIndex={maxIndex} totalCities={totalCities} />
    </div>
  );
}

export default App;
