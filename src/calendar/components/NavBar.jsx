import React from "react";
import { useAuthStore } from "../../hooks/useAuthStore,";
import logo from "../../logo/buho.png"
import "./NavBar.css"

export const NavBar=()=>{

    const {startLogout,user}=useAuthStore();

    return(
        <div className="navbar navbar-dark bg-success mb-4 px-4">
           <span className="navbar-brand">
           <img src={logo} alt="Logo" className="logo img-fluid"  />
            &nbsp;
            {user.name}
           </span>

           <button
            className="btn btn-danger"
           onClick={startLogout}  >
            <i className="fas fa-sign-out-all"></i>
            &nbsp;
            <span>
                Salir
            </span>
           </button>
        </div>
    )
}