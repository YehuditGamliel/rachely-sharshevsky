import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SingleEyeglassee from '../SingleEyeglasses/SingleEyeglasses.jsx';
import { APIRequests } from "../../APIRequests.js";
import './Eyeglasses.css'

function Eyeglasses() {
  const [selectedValue, setSelectedValue] = useState('everyOne');
  const [displayEyeglasses, setDisplayEyglasses] = useState([]);
  const [loadMore, setLoadMore] = useState(true)
  const [eyeglassesPage, setEyeglassesPage] = useState({ men: 1, women: 1, children: 1, sport: 1 });
  const [changeTypeGlasses, setChangeTypeGlasses] = useState("change");
  const APIRequest = new APIRequests()
  const navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    if (location.pathname.split('/')[1] == 'eyeglasses') {
      setChangeTypeGlasses("change")
      setLoadMore(true)
    }
  }, [location])

  useEffect(() => {
    const kindOfGlasses = location.pathname.split('/')[2];
    const fetchData = async () => {
      if (loadMore && location.search == "") {
        const response = await APIRequest.getRequest(
          `/eyeglasses/kind/${kindOfGlasses}/?_page=${eyeglassesPage[kindOfGlasses]}`);
        const json = await response.json();
          if (changeTypeGlasses == "notChange" || selectedValue == "everyOne") {
            setDisplayEyglasses([...displayEyeglasses, ...json]);
          } else {
            setDisplayEyglasses([...json]);
          }
        setChangeTypeGlasses("notChange");
        setEyeglassesPage(prevState => {
          const updatedState = { ...prevState };
          Object.keys(updatedState).forEach(key => {
            updatedState[key] = key === kindOfGlasses ? prevState[key] + 1 : 1;
          });
          return updatedState;
        });
        setLoadMore(false);
      }
    };
    fetchData();
  }, [changeTypeGlasses, loadMore]);

  const handleSortByChange = async (event) => {
    const kindOfGlasses = location.pathname.split('/')[2];
    let value = event.target.value;
    setSelectedValue(value);
    if (value == 'everyOne') {
      setChangeTypeGlasses("notChange")
      navigate(`/eyeglasses/${kindOfGlasses}`)
      const response = await APIRequest.getRequest(
        `/eyeglasses/kind/${kindOfGlasses}/?_page=${eyeglassesPage[kindOfGlasses]}`);
      const json = await response.json();
      setDisplayEyglasses([...displayEyeglasses, ...json]);
      //setChangeTypeGlasses("notChange");
      setEyeglassesPage(prevState => {
        const updatedState = { ...prevState };
        Object.keys(updatedState).forEach(key => {
          updatedState[key] = key === kindOfGlasses ? prevState[key] + 1 : 1;
        });
        return updatedState;
      });
      setLoadMore(false);
    }
    else {
      navigate(`/eyeglasses/${kindOfGlasses}?sortBy=${value}`)
      const response = await APIRequest.getRequest(
        `/eyeglasses/kind/${kindOfGlasses}?_page=${eyeglassesPage[kindOfGlasses] - 2}&sort=${value}`);
      const json = await response.json();
      setLoadMore(false);
      setDisplayEyglasses(json)
      setEyeglassesPage(prevState => {
      const updatedState = { ...prevState };
      Object.keys(updatedState).forEach(key => {
        updatedState[key] = key === kindOfGlasses ? prevState[key] - 1 : 1;
      });
        return updatedState;
      });
    }
  }

  const cheackLocation = async () => {
    const kindOfGlasses = location.pathname.split('/')[2];
    if(location.search != ""){
      const response = await APIRequest.getRequest(
        `/eyeglasses/kind/${kindOfGlasses}?_page=${eyeglassesPage[kindOfGlasses]}&sort=price`);
      const json = await response.json();
      setLoadMore(false);
      setDisplayEyglasses([...json])
      setEyeglassesPage(prevState => {
        const updatedState = { ...prevState };
        Object.keys(updatedState).forEach(key => {
          updatedState[key] = key === kindOfGlasses ? prevState[key] + 1 : 1;
        });
          return updatedState;
        });
    }
  };

  return (<>
  {console.log("displayEyeglasses",displayEyeglasses)}
    <select id="sortBy" value={selectedValue} onChange={handleSortByChange}>
      <option value="everyOne">every one</option>
      <option value="price" >price</option>
    </select>
    {console.log("displayEyeglasses", displayEyeglasses)}
    <div id='container'>
      {displayEyeglasses.map((eyeglasses, index) => <div key={index} class="glasses">
        <SingleEyeglassee model={eyeglasses.model} price={eyeglasses.price} title=
          {eyeglasses.title} imgDisplay={eyeglasses.imgDisplay} imgCamara={eyeglasses.imgCamara} />
      </div>)
      }
      <button onClick={() => { setLoadMore(true); 
        setChangeTypeGlasses("notChange")
        cheackLocation();
      }}>load more</button>
    </div>
  </>)
}
export default Eyeglasses;



    //fetchData(kindOfGlasses)
      // setLoadMore(false);
      
      // alert(eyeglassesPage[kindOfGlasses]-2)
      // const response = await APIRequest.getRequest(`/eyeglasses/kind/${kindOfGlasses}?_page=${eyeglassesPage[kindOfGlasses]-2}`)
      // const json = await response.json();
      // if (response.status !== 200) {
      //   alert(json.error);
      // } else {
      //   if (changeTypeGlasses === "notChange") {
      //     setDisplayEyglasses([...displayEyeglasses, ...json.data]);
      //   } else {
      //     setDisplayEyglasses([...json.data]);
      //   }
      // }
      // setChangeTypeGlasses("notChange");
      // setEyeglassesPage(prevState => {
      //   const updatedState = { ...prevState };
      //   Object.keys(updatedState).forEach(key => {
      //     updatedState[key] = key === kindOfGlasses ? prevState[key] + 1 : 1;
      //   });
      //   return updatedState;
      // });
      // setLoadMore(false);
        //setDisplayEyglasses([...json.data])
        // setEyeglassesPage(prevState => {
        //   const updatedState = { ...prevState };
        //   Object.keys(updatedState).forEach(key => {
        //     updatedState[key] = key === kindOfGlasses ? prevState[key] + 1 : 1;
        //   });
        //   return updatedState;
        // });
        //setEyeglassesPage(eyeglassesPage + 1)