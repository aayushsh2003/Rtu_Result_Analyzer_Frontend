import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About the Developer</h3>
            <div className="flex items-center space-x-4 mb-4">
              <img 
                src="https://aayushkimehnat.vercel.app/img/aayush.png"
                alt="Aayush Sharma"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h4 className="font-medium">Aayush Sharma</h4>
                <p className="text-sm text-gray-400">Full Stack Developer</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Passionate about creating innovative solutions that make a difference in education.
            </p>
            <Link 
              to="/developer"
              className="inline-block mt-4 text-primary-400 hover:text-primary-300 transition-colors"
            >
              View Full Profile →
            </Link>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="space-y-3">
              <a 
                href="https://github.com/aayushsh2003"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-white transition-colors"
              >
                <Github className="h-5 w-5 mr-2" />
                GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/aayush-sharma-a44062299/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5 mr-2" />
                LinkedIn
              </a>
              <a 
                href="mailto:aayushsharma4437@gmail.com"
                className="flex items-center text-gray-300 hover:text-white transition-colors"
              >
                <Mail className="h-5 w-5 mr-2" />
                Email
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <a href="/privacy" className="block text-gray-300 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="block text-gray-300 hover:text-white transition-colors">
                Terms of Service
              </a>
              <Link 
                to="/developer"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Developer Profile
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Student Result Analyzer. Developed with ❤️ by Aayush Sharma
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;