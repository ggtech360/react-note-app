import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {

  const {fetchUser} = props;
  const history = useNavigate();

  const [cred, setCred] = useState({name:'', email:'', password:''});

  useEffect(()=>{
    if(localStorage.getItem('auth-token')){
      history('/');
    }
  })

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const response = await fetch("http://192.168.0.174:5000/api/auth/createuser", {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cred)
    })
    const mmk = await response.json();
    console.log(mmk);
    if(mmk.success){
      localStorage.setItem('auth-token', mmk.authToken);
      history('/');
      fetchUser();
    }
    else{
      alert('Error..')
    }
  }

  const handleChange=(e)=>{
    setCred({...cred, [e.target.name]: e.target.value})
  }
  return (
    <div className="logink my-4 py-5">
      <form
        className="formk text-light bg-dark py-4 rounded w-50 h-50 px-5"
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="name"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            value={cred.name}
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={cred.email}
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            required
            value={cred.password}
            onChange={handleChange}
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-outline-info">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
