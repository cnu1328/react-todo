import React, {useState} from "react";


function Form(props) {
    const [name, setName] = useState("");

    function handleChange(e) {
        // console.log("Typing....!");
        // console.log(e.target.value);
        setName(e.target.value);
    }
    
    

    function handleSubmit(e) {
        e.preventDefault();
        // alert("Hello, React!");
        // props.addTask("Hello, React!");

        if(name === "")
            alert("Please, Enter Your Task...!");

        else {
            props.addTask(name);
            setName("");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="label-wrapper">
                <label htmlFor="new-todo-input" className="label__lg">
                    Your Tasks, Your Way – Listify, Where Ideas Become Actions!
                </label>
            </h2>

            <input 
                type="text"
                id="new-todo-input"
                className="input input__lg"
                name="text"
                autoComplete="off"
                placeholder="Enter Your Task and Submit"
                value={name}
                onChange={handleChange}
            />
            <button type="submit" className="btn btn__primary btn__lg">Add</button>
        </form>
    );
}

export default Form;