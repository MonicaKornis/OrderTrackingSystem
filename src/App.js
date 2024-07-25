import {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import { socket } from './socket';
import { addNewOrders, onRenderCallback } from './utils/utils'
import Table from './components/Table';
import SearchBar from './components/SearchBar';
import {useSearchQuery} from './hooks/hooks';

const AppContainer = styled.div`
  font-family: "Open Sans", sans-serif;
  padding: 50px;
`

const HeaderSection = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding-bottom: 50px;
  border-bottom: 2px solid #ccc;
`

const HeaderText = styled.div`
  font-weight: 500;
`

const CountNumber = styled.span`
  font-weight: 700;
`


function App() {
  const [filteredList, setFilteredList] = useState(null)
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [orderList, setOrderList] = useState({orders: {byIds: {}}});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onOrderEvent(value) {
      setOrderList(previous => addNewOrders(previous, value));
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('order_event', onOrderEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('order_event', onOrderEvent);
    };
  }, []);

  const handleSearchInputChange = useCallback((e) => {
    setSearchQuery(e.target.value)
  }, [searchQuery])

  useSearchQuery(searchQuery, setFilteredList, orderList)
  
  let ordersToDisplay = searchQuery ? filteredList?.orders?.byIds : orderList?.orders?.byIds;

  return (
    <AppContainer>
        <HeaderSection>
          <div>
            <HeaderText>Order Count</HeaderText>
            <CountNumber>{Object.values(ordersToDisplay).length}</CountNumber><span> total orders</span> 
          </div>
          <SearchBar placeholderText='Search Orders By Price' value={searchQuery} handleChange={handleSearchInputChange}/>
        </HeaderSection>
        <Table orderList={ordersToDisplay}/>
    </AppContainer>
  );
}

export default App;