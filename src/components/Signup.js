
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import history from 'history/browser'
import Container from '@mui/material/Container'

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
    const { register, handleSubmit } = useForm()
    const Mutation = useMutation(SignupUser, {
        onSuccess: (data) => {
            setToken(data)
            console.log(data?.token)
            history.push('/')
        }
    })
    const onSubmit = async data => {
        Mutation.mutate(data)
    }
    return (
        <Container>
            <div style={divStyle} >
                <div style={{ ...formStyle, 'marginTop': 10 }}>
                    <Typography variant='h6' textAlign='center'>SignUp Form</Typography>
                    <form style={{ ...formStyle, 'width': 400, 'margin': 10 }} onSubmit={handleSubmit(onSubmit)}>

                        <input style={inputStyle} type="text" placeholder='Username' {...register('username')} />


                        <input style={inputStyle} type="password" placeholder='Password' {...register('password')} />

                        <input style={inputStyle} type="password" placeholder='Confirm Password' {...register('password2')} />

                        <button style={inputStyle} type='submit'>Submit</button>
                    </form>
                </div>
            </div>
        </Container >
    )
}
var formStyle = {
    'display': 'flex',
    'flexDirection': 'column',
}
var divStyle = {
    'display': 'flex',
    'justifyContent': 'center',
    'width': 950

}
const inputStyle = {
    'marginTop': 5,
    'marginRight': 7,
    'padding': 6,
    'height': 35
}

export default Signup

