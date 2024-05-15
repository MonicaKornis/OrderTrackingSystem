import React from 'react';
import { formatNumberToPrice }from '../utils/utils';

const TableRow = React.memo(({order, columns}) => {
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
});

export default TableRow;