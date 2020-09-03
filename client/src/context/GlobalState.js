import React ,{createContext ,useReducer} from 'react'
import AppReducer from './AppReducer'
import axios from 'axios'

const initialState = {
    transactions:[],
    error:null,
    loading:true
}

// create context

export const GlobalContext = createContext(initialState)

//provider

export const GlobalProvider = ({children})=>{
    const [state , dispatch] = useReducer(AppReducer,initialState)

    //action

    async function getTransactions(){
        try{
            const res = await axios.get('/api/v1/transaction')
            dispatch({
                type:'GET_TRANSACTION',
                payload:res.data.data
            })
            
        }catch(err){
            dispatch({
                type:'TRANSACTION_ERROR',
                payload:err.res.data.error
            })
        }
    }

    async function deleteTransaction(id){
        try{
            await axios.delete(`/api/v1/transaction/${id}`)
            dispatch({
                type:'DELETE_TRANSACTION',
                payload:id
            })
        }catch(err){
            dispatch({
                type:'TRANSACTION_ERROR',
                payload:err.res.data.error
            })
        }
        
    }

    async function addTransaction(transaction){
        const config = {
            header:{
                'Content-type':'application/json'
            }
        }
        try{
            const res = await axios.post('/api/v1/transaction' , transaction , config)
            dispatch({
                type:'ADD_TRANSACTION',
                payload:res.data.data
            })
        }catch(err){
            dispatch({
                type:'TRANSACTION_ERROR',
                payload:err.res.data.error
            })
        }
        
    }
    return <GlobalContext.Provider value={{
        transactions:state.transactions,
        error:state.error,
        loading:state.loading,
        getTransactions,
        deleteTransaction,
        addTransaction
    }}> 
        {children}
    </GlobalContext.Provider>
}