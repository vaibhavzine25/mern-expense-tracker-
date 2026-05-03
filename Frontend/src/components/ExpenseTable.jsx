import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit2, Trash } from "lucide-react";
import { useSelector } from "react-redux";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import UpdateExpense from "./UpdateExpene";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { BASE_URL } from "../../config/apiConfig";

const ExpenseTable = () => {
  const { expenses } = useSelector((store) => store.expense);
  const [localExpense, setLocalExpense] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});


  useEffect(() => {
    setLocalExpense(expenses);
  }, [expenses]);

  const toatalAmount = localExpense.reduce((acc,expense)=>{
    if(!checkedItems[expense._id]){
      return acc + expense.amount;
    }
    return acc;
  },0);

  const handleCheckboxChange = async(expenseId) => {
    const newStatus = !checkedItems[expenseId];
    try {
      const res = await axios.put(`${BASE_URL}/api/v1/expense/${expenseId}/done`, {done:newStatus},{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      });
      if(res.data.success){
        toast.success(res.data.message);
        setCheckedItems((prevData)=>({
          ...prevData,
          [expenseId]:newStatus
        }));
        //optionally update the local state for expense if the entire object needs update
        setLocalExpense(localExpense.map(exp=>exp._id === expenseId ? {...exp, done:newStatus} : exp));
      };
    } catch (error) {
      console.log(error);
    }
  };

  const removeExpenseHandler = async(expenseId) =>{
    try {
      const res = await axios.delete(`http://localhost:8000/api/v1/expense/remove/${expenseId}`,{
         withCredentials: true,
      });
      if(res.data.success){
        toast.success(res.data.message);
        //update the local state
        const filteredExpenses = localExpense.filter(expense=> expense._id != expenseId);
        setLocalExpense(filteredExpenses);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Table>
      <TableCaption>A list of your recent expenses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">Mark As Done</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {localExpense.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              Add your first Expense
            </TableCell>
          </TableRow>
        ) : (
          localExpense?.map((expense) => (
            <TableRow key={expense._id}>
              <TableCell className="font-medium">
                <Checkbox
                  checked={expense.done}
                  onCheckedChange={() => handleCheckboxChange(expense._id)}
                />
              </TableCell>
              <TableCell className={`${expense.done ? "line-through": ""}`}>{expense.description}</TableCell>
              <TableCell className={`${expense.done ? "line-through": ""}`}>{expense.amount}</TableCell>
              <TableCell className={`${expense.done ? "line-through": ""}`}>{expense.category}</TableCell>
              <TableCell className={`${expense.done ? "line-through": ""}`}>{expense.createdAt?.split("T")[0]}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    onClick={()=> removeExpenseHandler(expense._id)}
                    size="icon"
                    className="rounded-full border text-red-600 border-red-600 hover:border-transparent"
                    variant="outline"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                  <UpdateExpense expense={expense}/>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5} className="font-bold text-xl">
            Total
          </TableCell>
          <TableCell className="text-right font-bold text-xl">
           ₹{toatalAmount}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default ExpenseTable;
