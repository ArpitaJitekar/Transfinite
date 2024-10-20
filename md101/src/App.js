import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { BrowserRouter,Routes ,Route} from 'react-router-dom';
import Nav from "./component/Nav"
import Form from "./component/Form"
import Dashboard from "./component/Dashboard"
import Login from "./component/Login"
const socket = io('http://localhost:5000'); // Connect to the backend WebSocket server

function App() {
    const [data, setData] = useState([]);
  const [playlist,setplaylist]=useState([]);

    useEffect(() => {
        // Listen for dataChange events from the server
        socket.on('dataChange', (change) => {
            console.log('Data change received:', change);
            if (change.operationType === 'insert') {
                setData((prevData) => [...prevData, change.fullDocument]);
                setplaylist((prevplaylist)=>[...prevplaylist,change.fullDocument])
            } else if (change.operationType === 'update') {
                setData((prevData) =>
                    prevData.map((item) =>
                        item._id === change.documentKey._id ? { ...item, ...change.fullDocument } : item
                    )
                );
            } else if (change.operationType === 'delete') {
                setData((prevData) => prevData.filter((item) => item._id !== change.documentKey._id));
            }
        });

        return () => {
            socket.off('dataChange'); // Cleanup on unmount
        };
    }, []);

    const addEvent = async (fname, lname, email) => {
        const response = await axios.post('http://localhost:5000/changes',{fname, lname, email });
        setData((prevData) => [...prevData, response.data]);
        console.log('New event added:', response.data);
    };

    return (
  <>
   <BrowserRouter>
   <Nav/>
  <Routes>
  <Route path='/' element={<Dashboard data={data} playlist={playlist}/>}/>
  <Route path='/form' element={<Form addEvent={addEvent}/>}/>
  <Route path='/login' element={<Login/>}/>
   </Routes>
   
    </BrowserRouter>
    
  </>
  );
}
export default App;
