import { addHours } from "date-fns";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { useUiStore } from "../../hooks/useUiStore"


export const FabAddNew=()=>{
const { openDateModal}= useUiStore();
const { setActiveEvent } = useCalendarStore();
  
 const handleClickNew=()=>{
    setActiveEvent({
        title:'',
        notes:'',
        start:new Date(),
        end: addHours( new Date(), 2),
        bgColor:'#fafafa',
        user:{
            _id:'123',
            name:'franco'
        }
    })
    openDateModal();
 }
    return(
        <button
         className="btn btn-danger fab"
         onClick={handleClickNew}>
     <i className="fas  fa-plus"></i>
        </button>
    )
}