import React from "react";
import './table.css';

export const  ButtonComponent = () =>{

    return(

       <></>

    )

};

export const GlobalFilter=({filter,setFilter})=>{
    return(
        <>
            <span>
                <input className="example" 
                    value={filter || ''}
                    placeholder='search...'
                    onChange={e=>setFilter(e.target.value)}
                />
            </span>
        </>
    )
}