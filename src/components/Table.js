import TableRow from './TableRow'
import React from 'react';

const Table = React.memo(({orderList}) => {
    // const { orders : {byIds: list} } = orderorderList? orderorderList: {};
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
            <TableRow order={order} columns={columns}/>
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
}

);

export default Table; 

// (prevProps, nextProps) => {
//     console.log('COMPARE')
//     if (JSON.stringify(prevProps) === JSON.stringify(nextProps) ) {
//         return true; // props are equal

//     }
//     return false; // props are not equal -> update the component
// }