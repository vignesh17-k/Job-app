import React, { useState } from 'react'
import { Container } from 'reactstrap'
import Inputbox from '../Component/Inputbox'
import logo from "../assets/images/logo.svg"
import { toast} from 'react-toastify';
import { RegisterApi } from '../Api/Register';
import { LoginApi } from '../Api/Login';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { GetToken, Userdata, Alljob, Getstats } from '../Reducer/Reducer';
import { enableDemoMode, getDefaultJobsPayload, getStats } from '../mock/demoService';


function Register() {

    const [login, setlogin] = useState(true)

    const [signupdata, setsignupdata] = useState({})

    const [logindata, setlogindata] = useState({})

    const [loading, setloading] = useState(false)




    const navigate = useNavigate()
    const dispatch = useDispatch()

  
    const handletestuser = () => {
        setloading(true)
        const user = enableDemoMode()
        localStorage.setItem("username", user.name)
        localStorage.setItem("user", JSON.stringify(user))
        localStorage.setItem("token", user.token)
        dispatch(Userdata(user))
        dispatch(GetToken(user.token))
        dispatch(Alljob(getDefaultJobsPayload()))
        dispatch(Getstats(getStats()))
        setloading(false)
        toast.success(`Welcome ${user.name}`)
        navigate("/")
    }
 
 

    const handlechange = (e) => {
        if (login) {
            logindata[e.target.id] = e.target.value
            setlogindata(logindata)
        } else {
            signupdata[e.target.id] = e.target.value
            setsignupdata(signupdata)
        }
    }


    const handlesubmit = (e) => {
        e.preventDefault()
        if (login) {
            if (!logindata.email || !logindata.password) {
                return toast("Please Fillout All Fields", { type: "error" })
            } else {
                handleLogin(logindata)
            }
        } else {
            if (!signupdata.email || !signupdata.password || !signupdata.name) {
                return toast("Please Fillout All Fields", { type: "error" })
            } else {
                handleRegister(signupdata)
            }

        }

    }

    const handleLogin = async (data) => {
         setloading(true)
      LoginApi(data).then(response =>{
           if(response.status === 200){
            //  console.log(response)
              setloading(false)
              localStorage.setItem("username",response.data.user.name)
              localStorage.setItem("user",JSON.stringify(response.data.user))
              localStorage.setItem("token",response.data.user.token)
              dispatch(Userdata(response.data.user))
              dispatch(GetToken(response.data.user.token))
              toast.success(`Welcome Back ${response.data.user.name}`)
              setTimeout(()=>{
                return navigate("/")
              },1200)
           }
      }).catch(error =>{
            setloading(false)
            toast.error(error.response.data.msg)
      })
    }


    const handleRegister = async (userdata) => {
         setloading(true)
         RegisterApi(userdata).then(response =>{
             if(response.status === 201){
                // console.log(response)
                setloading(false)
                localStorage.setItem("username",response.data.user.name)
                localStorage.setItem("user",JSON.stringify(response.data.user))
                localStorage.setItem("token",response.data.user.token)
                dispatch(GetToken(response.data.user.token))
                dispatch(Userdata(response.data.user))
                toast.success(`Hello There ${response.data.user.name}`)
                setTimeout(()=>{
                    return navigate("/")
                  },1200)
             }
        }).catch(error =>{
              setloading(false)
              toast.error(error.response.data.msg)
        })
    }



    return (


        <div>
       
            <Container style={{ height: "100vh" }} className='col-6 my-2 d-flex justify-content-center align-items-center'>


                <div className='login' style={{ width: "25rem", backgroundColor: "white" }}>

                    <div className='bg-primary top' style={{ height: "5px" }}>

                    </div>

                    <div className='text-center my-3'>
                        <img className='mx-5 my-3' src={logo} alt="logo"></img>
                        <h2 className='my-2'>{login ? "Login" : "Register"}</h2>
                    </div>

                    <form onSubmit={handlesubmit}>
                        {login ? (
                            <div>
                                <Inputbox onchange={handlechange} label={"Email"} type={"email"} id={"email"} />
                                <Inputbox onchange={handlechange} label={"Password"} type={"password"} id={"password"} />
                            </div>
                        )
                            : (
                                <div>
                                    <Inputbox onchange={handlechange} label={"Name"} type={"text"} id={"name"} />
                                    <Inputbox onchange={handlechange} label={"Email"} type={"email"} id={"email"} />
                                    <Inputbox onchange={handlechange} label={"Password"} type={"password"} id={"password"} />
                                </div>)}
                        <div className='mx-5 mt-4'>
                            <button type='submit' className='btn mb-3  btn-block btn-primary'>
                                {loading ? (<Spinner className='mb-1' style={{ width: '1.5rem', height: '1.5rem' }} />)
                                    : (<h6>Submit</h6>)}

                            </button>
                        </div>
                    </form>

                    <div className='mx-5 mb-3'>
                        <button onClick={handletestuser} style={{ backgroundColor: "rgb(192,220,253)" }} className='btn btn-block text-primary demo'>
                        {loading ? (<Spinner className='mb-1' style={{ width: '1.5rem', height: '1.5rem' }} />) : (<h6> Demo App</h6>) }
                            </button>
                    </div>

                    <p className='text-center mb-4'>{login ? "Not a member yet?" : "Already a member?"} <span className='text-primary mx-1' style={{ cursor: 'pointer' }} onClick={() => setlogin(!login)}>{login ? "Register" : "Login"}</span></p>
                </div>



            </Container>

        </div>
    )
}

export default Register