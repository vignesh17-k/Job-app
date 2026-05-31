import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import FormRow from './FormRow'
import { Addjobapi } from '../Api/Addjob'
import { useSelector, useDispatch } from 'react-redux'
import { Deletejob } from '../Reducer/Reducer'


function AddJob() {

    const Location = useSelector(state=>state.State.User.location) 
    const token = useSelector(state => state.State.token)
    const dispatch = useDispatch()

    const [addjob,setaddjob] = useState({
        position:"",
        company:"",
        jobLocation:Location,
        status:"pending",
        jobType:"full-time"
     })



     const addhandlechange = (e)=>{
        setaddjob({...addjob,[e.target.id]:e.target.value})
        }

    const handleaddjob = (e)=>{
            e.preventDefault()
            if(!addjob.company ||!addjob.company || !addjob.jobLocation){
             return toast("Please Fillout All Fields", { type: "error" })
            }else{
               Addnewjobs(addjob,token)
            }
          }
 
     const Addnewjobs = async (job,token)=>{
            Addjobapi(job,token).then(response =>{
               if(response.status === 201){
                 // console.log(response)
                 toast.success("Job Created")
                 dispatch(Deletejob())
                 setaddjob({
                   position:"",
                   company:"",
                   jobLocation:Location,
                   status:"pending",
                   jobType:"full-time"
                })
               }
            })
            .catch(error => {
             console.log(error)
             toast.error(error.response.data.msg)
            })
       }
        
       const handleclear =()=>{
            setaddjob({
                position:"",
                company:"",
                jobLocation:Location,
                status:"pending",
                jobType:"full-time"
             })
       }
      

  return (
    <div>
       <Wrapper>
       <form  className='form' onSubmit={handleaddjob} >
        <h2 className='mb-4'>Add Job</h2>
        <div className='form-center'>
          <FormRow type={"text"} value={addjob.position}  onchange={addhandlechange} label={"Position"} id={"position"} />
          <FormRow type={"text"} value={addjob.company}  onchange={addhandlechange} label={"Company"} id={"company"} />
          <FormRow type={"text"} value={addjob.jobLocation}  onchange={addhandlechange} label={"Job Location"} id={"jobLocation"}/>

          <div>
            <label className='form-label' htmlFor='status'  >Status</label>
            <select id='status' value={addjob.status} onChange={addhandlechange}   className='form-input'>
            <option value={"interview"}>interview</option>
            <option value={"declined"}>declined</option>
            <option value={"pending"}>pending</option>
             </select>
          </div>

          <div>
            <label className='form-label' htmlFor='jobType'>Job Type</label>
            <select id='jobType' value={addjob.jobType}  onChange={addhandlechange}  className='form-input'>
            <option value={"full-time"}>full-time</option>
            <option value={"part-time"}>part-time</option>
            <option value={"remote"}>remote</option>
            <option value={"internship"}>internship</option>
             </select>
          </div>
      

          <div className='btn-container'>
           <button onClick={handleclear}  className='btn btn-secondary'>
                   Clear
            </button>
          <button type='submit' className='btn btn-primary'>
                   Submit
            </button>
          </div>
         

        </div>
      </form>

    </Wrapper>


    </div>
  )
}

export default AddJob