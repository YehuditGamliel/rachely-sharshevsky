import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../UserProvider";
import { useParams } from "react-router-dom";
import '../Info/Info.css'

function Info() {
    const { user, setCurrentUser } = useContext(UserContext);
    const { id } = useParams()
    const [display, setDisplay] = useState(false)

    useEffect(() => {
        if (id != user.id) {
            localStorage.clear();
            setUser()
            navigate('/login');
        }
        fetch(`http://localhost:8082/users/${id}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then((json) => { console.log(json.data);setCurrentUser({...json.data[0],id:id}); setDisplay(true) })
    }, [])


    return (
        <>
            {display ? <div id="info">
                <span>id: {user.id} </span><br />
                <span>name: {user.name}</span><br />
                <span>user name: {user.userName}</span><br />
                <span>email: {user.email}</span><br />
                <span>phone: {user.phone}</span>
            </div> : <p>loading...</p>}
        </>
    )
}
export default Info;

