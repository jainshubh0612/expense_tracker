import React ,{useContext ,useEffect} from 'react'

import {GlobalContext} from '../context/GlobalState'
import Transaction from './transaction'

function TransactionList(){

    const {transactions ,getTransactions} = useContext(GlobalContext)
    
    useEffect(()=>{
        getTransactions()
    },[])

    return(
        <React.Fragment>
            <h3>History</h3>
            <ul className="list">
            {
                transactions.map((transaction)=>
                   <Transaction key={transaction._id} transaction = { transaction }/>
                )
            }
            </ul>
        </React.Fragment>
    )
}

export default TransactionList;
