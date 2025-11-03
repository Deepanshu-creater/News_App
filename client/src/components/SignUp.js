import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        phone: "",
        password: "",
        cpassword: "",
    })
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
            maxWidth: '500px',
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
        formGrid: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '15px'
        },
        formGroup: {
            marginBottom: '20px'
        },
        fullWidth: {
            gridColumn: '1 / -1'
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
            padding: '6px 12px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.8rem',
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
        }
    };

    const handleInputs = (event) => {
        const { name, value } = event.target;
        setUser(prev => ({ ...prev, [name]: value }));
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const postData = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        
        const { firstName, lastName, userName, email, phone, password, cpassword } = user;

        try {
            const data = await fetch("https://news-app-khcy.onrender.com/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    firstName, lastName, userName, email, phone, password, cpassword
                })
            });

            const response = await data.json();

            if (data.status === 422) {
                window.alert("Email is already in use");
            } else if (data.status === 401) {
                window.alert("Passwords don't match");
            } else if (!response) {
                window.alert("Unable to register user");
            } else {
                window.alert("Registered Successfully");
                navigate('/login');
            }
        } catch (error) {
            window.alert("Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>Create Account</h1>
                <p style={styles.subtitle}>Join us today and get started</p>
                
                <form method="POST" onSubmit={postData}>
                    <div style={styles.formGrid}>
                        <div style={styles.formGroup}>
                            <label style={styles.label} htmlFor="signupFname">First Name</label>
                            <input 
                                type="text" 
                                value={user.firstName} 
                                style={styles.input}
                                id="signupFname" 
                                placeholder="First Name" 
                                onChange={handleInputs} 
                                name="firstName" 
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
                            <label style={styles.label} htmlFor="signUpLname">Last Name</label>
                            <input 
                                type="text" 
                                value={user.lastName} 
                                style={styles.input}
                                id="signUpLname" 
                                placeholder="Last Name" 
                                onChange={handleInputs} 
                                name="lastName" 
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
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="signupUname">Username</label>
                        <input 
                            type="text" 
                            value={user.userName} 
                            style={styles.input}
                            id="signupUname" 
                            placeholder="Username" 
                            onChange={handleInputs} 
                            name="userName" 
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
                        <label style={styles.label} htmlFor="signupPhone">Phone Number</label>
                        <input 
                            type="tel" 
                            value={user.phone} 
                            style={styles.input}
                            id="signupPhone" 
                            placeholder="Phone Number" 
                            onChange={handleInputs} 
                            name="phone" 
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
                        <label style={styles.label} htmlFor="signupEmail">Email Address</label>
                        <input 
                            type="email" 
                            value={user.email} 
                            style={styles.input}
                            id="signupEmail" 
                            placeholder="name@example.com" 
                            onChange={handleInputs} 
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

                    <div style={styles.formGrid}>
                        <div style={styles.formGroup}>
                            <label style={styles.label} htmlFor="signupPassword">Password</label>
                            <div style={styles.passwordContainer}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={user.password}
                                    style={{...styles.input, ...styles.passwordInput}}
                                    id="signupPassword"
                                    placeholder="Password"
                                    onChange={handleInputs}
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

                        <div style={styles.formGroup}>
                            <label style={styles.label} htmlFor="signupCpassword">Confirm Password</label>
                            <div style={styles.passwordContainer}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={user.cpassword}
                                    style={{...styles.input, ...styles.passwordInput}}
                                    id="signupCpassword"
                                    placeholder="Confirm password"
                                    onChange={handleInputs}
                                    name="cpassword"
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
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>
                
                <div style={styles.footer}>
                    <p>Already have an account? <a href="/login" style={styles.link}>Sign in here</a></p>
                </div>
            </div>
        </div>
    )
}

export default SignUp