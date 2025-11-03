import { React, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App';

function Login() {
    const { state, dispatch } = useContext(UserContext)
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const styles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        card: {
            background: 'white',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 10px 40px rgba(16, 185, 129, 0.15)',
            maxWidth: '450px',
            width: '100%',
            border: '1px solid #dcfce7'
        },
        title: {
            textAlign: 'center',
            color: '#065f46',
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '10px',
            background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
        },
        subtitle: {
            textAlign: 'center',
            color: '#047857',
            fontSize: '1rem',
            marginBottom: '30px',
            fontWeight: '500'
        },
        formGroup: {
            marginBottom: '25px'
        },
        label: {
            display: 'block',
            color: '#065f46',
            fontWeight: '600',
            marginBottom: '8px',
            fontSize: '0.95rem'
        },
        input: {
            width: '100%',
            padding: '12px 16px',
            border: '2px solid #d1fae5',
            borderRadius: '12px',
            fontSize: '1rem',
            transition: 'all 0.3s ease',
            backgroundColor: '#f9fafb'
        },
        inputFocus: {
            borderColor: '#10b981',
            backgroundColor: 'white',
            boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)'
        },
        passwordContainer: {
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
        },
        passwordInput: {
            paddingRight: '60px'
        },
        showPasswordButton: {
            position: 'absolute',
            right: '8px',
            background: '#10b981',
            border: 'none',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.85rem',
            transition: 'all 0.3s ease'
        },
        showPasswordButtonHover: {
            background: '#059669',
            transform: 'translateY(-1px)'
        },
        submitButton: {
            width: '100%',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: 'white',
            border: 'none',
            padding: '14px',
            borderRadius: '12px',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            marginTop: '10px'
        },
        submitButtonHover: {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(16, 185, 129, 0.4)'
        },
        submitButtonLoading: {
            opacity: 0.7,
            cursor: 'not-allowed'
        },
        footer: {
            textAlign: 'center',
            marginTop: '25px',
            color: '#047857'
        },
        link: {
            color: '#10b981',
            fontWeight: '600',
            textDecoration: 'none'
        },
        error: {
            background: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            textAlign: 'center',
            fontWeight: '500'
        }
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const loginUser = async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            
            const data = await fetch('https://news-app-khcy.onrender.com/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    email: email, 
                    password: password
                })
            });

            const response = await data.json();

            if (response) {
                navigate('https://news-app-khcy.onrender.com/profile');
                dispatch({ type: "USER", payload: true })
            } else if (data.status === 404 || !response || data.status === 400) {
                window.alert("Invalid Credentials");
            }
        } catch (error) {
            window.alert('User not found');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>Welcome Back</h1>
                <p style={styles.subtitle}>Sign in to your account to continue</p>
                
                <form method="post" onSubmit={loginUser}>
                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="emailLogin">Email Address</label>
                        <input 
                            type="email" 
                            style={styles.input}
                            id="emailLogin" 
                            placeholder="Enter your email" 
                            value={email} 
                            onChange={handleEmail} 
                            name="email" 
                            required
                            onFocus={(e) => {
                                e.target.style.borderColor = styles.inputFocus.borderColor;
                                e.target.style.backgroundColor = styles.inputFocus.backgroundColor;
                                e.target.style.boxShadow = styles.inputFocus.boxShadow;
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = styles.input.borderColor;
                                e.target.style.backgroundColor = styles.input.backgroundColor;
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>
                    
                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="passwordLogin">Password</label>
                        <div style={styles.passwordContainer}>
                            <input
                                type={showPassword ? "text" : "password"}
                                style={{...styles.input, ...styles.passwordInput}}
                                id="passwordLogin"
                                placeholder="Enter your password"
                                value={password}
                                onChange={handlePassword}
                                name="password"
                                required
                                onFocus={(e) => {
                                    e.target.style.borderColor = styles.inputFocus.borderColor;
                                    e.target.style.backgroundColor = styles.inputFocus.backgroundColor;
                                    e.target.style.boxShadow = styles.inputFocus.boxShadow;
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = styles.input.borderColor;
                                    e.target.style.backgroundColor = styles.input.backgroundColor;
                                    e.target.style.boxShadow = 'none';
                                }}
                            />
                            <button
                                style={styles.showPasswordButton}
                                type="button"
                                onClick={handleShowPassword}
                                onMouseEnter={(e) => {
                                    e.target.style.background = styles.showPasswordButtonHover.background;
                                    e.target.style.transform = styles.showPasswordButtonHover.transform;
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background = styles.showPasswordButton.background;
                                    e.target.style.transform = 'none';
                                }}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>
                    
                    <button 
                        type="submit" 
                        style={{
                            ...styles.submitButton,
                            ...(isLoading ? styles.submitButtonLoading : {})
                        }}
                        onMouseEnter={(e) => {
                            if (!isLoading) {
                                e.target.style.transform = styles.submitButtonHover.transform;
                                e.target.style.boxShadow = styles.submitButtonHover.boxShadow;
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isLoading) {
                                e.target.style.transform = 'none';
                                e.target.style.boxShadow = 'none';
                            }
                        }}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
                
                <div style={styles.footer}>
                    <p>Don't have an account? <a href="/signup" style={styles.link}>Sign up here</a></p>
                </div>
            </div>
        </div>
    )
}

export default Login