import React, { useEffect, useState } from 'react'

export const Tasks = () => {
    const [inputValue, setInputValue] = useState("")
    const [tasks, setTasks] = useState({});
    const [tasklist, setTaskList] = useState([])
    const [key, setKey] = useState(1);
    const [itemsCounter, setItemCounters] = useState();


    const deleteTask = (e) => {
        setTasks(
            prev => {
                const {[e.target.dataset.key]: _ , ...nuevoDict} = prev;
                return nuevoDict;
            }
        )
    }


    const addTask = (e)=> {
        e.preventDefault();
        const taskContent = inputValue.trim();
        if (taskContent === "") {
            alert("No puede añadir una tarea en blanco");
            return;
        }

        const task = (
            (<li key={key} className="list-group-item">
                <span>{taskContent}</span>
                <span  id='closeButton'><i onClick={deleteTask} data-key={key} className="fa-solid fa-xmark"></i></span>
            </li>)
        )
        setTasks(prev => ({
            ...prev,
            [key]: task
        }));
        setInputValue("");
        setKey(key+1);
    }



    useEffect(
        () => {
            setTaskList(Object.values(tasks));
        },
        [tasks]
    )
        useEffect(
        ()=>{
            setItemCounters(
                ()=> {
                    const items = tasklist.length;
                    if (!items) return "No tasks left, create a new task";
                    else if(items === 1 ) return "1 task left";
                    return `${items} tasks left`;
                })
        },
        [tasklist]
    )



    return (
        <div className="card">
            <div className="card-body">
                <ul className="list-group  container">
                    <li className="list-group-item">
                        <form onSubmit={addTask}> 
                            <input onChange={(e)=>setInputValue(e.target.value)} className='form-control' value={inputValue} type="text" />
                        </form>
                    </li>
                    {tasklist}
                </ul>
            </div>
            <div className="card-footer text-body-secondary">
                {itemsCounter}
            </div>
        </div>
    )
}