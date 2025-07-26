
function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-10">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
          {/* ✅ Logo / Brand */}
          <p className="text-lg font-semibold text-white">
            &copy; {new Date().getFullYear()} MyBlog
          </p>

          {/* ✅ Navigation Links */}
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="/" className="hover:text-white transition">Home</a>
            <a href="/about" className="hover:text-white transition">About</a>
            <a href="/contact" className="hover:text-white transition">Contact</a>
            <a href="/privacy" className="hover:text-white transition">Privacy</a>
          </div>
        </div>

        {/* ✅ Sub Text */}
        <p className="text-sm text-gray-400 mt-4 text-center">
          Built with ❤️ using React & Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

