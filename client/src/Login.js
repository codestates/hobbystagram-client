import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logInHandler = async () => {
      

  }

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Login</label>
          <input 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            type="text"
            placeholder="email"
            />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
            />  
            <button onClick={() => logInHandler()}>Log In</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
