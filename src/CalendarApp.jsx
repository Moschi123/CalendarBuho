import { AppRouter } from "./router/AppRouter"
import {BrowserRouter} from "react-router-dom";
import  {Provider} from "react-redux"
import { store } from "./store/store";
export const CalendatApp=()=>{
   return(
    <Provider store={store}>
 <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>

    </Provider>
   
   )
}