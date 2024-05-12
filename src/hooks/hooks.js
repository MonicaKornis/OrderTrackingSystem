import { useEffect } from 'react';
import { filterOrdersByPrice } from "../utils/utils";

export const useSearchQuery = (searchQuery, setFilteredList, orders) => {
    const byIds = orders.orders.byIds;
    useEffect(() => {
        let filteredList = filterOrdersByPrice(byIds, searchQuery);
        setFilteredList(filteredList);
      }, [searchQuery, orders])
}

