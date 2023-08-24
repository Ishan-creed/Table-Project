import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Table } from "./table";
import {AiFillCaretRight,AiFillFileAdd} from 'react-icons/ai'
import { fetchData } from "../../API";
import './table.css';
import axios from 'axios';

const TableDetail = () => {

    

    const [formData,setFormData] = useState({
        userId:'',
        name:'',
        phone:'',
        email:'',
        hobbies:''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    const [showAddInventory, setShowAddInventory] = useState(false);
    const [UserData, setUserData] = useState([]);
    const handleAddInventory = () => {
        if (showAddInventory) {
            setShowAddInventory(false);
            return;
        }
        setShowAddInventory(true);
    }



    const addInventoryModalStyles = {
        main: {
          position: "absolute",
          top: "25%",
          left: "40%",
          transform: "translate(-50%,-50 %)",
          backgroundColor: "black",
          color:"white",
          zIndex: 1000,
          padding: "1rem",
          borderRadius: "10px",
          textAlign:"center"
        },
        heading: {
          display: "flex",
          justifyContent: "space-between",
          closeBtn: {
            width: "2.5rem",
            height: "2rem",
          }
        },
        sideButtons: {
          display: "flex",
          justifyContent: "flex-end",
          btn: {
            borderRadius: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: "var(--btnColor)",
            color: "white",
            outline: "none",
            border: "transparent",
            margin: "0.5rem",
          }
        }
      }



    const InventoryForm = {
        maxHeight:"350px",
        overflowY: "scroll",
        maxWidth:"250px"
    }
    const formStyle = {
        padding: "20px"
    }




  const onSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/newUser", {
        formData
      },
     );
    }
    catch (error) {
      console.log(error);
    }
  }

    return (
        <>
              {showAddInventory && (
        <div style={addInventoryModalStyles.main}>
          <div style={addInventoryModalStyles.heading}>
            <h1>Add User</h1>
            <button onClick={handleAddInventory}
              style={addInventoryModalStyles.heading.closeBtn}
            >Close</button>
          </div>
          <div style={addInventoryModalStyles.sideButtons}>
            <AiFillFileAdd />
          </div>
          <div style={InventoryForm}>
            <form className="login-form" style={formStyle}>
              <label htmlFor="id">Select a User ID</label> <br />
              <input
                type="text"
                id="id"
                name="userId"
                placeholder="User ID"
                onChange={handleChange}
                style= {{margin:"20px",padding:"5px",borderRadius:"10px"}} />
              <br />
              <label htmlFor="itemname">Enter User Name</label> <br />
              <input
                type="text"
                id="itemname"
                name="name"
                placeholder="Item Name"
                onChange={handleChange} 
                style= {{margin:"20px",padding:"5px",borderRadius:"10px"}}
                />
              <br />
              <label htmlFor="curval">Enter Contact</label>
              <input
                type="number"
                id="curval"
                name="phone"
                placeholder="Contact"
                onChange={handleChange} 
                style= {{margin:"20px",padding:"5px",borderRadius:"10px"}}
                />
                
              <br />
              <label htmlFor="quantity">Enter Email</label>
              <input
                type="text"
                id="quantity"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                style= {{margin:"20px",padding:"5px",borderRadius:"10px"}} />
              <label htmlFor="quantity">Enter your hobbies</label>
              <input
                type="text"
                id="quantity"
                name="hobbies"
                placeholder="Hobbies"
                onChange={handleChange}
                style= {{margin:"20px",padding:"5px",borderRadius:"10px"}} />
             
              <button type="submit" onClick={onSubmit} style = {addInventoryModalStyles.sideButtons.btn}>Add User</button>
            </form>
          </div>
        </div>
      )
      }
            <div className="scrolli" style={{textAlign:"center"}}>
                <MainContent>
                    <h2 style={{ textAlign: "center" }}>Welcome</h2>
                    <div className="right2">
                    <button id="updinvnt" onClick={handleAddInventory} style={addInventoryModalStyles.sideButtons.btn}>Add User</button>
                    </div>
                </MainContent>
                <Table />
            </div>
        </>
    )
};

const MainContent = styled.div`
height: 100%;
`
export default TableDetail;