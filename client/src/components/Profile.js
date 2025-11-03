import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Profile() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('profile');

    useEffect(() => {
        const callProfilePage = async () => {
            try {
                setLoading(true);
                const response = await fetch('/profile', {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                });

                if (response.status !== 200) {
                    throw new Error("Unauthorized access");
                }

                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error("Profile fetch error:", error);
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };
        callProfilePage();
    }, [navigate]);

    // Styles objects
    const styles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
        loadingContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            textAlign: 'center',
        },
        spinner: {
            width: '50px',
            height: '50px',
            border: '4px solid rgba(255, 255, 255, 0.3)',
            borderTop: '4px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '20px',
        },
        errorContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            textAlign: 'center',
        },
        header: {
            position: 'relative',
            padding: '40px 20px 80px',
            color: 'white',
            textAlign: 'center',
        },
        headerBackground: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%)',
        },
        avatarSection: {
            position: 'relative',
            zIndex: 2,
            maxWidth: '800px',
            margin: '0 auto',
        },
        avatarContainer: {
            position: 'relative',
            display: 'inline-block',
            marginBottom: '20px',
        },
        avatar: {
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            border: '4px solid white',
            objectFit: 'cover',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        },
        onlineStatus: {
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            width: '20px',
            height: '20px',
            background: '#4ade80',
            border: '3px solid white',
            borderRadius: '50%',
        },
        profileName: {
            fontSize: '2.5rem',
            marginBottom: '10px',
            fontWeight: '700',
        },
        profileTitle: {
            fontSize: '1.2rem',
            opacity: 0.9,
            marginBottom: '5px',
        },
        profileLocation: {
            fontSize: '1rem',
            opacity: 0.8,
            marginBottom: '20px',
        },
        statsContainer: {
            display: 'flex',
            justifyContent: 'center',
            gap: '30px',
            marginTop: '20px',
        },
        stat: {
            textAlign: 'center',
        },
        statNumber: {
            display: 'block',
            fontSize: '1.5rem',
            fontWeight: '700',
        },
        statLabel: {
            fontSize: '0.9rem',
            opacity: 0.8,
        },
        tabs: {
            display: 'flex',
            justifyContent: 'center',
            background: 'white',
            margin: '-40px 20px 0',
            borderRadius: '15px 15px 0 0',
            boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            zIndex: 3,
        },
        tabButton: {
            padding: '20px 30px',
            background: 'none',
            border: 'none',
            fontSize: '1rem',
            fontWeight: '600',
            color: '#666',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            position: 'relative',
        },
        activeTabButton: {
            color: '#667eea',
        },
        activeTabIndicator: {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: '20%',
            right: '20%',
            height: '3px',
            background: '#667eea',
            borderRadius: '2px',
        },
        content: {
            background: '#f8fafc',
            minHeight: '60vh',
            padding: '40px 20px',
        },
        tabContent: {
            maxWidth: '1200px',
            margin: '0 auto',
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '24px',
            marginTop: '20px',
        },
        card: {
            background: 'white',
            padding: '24px',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        },
        cardHover: {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
        },
        cardTitle: {
            fontSize: '1.25rem',
            fontWeight: '600',
            marginBottom: '20px',
            color: '#1a202c',
            borderBottom: '2px solid #e2e8f0',
            paddingBottom: '12px',
        },
        infoGrid: {
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
        },
        infoItem: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 0',
        },
        infoLabel: {
            fontWeight: '600',
            color: '#4a5568',
            minWidth: '120px',
        },
        infoValue: {
            color: '#2d3748',
            fontWeight: '500',
        },
        skillsList: {
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
        },
        skillItem: {
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
        },
        skillBar: {
            height: '8px',
            background: '#e2e8f0',
            borderRadius: '4px',
            overflow: 'hidden',
        },
        skillProgress: {
            height: '100%',
            background: 'linear-gradient(90deg, #667eea, #764ba2)',
            borderRadius: '4px',
            transition: 'width 0.8s ease',
        },
        activityList: {
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
        },
        activityItem: {
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            padding: '12px',
            background: '#f7fafc',
            borderRadius: '8px',
            transition: 'background 0.3s ease',
        },
        activityItemHover: {
            background: '#edf2f7',
        },
        activityIcon: {
            fontSize: '1.2rem',
        },
        activityTime: {
            fontSize: '0.875rem',
            color: '#718096',
        },
        actionButtons: {
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
        },
        button: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            justifyContent: 'center',
        },
        primaryButton: {
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
        },
        buttonHover: {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
        },
        secondaryButton: {
            background: '#edf2f7',
            color: '#4a5568',
        },
        secondaryButtonHover: {
            background: '#e2e8f0',
            transform: 'translateY(-2px)',
        },
        outlineButton: {
            background: 'transparent',
            border: '2px solid #e2e8f0',
            color: '#4a5568',
        },
        outlineButtonHover: {
            borderColor: '#667eea',
            color: '#667eea',
            transform: 'translateY(-2px)',
        },
    };

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.spinner}></div>
                <p>Loading your profile...</p>
                <style>
                    {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    `}
                </style>
            </div>
        );
    }

    if (!userData) {
        return (
            <div style={styles.errorContainer}>
                <h2>Unable to load profile</h2>
                <p>Please try again later or contact support.</p>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            {/* Header Section */}
            <div style={styles.header}>
                <div style={styles.headerBackground}></div>
                <div style={styles.avatarSection}>
                    <div style={styles.avatarContainer}>
                        <img 
                            src={userData.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"} 
                            alt="Profile" 
                            style={styles.avatar}
                        />
                        <div style={styles.onlineStatus}></div>
                    </div>
                    <div>
                        <h1 style={styles.profileName}>
                            {userData.firstName} {userData.lastName}
                        </h1>
                        <p style={styles.profileTitle}>Full Stack Developer</p>
                        <p style={styles.profileLocation}>📍 San Francisco, CA</p>
                        <div style={styles.statsContainer}>
                            <div style={styles.stat}>
                                <span style={styles.statNumber}>42</span>
                                <span style={styles.statLabel}>Projects</span>
                            </div>
                            <div style={styles.stat}>
                                <span style={styles.statNumber}>128</span>
                                <span style={styles.statLabel}>Followers</span>
                            </div>
                            <div style={styles.stat}>
                                <span style={styles.statNumber}>86</span>
                                <span style={styles.statLabel}>Following</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div style={styles.tabs}>
                <button 
                    style={{
                        ...styles.tabButton,
                        ...(activeTab === 'profile' ? styles.activeTabButton : {})
                    }}
                    onMouseOver={(e) => e.target.style.color = '#667eea'}
                    onMouseOut={(e) => e.target.style.color = activeTab === 'profile' ? '#667eea' : '#666'}
                    onClick={() => setActiveTab('profile')}
                >
                    Profile
                    {activeTab === 'profile' && <div style={styles.activeTabIndicator}></div>}
                </button>
                <button 
                    style={{
                        ...styles.tabButton,
                        ...(activeTab === 'projects' ? styles.activeTabButton : {})
                    }}
                    onMouseOver={(e) => e.target.style.color = '#667eea'}
                    onMouseOut={(e) => e.target.style.color = activeTab === 'projects' ? '#667eea' : '#666'}
                    onClick={() => setActiveTab('projects')}
                >
                    Projects
                    {activeTab === 'projects' && <div style={styles.activeTabIndicator}></div>}
                </button>
                <button 
                    style={{
                        ...styles.tabButton,
                        ...(activeTab === 'activity' ? styles.activeTabButton : {})
                    }}
                    onMouseOver={(e) => e.target.style.color = '#667eea'}
                    onMouseOut={(e) => e.target.style.color = activeTab === 'activity' ? '#667eea' : '#666'}
                    onClick={() => setActiveTab('activity')}
                >
                    Activity
                    {activeTab === 'activity' && <div style={styles.activeTabIndicator}></div>}
                </button>
            </div>

            {/* Main Content */}
            <div style={styles.content}>
                {activeTab === 'profile' && (
                    <div style={styles.tabContent}>
                        <div style={styles.grid}>
                            {/* Personal Information */}
                            <div 
                                style={styles.card}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = styles.cardHover.transform;
                                    e.currentTarget.style.boxShadow = styles.cardHover.boxShadow;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'none';
                                    e.currentTarget.style.boxShadow = styles.card.boxShadow;
                                }}
                            >
                                <h3 style={styles.cardTitle}>Personal Information</h3>
                                <div style={styles.infoGrid}>
                                    <div style={styles.infoItem}>
                                        <span style={styles.infoLabel}>Full Name</span>
                                        <span style={styles.infoValue}>
                                            {userData.firstName} {userData.lastName}
                                        </span>
                                    </div>
                                    <div style={styles.infoItem}>
                                        <span style={styles.infoLabel}>Email</span>
                                        <span style={styles.infoValue}>{userData.email}</span>
                                    </div>
                                    <div style={styles.infoItem}>
                                        <span style={styles.infoLabel}>Phone</span>
                                        <span style={styles.infoValue}>{userData.phone || 'Not provided'}</span>
                                    </div>
                                    <div style={styles.infoItem}>
                                        <span style={styles.infoLabel}>Location</span>
                                        <span style={styles.infoValue}>San Francisco, CA</span>
                                    </div>
                                </div>
                            </div>

                            {/* Skills */}
                            <div 
                                style={styles.card}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = styles.cardHover.transform;
                                    e.currentTarget.style.boxShadow = styles.cardHover.boxShadow;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'none';
                                    e.currentTarget.style.boxShadow = styles.card.boxShadow;
                                }}
                            >
                                <h3 style={styles.cardTitle}>Skills & Expertise</h3>
                                <div style={styles.skillsList}>
                                    <div style={styles.skillItem}>
                                        <span>JavaScript</span>
                                        <div style={styles.skillBar}>
                                            <div style={{...styles.skillProgress, width: '90%'}}></div>
                                        </div>
                                    </div>
                                    <div style={styles.skillItem}>
                                        <span>React</span>
                                        <div style={styles.skillBar}>
                                            <div style={{...styles.skillProgress, width: '85%'}}></div>
                                        </div>
                                    </div>
                                    <div style={styles.skillItem}>
                                        <span>Node.js</span>
                                        <div style={styles.skillBar}>
                                            <div style={{...styles.skillProgress, width: '80%'}}></div>
                                        </div>
                                    </div>
                                    <div style={styles.skillItem}>
                                        <span>UI/UX Design</span>
                                        <div style={styles.skillBar}>
                                            <div style={{...styles.skillProgress, width: '75%'}}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div 
                                style={styles.card}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = styles.cardHover.transform;
                                    e.currentTarget.style.boxShadow = styles.cardHover.boxShadow;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'none';
                                    e.currentTarget.style.boxShadow = styles.card.boxShadow;
                                }}
                            >
                                <h3 style={styles.cardTitle}>Recent Activity</h3>
                                <div style={styles.activityList}>
                                    <div 
                                        style={styles.activityItem}
                                        onMouseEnter={(e) => e.currentTarget.style.background = styles.activityItemHover.background}
                                        onMouseLeave={(e) => e.currentTarget.style.background = styles.activityItem.background}
                                    >
                                        <div style={styles.activityIcon}>🚀</div>
                                        <div>
                                            <p style={{margin: '0 0 4px 0', fontWeight: '500'}}>Completed Project "E-commerce Dashboard"</p>
                                            <span style={styles.activityTime}>2 hours ago</span>
                                        </div>
                                    </div>
                                    <div 
                                        style={styles.activityItem}
                                        onMouseEnter={(e) => e.currentTarget.style.background = styles.activityItemHover.background}
                                        onMouseLeave={(e) => e.currentTarget.style.background = styles.activityItem.background}
                                    >
                                        <div style={styles.activityIcon}>📝</div>
                                        <div>
                                            <p style={{margin: '0 0 4px 0', fontWeight: '500'}}>Updated profile information</p>
                                            <span style={styles.activityTime}>1 day ago</span>
                                        </div>
                                    </div>
                                    <div 
                                        style={styles.activityItem}
                                        onMouseEnter={(e) => e.currentTarget.style.background = styles.activityItemHover.background}
                                        onMouseLeave={(e) => e.currentTarget.style.background = styles.activityItem.background}
                                    >
                                        <div style={styles.activityIcon}>⭐</div>
                                        <div>
                                            <p style={{margin: '0 0 4px 0', fontWeight: '500'}}>Earned "Top Contributor" badge</p>
                                            <span style={styles.activityTime}>3 days ago</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Actions */}
                            <div 
                                style={styles.card}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = styles.cardHover.transform;
                                    e.currentTarget.style.boxShadow = styles.cardHover.boxShadow;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'none';
                                    e.currentTarget.style.boxShadow = styles.card.boxShadow;
                                }}
                            >
                                <h3 style={styles.cardTitle}>Connect</h3>
                                <div style={styles.actionButtons}>
                                    <button 
                                        style={styles.button}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = styles.buttonHover.transform;
                                            e.currentTarget.style.boxShadow = styles.buttonHover.boxShadow;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'none';
                                            e.currentTarget.style.boxShadow = 'none';
                                        }}
                                    >
                                        <span>✉️</span>
                                        Send Message
                                    </button>
                                    <button 
                                        style={styles.secondaryButton}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = styles.secondaryButtonHover.background;
                                            e.currentTarget.style.transform = styles.secondaryButtonHover.transform;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = styles.secondaryButton.background;
                                            e.currentTarget.style.transform = 'none';
                                        }}
                                    >
                                        <span>👥</span>
                                        Follow
                                    </button>
                                    <button 
                                        style={styles.outlineButton}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = styles.outlineButtonHover.borderColor;
                                            e.currentTarget.style.color = styles.outlineButtonHover.color;
                                            e.currentTarget.style.transform = styles.outlineButtonHover.transform;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = styles.outlineButton.borderColor;
                                            e.currentTarget.style.color = styles.outlineButton.color;
                                            e.currentTarget.style.transform = 'none';
                                        }}
                                    >
                                        <span>📱</span>
                                        Share Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'projects' && (
                    <div style={styles.tabContent}>
                        <h3>Projects Coming Soon</h3>
                        <p>Your projects will appear here.</p>
                    </div>
                )}

                {activeTab === 'activity' && (
                    <div style={styles.tabContent}>
                        <h3>Activity Feed Coming Soon</h3>
                        <p>Your recent activity will appear here.</p>
                    </div>
                )}
            </div>

            {/* Add CSS for spinner animation */}
            <style>
                {`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                `}
            </style>
        </div>
    );
}

export default Profile;