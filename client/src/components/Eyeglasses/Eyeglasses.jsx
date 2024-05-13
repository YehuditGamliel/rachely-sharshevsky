import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import './Posts.css'
import { UserContext } from "../../UserProvider";
function Eyeglasses() {
  const { id } = useParams();
  const [posts, setPosts] = useState([])
  const [displayInputs, setDisplayInputs] = useState({ isActive: false, index: 0, action: "" })
  const [valuesPost, setValuesPost] = useState({ title: "", body: "" })
  const [boldPost, setBoldPost] = useState(0)
  const navigate = useNavigate();
  const [valuesSearch, setvaluesSearch] = useState({ title: "", id: "" })
  const { user, setCurrentUser } = useContext(UserContext);
  const [lastSearch, setLastSearch] = useState("");
  const seeMore = useRef(false);
  const range = 2;


  useEffect(() => {
    if (id != user.id) {
      localStorage.clear();
      setCurrentUser();
      navigate('/login');
    }
    if (user == null) {
      navigate('/login');
    }
    getPosts();

  }, [])

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setValuesPost({ ...valuesPost, [name]: value })
  }
  const getPosts = () => {
    let start = seeMore.current ? posts.length : 0
    fetch(`http://localhost:8082/posts?userId=${id}&_start=${start}&_end=${start + range}`, {
      method: 'GET',

    })
      .then(response => response.json())
      .then((json) => {
        if (json.status != 200) {
          alert(json.error)
        }
        else {
          seeMore.current ? setPosts([...posts, ...json.data]) : setPosts(json.data);
          setLastSearch("all")
          seeMore.current = false;
        }
      })
  }
  const addPost = () => {
    if (displayInputs.isActive) {
      setDisplayInputs({ isActive: false, index: 0, action: "" })
      addPostInDB()
    }
    else {
      setDisplayInputs({ isActive: true, index: 0, action: "add" })
    }
  }

  const addPostInDB = () => {
    fetch(`http://localhost:8082/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title: valuesPost.title,
        body: valuesPost.body,
        userId: id
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status != 200) {
          alert(json.error)
        }
        else {
          if (posts.length < range) {
            setPosts([...posts, { id: json.data, title: valuesPost.title, body: valuesPost.body }])
          }
          setValuesPost({ title: "", body: "" })
        }
      })
  }

  const deletePost = async (postId) => {
    let response = await fetch(`http://localhost:8082/posts/${postId}`, {
      method: 'DELETE',
    })
    if (response.status != 200) {
      alert(response.json().error)
    }
    else {
      setPosts(posts.filter(post => post.id != postId))
    }
  }

  const updatePost = (postId) => {
    if (displayInputs.isActive) {
      updatePostInDB(postId)
      setDisplayInputs({ isActive: false, index: 0, action: "" })
    }
    else {
      setDisplayInputs({ isActive: true, index: postId, action: "update" })
    }
  }

  const updatePostInDB = (postId) => {

    fetch(`http://localhost:8082/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({
        id: postId,
        title: valuesPost.title,
        body: valuesPost.body,
        userId: id
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status == 200) {
          setPosts(posts.map((post) => {
            if (post.id == postId) { return { id: postId, title: valuesPost.title, body: valuesPost.body, userId: id } }
            return post
          }))
        }
        else {
          alert(json.error)
        }
      })
  }



  const search = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setvaluesSearch({ ...valuesSearch, [name]: value })
  }
  const searchByTitle = (titleValue) => {
    let start = seeMore.current ? posts.length : 0
    navigate(`/home/users/${id}/posts/search?title=${titleValue}`)
    fetch(`http://localhost:8082/posts?userId=${id}&title=${titleValue}&_start=${start}&_end=${start + range}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then((json) => {
        if (json.status != 200) {
          alert(json.error)
        }
        else {
          seeMore.current ? setPosts([...posts, ...json.data]) : setPosts(json.data);
          seeMore.current = false;
          setLastSearch("title");
        }
      })
  }

  const searchById = (idValue) => {
    navigate(`/home/users/${id}/posts/${idValue}`)
    fetch(`http://localhost:8082/posts/${idValue}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then((json) => {
        if (json.status != 200) {
          alert(json.error)
        }
        else { setPosts(json.data) }
      })
  }
  const handleSeeMore = () => {
    seeMore.current = true;
    if (lastSearch == "title") {
      searchByTitle(valuesSearch.title)
    }
    else {
      getPosts();
    }
  }
  return (<>
    <div id="topPost">
      <div id="searchPost">
        <h3 id="searchTitle">Search:</h3>
        <input type="text" name="title" onChange={search} placeholder="title" />
        <button disabled={valuesSearch.title == ""} onClick={() => { searchByTitle(valuesSearch.title) }}>search title</button>
        <input type="text" name="id" onChange={search} placeholder="id" />
        <button disabled={valuesSearch.id == ""} onClick={() => { searchById(valuesSearch.id) }}>search id</button></div>
      <div id="addPost">
        <button id="buttonAdd" onClick={addPost}>add</button>
        {displayInputs.isActive && displayInputs.action == "add" && (<div>
          <input type="text" name="title" onChange={handleChange} placeholder="title" />
          <input type="text" name="body" onChange={handleChange} placeholder="body" /></div>)}
      </div>
    </div>
    <div id="postList">
      <button onClick={handleSeeMore}>see more</button>
      <h3 id='titltPostList'>Post List</h3>
      {posts.map((post, index) => <div key={index}>
        <span id="idPost">id:{post.id}</span><span id="titlePost">title:{post.title}</span>
        <div id="buttonsPost">
          <div id="buttons">
            <button className="btnBoldPost" onClick={() => { post == boldPost ? setBoldPost(0) : setBoldPost(post) }}>Show post</button>
            <button onClick={() => deletePost(post.id)}>Delete</button>
            <button onClick={() => updatePost(post.id)}>Update</button></div>
          {displayInputs.isActive && displayInputs.action == "update" && (displayInputs.index == post.id) && (<div id="displayInputs">
            <input type="text" name="title" onChange={handleChange} placeholder="title" />
            <input type="text" name="body" onChange={handleChange} placeholder="body" /></div>)}</div>
      </div>
      )}
    </div>
    {boldPost != 0 && (
      <div><p id="boldPost" style={{ color: "#03e9f4" }}>id:{boldPost.id}  title:{boldPost.title} body:{boldPost.body}</p>
        <Link to={`${boldPost.id}/comments`}>Show comments</Link></div>)}
  </>)
}
export default Eyeglasses;

