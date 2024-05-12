import { formatNumberToPrice }from '../utils/utils';

const Table = ({orderList}) => {
    // const { orders : {byIds: list} } = orderorderList? orderorderList: {};
    // console.log(orderList)
    const firstOrder = orderList && Object.values(orderList)[0];
    const columns = firstOrder && Object.keys(firstOrder);
    const header = firstOrder && columns.map((colName, i) => {
       return (
        <th scope="col" style={{ "border": "1px solid white", "padding": "5px"}} key={i} scope='col'>{colName}</th>
       )
    });

    const allOrders = orderList&& Object.values(orderList);
    const rows = allOrders?.map((order) => {
        
        return (
            <tr key={order.id}>
                {columns.map((columnTitle) => {
                    let value = order[columnTitle];
                    if(columnTitle == 'price') value = formatNumberToPrice(value);

                    
                    return (
                        <td>{value}</td>
                    )
                })}
            </tr>
        )
    })
    return(
        <table>
            <caption>
                Orders In The Last Day
            </caption>
            <thead>
                <tr>
                {header}
                </tr>
            </thead>
            <tbody>
            {rows}
            </tbody>
        </table>
    )
};

export default Table; 