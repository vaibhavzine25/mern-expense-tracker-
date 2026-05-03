import { setExpenses } from "@/redux/expenseSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { BASE_URL } from "../../config/apiConfig";

const useGetExpenses = () =>{
    const dispatch = useDispatch();
    const {category, markAsDone} = useSelector(store=>store.expense);

    useEffect(()=>{
       const fetchExpenses = async () =>{
       try{
           axios.defaults.withCredentials=true;
           const res = await axios.get(`${BASE_URL}/api/v1/expense/getall?category=${category}&done=${markAsDone}`);
           if(res.data.success){
            dispatch(setExpenses(res.data.expenses));
           }
        } catch(error){
           console.log(error);
           dispatch(setExpenses([]));
        }
       }
       fetchExpenses();
    },[dispatch, category, markAsDone]);
}

export default useGetExpenses
