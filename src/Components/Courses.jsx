import React, { useEffect, useState } from 'react'

export default function Courses() {
    const [content, setContent] = useState(<CoursesList showForm={showForm}/>);

    function showList(){
        setContent(<CoursesList showForm={showForm}/>);
    }

    function showForm(){
        setContent(<CoursesForm showList={showList}/>)
    }

  return (
    <div>
        <div className='container my-5'>
            {content}
        </div>
        
    </div>
  )
}

function CoursesList(props){
    const [Courses, setCourses] = useState ([]);

    function fetchCourses(){
        fetch("http://localhost:3002/Courses")
        .then((response)=>{
            if(!response.ok){
                throw new Error ("Unexpected Server Response");
            }
            return response.json()})

        .then((data) => {
            // console.log(data);
            setCourses(data);
        })
        .catch((error) => console.log("Error :" , error))
    }

    useEffect(()=> fetchCourses(),[]);

    return(
        <>
        <h2 className='text-center mb-3'>List of Courses</h2>
        <button onClick={()=> props.showForm()} type='button' className='btn btn-primary me-2'>Create</button>
        <button onClick={()=> fetchCourses()} type='button' className='btn btn-outline-primary me-2'>Refresh</button>
        <table className='table'>
            <thead>
                <tr>
                    <th>Course ID</th>
                    <th>Course Name</th>
                    <th>Description</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {Courses.map((Course, index)=>{
                    return(
                        <tr key={index}>
                            <td>{Course.id}</td>
                            <td>{Course.name}</td>
                            <td>{Course.description}</td>
                            <td style={{width:"10px", whiteSpace:"nowrap"}}>
                                <button type="button" className='btn btn-primary btn-sm me-2'>Edit</button>
                                <button type="button" className='btn btn-danger btn-sm'>Delete</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        </>
    );

}

function CoursesForm(props){

    function  handleSubmit(event){
       event.preventDefault(); 
       //read form data
       const formData = new FormData(event.target);

       //convert formdata to object
       const Course = Object.fromEntries(formData.entries());

       //form validation
       if(!Course.name || !Course.description){
            console.log ("Please provide all requires feilds!")
            return;
       }

       //create a new course
       Course.createdAt = new Date().toISOString().slice(0,10);
       fetch("http://localhost:3002/Courses", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify(Course)
       })
        .then((response)=>{
            if(!response.ok){
                throw new Error("Network response was not OK");
            }
            return response.json()
        })
        .then((data) => props.showList())
        .catch((error) => {
            console.error("Error: ", error);
        });
    }

    return(
        <>
        <h2 className='text-center mb-3'>Create a new Courses</h2>
        <button onClick={()=>props.showList()} type='button' className='btn btn-secondary me-2'>Cancel</button>

        <div className="row">
            <div className='col-lg-6 mx-auto'>

                <form onSubmit={(event) => handleSubmit(event)}>

                <div className='row  mb-3'>
                        <label className='col-sm-4 col-form-label' htmlFor="form-control">Course ID</label>
                        <div className='col-sm-8'>
                            <input className='form-control'
                            name='id'
                            defaultValue="" />
                        </div>
                    </div>

                    <div className='row  mb-3'>
                        <label className='col-sm-4 col-form-label' htmlFor="form-control">Course Name</label>
                        <div className='col-sm-8'>
                            <input className='form-control'
                            name='name'
                            defaultValue="" />
                        </div>
                    </div>

                    <div className='row  mb-3'>
                        <label className='col-sm-4 col-form-label' htmlFor="form-control">Description</label>
                        <div className='col-sm-8'>
                            <textarea className='form-control'
                            name='description'
                            defaultValue="" />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='offset-sm-4 col-sm-4 d-grid'>
                            <button type='submit' className='btn btn-primary btn-sm me-3'>Save</button>
                        </div>
                        <div className='col-sm-4 d-grid'>
                        <button onClick={()=>props.showList()} type='button' className='btn btn-secondary me-2'>Cancel</button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
        </>
    );

}