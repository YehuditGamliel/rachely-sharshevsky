import React from "react";
import { useState, useEffect, useContext } from "react";
import { EyeglassesContext } from "../../hook/EyeglassesProvider.jsx";
import { UserContext } from "../../hook/UserProvider.jsx";
import SingleEyeglasses from "../SingleEyeglasses/SingleEyeglasses.jsx";
import '../SpecificInfo/SpecificInfo.css'
import { APIRequests } from "../../APIRequests.js";
import Button from '@mui/material/Button';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useNavigate } from 'react-router-dom';
import Login from "../Login/Login.jsx";

function SpecificInfo() {
    const { user, setCurrentUser } = useContext(UserContext);
    const [editEyeglasses, setEditedEyeglasses] = useState([])
    const { eyeglasses, setCurrentEyeglasses } = useContext(EyeglassesContext);
    const [displaySpecificInfo, setDisplaypecificInfo] = useState('');
    const [login, setLogin] = useState(false)
    const APIRequest = new APIRequests()
    const navigate = useNavigate();

    useEffect(() => {
        const kindOfGlasses = location.pathname.split('/')[2];
        const fetchData = async () => {
            try{
                const response = await APIRequest.getRequest(`/eyeglasses/kind/${kindOfGlasses}/${eyeglasses.model}`)
                const json = await response.json();
                setEditedEyeglasses(glassesData => ({
                    ...glassesData,
                    ...json.data[0]
                }));  
            }
            catch(error){
                alert(error)
            }
        }
        fetchData();
    }, [])

    const checkNavigate = () => {
        if (user.userName) {
            navigate('./invitation')
        }
        else {
            setLogin(true)
        }
    }

    return (
        <>
            {login ? <Login paper='invition' /> :
                <div id="card">
                    <div id="container">
                        <div id="title">
                            <p>{eyeglasses.title} <> </>
                                {editEyeglasses.company}</p>
                        </div>
                        <p>{eyeglasses.price}₪</p>
                        <p> דגם:{eyeglasses.model}</p>
                        <p>צבע עיקרי:{editEyeglasses.color}</p>
                        <p> רחוב עדשה:{editEyeglasses.lensWidth}</p>
                        <p>רוחב גשר:{editEyeglasses.BridgeWidth}</p>
                        <p>חומר מסגרת:{editEyeglasses.material}</p>
                        <div id="datas">
                            <p>סה"כ</p>
                            <p id="totalPrice">{eyeglasses.price}₪</p>
                            <Button variant="outlined" onClick={checkNavigate} startIcon={<RemoveRedEyeIcon />}>לבחירת עדשות</Button>
                        </div>
                    </div>
                    <img id="imgBig" src={editEyeglasses.imgDisplay} alt="Eyeglasses" />
                </div>
            }
        </>
    );
}
export default SpecificInfo;


