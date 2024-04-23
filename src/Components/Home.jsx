import React from 'react';

export default function Home() {
  const imageStyle = {
    width: "60%",
    height: "10%",
    textAlign: "center",
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10px",
    fontSize: "34px",
  };

  return (
    <div style={containerStyle}>
      <img
        style={imageStyle}
        src="https://www.opti.ro/images/new-post/medium_long-learning-management-systems.jpg"
        className="img-fluid"
        alt="..."
      />
      <div>Welcome to Online Learning Platform !!!</div>
    </div>
  );
}
