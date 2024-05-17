import React from 'react';
import TableCell from './TableCell';
import { formatNumberToPrice }from '../utils/utils';


const TableRow = React.memo(({order, columns}) => {
    return (
        <tr key={order.id}>
                {columns.map((columnTitle) => {
                    let value = order[columnTitle];
                    if(columnTitle == 'price') value = formatNumberToPrice(value);
                    return (
                        <TableCell value={value} columnTitle={columnTitle}/>
                    )
                })}
            </tr>
    )
});

export default TableRow;