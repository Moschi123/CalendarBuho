import { NavBar } from "../components/NavBar.jsx";
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { localizer,getMessagesEs } from "../../helpers";
import {CalendarEvent} from '../components/CalendarEvent.jsx'
import { useEffect, useState } from "react";
import { CalendarModal } from "../components/CalendarModal.jsx";
import { useUiStore } from "../../hooks/useUiStore.js";
import { useCalendarStore } from "../../hooks/useCalendarStore.js";
import { FabAddNew } from "../components/FabAddNew.jsx";
import { FabDelete } from "../components/FabDelete.jsx";
import { useAuthStore } from "../../hooks/useAuthStore,.js";

export const CalendarPage = () => {
  
  const { user } =useAuthStore();
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent,startLoadingEvents } = useCalendarStore();

  const [ lastView, setLastView ] = useState(localStorage.getItem('lastView') || 'week' );

  const eventStyleGetter = ( event, start, end, isSelected ) => {
      
    const isMyEvent=( user.id ===event.user._id ) ||(user.id ===event.user.id);
    const style = {
      backgroundColor: isMyEvent? '#347CF7': '#F7B134',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  }

  const onDoubleClick = ( event ) => {
    // console.log({ doubleClick: event });
    openDateModal();
  }

  const onSelect = ( event ) => {
    // console.log({ click: event });
    setActiveEvent( event );
  }

  const onViewChanged = ( event ) => {
    localStorage.setItem('lastView', event );
    setLastView( event )
  }

  useEffect(()=>{
    startLoadingEvents()
  },[])

  return (
    <>
      <NavBar />

      <Calendar
        culture='es'
        localizer={ localizer }
        events={ events }
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
        messages={ getMessagesEs() }
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChanged }
      />


      <CalendarModal />
      
      <FabAddNew />
      <FabDelete />


    </>
  )
}