import React, { useEffect, useState } from 'react'

export default function Students() {
    const [content, setContent] = useState(<StudentsList showForm={showForm}/>);

    function showList(){
        setContent(<StudentsList showForm={showForm}/>);
    }

    function showForm(Student){
        setContent(<StudentsForm Student={Student} showList={showList}/>)
    }

  return (
    <div>
        <div className='container my-5'>
            {content}
        </div>
        
    </div>
  )
}

function StudentsList(props){
    const [Students, setStudents] = useState ([]);

    function fetchStudents(){
        fetch("http://localhost:3002/Students")
        .then((response)=>{
            if(!response.ok){
                throw new Error ("Unexpected Server Response");
            }
            return response.json()})

        .then((data) => {
            // console.log(data);
            setStudents(data);
        })
        .catch((error) => console.log("Error :" , error))
    }

    useEffect(()=> fetchStudents(),[]);

    function deleteStudents(id){
        fetch('http://localhost:3002/Students/' + id, {
            method: 'DELETE'
        })
        .then((response)=>response.json())
        .then((data) => fetchStudents());
    }

    return(
        <>
        <h2 className='text-center mb-3'>List of Students</h2>
        <button onClick={()=> props.showForm({})} type='button' className='btn btn-primary me-2'>Create</button>
        <button onClick={()=> fetchStudents()} type='button' className='btn btn-outline-primary me-2'>Refresh</button>
        <table className='table'>
            <thead>
                <tr>
                    <th>Student ID</th>
                    <th>Student Name</th>
                    <th>E-mail</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {Students.map((Student, index)=>{
                    return(
                        <tr key={index}>
                            <td>{Student.id}</td>
                            <td>{Student.name}</td>
                            <td>{Student.email}</td>
                            <td style={{width:"10px", whiteSpace:"nowrap"}}>
                                <button onClick={()=> props.showForm(Student)} type="button" className='btn btn-primary btn-sm me-2'>Edit</button>
                                <button onClick={()=> deleteStudents(Student.id)} type="button" className='btn btn-danger btn-sm'>Delete</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        </>
    );

}

function StudentsForm(props){
    const [errorMessage, setErrorMessage] = useState("");

    function  handleSubmit(event){
       event.preventDefault(); 
       //read form data
       const formData = new FormData(event.target);

       //convert formdata to object
       const Student = Object.fromEntries(formData.entries());

       //form validation
       if(!Student.name || !Student.email){
            console.log ("Please provide all required feilds!")
            setErrorMessage(
                <div className="alert alert-warning" role="alert">Please provide all required feilds!</div>
            )
            return;
       }

       if(props.Student.id){

        //Update the Product
       fetch("http://localhost:3002/Students/" + props.Student.id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify(Student)
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
        
       //create a new Student
      //  Student.createdAt = new Date().toISOString().slice(0,10);
       fetch("http://localhost:3002/Students", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify(Student)
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
          <h2 className='text-center mb-3'>{props.Student.id ? "Edit Student" : "Create New Student"}</h2>
      
          <div className="row">
            <div className='col-lg-6 mx-auto'>
      
              {errorMessage}
      
              <form onSubmit={(event) => handleSubmit(event)}>
      
                <div className='row  mb-3'>
                  <label className='col-sm-4 col-form-label' htmlFor="form-control">Course ID</label>
                  <div className='col-sm-8'>
                    <input
                      className='form-control'
                      name='id'
                      defaultValue={props.Student.id || ''}
                      readOnly={props.Student.id ? true : false} 
                    />
                  </div>
                </div>
      
                <div className='row  mb-3'>
                  <label className='col-sm-4 col-form-label' htmlFor="form-control">Student Name</label>
                  <div className='col-sm-8'>
                    <input className='form-control'
                           name='name'
                           defaultValue={props.Student.name} />
                  </div>
                </div>
      
                <div className='row  mb-3'>
                  <label className='col-sm-4 col-form-label' htmlFor="form-control">E-mail</label>
                  <div className='col-sm-8'>
                    <textarea className='form-control'
                              name='email'
                              defaultValue={props.Student.email} />
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