export const filterOrdersByPrice = (orderList, searchTerm) => {
    const orderKeys = Object.keys(orderList);
    const filtered = {}
    orderKeys.forEach(key => {
        console.log(orderList[key])
        let currentOrderPrice = orderList[key].price;
        if(priceMatchesSearch(currentOrderPrice, searchTerm)) filtered[key] = orderList[key];
    });
 
    return {orders: {
        byIds: filtered
    }}
}

const priceMatchesSearch = (price=0, searchTerm='') => {
    let searchTermCharacters = searchTerm;
    let priceCharacters = price?.toString().split('').slice(0,searchTermCharacters.length+1);
    console.log(priceCharacters);
 
    return priceCharacters.join('').includes(searchTerm);
}

export const formatNumberToPrice = (number) => {
    let str = number.toString().split('');
    let cents = str.slice(-2).join('');
    let dollars = str.slice(0, str.length - 2).join('');
    return "$" + dollars + "." + cents;
} // written under the assumption that the last two digits for the price represent cents

export const addNewOrders = (existingOrders, newOrders) => {
    
    let orders = existingOrders?.orders?.byIds || {};

    newOrders.forEach((order) => {
        orders[order.id] = order;
    })
    
    return { orders: {
        byIds: orders
    }}
}
//normalize state