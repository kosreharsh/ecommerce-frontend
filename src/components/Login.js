
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
        <div style={divStyle} >
            <Typography sx={{ mt: 4, mb: 2 }} variant='h6'>Login Form</Typography>
            <form style={{ ...formStyle, 'width': 400 }} onSubmit={handleSubmit(onSubmit)}>
                <input style={inputStyle} type="text" placeholder='Username' {...register('username')} />
                <input style={inputStyle} type="password" placeholder='Password' {...register('password')} />
                <button style={inputStyle} type='submit'>Submit</button>
            </form>
        </div>
    )
}
var formStyle = {
    'display': 'flex',
    'flexDirection': 'column',
}
const divStyle = {
    'display': 'flex',
    'flexDirection': 'column',
    'alignItems': 'center',

}

const inputStyle = {
    'marginTop': 5,
    'marginRight': 7,
    'padding': 6,
    'height': 35
}

export default Login

