function NotFound() {
  return (
    <div className="text-center min-h-[80vh] flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold text-purple-600">404</h1>
      <p className="text-xl text-gray-600 mb-4">Oops! Page not found.</p>
      <a
        href="/"
        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:opacity-90"
      >
        Go Back Home
      </a>
    </div>
  );
}

export default NotFound;
