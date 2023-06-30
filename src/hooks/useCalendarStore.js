import { useDispatch, useSelector } from "react-redux";
import calendarApi from '../api/calendarApi';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent,onLoadEvents } from "../store/calendar/calendarSlice";
import { convertEventsToDateEvents } from "../helpers";
import Swal from 'sweetalert2'

export const useCalendarStore=()=>{
 const dispatch=useDispatch();

  const{ events,activeEvent}=useSelector(state=>state.calendar);
  const {user}=useSelector(state=>state.auth);

   const setActiveEvent=(calendarEvent)=>{
    dispatch(onSetActiveEvent(calendarEvent))
   }

   const startSavingEvent=async(calendarEvent)=>{
    //todo llegar al backend

    try {
       //todo bien
    if( calendarEvent.id){
      await calendarApi.put(`/events/${calendarEvent.id}`,calendarEvent)
      
      //actualizado
      dispatch(onUpdateEvent({ ...calendarEvent,user}));
      return;
    }
        //creando
       const {data}=await calendarApi.post('/events',calendarEvent);
        dispatch(onAddNewEvent({...calendarEvent, id:data.evento.id, user}));
    
    } catch (error) {
      console.log(error);
      Swal.fire('Error al guardar',error.response.data.msg,'error')
    }


   
   }

   const StartDeletingEvent=async()=>{
    try {
     await calendarApi.delete(`/events/${ activeEvent.id}`);
     dispatch(onDeleteEvent());
       //spooo llamdolo seria todo
    } catch (error) {
      console.log(error);
      Swal.fire('Error al eliminar',error.response.data.msg,'error')
    }
   
 
   }


   const startLoadingEvents= async()=>{
    try {
      
      const {data}=await calendarApi.get('/events');
      const events=convertEventsToDateEvents( data.eventos);
      dispatch(onLoadEvents(events))
      console.log(events)
    } catch (error) {
      console.log('Error cargando eventos');
      console.log(error)
    }
   }
    return{
       //Propiedades
       activeEvent,
       events,
       hasEventSelected:!!activeEvent,
      //el hasEvent hace q erl boton borrar aprezca solo si clickeamos una vez en el evento, piola
       //Metodos
       setActiveEvent,
       startSavingEvent,
      StartDeletingEvent,
      startLoadingEvents,
      
    }
}