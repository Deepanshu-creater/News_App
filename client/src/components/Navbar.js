import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../App';

function Navbar() {
    const { state, dispatch } = useContext(UserContext);
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);

    const styles = {
        navbar: {
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            padding: '0',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            borderBottom: '3px solid #047857'
        },
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 20px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        brand: {
            fontSize: '1.5rem',
            fontWeight: '700',
            color: 'white',
            textDecoration: 'none',
            padding: '1rem 0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        },
        navContent: {
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
        },
        navList: {
            display: 'flex',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            alignItems: 'center',
            gap: '5px'
        },
        navItem: {
            position: 'relative'
        },
        navLink: {
            color: 'rgba(255, 255, 255, 0.9)',
            textDecoration: 'none',
            padding: '1rem 1.2rem',
            display: 'block',
            fontWeight: '500',
            borderRadius: '6px',
            transition: 'all 0.3s ease',
            fontSize: '0.95rem'
        },
        activeNavLink: {
            color: 'white',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            fontWeight: '600'
        },
        dropdown: {
            position: 'relative'
        },
        dropdownToggle: {
            background: 'none',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.9)',
            padding: '1rem 1.2rem',
            cursor: 'pointer',
            fontWeight: '500',
            borderRadius: '6px',
            transition: 'all 0.3s ease',
            fontSize: '0.95rem',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
        },
        dropdownMenu: {
            position: 'absolute',
            top: '100%',
            left: '0',
            background: 'white',
            minWidth: '180px',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            padding: '8px',
            marginTop: '5px',
            zIndex: 1000,
            border: '1px solid #e5e7eb'
        },
        dropdownItem: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 15px',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            border: 'none',
            background: 'none',
            width: '100%',
            textAlign: 'left',
            color: '#374151',
            fontWeight: '500',
            fontSize: '0.9rem'
        },
        authContainer: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
        },
        authButton: {
            background: 'white',
            border: '2px solid white',
            borderRadius: '25px',
            color: '#059669',
            padding: '8px 20px',
            textDecoration: 'none',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            fontSize: '0.9rem'
        },
        logoutButton: {
            background: 'transparent',
            border: '2px solid white',
            borderRadius: '25px',
            color: 'white',
            padding: '8px 20px',
            textDecoration: 'none',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            fontSize: '0.9rem'
        },
        mobileMenuButton: {
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '1.25rem',
            padding: '0.5rem',
            borderRadius: '6px',
            cursor: 'pointer'
        },
        userWelcome: {
            color: 'white',
            fontWeight: '500',
            fontSize: '0.9rem',
            background: 'rgba(255, 255, 255, 0.2)',
            padding: '5px 12px',
            borderRadius: '15px',
            marginRight: '10px'
        }
    };

    function changeToDark() {
        document.body.setAttribute("data-bs-theme", "dark");
        setIsThemeDropdownOpen(false);
    }

    function changeToLight() {
        document.body.setAttribute("data-bs-theme", "light");
        setIsThemeDropdownOpen(false);
    }

    const isActiveLink = (path) => {
        return location.pathname === path;
    };

    const RenderMenu = () => {
        if (state) {
            return (
                <>
                    <div style={styles.userWelcome}>
                        👋 Hello, {state.name || 'User'}
                    </div>
                    <Link 
                        style={styles.logoutButton}
                        to="/logout"
                        onMouseEnter={(e) => {
                            e.target.style.background = 'white';
                            e.target.style.color = '#059669';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'transparent';
                            e.target.style.color = 'white';
                        }}
                    >
                        Logout
                    </Link>
                </>
            );
        } else {
            return (
                <>
                    <Link 
                        style={styles.authButton}
                        to="/login"
                        onMouseEnter={(e) => {
                            e.target.style.background = '#047857';
                            e.target.style.color = 'white';
                            e.target.style.borderColor = '#047857';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'white';
                            e.target.style.color = '#059669';
                            e.target.style.borderColor = 'white';
                        }}
                    >
                        Login
                    </Link>
                    <Link 
                        style={styles.authButton}
                        to="/signup"
                        onMouseEnter={(e) => {
                            e.target.style.background = '#047857';
                            e.target.style.color = 'white';
                            e.target.style.borderColor = '#047857';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'white';
                            e.target.style.color = '#059669';
                            e.target.style.borderColor = 'white';
                        }}
                    >
                        Sign Up
                    </Link>
                </>
            );
        }
    };

    const navLinks = [
        { path: '/', label: 'All' },
        { path: '/science', label: 'Science & Tech' },
        { path: '/sports', label: 'Sports' },
        { path: '/entertainment', label: 'Entertainment' },
        { path: '/politics', label: 'Politics' },
        { path: '/education', label: 'Education' },
        { path: '/profile', label: 'Your Profile' },
    ];

    return (
        <>
            <nav style={styles.navbar}>
                <div style={styles.container}>
                    {/* Brand */}
                    <Link to="/" style={styles.brand}>
                        🌟 Dailyscope News
                    </Link>

                    {/* Mobile Menu Button */}
                    <button 
                        style={styles.mobileMenuButton}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        ☰
                    </button>

                    {/* Desktop Navigation */}
                    <div style={styles.navContent}>
                        <ul style={styles.navList}>
                            {navLinks.map((link) => (
                                <li key={link.path} style={styles.navItem}>
                                    <Link
                                        to={link.path}
                                        style={{
                                            ...styles.navLink,
                                            ...(isActiveLink(link.path) ? styles.activeNavLink : {})
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!isActiveLink(link.path)) {
                                                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                                                e.target.style.color = 'white';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!isActiveLink(link.path)) {
                                                e.target.style.background = 'transparent';
                                                e.target.style.color = 'rgba(255, 255, 255, 0.9)';
                                            }
                                        }}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                            
                            
                        </ul>

                        {/* Auth Buttons */}
                        <div style={styles.authContainer}>
                            <RenderMenu />
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div style={{
                        background: '#047857',
                        padding: '20px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.2)'
                    }}>
                        <ul style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px'
                        }}>
                            {navLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        style={{
                                            ...styles.navLink,
                                            ...(isActiveLink(link.path) ? styles.activeNavLink : {}),
                                            padding: '0.8rem 1rem'
                                        }}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                            <li style={{marginTop: '10px'}}>
                                <div style={{color: 'white', fontWeight: '600', padding: '0 1rem 0.5rem 1rem'}}>
                                    Theme Options:
                                </div>
                                <div style={{display: 'flex', gap: '10px', padding: '0 1rem'}}>
                                    <button 
                                        style={{
                                            ...styles.dropdownItem,
                                            background: 'rgba(255, 255, 255, 0.2)',
                                            color: 'white'
                                        }}
                                        onClick={() => {
                                            changeToLight();
                                            setIsMobileMenuOpen(false);
                                        }}
                                    >
                                        ☀️ Light
                                    </button>
                                    <button 
                                        style={{
                                            ...styles.dropdownItem,
                                            background: 'rgba(255, 255, 255, 0.2)',
                                            color: 'white'
                                        }}
                                        onClick={() => {
                                            changeToDark();
                                            setIsMobileMenuOpen(false);
                                        }}
                                    >
                                        🌙 Dark
                                    </button>
                                </div>
                            </li>
                            <li style={{marginTop: '15px', borderTop: '1px solid rgba(255, 255, 255, 0.2)', paddingTop: '15px'}}>
                                <div style={{display: 'flex', gap: '10px', flexDirection: 'column', padding: '0 1rem'}}>
                                    <RenderMenu />
                                </div>
                            </li>
                        </ul>
                    </div>
                )}
            </nav>

            {/* Responsive Styles */}
            <style>
                {`
                @media (max-width: 1024px) {
                    [style*="navList"] {
                        gap: 2px !important;
                    }
                    [style*="navLink"] {
                        padding: 1rem 0.8rem !important;
                        font-size: 0.9rem !important;
                    }
                    [style*="dropdownToggle"] {
                        padding: 1rem 0.8rem !important;
                        font-size: 0.9rem !important;
                    }
                }

                @media (max-width: 768px) {
                    [style*="mobileMenuButton"] {
                        display: block !important;
                    }
                    [style*="navContent"] {
                        display: none !important;
                    }
                    [style*="userWelcome"] {
                        display: none !important;
                    }
                }

                @media (min-width: 769px) {
                    [style*="mobileMenuButton"] {
                        display: none !important;
                    }
                }
                `}
            </style>
        </>
    );
}

export default Navbar;