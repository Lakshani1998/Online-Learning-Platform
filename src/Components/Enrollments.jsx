import React, { useEffect, useState } from 'react'

export default function Enrollments() {
    const [content, setContent] = useState(<EnrollmentsList showForm={showForm}/>);

    function showList(){
        setContent(<EnrollmentsList showForm={showForm}/>);
    }

    function showForm(Enrollment){
        setContent(<EnrollmentsForm Enrollment={Enrollment} showList={showList}/>)
    }

  return (
    <div>
        <div className='container my-5'>
            {content}
        </div>
        
    </div>
  )
}

function EnrollmentsList(props){
    const [Enrollments, setEnrollments] = useState ([]);

    function fetchEnrollments(){
        fetch("http://localhost:3002/Enrollments")
        .then((response)=>{
            if(!response.ok){
                throw new Error ("Unexpected Server Response");
            }
            return response.json()})

        .then((data) => {
            // console.log(data);
            setEnrollments(data);
        })
        .catch((error) => console.log("Error :" , error))
    }

    useEffect(()=> fetchEnrollments(),[]);

    function deleteEnrollment(id){
        fetch('http://localhost:3002/Enrollments/' + id, {
            method: 'DELETE'
        })
        .then((response)=>response.json())
        .then((data) => fetchEnrollments());
    }

    return(
        <>
        <h2 className='text-center mb-3'>List of Enrollments</h2>
        <button onClick={()=> props.showForm({})} type='button' className='btn btn-primary me-2'>Create</button>
        <button onClick={()=> fetchEnrollments()} type='button' className='btn btn-outline-primary me-2'>Refresh</button>
        <table className='table'>
            <thead>
                <tr>
                    <th>Enroll ID</th>
                    <th>Student ID</th>
                    <th>Course ID</th>
                    <th>Semester</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {Enrollments.map((Enrollment, index)=>{
                    return(
                        <tr key={index}>
                            <td>{Enrollment.id}</td>
                            <td>{Enrollment.studentId}</td>
                            <td>{Enrollment.CourseId}</td>
                            <td>{Enrollment.semester}</td>
                            <td style={{width:"10px", whiteSpace:"nowrap"}}>
                                <button onClick={()=> props.showForm(Enrollment)} type="button" className='btn btn-primary btn-sm me-2'>Edit</button>
                                <button onClick={()=> deleteEnrollment(Enrollment.id)} type="button" className='btn btn-danger btn-sm'>Delete</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        </>
    );

}

function EnrollmentsForm(props){
    const [errorMessage, setErrorMessage] = useState("");

    function  handleSubmit(event){
       event.preventDefault(); 
       //read form data
       const formData = new FormData(event.target);

       //convert formdata to object
       const Enrollment = Object.fromEntries(formData.entries());

       //form validation
       if(!Enrollment.name || !Enrollment.description){
            console.log ("Please provide all required feilds!")
            setErrorMessage(
                <div className="alert alert-warning" role="alert">Please provide all required feilds!</div>
            )
            return;
       }

       if(props.Enrollment.id){

        //Update the Enrollment
       fetch("http://localhost:3002/Enrollments/" + props.Enrollment.id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify(Enrollment)
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

       } else {
        
       //create a new Enrollment
       Enrollment.createdAt = new Date().toISOString().slice(0,10);
       fetch("http://localhost:3002/Enrollments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify(Enrollment)
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
        });}
    }

    return (
        <>
          <h2 className='text-center mb-3'>{props.Enrollment.id ? "Edit Enrollment" : "Create New Enrollment"}</h2>
      
          <div className="row">
            <div className='col-lg-6 mx-auto'>
      
              {errorMessage}
      
              <form onSubmit={(event) => handleSubmit(event)}>
      
                <div className='row  mb-3'>
                  <label className='col-sm-4 col-form-label' htmlFor="form-control">Enrollment ID</label>
                  <div className='col-sm-8'>
                    <input
                      className='form-control'
                      name='id'
                      defaultValue={props.Enrollment.id || ''}
                      readOnly={props.Enrollment.id ? true : false} 
                    />
                  </div>
                </div>
      
                <div className='row  mb-3'>
                  <label className='col-sm-4 col-form-label' htmlFor="form-control">Student ID</label>
                  <div className='col-sm-8'>
                    <input className='form-control'
                           name='studentId'
                           defaultValue={props.Enrollment.studentId} />
                  </div>
                </div>
      
                <div className='row  mb-3'>
                  <label className='col-sm-4 col-form-label' htmlFor="form-control">Course ID</label>
                  <div className='col-sm-8'>
                    <textarea className='form-control'
                              name='CourseId'
                              defaultValue={props.Enrollment.CourseId} />
                  </div>
                </div>

                <div className='row  mb-3'>
                  <label className='col-sm-4 col-form-label' htmlFor="form-control">Semester</label>
                  <div className='col-sm-8'>
                    <textarea className='form-control'
                              name='semester'
                              defaultValue={props.Enrollment.semester} />
                  </div>
                </div>
      
                <div className='row'>
                  <div className='offset-sm-4 col-sm-4 d-grid'>
                    <button type='submit' className='btn btn-primary btn-sm me-3'>Save</button>
                  </div>
                  <div className='col-sm-4 d-grid'>
                    <button onClick={() => props.showList()} type='button' className='btn btn-secondary me-2'>Cancel</button>
                  </div>
                </div>
              </form>
      
            </div>
          </div>
        </>
      );
      

}