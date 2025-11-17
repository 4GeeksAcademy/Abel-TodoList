import { useState } from "react";
import "../../styles/auth.css";



export default function Login(props) {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const host = "https://playground.4geeks.com/todo";
    const apiRequest = async (endpoint, metodo, body = null) => {
        const uri = `${host}${endpoint}`
        const options = {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: body && JSON.stringify(body)
        }
        const response = await fetch(uri, options)
        if (!response.ok) {
            console.log("dio un error", response.status, response.statusText)
            console.log(response)
            return
        };
        return await response.json();
    }

    const signIn = async (method) => {
        const data = await apiRequest(`/users/${name}`, method)
        props.setLoged(true)
        props.setUser(data.name)
    }

    const handleSubmit = (e, type) => {
        e.preventDefault();
        if (type === "Login") signIn("GET");
        else signIn("POST");


    };

    return (
        <section className="section full-height">
            <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <article style={{ textAlign: 'center' }}>
                    <header>
                        <h4 style={{ color: '#c4c3ca', marginBottom: '20px' }}>
                            {(isLogin && "Log in") || "Sign up"}
                        </h4>
                    </header>

                    <input
                        type="checkbox"
                        id="reg-log"
                        className="checkbox"
                        checked={!isLogin}
                        onChange={() => setIsLogin(!isLogin)}
                    />
                    <label htmlFor="reg-log"></label>

                    <section className="card-3d-wrap">
                        <section className="card-3d-wrapper">
                            {/* Login Card - Front */}
                            <article className="card-front">
                                <section className="center-wrap">
                                    <section className="section">
                                        <h4 style={{ color: '#ffeba7', marginBottom: '30px' }}>Log In</h4>
                                        <form onSubmit={(e) => handleSubmit(e, 'Login')}>
                                            <fieldset className="form-group" style={{ marginBottom: '15px', border: 'none' }}>
                                                <span className="input-icon">👤</span>
                                                <input
                                                    type="text"
                                                    className="form-style"
                                                    placeholder="Your Name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    required
                                                />
                                            </fieldset>
                                            <button type="submit" className="btn" style={{ marginTop: '20px', width: '100%' }}>
                                                Submit
                                            </button>
                                        </form>
                                        <p style={{ textAlign: 'center', marginTop: '90px' }}>
                                            <a
                                                onClick={() => setIsLogin(false)}
                                                className="link"
                                                style={{ cursor: 'pointer' }}
                                            >
                                                Don't have an account? Sign up
                                            </a>
                                        </p>
                                    </section>
                                </section>
                            </article>

                            {/* Sign Up Card - Back */}
                            <article className="card-back">
                                <section className="center-wrap">
                                    <section className="section">
                                        <h4 style={{ color: '#ffeba7', marginBottom: '30px' }}>Sign Up</h4>
                                        <form onSubmit={(e) => handleSubmit(e, 'Sign Up')}>
                                            <fieldset className="form-group" style={{ marginBottom: '15px', border: 'none' }}>
                                                <span className="input-icon">👤</span>
                                                <input
                                                    type="text"
                                                    className="form-style"
                                                    placeholder="Your Name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    required
                                                />
                                            </fieldset>
                                            <button type="submit" className="btn" style={{ marginTop: '20px', width: '100%' }}>
                                                Submit
                                            </button>
                                        </form>
                                        <p style={{ textAlign: 'center', marginTop: '90px' }}>
                                            <a
                                                onClick={() => setIsLogin(true)}
                                                className="link"
                                                style={{ cursor: 'pointer' }}
                                            >
                                                Already have an account? Log in
                                            </a>
                                        </p>
                                    </section>
                                </section>
                            </article>
                        </section>
                    </section>
                </article>
            </section>
        </section>
    );
}