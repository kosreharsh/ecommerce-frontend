import { useState } from 'react'
import Typography from '@mui/material/Typography';

async function SignupUser(credentials) {
    return fetch('http://localhost:8000/api-token-auth/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}
function Signup({ setToken }) {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [password2, setPassword2] = useState()
    const handleSubmit = async e => {
        e.preventDefault();
        const token = await SignupUser({ username, password, password2 })
        setToken(token)
        console.log(token)
    }
    return (
        <div style={formStyle} >
            <Typography variant='h6'>SignUp Form</Typography>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUsername(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <label>
                    <p>Confirm Password</p>
                    <input type="password" onChange={e => setPassword2(e.target.value)} />
                </label>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}
const formStyle = {
    'display': 'flex',
    'flexDirection': 'column',
    'alignItems': 'center'
}

export default Signup

