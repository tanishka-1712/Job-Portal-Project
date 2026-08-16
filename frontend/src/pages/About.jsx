import "./About.css";
import { FaBullseye, FaEye, FaBriefcase, FaBuilding, FaBolt, FaShieldAlt, FaCheckCircle } from "react-icons/fa";
function About() {
    return (
        <main className="about-page">
            <section className="about-hero">
                <div className="about-hero-content">
                    <p className="about-label">ABOUT US</p>
                    <h1>Connecting Talent With the Right Career Opportunites</h1>
                    <p className="about-hero-description">
                        Our job portal helps job seekers discover suitable career oppoertunites and enables employers to connect with skilled candidates through a simple and user-friendly platform.
                    </p>
                    <div className="about-hero-buttons">
                        <button className="primary-btn">Explore Jobs</button>
                        <button className="secondary-btn">Contact Us</button>
                    </div>
                </div>
            </section>
            <section className="about-platform">
                <div className="platform-image">
                    <img
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700"
                        alt="About Job Portal"
                    />
                </div>
                <div className="platform-content">
                    <p className="section-label">ABOUT OUR PLATFORM</p>
                    <h2>Your Trusted Career Partner</h2>
                    <p>
                        Our Job Portal is designed to bridge the gap between talented job seekers
                        and trusted employers. We provide a secure platform where candidates can
                        discover opportunities, build their profiles, and apply for jobs with
                        ease, while employers can efficiently hire the right talent.
                    </p>
                    <ul>
                        <li><FaCheckCircle className="check-icon" /> Verified Job Opportunities</li>
                        <li><FaCheckCircle className="check-icon" /> Quick & Easy Applications</li>
                        <li><FaCheckCircle className="check-icon" /> Trusted Employers</li>
                        <li><FaCheckCircle className="check-icon" />Secure User Experience</li>
                    </ul>
                    <button className="primary-btn">
                        Learn More
                    </button>
                </div>
            </section>
            <section className="mission-vision">
                <h2>Our Mission & Vision</h2>
                <p className="mission-subtitle">Guiding careers and helping employers find the right talent.</p>
                <div className="mission-container">
                    <div className="mission-card">
                        <div className="icon">
                            <FaBullseye />
                        </div>
                        <h3>Our Mission</h3>
                        <p>To simply the hiring process by providing a secure and user-friendly platform where job seekers and employers can connect efficiently.</p>
                    </div>
                    <div className="mission-card">
                        <div className="icon">
                            <FaEye />
                        </div>
                        <h3>Our Vision</h3>
                        <p>To become one of the most trusted job portals that empowers careers and helps companies hire the right talent.</p>
                    </div>
                </div>
            </section>
            <section className="why-choose-us">
                <div className="why-heading">
                    <p className="section-label">WHY CHOOSE US</p>
                    <h2>Everything You Need to Move Your Career Forward</h2>
                    <p>We make job searching and hiring simple, secure, and efficient for both candidates and employers.</p>
                </div>
                <div className="why-cards">
                    <div className="why-card">
                        <div className="why-icon"><FaBriefcase /></div>
                        <h3>Verified Jobs</h3>
                        <p>Discover genuine job opportunites posted by trusted employers and companies.</p>
                    </div>
                    <div className="why-card">
                        <div className="why-icon"><FaBuilding /></div>
                        <h3>Top Companies</h3>
                        <p>Connect with leading companies and explore opportunities across different industries.</p>
                    </div>
                    <div className="why-card">
                        <div className="why-icon"><FaBolt /></div>
                        <h3>Quick Application</h3>
                        <p>Apply for suitable jobs quickly using your profile and uploaded resume.</p>
                    </div>
                    <div className="why-card">
                        <div className="why-icon"><FaShieldAlt /></div>
                        <h3>Secure Platform</h3>
                        <p>Your profile, resume, and application information remain protected and secure.</p>
                    </div>
                </div>
            </section>
            <section className="about-cta">
                <div className="cta-content">
                    <p className="cta-label">START YOUR JOURNEY</p>
                    <h2>Ready to Find Your Dream Job?</h2>
                    <p>Explore exciting career opportunities and connect with trusted employers through our simple and secure job portal.</p>
                    <button className="cta-btn">Browse Jobs</button>
                </div>
            </section>
        </main>
    );
}
export default About;