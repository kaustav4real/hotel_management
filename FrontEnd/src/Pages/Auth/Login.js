import React from "react";

function Login() {
  const googleAuth = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}/auth/google/secrets`,
      "_self"
    );
  };

  return (
    <div>
      <h1>Log in</h1>
      <div>
        <button onClick={googleAuth}>Sign In With Google</button>
      </div>
    </div>
  );
}

export default Login;
