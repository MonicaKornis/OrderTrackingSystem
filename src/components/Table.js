import TableRow from './TableRow'
import React from 'react';
import styled from 'styled-components';
import {removeUnderscore } from '../utils/utils';

const OrderTable = styled.table`
    width: 98%;
`;

const Column = styled.th`
    padding: 10px;
`;

const Table = React.memo(({orderList}) => {
    const firstOrder = orderList && Object.values(orderList)[0];
    const columns = firstOrder && Object.keys(firstOrder);
    const header = firstOrder && columns.map((colName, i) => {
       return (
        <Column scope="col" key={i}>{removeUnderscore(colName)}</Column>
       )
    });

    const allOrders = orderList&& Object.values(orderList);
    const rows = allOrders?.map((order) => {
        
        return (
            <TableRow order={order} columns={columns}/>
        )
    })
    return(
        <OrderTable>
            <thead>
                <tr>
                {header}
                </tr>
            </thead>
            <tbody>
            {rows}
            </tbody>
        </OrderTable>
    )
},
(prevProps, nextProps) => {
    if (JSON.stringify(prevProps) === JSON.stringify(nextProps) ) {
        return true; 
    } //using stringify since key order never changes 
    return false;
}
);

export default Table; 