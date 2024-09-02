import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="p-3 bg-body-secondary text-center d-flex justify-content-between align-items-center">
      <p className="mb-0">&copy; No Copyright, Feel free to replicate.</p>
      <div>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          <FaGithub size={24} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
