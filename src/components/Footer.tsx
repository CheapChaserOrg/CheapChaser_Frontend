import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-primary">CheapChaser</h3>
            <p className="text-gray-600">
              Discover the beauty of Sri Lanka with our curated budget travel experiences.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <FooterLink to="/destinations">Destinations</FooterLink>
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
              <FooterLink to="/blog">Travel Blog</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <SocialLink href="#" icon={<Facebook size={20} />} />
              <SocialLink href="#" icon={<Instagram size={20} />} />
              <SocialLink href="#" icon={<Twitter size={20} />} />
            </div>
          </div>
        </div>

        {/* <div>
            <h4 className="font-semibold text-gray-900 mb-4">Popular Destinations</h4>
            <ul className="space-y-2">
              <FooterLink href="#kandy">Kandy</FooterLink>
              <FooterLink href="#galle">Galle</FooterLink>
              <FooterLink href="#ella">Ella</FooterLink>
              <FooterLink href="#sigiriya">Sigiriya</FooterLink>
            </ul>
          </div> */}

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} CheapChaser Budget Travel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, children }) => (
  <li>
    <Link
      to={to}
      className="text-gray-600 hover:text-primary transition-colors"
    >
      {children}
    </Link>
  </li>
);

const SocialLink = ({ href, icon }) => (
  <a
    href={href}
    className="text-gray-600 hover:text-primary transition-colors"
  >
    {icon}
  </a>
);

export default Footer;