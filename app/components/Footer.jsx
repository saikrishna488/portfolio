const Footer = () => (
    <footer className="bg-gray-900 text-white py-4">
      <div className="container mx-auto px-6 text-center">
        <p>&copy; {new Date().getFullYear()} Sai Krishna Reddy. All rights reserved.</p>
        <div className="flex justify-center mt-4">
          <a href="mailto:saikrishnapakkir@gmail.com" className="mx-2 hover:underline">Email</a>
          <a href="https://github.com/saikrishna488" className="mx-2 hover:underline">GitHub</a>
          <a href="https://www.linkedin.com/in/saikrishna488" className="mx-2 hover:underline">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
  
  export default Footer;
  