import Orders from "./components/Orders";
import Filter from "./components/Filter";
import { useState, useEffect } from "react";

function App() {
  const [orders, setOrders] = useState([]);
  const [maxIndex, setMaxIndex] = useState(null);
  const [totalCities, setTotalCities] = useState(null);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/vikikota/szgyf-teszt/master/src/database/orders.json")
    //fetch("szgyf/src/database/orders.json")
      .then((response) => response.json())
      .then((responseJSON) => setOrders(responseJSON));
  }, []);

  return (
    <div>
      <Filter
        orders={orders}
        setMaxIndex={setMaxIndex}
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
          <div style={{fontWeight: 700}}>LEGNAGYOBB ÖSSZÉRTÉKBEN RENDELŐ USER</div>
          <div>Név: {maxIndex[0].customer.name}</div>
          <div>Email: {maxIndex[0].customer.mail}</div>
          <div>Telefon: {maxIndex[0].customer.phone}</div>
        </div>
      )}
      <Orders orders={orders} maxIndex={maxIndex} totalCities={totalCities} />
    </div>
  );
}

export default App;
