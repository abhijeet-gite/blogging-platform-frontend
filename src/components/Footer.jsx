function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
      <div className="container mx-auto max-w-screen-xl px-4 text-center">
        <p>&copy; {new Date().getFullYear()} MyBlog. All rights reserved.</p>
        <p className="text-sm mt-2">
          Built with ❤️ using React & Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
