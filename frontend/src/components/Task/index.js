import "./index.css"

const Task = (props) => {
    const {userTasksList,onDelTask,onEditTask,onCompleteTask} = props 
    const {task,description,_id,isComplete} = userTasksList

    const onDelBtn = () =>{
        onDelTask(_id)
    }

    const onEditBtn = () =>{
        onEditTask(_id,task,description)
    }

    const onCompleteBtn = () => {
        onCompleteTask(_id,isComplete)
    }


    return(
        <li className="each-task-container">
            <div>
                <h1 className="task">{task}</h1>
                <p className="discription">{description}</p>
            </div>
            <div className="btn-container">
                <button className="btn" type="button" onClick={onDelBtn}>DEL</button>
                <button className="btn" type="button" onClick={onEditBtn}>EDIT</button>
                <button 
                    className={`btn ${isComplete?"completed":"complete"}`}
                    type="button" 
                    onClick={onCompleteBtn}
                >
                    {isComplete?"completed":"complete"}
                </button>
            </div>
        </li>
    )
}

export default Task