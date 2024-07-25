import { memo } from 'react';
import styled from 'styled-components';
import { removeUnderscore } from '../utils/utils';

const BackgroundColorVariables = {
    DELIVERED: `#acfbab`, 
    CREATED: `#ffb3f7`, 
    DRIVER_RECEIVED: `#abecfb`, 
    COOKED: `#fbd2ab`, 
    CANCELLED: `#ff9595`
};

const ColorVariables = {
    DELIVERED: `#194a07`, 
    CREATED: `#780d6d`, 
    DRIVER_RECEIVED: `#134b5f`, 
    COOKED: `#8a4606`, 
    CANCELLED: `#8c0808`
}

const Cell = styled.td`
    font-weight: 500;
    border-bottom: 2px solid #ccc;
    padding: 0px 0px 8px 8px;
`;

const CellContents = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;


const Badge = styled.div`
    background-color: ${({ value}) => BackgroundColorVariables[value]};
    height: 20px;
    width: 160px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    color: ${({ value}) => ColorVariables[value]};
`;

const TableCell = memo(({value, columnTitle}) => {
    const contents = columnTitle == 'event_name' ? <Badge value={value}>{removeUnderscore(value)}</Badge> : <CellContents>{value}</CellContents>;
    return (
        <Cell>{contents}</Cell>
    )
 });


export default TableCell;