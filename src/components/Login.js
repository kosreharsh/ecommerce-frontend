
import Typography from '@mui/material/Typography';
import history from 'history/browser';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';



async function loginUser(credentials) {
    return fetch('http://localhost:8000/api-token-auth/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}
function Login({ setToken }) {
    const { register, handleSubmit } = useForm()
    const Mutation = useMutation(loginUser, {
        onSuccess: async (data) => {
            setToken(data)
            console.log(data?.token)
            history.push('/')
        }


    })
    const onSubmit = async data => {
        console.log(data)
        Mutation.mutate(data)

    }
    return (
        <div style={formStyle} >
            <Typography variant='h6'>Login Form</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    <p>Username</p>
                    <input type="text" {...register("username")} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" {...register("password")} />
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

export default Login

