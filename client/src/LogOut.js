import React, { useState } from "react";

function LogOut() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const logOutHandler = () => {
      setIsLoggedIn(!isLoggedIn)
  }

  if (isLoggedIn) {
    return (
        <div> 
            <div className="logout">
                <label>logout</label>
                <button onClick={logOutHandler}>Log Out</button>
            </div>
        </div>
    )
  }
}

export default LogOut;