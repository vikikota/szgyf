import PropTypes from "prop-types";

function Orders({ orders, maxIndex, totalCities }) {
  
  let displayedOrders;

  if (maxIndex !== null) {
    displayedOrders = maxIndex;
  } else if (totalCities !== null) {
    displayedOrders = totalCities;
  } else {
    displayedOrders = orders;
  }

  return (
    <div>
      <div style={{textAlign: "center", fontWeight: 900, color:"#444", fontSize: 24, marginBottom: 10}}>ORDERS</div>
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
            {(displayedOrders || []).map((order, index) => (
              <tr
                key={index}
                style={{ backgroundColor: index % 2 === 0 ? "#ddd" : "" }}
              >
                <td style={{ padding: 6 }}>{order._id}</td>
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

Orders.propTypes = {
  orders: PropTypes.string.isRequired,
  maxIndex: PropTypes.string.isRequired,
  totalCities: PropTypes.string.isRequired,
};

export default Orders;
