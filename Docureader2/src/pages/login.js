import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login(){
    const url = 'http://127.0.0.1:8000/verifyAccount/'
    const [data, setData] = useState({
        username:'',
        password:''
    })
    const [loginStatus, setLoginStatus] = useState(false)
    const navigate = useNavigate()

    useEffect( () => {
        if (sessionStorage.getItem('username') !== null){
            navigate('/')
        }
    })

    function handleSubmit(e){
        //e.preventDefault();
        
        Axios.post(url, {
            username: data.username,
            password: data.password
        })
        .then(res =>{
            let data = res.data
            if (data['message'] === 'success'){
                sessionStorage.setItem('id', data['id'])
                sessionStorage.setItem('username', data['username'])
                setLoginStatus(false)
                
            }
            else{
                setLoginStatus(true)
            }
        })
        .catch(error => {
            setLoginStatus(true)
        })
    }

    return (
        <form /*method='post' action='/'*/ onSubmit={(e) => handleSubmit(e)}>
            <div id='fileInputCard'>
                <div className='labelBox'>
                    <label id='nameLabel' htmlFor='loginName'>Email</label>
                    <input 
                        id='username'
                        type='text'
                        onChange={(event) => {
                            let temp = data
                            temp["username"] = event.target.value
                            setData(temp)
                        }}
                    />
                </div>

                <div className='labelBox'>
                    <label id='passwordLabel' htmlFor='loginPassword'>Password</label>
                    <input
                        id='username'
                        type='text'
                        onChange={(event) => {
                            let temp = data
                            temp["password"] = event.target.value
                            setData(temp)
                        }}
                    />
                </div>
                
                <input id='submitButton' type='submit' value='Log In'/>
                {
                    loginStatus ? (
                        <div>Login Failed</div>
                    ) : (
                        <div></div>
                    )
                }
            </div>
        </form>
    )

}

export default Login;