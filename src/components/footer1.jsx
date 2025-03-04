import React from "react";
import "./Footer.css"; // Make sure CSS file is present

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <p>© {new Date().getFullYear()} Cheap Chaser. All Rights Reserved.</p>
                <div className="footer-links">
                    <a href="/privacy-policy">Privacy Policy</a>
                    <a href="/terms">Terms of Service</a>
                    <a href="/contact">Contact Us</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
