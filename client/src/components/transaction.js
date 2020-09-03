import React , {useContext} from 'react'
import {GlobalContext} from '../context/GlobalState'

function Transaction({transaction}){

    const {deleteTransaction} = useContext(GlobalContext)

    const sign = transaction.amount < 0 ? '-' : '+'
    return(
        <React.Fragment>
            <li className={transaction.amount < 0 ? "minus" : "plus"}>
            {transaction.text} <span>{sign}${Math.abs(transaction.amount)}
            </span><button onClick={()=>deleteTransaction(transaction._id)} className="delete-btn">x</button>
            </li>
        </React.Fragment>
    )
}

export default Transaction