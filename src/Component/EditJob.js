import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FormRow from './FormRow'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import { toast } from 'react-toastify'
import { Editjobapi } from '../Api/EditJobs'
import { Edit, SingleEditJob, Deletejob } from '../Reducer/Reducer'


function EditJob() {

    const SingleEditjob = useSelector(state => state.State.SingleEditjob[0])
    const token = useSelector(state => state.State.token)
    const dispatch = useDispatch()
  
 
    const [editjob,seteditjob] = useState({
              _id:SingleEditjob._id,
              company:SingleEditjob.company,
              position:SingleEditjob.position,
              status:SingleEditjob.status,
              jobType:SingleEditjob.jobType,
              jobLocation:SingleEditjob.jobLocation,
              createdBy:SingleEditjob.createdBy,
              createdAt:SingleEditjob.createdAt,
              updatedAt:SingleEditjob.updatedAt,
              __v:SingleEditjob.__v
           })

           const edithandlechange = (e)=>{
            seteditjob({...editjob,[e.target.id]:e.target.value})
            }

         
            const handleeditjob = (e)=>{
                e.preventDefault()
                if(!editjob.company ||!editjob.company || !editjob.jobLocation){
                 return toast("Please Fillout All Fields", { type: "error" })
                }else{
                    Editprevjobs(editjob,editjob._id,token) 
                }
              }

         const Editprevjobs = async (Job,JobId,token) =>{
                 Editjobapi(Job,JobId,token).then(response =>{
                     if(response.status === 200){
                        toast.success("Job Modified...")
                         dispatch(Deletejob())
                         dispatch(Edit(false)) 
                     }
                 }).catch(error=>{
                    console.log(error)
                    toast.error(error.response.data.msg)
                 })
           }

          const handleclear =()=>{
            dispatch(SingleEditJob(null))  
            dispatch(Edit(false)) 
          }  

  return (

    <div>
      <Wrapper>
       <form  className='form' onSubmit={handleeditjob} >
        <h2 className='mb-4'>Edit Job</h2>
        <div className='form-center'>
          <FormRow type={"text"} value={editjob.position}  onchange={edithandlechange} label={"Position"} id={"position"} />
          <FormRow type={"text"} value={editjob.company}  onchange={edithandlechange} label={"Company"} id={"company"} />
          <FormRow type={"text"} value={editjob.jobLocation}  onchange={edithandlechange} label={"Job Location"} id={"jobLocation"}/>

          <div>
            <label className='form-label' htmlFor='status'  >Status</label>
            <select id='status' value={editjob.status} onChange={edithandlechange}   className='form-input'>
            <option value={"interview"}>interview</option>
            <option value={"declined"}>declined</option>
            <option value={"pending"}>pending</option>
             </select>
          </div>

          <div>
            <label className='form-label' htmlFor='jobType'>Job Type</label>
            <select id='jobType' value={editjob.jobType}  onChange={edithandlechange}  className='form-input'>
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
                   Save
            </button>
          </div>
         

        </div>
      </form>

    </Wrapper>

    </div>
  )
}

export default EditJob