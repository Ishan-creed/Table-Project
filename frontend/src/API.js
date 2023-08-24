import axios from "axios";


export const fetchData = async ()=>{


    try{
        const response = await axios.get("http://localhost:5000/getUser");
        return response.data;
    }catch(e){
        console.error(e);
    }

}