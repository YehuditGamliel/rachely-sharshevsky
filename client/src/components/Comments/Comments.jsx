import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../UserProvider";
import '../comments/Comments.css'

function Comments() {
  const { user, setUser } = useContext(UserContext);
  const { id, postId } = useParams()
  const [comments, setComments] = useState([])
  const [displayInputs, setDisplayInputs] = useState({ isActive: false, index: 0, action: "" })
  const [valuesComment, setValuesComment] = useState()

  useEffect(() => {
    if (id != user.id) {
      localStorage.clear();
      setUser()
      navigate('/login');
    }
    getComments();
  }, [])

  const getComments = () => {
    fetch(`http://localhost:8082/comments?postId=${postId}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then((json) => setComments(json))
  }
  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setValuesComment({ ...valuesComment, [name]: value })
  }

  const checkComment = (comment) => {
    if (comment.email == user.email) {
      return true
    }
    return false
  }


  const addComment = () => {
    if (displayInputs.isActive) {
      setDisplayInputs({ isActive: false, index: 0, action: "" })
      addCommentsInDB(postId)
      updateCommentsNextID()
    }
    else {
      getCommentsNextId()
      setDisplayInputs({ isActive: true, index: 0, action: "add" })
    }
  }

  const addCommentsInDB = () => {
    fetch(`http://localhost:8082/comments`, {
      method: 'POST',
      body: JSON.stringify({
        id: `${nextCommentId}`,
        postId: postId,
        name: valuesComment.name,
        email: user.email,
        body: valuesComment.body
      }),
    })
      .then((response) => response.json())
      .then((json) => { setComments([...comments, json]) });
  }

  const deleteComment = async (commentId) => {
    await fetch(`http://localhost:8082/comments/${commentId}`, {
      method: 'DELETE',
    })
    setComments(comments.filter(comment => comment.id != commentId))
  }

  const updateComment = (commentId) => {
    if (displayInputs.isActive) {
      setDisplayInputs({ isActive: false, index: 0, action: "" })
      updateCommentInDB(commentId)
    }
    else {
      setDisplayInputs({ isActive: true, index: commentId, action: "update" })
    }
  }

  const updateCommentInDB = (commentId) => {
    fetch(`http://localhost:8082/comments/${commentId}`, {
      method: 'PUT',
      body: JSON.stringify({
        name: valuesComment.name,
        body: valuesComment.body
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setComments(comments.map((comment, index) => {
          if (comment.id == commentId) { return comment = json }
          return comment
        }))
      })
  }
  return (<>
    <button id="addComment" onClick={() => addComment()}>Add</button>
    {displayInputs.isActive && displayInputs.action == "add" && (<div>
      <input type="text" name="name" onChange={handleChange} placeholder="name" />
      <input type="text" name="body" onChange={handleChange} placeholder="body" /></div>)}
    {comments.map((comment, index) => <div key={index}>
      <p>id:{comment.id} name:{comment.name} email:{comment.email} body:{comment.body}</p>
      {checkComment(comment) && (<div>
        <button id="delete" onClick={() => deleteComment(comment.id)}>delete</button>
        <button onClick={() => updateComment(comment.id)}>update</button>
        {displayInputs.isActive && displayInputs.action == "update" && (displayInputs.index == comment.id) && (<div>
          <input type="text" name="name" onChange={handleChange} placeholder="name" />
          <input type="text" name="body" onChange={handleChange} placeholder="body" /></div>)}
      </div>)}
    </div>
    )}
  </>)
}
export default Comments