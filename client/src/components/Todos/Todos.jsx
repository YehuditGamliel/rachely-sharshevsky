import { useEffect, useState, useContext, useRef } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import '../Todos/Todos.css'
import { UserContext } from "../../UserProvider";

function Todos() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todos, setTodos] = useState([])
  const [displayInputs, setDisplayInputs] = useState({ isActive: false, index: 0, action: "" })
  const [valuesTodo, setValuesTodo] = useState({ title: "", completed: false })
  const [valuesSearch, setvaluesSearch] = useState({ title: "", id: "" })
  const { user } = useContext(UserContext);
  const [lastAction, setLastAction] = useState({ action: "", type: "" });
  const seeMore = useRef(false);
  const range = 2;


  useEffect(() => {
    navigate(`/home/users/${user.id}/todos`)
    getTodos();
  }, [])

  useEffect(() => {
    if (id != user.id) {
      navigate(`/home/users/${user.id}/todos`)
      alert("not logal!")
    }
  }, [id])


  const getTodos = () => {
    let start = seeMore.current ? todos.length : 0
    fetch(`http://localhost:8082/todos?userId=${id}&_start=${start}&_end=${start + range}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then((json) => {
        if (json.status != 200) {
          alert(json.error)
        }
        else {
          seeMore.current ? setTodos([...todos, ...json.data]) : setTodos(json.data);
          setLastAction({ action: "search", type: "all" })
          seeMore.current = false;
        }
      })
  }


  const handleCheckbox = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.checked;
    setValuesTodo({ ...valuesTodo, [name]: value })
  }

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setValuesTodo({ ...valuesTodo, [name]: value })
  }

  const addTodo = () => {
    if (displayInputs.isActive) {
      addTodoInDB()
      setDisplayInputs({ isActive: false, index: 0, action: "" })
    }
    else {
      setDisplayInputs({ isActive: true, index: 0, action: "add" })
    }
  }

  const addTodoInDB = () => {
    fetch(`http://localhost:8082/todos`, {
      method: 'POST',
      body: JSON.stringify({
        title: valuesTodo.title,
        completed: valuesTodo.completed,
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
          setTodos([...todos, { id: json.data, ...valuesTodo }])
          setValuesTodo({ title: "", completed: false })
        }
      })
  }

  const deleteTodo = async (todoId) => {
    let response = await fetch(`http://localhost:8082/todos/${todoId}`, {
      method: 'DELETE',
    })
    if (response.status != 200) {
      alert(response.json().error)
    }
    else {
      setTodos(todos.filter(todo => todo.id != todoId))
    }
  }

  const updateTodo = (todoId) => {
    if (displayInputs.isActive) {
      updateTodoInDB(todoId)
      setDisplayInputs({ isActive: false, index: 0, action: "" })
    }
    else
      setDisplayInputs({ isActive: true, index: todoId, action: "update" })
  }

  const updateTodoInDB = (idTodo) => {
    fetch(`http://localhost:8082/todos/${idTodo}`, {
      method: 'PUT',
      body: JSON.stringify({
        id: idTodo,
        title: valuesTodo.title,
        completed: valuesTodo.completed,
        userId: id
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then(json => {
        if (json.status == 200) {
          setTodos(todos.map((todo) => {
            if (todo.id == idTodo) {
              return { id: id, title: valuesTodo.title, completed: valuesTodo.completed }
            }
            return todo
          }))
        }
        else {
          alert(json.error)
        }
      })
  }
  const handleSearchChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setvaluesSearch({ ...valuesSearch, [name]: value })
  }

  const searchCompleted = (boolian) => {
    let start = seeMore.current ? todos.length : 0
    navigate(`/home/users/${id}/todos/search?completed=${boolian}`)
    fetch(`http://localhost:8082/todos?userId=${id}&completed=${boolian}&_start=${start}&_end=${start + range}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then((json) => {
        if (json.status != 200) {
          alert(json.error)
        }
        else {
          seeMore.current ? setTodos([...todos, ...json.data]) : setTodos(json.data);
          seeMore.current = false
          setLastAction({ action: "search", type: "completed" })
        }
      });
  }

  const searchByTitle = (titleValue) => {
    let start = seeMore.current ? todos.length : 0
    navigate(`/home/users/${id}/todos/search?title=${titleValue}`)
    fetch(`http://localhost:8082/todos?userId=${id}&title=${titleValue}&_start=${start}&_end=${start + range}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then((json) => {
        if (json.status != 200) {
          alert(json.error)
        }
        else {
          seeMore.current ? setTodos([...todos, ...json.data]) : setTodos(json.data);
          seeMore.current = false;
          setLastAction({ action: "search", type: "title" });
        }
      })
  }

  const searchById = (idValue) => {
    navigate(`/home/users/${id}/todos/${idValue}`)
    fetch(`http://localhost:8082/todos/${idValue}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then((json) => {
        if (json.status != 200) {
          alert(json.error)
        }
        else { setTodos(json.data) }
      })
  }

  const handleSeeMore = () => {
    seeMore.current = true;
    if (lastAction.action == "search") {
      switch (lastAction.type) {
        case "title":
          searchByTitle(valuesSearch.title)
          break;
        case "completed":
          searchCompleted(true)
          break;
        case "notCompleted":
          searchCompleted(false)
          break;
        default:
          getTodos();
          break;
      }
    }
    else {
      sortBy(lastAction.type);
    }
  }
  const sortBy = (event) => {
    let start = seeMore.current ? todos.length : 0
    let value = seeMore.current ? event : event.target.value;
    navigate(`/home/users/${id}/todos/?sortBy=${value}`)
    fetch(`http://localhost:8082/todos?userId=${id}&sort=${value}&_start=${start}&_end=${start + range}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then((json) => {
        if (json.status != 200) {
          alert(json.error)
        }
        else {
          seeMore.current ? setTodos([...todos, ...json.data]) : setTodos(json.data);
          seeMore.current = false;
          setLastAction({ action: "sort", type: `${value}` });
        }
      })
  }

  return (<>
    <div id='todosTop'><div>
      <div id='buttonAdd'><button id='addTodo' onClick={() => addTodo()}>add</button></div>
      {displayInputs.isActive && displayInputs.action == "add" && (<div>
        <input type="text" name="title" onChange={handleChange} placeholder="title" />
        <input type="checkbox" name="completed" onChange={handleCheckbox} /></div>)}</div>
      <div id='search'>
        <h3 id="searchTitle">search:</h3>
        <input className='searchTodo' type="text" name="title" onChange={handleSearchChange} placeholder="title" />
        <button disabled={valuesSearch.title == ""} onClick={() => { searchByTitle(valuesSearch.title) }}>search title</button>
        <input className='searchTodo' type="text" name="id" onChange={handleSearchChange} placeholder="id" />
        <button disabled={valuesSearch.id == ""} onClick={() => { searchById(valuesSearch.id) }}>search id</button>
        <form className='searchTodo' action="">
          <label>completed</label>
          <input type="radio" name='completed' onChange={() => { searchCompleted(true) }} />
          <label>not completed</label>
          <input type="radio" name='completed' onChange={() => { searchCompleted(false) }} />
        </form>

      </div>
      <div id='select'>
        <h4 id="sortTitle">sort:</h4>
        <select id="sortBy" onChange={sortBy}>
          <option value="serial" >serial</option>
          <option value="completed">completed</option>
          <option value="Alphabetical">Alphabetical</option>
        </select>
      </div>
    </div>
    <button onClick={handleSeeMore}>see more</button>
    <h3 id="todosHeader">Todos List</h3>
    <div id='container'>
      {todos.map((todo, index) => <div key={index} className='todosList'>
        <div className='todosContent'>
          <span id='idTodos'>id:{todo.id}</span>  <span id='titleTodos'>title:{todo.title}</span><span id='completedTodos'>completed:</span>
          <input type="checkbox" checked={todo.completed} onChange={() => { }} /></div>
        <div className='todosButton'>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          <button onClick={() => updateTodo(todo.id)}>Update</button> </div>
        {displayInputs.isActive && displayInputs.action == "update" && (displayInputs.index == todo.id) && (<div>
          <input type="text" name="title" onChange={handleChange} placeholder="title" />
          <input type="checkbox" name="completed" onChange={handleCheckbox} /></div>)}
      </div>)}</div>
  </>)
}
export default Todos;
