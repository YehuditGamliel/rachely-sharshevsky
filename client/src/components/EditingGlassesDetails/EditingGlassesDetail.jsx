import React from "react";
import { useState, useEffect, useContext } from "react";
import { useAuth } from '../../hook/AuthProvider.jsx'
import '../SpecificInfo/SpecificInfo.css'
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { EyeglassesContext } from "../../EyeglassesProvider.jsx";
import { TextField, Button } from '@mui/material';
function EditingGlassesDetails() {
    const { user, loginAction, logOut } = useAuth();
    const { eyeglasses, setCurrentEyeglasses } = useContext(EyeglassesContext);
    const [displaySpecificInfo, setDisplaypecificInfo] = useState('');
    const [moreImages, setMoreImages] = useState([])
    const [editedEyeglasses, setEditedEyeglasses] = useState({ ...eyeglasses });
    const [isEditing, setIsEditing] = useState(false);

    const handleConfirmChanges = () => {
        // You can add logic here to confirm the changes and update the database

        //     fetch(`http://localhost:8082/eyeglasses/${editedEyeglasses.model}`, {
        //         method: 'PUT',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(editedEyeglasses),
        //     })
        //     .then(response => response.json())
        //     .then((json) => {
        //         // Handle the response if needed
        //     })
        //     .catch(error => {
        //         // Handle any errors
        //         console.error('Error updating eyeglasses data:', error);
        //     });
        //     // Make an API call to save the editedEyeglasses data
        fetch(`http://localhost:8082/eyeglasses/${editedEyeglasses.model}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify(editedEyeglasses),
            body: JSON.stringify([
                {
                    "color": editedEyeglasses.color,
                    "stock": editedEyeglasses.stock,
                    "description": editedEyeglasses.description,
                    "BridgeWidth": editedEyeglasses.BridgeWidth,
                    "lensWidth": editedEyeglasses.lensWidth,
                    "company": editedEyeglasses.company,
                    "material": editedEyeglasses.material
                }
            ]),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update eyeglasses');
                }
                return response.json();
            })
            .then(data => {
                // Handle the response data if needed
            })
            .catch(error => {
                console.error('Error updating eyeglasses data:', error);
            });
    };


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
        console.log("specific", eyeglasses)

        fetch(`http://localhost:8082/eyeglasses/${eyeglasses.model}`, {
            method: 'GET',

        })
            .then(response => response.json())
            .then((json) => {
                if (json.status != 200) {
                    alert(json.error)
                }
                else {

                    console.log("😂", json.data[0][0])

                    setMoreImages([...moreImages, ...json.data[1]])

                    setEditedEyeglasses(glassesData => ({
                        ...glassesData,
                        ...json.data[0][0]
                    }));
                    console.log("😂", eyeglasses)


                }
            })
    }, [])

    return (<>
        {/* {alert(user)} */}
        <div id="card">
            <div id="container">
                <div id="title">
                    <TextField
                        label="Title"
                        value={editedEyeglasses.title}
                        onChange={(e) => handleChange('title', e.target.value)}

                        disabled={!isEditing}
                    />
                    {/* <p>{eyeglasses.title} <></> */}
                    {/* {displaySpecificInfo.company}</p> */}
                </div>
                <TextField
                    label="Company"
                    value={editedEyeglasses.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                    // fullWidth
                    disabled={!isEditing}
                />
                <TextField
                    label="Price"
                    value={editedEyeglasses.price}
                    onChange={(e) => handleChange('price', e.target.value)}
                    disabled={!isEditing}
                />
                <TextField
                    label="דגם"
                    value={editedEyeglasses.model}
                    onChange={(e) => handleChange('model', e.target.value)}
                    disabled={!isEditing}
                />
                <TextField
                    label="צבע עיקרי:"
                    value={editedEyeglasses.color}
                    onChange={(e) => handleChange('color', e.target.value)}
                    disabled={!isEditing}
                />
                {/* <p> דגם:{eyeglasses.model}</p> */}
                <TextField
                    label="רוחב עדשה"
                    value={editedEyeglasses.lensWidth}
                    onChange={(e) => handleChange('lensWidth', e.target.value)}
                    disabled={!isEditing}
                />

                <TextField
                    label="רוחב גשר:"
                    value={editedEyeglasses.BridgeWidth}
                    onChange={(e) => handleChange('BridgeWidth', e.target.value)}
                    disabled={!isEditing} />
                <TextField
                    label="חומר מסגרת:"
                    value={editedEyeglasses.material}
                    onChange={(e) => handleChange('material', e.target.value)}
                    disabled={!isEditing} />

                <div id="datas">
                    {/* <p>סה"כ</p>
                        <p id="totalPrice">{eyeglasses.price}₪</p> */}
                    {/* <Invitation /> */}

                    {/* Add other TextFields for model, color, lensWidth, BridgeWidth, material */}

                    {isEditing || <Button onClick={handleEdit} variant="contained">עריכת פרטים</Button>}
                    {isEditing && <Button onClick={handleConfirmChanges} variant="contained" color="primary">אישור השינויים</Button>}
                </div>
            </div>


            <img id="imgBig" src={eyeglasses.imgDisplay} />

        </div>
        {/* <div id="moreGlasses">
    
                <div className="title">
                    {moreImages.length > 1 ? <p> משקפיים נוספות ממותג זה...</p> : <></>}
                </div>
                <div id="moreGlasses">
                    {moreImages.map((img, index) =>
                        (img.model != eyeglasses.model) ? <SingleEyeglasses key={index} id="singleEyeglasses" model={img.model} price={img.price} photo={img.photo} title={img.title} />
                            : console.log(img.model, "pp", eyeglasses.model)
                        
                    )
                    }
                </div>
            </div> */}
    </>)

}
export default EditingGlassesDetails;