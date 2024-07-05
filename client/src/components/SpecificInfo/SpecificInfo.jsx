import React from "react";
import { useState, useEffect, useContext } from "react";
import { EyeglassesContext } from "../../hook/EyeglassesProvider.jsx";
import { UserContext } from "../../hook/UserProvider.jsx";
import SingleEyeglasses from "../SingleEyeglasses/SingleEyeglasses.jsx";
import '../SpecificInfo/SpecificInfo.css'
import { APIRequests } from "../../APIRequests.js";
import Button from '@mui/material/Button';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Alert from '@mui/material/Alert';
import { useNavigate, useLocation } from 'react-router-dom';
import Login from "../Login/Login.jsx";

function SpecificInfo() {
    const { user, setCurrentUser } = useContext(UserContext);
    const [editEyeglasses, setEditedEyeglasses] = useState([])
    const { eyeglasses, setCurrentEyeglasses } = useContext(EyeglassesContext);
    const [displaySpecificInfo, setDisplaypecificInfo] = useState('');
    const [moreImages, setMoreImages] = useState([])
    const [login, setLogin] = useState(false)
    const APIRequest = new APIRequests()
    const navigate = useNavigate();

    useEffect(() => {
        const kindOfGlasses = location.pathname.split('/')[2];
        const fetchData = async () => {
            const response = await APIRequest.getRequest(`/eyeglasses/kind/${kindOfGlasses}/${eyeglasses.model}`)
            const json = await response.json();
            console.log("json",json)
            setMoreImages([...moreImages, ...json.resultItems])
            setEditedEyeglasses(glassesData => ({
                ...glassesData,
                ...json.result[0]
            }));  
        }
        fetchData();
    }, [])

    const checkNavigate = () => {
        console.log(user.userName, "user.userName")
        if (user.userName) {
            navigate('./invitation')
        }
        else {
            { console.log(user.userName, "login") }
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
                                {displaySpecificInfo.company}</p>
                        </div>
                        <p>{eyeglasses.price}₪</p>
                        <p> דגם:{eyeglasses.model}</p>
                        <p>צבע עיקרי:{eyeglasses.color}</p>
                        <p> רחוב עדשה:{eyeglasses.lensWidth}</p>
                        <p>רוחב גשר:{eyeglasses.BridgeWidth}</p>
                        <p>חומר מסגרת:{eyeglasses.material}</p>
                        <div id="datas">
                            <p>סה"כ</p>
                            <p id="totalPrice">{eyeglasses.price}₪</p>
                            <Button variant="outlined" onClick={checkNavigate} startIcon={<RemoveRedEyeIcon />}>לבחירת עדשות</Button>
                        </div>
                    </div>
                    <img id="imgBig" src={eyeglasses.imgDisplay} alt="Eyeglasses" />
                </div>
            }
            <div id="moreGlasses">
                <div className="title">
                    {moreImages.length > 1 ?
                        <div>
                            <p> משקפיים נוספות ממותג זה...</p>
                            <div id="moreGlasses">
                                {moreImages.map((img, index) =>
                                    (img.model !== eyeglasses.model) ? <SingleEyeglasses key={index} id="singleEyeglasses" model={img.model} price={img.price} imgDisplay={img.imgDisplay} imgCamara={img.imgCamara} title={img.title} /> : null
                                )}
                            </div>
                        </div>
                        : null}
                </div>
            </div>
        </>
    );

}
export default SpecificInfo;


