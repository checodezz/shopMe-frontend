import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="p-1 bg-body-secondary text-center d-flex justify-content-between align-items-center ">
      <div className="container">
        <div className="">
          <a
            href="https://github.com/checodezz"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={24} />
          </a>
          <a
            className="ps-4"
            href="https://www.linkedin.com/in/checodezz/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            className="ps-4"
            href="https://x.com/checodezz"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter size={24} />
          </a>
          <p className="mb-0 pt-2">
            <strong>&copy; {new Date().getFullYear()} ShopMe.</strong> No
            Copyright Feel free to replicate.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
