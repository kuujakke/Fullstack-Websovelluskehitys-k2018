import React from 'react'

const AddPerson = ({addHandler, changeHandler, newPerson}) => {
    return (
        <form onSubmit={addHandler}>
            <h2>Lisää uusi henkilö</h2>
            <label>Nimi:</label>
            <input
                value={newPerson.name}
                title={"name"}
                onChange={changeHandler}
            />
            <label>Numero:</label>
            <input
                value={newPerson.number}
                title={"number"}
                onChange={changeHandler}
            />
            <button type="submit">lisää</button>
        </form>
    )
}

export default AddPerson