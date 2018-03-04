import React from 'react'

const Login = ({handleLogin, handleCredentialChange, credentials}) => (
    <form onSubmit={handleLogin} className={'login-form'}>
        <div className={'login-username'}>käyttäjätunnus
            <input type="text" title={"username"} value={credentials.username}
                   onChange={handleCredentialChange}/>
        </div>
        <div className={'login-password'}>salasana
            <input type="password" title={"password"} value={credentials.password}
                   onChange={handleCredentialChange}/>
        </div>
        <button type="submit" className={'login-submit'}>kirjaudu</button>
    </form>
)

export default Login