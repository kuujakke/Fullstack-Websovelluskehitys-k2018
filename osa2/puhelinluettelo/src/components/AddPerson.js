import React from 'react'

const AddPerson = ({addHandler, changeHandler, newPerson}) => {
    return (
        <form onSubmit={addHandler}>
            <div>
                <h2>Lisää uusi</h2>
                nimi:
                <input
                    value={newPerson.name}
                    title={"name"}
                    onChange={changeHandler}
                />
            </div>
            <div>numero:
                <input
                    value={newPerson.number}
                    title={"number"}
                    onChange={changeHandler}
                />
            </div>
            <div>
                <button type="submit">lisää</button>
            </div>
        </form>
    )
}

export default AddPerson