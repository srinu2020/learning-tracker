import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar=()=>{
    const{user,logout}=useContext(AuthContext);
    return(
        <nav className="p-4 bg-blue-600 text-white flex justify-between">
      <h1 className="font-bold">Peer Tracker</h1>
      <div className="flex gap-4">
        {user?(<><Link to="/groups">Groups</Link>
            <Link to="/goals">Goals</Link>
            <button onClick={logout} className="ml-4">Logout</button></>):(<><Link to="/login">Login</Link>
                <Link to="/register">Register</Link></>)}
      </div>
      </nav>
    )
}

export default Navbar