import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import { UserContext } from "../../UserProvider";
import './Home.css';
import logo from '../../img/logo.png'


function Home() {

    // const navigate = useNavigate();
    // const { user, setCurrentUser } = useContext(UserContext);
   

    
    // const { id } = useParams();
    // useEffect(() => {
    //     if (user.id == "")
    //         navigate('/login')
    //    else if (id != user.id) {
    //         navigate(`/home/users/2`)
    //         alert("not logal!")
    //     }
    // }, [id])


    // const LogOut = () => {
    //     localStorage.clear();
    //     setCurrentUser('')
    //     navigate('/login');
    // }

    return (<>
        {/* <button className='button' onClick={LogOut}>Logout</button> */}
        <div id="links">
            <img src={logo} id="logo"/>
            {/* <header>{user.userName}</header> */}
            <nav>
                <ul>
                <li> <Link to={"./posts"}>בית</Link></li>
                    <li> <Link to={"./posts"}>משקפי ראיה</Link></li>
                    <li> <Link to={"./todos"}>משקפי שמש</Link></li>
                    <li> <Link to={"./info"}>משקפי קריאה</Link></li>
                    <li> <Link to={"./posts"}>עדשות</Link></li>
                    <li> <Link to={"./todos"}>בדיקת ראיה</Link></li>
                    <li> <Link to={"./info"}>יצירת קשר</Link></li>
                </ul>
            </nav>
        </div>
        <Outlet />
    </>)
}
export default Home
