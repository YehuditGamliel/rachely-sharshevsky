import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './Eyeglasses.css'
import SingleEyeglassee from '../SingleEyeglasses/SingleEyeglasses.jsx';
import { APIRequests } from "../../APIRequests.js";

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
        const response = await APIRequest.getRequest(`/eyeglasses/kind/${kindOfGlasses}/?_page=${eyeglassesPage[kindOfGlasses]}`);
        const json = await response.json();
        if (response.status !== 200) {
          alert(json.error);
        } else {
          if (changeTypeGlasses === "notChange") {
            setDisplayEyglasses([...displayEyeglasses, ...json.data]);
          } else {
            setDisplayEyglasses([...json.data]);
          }
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
    setSelectedValue(event.target.value);
    if (event.target.value == 'everyOne') {
      setLoadMore(false);
      navigate(`/eyeglasses/${kindOfGlasses}`)
      alert(eyeglassesPage[kindOfGlasses]-2)
      const response = await APIRequest.getRequest(`/eyeglasses/kind/${kindOfGlasses}?_page=${eyeglassesPage[kindOfGlasses]-2}`)
      const json = await response.json();
      if (response.status !== 200) {
        alert(json.error);
      } else {
        if (changeTypeGlasses === "notChange") {
          setDisplayEyglasses([...displayEyeglasses, ...json.data]);
        } else {
          setDisplayEyglasses([...json.data]);
        }
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
        //setDisplayEyglasses([...json.data])
        // setEyeglassesPage(prevState => {
        //   const updatedState = { ...prevState };
        //   Object.keys(updatedState).forEach(key => {
        //     updatedState[key] = key === kindOfGlasses ? prevState[key] + 1 : 1;
        //   });
        //   return updatedState;
        // });
        //setEyeglassesPage(eyeglassesPage + 1)
    }
    else {
      navigate(`/eyeglasses/${kindOfGlasses}?sortBy=${value}`)
      alert(eyeglassesPage[kindOfGlasses] - 2)
      const response = await APIRequest.getRequest(`/eyeglasses/kind/${kindOfGlasses}?_page=${eyeglassesPage[kindOfGlasses] - 2}&sort=${value}`);
      const json = await response.json();
      if (json.status != 200) {
        alert(json.error)
      }
      else {
        console.log("json.data", json.data)
        setLoadMore(false);

        setDisplayEyglasses(json.data)
      }
    }
  }

  return (<>

    <select id="sortBy" value={selectedValue} onChange={handleSortByChange}>
      <option value="everyOne">evert one</option>
      <option value="price" >price</option>
    </select>
    {console.log("displayEyeglasses", displayEyeglasses)}
    <div id='container'>
      {displayEyeglasses.map((eyeglasses, index) => <div key={index} class="glasses">
        <SingleEyeglassee model={eyeglasses.model} price={eyeglasses.price} title=
          {eyeglasses.title} imgDisplay={eyeglasses.imgDisplay} imgCamara={eyeglasses.imgCamara} />
      </div>)
      }
      <button onClick={() => { setLoadMore(true) }}>load more</button>
    </div>
  </>)
}
export default Eyeglasses;
