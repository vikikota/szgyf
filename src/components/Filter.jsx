import PropTypes from "prop-types";

function Filter({ orders, setMaxIndex, setTotalCities }) {
  const resetTable = () => {
    setMaxIndex(null);
    setTotalCities(null);
  };

  function findUserWithMaxTotal(orders) {
    const userOrders = orders.reduce((acc, order) => {
      const userEmail = order.customer.mail;
      const orderTotal = parseFloat(order.total.replace("$", ""));

      if (!acc[userEmail]) {
        acc[userEmail] = { total: 0, orders: [] }; 
      }

      acc[userEmail].total += orderTotal; 
      acc[userEmail].orders.push(order); 

      return acc;
    }, {});

    let maxUserEmail = null;
    let maxTotal = -Infinity;
    Object.entries(userOrders).forEach(([userEmail, userInfo]) => {
      if (userInfo.total > maxTotal) {
        maxUserEmail = userEmail;
        maxTotal = userInfo.total;
      }
    });

    return userOrders[maxUserEmail] ? userOrders[maxUserEmail].orders : [];
  }

  function findCityWithMaxOrders(orders) {
    setMaxIndex(null);
    const userOrders = orders.reduce((acc, order) => {
      const userCity = order.customer.address.city;

      if (!acc[userCity]) {
        acc[userCity] = { total: 0, orders: [] };
      }

      acc[userCity].total += 1; 
      acc[userCity].orders.push(order);
      return acc;
    }, {});
        
    let maxTotal = -Infinity;
    let cityOrders = [];
    
    Object.entries(userOrders).forEach(([, userInfo]) => {
      if (userInfo.total > maxTotal) {
        maxTotal = userInfo.total;
        cityOrders = userInfo.orders
      }
    });

    return cityOrders;
  }

  const switchCase = (index) => {
    let displayedOrders = [];

    switch (index) {
      case 0:
        displayedOrders = findUserWithMaxTotal(orders);
        setMaxIndex(displayedOrders);
        break;
      case 1:
        displayedOrders = findCityWithMaxOrders(orders);
        setTotalCities(displayedOrders);
        break;
      default:
        displayedOrders = orders;
        break;
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", margin: 30 }}>
      <div>
        <button onClick={() => switchCase(0)} title="LEGNAGYOBB ÖSSZKÖLTÉS">
          LEGNAGYOBB ÖSSZKÖLTÉS
        </button>
      </div>
      <div>
        <button
          onClick={() => switchCase(1)}
          title="LEGTÖBB LEADOTT RENDELÉS - VÁROS"
        >
          LEGTÖBB LEADOTT RENDELÉS - VÁROS
        </button>
      </div>
      <div>
        <button onClick={resetTable} title="RESET TÁBLÁZAT">
          RESET
        </button>
      </div>
    </div>
  );
}

Filter.propTypes = {
  orders: PropTypes.array.isRequired,
  setMaxIndex: PropTypes.func.isRequired,
  setTotalCities: PropTypes.func.isRequired,
};

export default Filter;
