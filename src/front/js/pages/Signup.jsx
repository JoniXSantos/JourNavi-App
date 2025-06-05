import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


export const Signup = ({ dark }) => {

    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPass, setRepeatedPass] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== repeatedPass) setError(true);
        else {
            setError(false);
            const dataToSend = { email, password };
            const success = await actions.signup(dataToSend);
            if (success) {
                alert('Registration succeeded!');
                navigate('/');
            } else setErrorMessage(store.message);
        };
    };

    return (
        <div className="form w-50 align-items-center m-auto">
            <form onSubmit={handleSubmit}>
                <h1 className="h3 mb-5 fw-normal">Please fill this form</h1>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} id="exampleInputPassword1" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword2" className="form-label">Repeat Password</label>
                    <input type="password" className="form-control" value={repeatedPass} onChange={e => setRepeatedPass(e.target.value)} id="exampleInputPassword2" required />
                </div>
                {error ? <p className="text-danger">The passwords don't match!</p> : ''}
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                <button type="submit" className={dark ? "btn btn-pink mt-3" : "btn btn-dark mt-3"}>Sign up</button>
            </form>
        </div>
    )
}