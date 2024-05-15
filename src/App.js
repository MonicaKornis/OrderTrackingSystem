import {useState, useEffect, Profiler} from 'react';
import { socket } from './socket';
import logo from './logo.svg';
import { addNewOrders, onRenderCallback } from './utils/utils'
import Table from './components/Table';
import './App.css';
import SearchBar from './components/SearchBar';
import { filterOrdersByPrice } from './utils/utils';
import {useSearchQuery} from './hooks/hooks';



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

  const handleSearchInputChange = (e) => {
    // debugger
    setSearchQuery(e.target.value)
  }

  useSearchQuery(searchQuery, setFilteredList, orderList)
  


  return (
    <Profiler id='App' onRender={onRenderCallback}>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <SearchBar placeholderText='Search Orders By Price' value={searchQuery} handleChange={handleSearchInputChange}/>
        <Table orderList={searchQuery ? filteredList?.orders?.byIds : orderList?.orders?.byIds}/>

      </header>
    </div>
    </Profiler>
  );
}

export default App;

//only updating table when there is a search term 