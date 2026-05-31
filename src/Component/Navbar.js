import React, { useState } from 'react'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Togglesidebar, ClearState} from '../Reducer/Reducer';
import { disableDemoMode } from '../mock/demoService';
import { useNavigate } from 'react-router-dom';



function Navbar() {

  const user = useSelector(state => state.State.User.name)

  const [showdropdown,setshowdropdown] = useState(false)
  const Navigate = useNavigate()
  
  const Dispatch = useDispatch()

   const logout = () =>{
        disableDemoMode()
        localStorage.removeItem("user")
        localStorage.removeItem("username")
        localStorage.removeItem("token")
        Dispatch(ClearState())
        Navigate("/Register")
   }



  return (

    <Wrapper>


      <div className='nav-center'>

        <button type='button' className='toggle-btn' onClick={()=>Dispatch(Togglesidebar())}>
          <FaAlignLeft />
        </button>


        <div>
          <h3 className='logo-text'>Dashboard</h3>
        </div>

        <div className='btn-container bg-primary' style={{ borderRadius: "5px" }} >
          <button className='btn btn-primary py-0' type='button' onClick={()=>setshowdropdown(!showdropdown)} >
            <FaUserCircle className='text-light' />
            <p className='text-light my-1'>{user}</p>
            <FaCaretDown className='text-light' />
          </button>


          <div onClick={logout} className = {showdropdown ? 'show-dropdown dropdown' : 'dropdown'}>
            <button  type='button' className='dropdown-btn'>
              logout
            </button>
          </div>

        </div>
      </div>
    </Wrapper>

  )
}

export default Navbar