import React from 'react'

const AddNumber = ({addHandler, changeHandler, newName, newNumber}) => {
    return (
        <form onSubmit={addHandler}>
            <div>
                <h2>Lisää uusi</h2>
                nimi:
                <input
                    value={newName}
                    title={"newName"}
                    onChange={changeHandler}
                />
            </div>
            <div>numero:
                <input
                    value={newNumber}
                    title={"newNumber"}
                    onChange={changeHandler}
                />
            </div>
            <div>
                <button type="submit">lisää</button>
            </div>
        </form>
    )
}

export default AddNumber