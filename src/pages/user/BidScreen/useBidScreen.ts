import React, { useEffect, useState } from 'react';
import service from '../../../utils/service';

function useBidScreen() {
    const [bidList, setBidList] = useState([]);
    async function fetchData() {
        try {
            const {data} = await service.get("/list_of_bids");
            setBidList(data);
        } catch (error) {
            console.log(JSON.stringify(error));
        }
    }
    
    useEffect(() => {
      fetchData();
    }, [])
    
    return { bidList }
}

export default useBidScreen;