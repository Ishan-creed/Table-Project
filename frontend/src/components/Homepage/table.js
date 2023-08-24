import React, { useMemo, useState,useEffect } from 'react';
import { useTable, usePagination, useGlobalFilter } from 'react-table';
import { GlobalFilter, ButtonComponent } from './GlobalFilter';
import {AiFillCaretRight,AiFillFileAdd} from 'react-icons/ai'
import styled from "styled-components";
import { fetchData } from '../../API';
import axios from 'axios';
import './table.css';


export const Table = () => {


  const [showUpdateInventory, setShowUpdateInventory] = useState(false);

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

  const handleUpdateInventory = () => {
    if (showUpdateInventory) {
      setShowUpdateInventory(false);
      return;
    }
    setShowUpdateInventory(true);
  }

  const updateInventoryModalStyles = {
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
        backgroundColor: "red",
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



 const COLUMNS = [
    {
        Header: 'Id',
        accessor: 'userId'
    },
    {
        Header: 'Name',
        accessor: 'name'
    },
    {
        Header: 'Phone',
        accessor: 'phone'
    },
    {
        Header: 'Email',
        accessor: 'email'
    },
    {
        Header: 'Hobbies',
        accessor: 'hobbies'
    },
    {
        Header: 'Update', // Button column header
        accessor: '1', // This can be any unique key
        // Cell: ({ row }) => (
        //     <button onClick={() => handleButtonClick1(row)} style = {updateInventoryModalStyles.sideButtons.btn}>Update</button>
        // )
    },
    {
        Header: 'Delete', // Button column header
        accessor: '2', // This can be any unique key
        Cell: ({ row }) => (
            <button onClick={() => handleButtonClick2(row)} style = {updateInventoryModalStyles.sideButtons.btn}>Delete</button>
        )
    },
    {
        Header: 'Email', // Button column header
        accessor: '3', // This can be any unique key
        Cell: ({ row }) => (
            <button onClick={() => handleButtonClick3(row)} style = {updateInventoryModalStyles.sideButtons.btn}>Email</button>
        )
    },
];




// Function to handle checkbox change

const handleButtonClick1 = async (row) => {
  let myId = row.original.userId;
  console.log(myId);

try {
  
    await axios.put(`http://localhost:5000/updateUser`, formData,
    {
      params:{
        id:myId
      }
    });
    
    // setShowUpdateInventory(false);
  } catch (e) {
    console.error(e);
  }
};


const handleButtonClick2 = async (row) => {
    let myId = row.original.userId;
    
    try{
        await axios.delete("http://localhost:5000/deleteUser",{
            params: {
                id: myId
            }
        });
    
    }catch(e){
        console.log(e);
    }

};

const handleButtonClick3 = (row) => {

    let data = {
       Id: row.original._id,
       Name:row.original.name,
       Phone:row.original.phone,
       Email:row.original.email,
       Hobbies:row.original.hobbies
    };

    axios.post('http://localhost:5000/mail', data)
    .then(response => {
       
        console.log(response.data);
    })
    .catch(error => {
  
        console.error(error);
    });
    

};



  
  const [TableData, setTableData] = useState([]);
  
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const gotData = await fetchData();
      console.log('Got Data',gotData);
      setTableData(gotData);
    } catch (error) {
      console.log(error);
    }
  };

  // Define columns using useMemo to memoize the columns
  const columns = useMemo(() => COLUMNS, []);

  // Destructure properties from useTable
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    pageOptions,
    state,
    setGlobalFilter,
    canNextPage,
    canPreviousPage,
    prepareRow,
  } = useTable(
    {
      columns,
      data: TableData,
    },
    useGlobalFilter,
    usePagination
  );

  const { globalFilter } = state;
  const { pageIndex } = state;


  return (
    <>
     {showUpdateInventory && (
        <div style={updateInventoryModalStyles.main}>
          <div style={updateInventoryModalStyles.heading}>
            <h1>Update User</h1>
            <button onClick={handleUpdateInventory}
              style={updateInventoryModalStyles.heading.closeBtn}
            >Close</button>
          </div>
          <div style={updateInventoryModalStyles.sideButtons}>
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
             
              <button type="submit" onClick={handleButtonClick1} style = {updateInventoryModalStyles.sideButtons.btn}>Update User</button>
            </form>
          </div>
        </div>
      )
      }
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <ButtonComponent />

      {/* Add table props */}
      <table className="table" {...getTableProps()}>
        <thead>
          {/* Map through headerGroups */}
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {/* Map through headers */}
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {/* Map through rows */}
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {/* Map through cells */}
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.column.Header === 'Update' ? ( // Check if it's the 'Update' column
              <button style={updateInventoryModalStyles.sideButtons.btn} onClick={() => handleUpdateInventory(row)}>
                Update
              </button>
            ) : (
              cell.render('Cell') // Render other cells normally
            )}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <span className="space">
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <button
          className="button1"
          style={{ borderRadius: '1rem' }}
          onClick={previousPage}
          disabled={!canPreviousPage}
        >
          PREVIOUS
        </button>
        <button
          className="button1"
          style={{ borderRadius: '1rem' }}
          onClick={nextPage}
          disabled={!canNextPage}
        >
          NEXT
        </button>
      </div>
    </>
  );
};
