import React,{Fragment,useState} from "react";
import{Link,Navigate} from "react-router-dom";
import { toast } from "react-toastify";


const Register = ({ setAuth }) => {
    const[inputs,setInputs] = React.useState({
        email:"",
        password:"",
        name:""
    });
    const{email,password,name} = inputs;
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const onChange = e => {
        setInputs({...inputs,[e.target.name]:e.target.value});
    };
    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {email,password,name};
            const response = await fetch("http://localhost:5000/auth/register",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            });
            const parseRes = await response.json();
            if(parseRes.token){
            localStorage.setItem("token",parseRes.token);
            setAuth(true);
            toast.success("Register Successfully");
        }
        else{
            setAuth(false);
            toast.error(parseRes);
        }
            
        } catch (err) {
            console.error(err.message);
        }
    };
    if (isAuthenticated) {
        return <Navigate to="/dashboard" />;
    }
    
    return (
        <Fragment>
            <h1>Register</h1>
            <form onSubmit={onSubmitForm}>
                <input type="email" name="email" placeholder="email" value={email}
                onChange={e => onChange(e)}/>
                <input type="password" name="password" placeholder="password"  value={password}
                onChange={e => onChange(e)}/>
                <input type="text" name="name" placeholder="name"  value={name}
                onChange={e => onChange(e)}/>
                <button type="submit">Register</button>   
            </form>
            <Link to="/login">Login</Link>
        </Fragment>
    );
};

export default Register;