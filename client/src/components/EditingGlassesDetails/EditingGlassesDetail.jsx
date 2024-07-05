import React from "react";
import { useState, useEffect, useContext } from "react";
import '../SpecificInfo/SpecificInfo.css'
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { EyeglassesContext } from "../../EyeglassesProvider.jsx";
import { TextField, Button } from '@mui/material';
import { APIRequests } from "../../APIRequests.js";
import { eyeglassesSchema } from '../../../clientValidations.js';


function EditingGlassesDetails() {
    const { eyeglasses } = useContext(EyeglassesContext);
    const [moreImages, setMoreImages] = useState([])
    const [editedEyeglasses, setEditedEyeglasses] = useState({ ...eyeglasses });
    const [isEditing, setIsEditing] = useState(false);
    const APIRequest = new APIRequests();
    const [show, setShow] = useState(false)
    const handleConfirmChanges = async () => {
        const { model, imgDisplay, ...editedEyeglassesWithoutModelForUpdate } = editedEyeglasses;
        setEditedEyeglasses(editedEyeglassesWithoutModelForUpdate);
        console.log(editedEyeglasses);
        
        let valid = eyeglassesSchema.validate(editedEyeglasses);
        if (valid.error) {
            alert(valid.error.details[0].message);
            return;
        }
    
        try {
            const response = await APIRequest.putRequest(`/eyeglasses/${editedEyeglasses.model}`, {
                "title": editedEyeglasses.title,
                "color": editedEyeglasses.color,
                "stock": editedEyeglasses.stock,
                "description": editedEyeglasses.description,
                "BridgeWidth": editedEyeglasses.BridgeWidth,
                "lensWidth": editedEyeglasses.lensWidth,
                "company": editedEyeglasses.company,
                "material": editedEyeglasses.material,
                "imgDisplay": editedEyeglasses.imgDisplay,
                "imgCamara": editedEyeglasses.imgCamara
            });
            
            alert("השינוי נשמר במערכת");
        } catch (error) {
            alert(" לא ניתן לעדכן")
        }
    };
   
        
        // fetch(`http://localhost:8082/eyeglasses/${editedEyeglasses.model}`, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify([
        //         {
        //             "title": editedEyeglasses.title,
        //             "color": editedEyeglasses.color,
        //             "stock": editedEyeglasses.stock,
        //             "description": editedEyeglasses.description,
        //             "BridgeWidth": editedEyeglasses.BridgeWidth,
        //             "lensWidth": editedEyeglasses.lensWidth,
        //             "company": editedEyeglasses.company,
        //             "material": editedEyeglasses.material
        //         }
        //     ]),
        // })
        //     .then(response => {
        //         console.log(response)
        //         if (!response.ok) {
        //             throw new Error('Failed to update eyeglasses');
        //         }
        //         return response.json();
        //     })
        //     .then(data => {
        //     })
        //     .catch(error => {
        //         console.error('Error updating eyeglasses data:', error);
        //     });
    
    const handleChange = (field, value) => {
        setEditedEyeglasses({
            ...editedEyeglasses,
            [field]: value,
        });
    };

    const handleEdit = () => {
        setIsEditing(true);
    };
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    useEffect(() => {
        // console.log("eyeGlasses",eyeglasses)
        // console.log("model",eyeglasses.model)

        const fetchData = async () => {
            try {
                console.log("begin", eyeglasses)
                const response = await APIRequest.getRequest(`/eyeglasses/${eyeglasses.model}`)
                const json = await response.json()
                console.log("😂", json.data[0])
              
                //  setMoreImages([...moreImages, ...json.data[1]])
                setEditedEyeglasses(glassesData => ({
                    ...glassesData,
                    ...json.data[0]
                }));
                // const { model, ...editedEyeglassesToSend } = editedEyeglasses;
                // setEditedEyeglasses(editedEyeglassesToSend)
                // console.log("😂", json.data[0],json.data[1],json.data[0][0])
            }
            catch (error) {
                alert(error)
            }
        }



        fetchData();
        // fetch(`http://localhost:8082/eyeglasses/${eyeglasses.model}`, {
        //     method: 'GET',

        // })
        //     .then(response => response.json())
        //     .then((json) => {
        //         console.log("json.result",json.result[0],json[0],"json.resultItems",json.resultItems[0])
        //         // if (json.status != 200) {
        //         //     alert(json.error)
        //         // }
        //         // else {
        //             console.log("😂", editedEyeglasses)
        //            // setMoreImages([...moreImages, ...json.resultItems[0]])
        //             setEditedEyeglasses(glassesData => ({
        //                 ...glassesData,
        //                 ...json.result[0]
        //             }));
        //             console.log("😂", editedEyeglasses)
        //         // }
        //     })
    }, [])
    const { model,imgDisplay, ...editedEyeglassesWithoutModel } = editedEyeglasses;
    // setEditedEyeglasses(editedEyeglassesWithoutModel)
    return (<>
        <div id="card">

            <div id="container">
                {Object.keys(editedEyeglassesWithoutModel).map((key) => (
                    <TextField
                        key={key}
                        label={key}
                        value={editedEyeglassesWithoutModel[key]}
                        onChange={(e) => handleChange(key, e.target.value)}
                        disabled={!isEditing}
                    />
                ))}
                {/*  */}
                {console.log(editedEyeglasses, "ppppppp")}
                <div id="datas">
                    {isEditing || <Button onClick={handleEdit} variant="contained">עריכת פרטים</Button>}
                    {isEditing && <Button onClick={handleConfirmChanges} variant="contained" color="primary">אישור השינויים</Button>}
                </div>
            </div>
            <img id="imgBig" src={eyeglasses.imgDisplay} />

        </div>
    </>)

}
export default EditingGlassesDetails;