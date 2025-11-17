import React, { useEffect, useState } from 'react'



export const Tasks = (props) => {
    const [inputValue, setInputValue] = useState("")
    const [tasks, setTasks] = useState([]);
    const [tasklist, setTaskList] = useState([])
    const [itemsCounter, setItemCounters] = useState();
    const [editingElement, setEditingElement] = useState()

    const host = "https://playground.4geeks.com/todo";
    const apiRequest = async (endpoint, metodo, body = null) => {
        const uri = `${host}${endpoint}`
        const options = {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: body && JSON.stringify(body)
        }
        const response = await fetch(uri, options)
        if (response.status === 404) {
            props.setLoged(false)
            props.setUser("")
            alert("Un hijo de su madre te borro la cuenta :(")
            return
        }
        if (!response.ok) {
            console.log("dio un error", response.status, response.statusText)
            return
        };
        if (metodo === "GET" && response.ok) return await response.json();
        getTasks();


    }
    const user = props.user;


    const getElementById = async (id) => {
        const data = await apiRequest(`/users/${user}`, "GET")
        for (const element of data.todos) {
            if (element.id === id) return element
        }
    }


    const getTasks = async () => {
        const data = await apiRequest(`/users/${user}`, "GET")
        setTasks(data.todos)
    }


    const addTask = async (taskContent) => {
        apiRequest(`/todos/${user}`, "POST", { label: taskContent })
        setInputValue("");
    }


    const deleteTask = async (id) => {
        apiRequest(`/todos/${id}`, "DELETE")
    }


    const editTask = async (elementToEdit) => {
        apiRequest(`/todos/${elementToEdit.id}`, "PUT", elementToEdit)
        setEditingElement()
        setInputValue("")
    }


    const handleDelete = async (e) => {
        const id = Number(e.currentTarget.dataset.key);
        deleteTask(id)
    }

    const handleEdit = async (e) => {
        const id = Number(e.currentTarget.dataset.key);
        const element = await getElementById(id);
        setEditingElement(element);
        setInputValue(element.label);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const taskContent = inputValue.trim();
        if (taskContent === "") {
            alert("No puede añadir una tarea en blanco");
            return;
        };
        if (!editingElement) {
            addTask(taskContent);
            return;
        };
        editTask({ ...editingElement, label: inputValue })
    }


    const handleToggleCheckUnchek = async (e) => {
        const id = Number(e.currentTarget.dataset.key);
        const element = await getElementById(id);
        editTask({ ...element, is_done: !element.is_done })
    }


    const handleClearTasks = async e => {
        const data = await apiRequest(`/users/${user}`, "GET")
        for (const element of data.todos) deleteTask(element.id)
    };

    useEffect(
        () => {
            getTasks()
        },
        []
    )

    // renderiza las tareas para mostrar y actualizar el contador de tareas
    useEffect(
        () => {
            setTaskList(
                tasks.map(
                    (task) => {
                        return (<li key={task.id} className="list-group-item">
                            <span>
                                {(task.is_done) ?
                                    <i onClick={handleToggleCheckUnchek} data-key={task.id} className="fa-solid fa-check icon"></i> :
                                    <i onClick={handleToggleCheckUnchek} data-key={task.id} className="fa-solid fa-xmark icon"></i>}
                            </span>
                            <span className='liContent'>{task.label}</span>
                            <span className="editButton">
                                <i
                                    onClick={handleEdit}
                                    data-key={task.id}
                                    className="fa-solid fa-pen-to-square icon"
                                ></i>
                            </span>
                            <span className='closeButton icon'>
                                <i
                                    onClick={handleDelete}
                                    data-key={task.id}
                                    className="fa-solid fa-trash"
                                ></i>
                            </span>
                        </li>)

                    }
                )
            );
            setItemCounters(
                () => {
                    const items = tasks.length;
                    if (!items) return "No tasks left, create a new task";
                    else if (items === 1) return "1 task left";
                    return `${items} tasks left`;
                })
        },
        [tasks]
    )


    return (
        <div className="card">
            <div className="card-body">
                <ul className="list-group  container">
                    <li id='input' className="list-group-item">
                        <form onSubmit={handleSubmit}>
                            <input onChange={(e) => setInputValue(e.target.value)} className='form-control' value={inputValue} type="text" />
                        </form>
                    </li>
                    {tasklist}
                </ul>
            </div>
            <div className="card-footer text-body-secondary">
                <span className='itemCounter'>{itemsCounter}</span>
                <span onClick={handleClearTasks} className='clearData icon'><i className="fa-solid fa-recycle"></i></span>
            </div>
        </div>
    )
}