import React from 'react'

const Login = ({handleLogin, handleCredentialChange, credentials}) => (
    <form onSubmit={handleLogin}>
        <div>käyttäjätunnus
            <input type="text" title={"username"} value={credentials.username}
                   onChange={handleCredentialChange}/>
        </div>
        <div>salasana
            <input type="password" title={"password"} value={credentials.password}
                   onChange={handleCredentialChange}/>
        </div>
        <button type="submit">kirjaudu</button>
    </form>
)

export default Login