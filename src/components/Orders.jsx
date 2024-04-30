import { useState, useEffect } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/vikikota/szgyf-teszt/master/src/database/orders.json")
    .then((response) => response.json())
      .then((responseJSON) => setOrders(responseJSON));
  }, []);

  return (
    <div>
      ORDERS
      <div className="order-table">
      <table>
        <thead>
          <tr style={{ backgroundColor: "#444", color: "white" }}>
            {[
              "ID",
              "DATE",
              "TOTAL",
              "NAME",
              "PHONE",
              "MAIL",
              "STREET",
              "CITY",
              "ZIP",
            ].map((header, index) => (
              <th key={index} style={{ padding: 10 }}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#ddd" : "" }}>
              <td style={{ padding: 6}}>{order._id}</td>
              <td>{order.date}</td>
              <td>{order.total}</td>
              <td>{order.customer.name}</td>
              <td>{order.customer.phone}</td>
              <td>{order.customer.mail}</td>
              <td>{order.customer.address.street}</td>
              <td>{order.customer.address.city}</td>
              <td>{order.customer.address.zip}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
  
  
}

export default Orders;
