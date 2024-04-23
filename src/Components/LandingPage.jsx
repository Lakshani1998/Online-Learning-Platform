import React, { useState } from 'react';

export default function LandingPage() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const courses = [
    {
      id: "001",
      name: "Maththematics",
      description: "This is a Mathematics course for [2023-2 ] students"
    },
    {
      id: "002",
      name: "DataBase Management Systems",
      description: "This is a Mathematics course for [2022-4 ] students"
    },
    {
      id: "003",
      name: "Electronics",
      description: "This is a Mathematics course for [2024-2 ] students"
    }
  ];

  const handleEnroll = (courseId) => {
    if (enrolledCourses.includes(courseId)) {
      // Unenroll
      setEnrolledCourses(enrolledCourses.filter(course => course !== courseId));
      setShowAlert(false); 
    } else {
      // Enroll
      setEnrolledCourses([...enrolledCourses, courseId]);
      setShowAlert(true); 
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Available Courses</h2>
      
      {showAlert && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseAlert}></button>
          You have successfully enrolled in the course!
        </div>
      )}
      
      <div className="row">
        {courses.map(course => (
          <div key={course.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{course.name}</h5>
                <p className="card-text">{course.description}</p>
                <button
                  className={`btn ${enrolledCourses.includes(course.id) ? 'btn-danger' : 'btn-primary'}`}
                  onClick={() => handleEnroll(course.id)}
                >
                  {enrolledCourses.includes(course.id) ? 'Unenroll' : 'Enroll'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
