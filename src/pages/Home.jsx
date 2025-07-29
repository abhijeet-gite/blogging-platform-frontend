
import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import AdSenseAd from "../components/AdSenseAd";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/posts")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error("Error fetching blogs:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Loading blogs...</p>;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10">
      <Helmet>
        <title>MyBlog | Latest Blogs</title>
        <meta
          name="description"
          content="Read the latest blogs on MyBlog platform. Stay updated with trending articles."
        />
      </Helmet>

      <h2 className="text-3xl font-bold text-center mb-6">Latest Blogs</h2>

      {/* ✅ Ad at Top */}
      <AdSenseAd />

      {blogs.length === 0 ? (
        <p className="text-center text-gray-500">No blogs found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
          {blogs.map((blog, index) => (
            <>
              <div
                key={blog._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition duration-300"
              >
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                  <p
                    className="text-gray-600 mb-3 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />
                  <Link
                    to={`/blog/${blog._id}`}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded hover:opacity-90"
                  >
                    Read More
                  </Link>
                </div>
              </div>

              {/* ✅ Insert Ad after every 3 blogs */}
              {(index + 1) % 3 === 0 && (
                <div key={`ad-${index}`} className="col-span-full">
                  <AdSenseAd />
                </div>
              )}
            </>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;





