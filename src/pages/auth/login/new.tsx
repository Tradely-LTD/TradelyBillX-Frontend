import Logo from "@/common/logo/logo";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  // const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulate login - replace with actual login logic
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Section with Background */}
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('bg.jpeg')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="hidden lg:block lg:w-1/2 relative"
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute z-10 max-w-xl p-8 text-white top-[20px] left-8">
          <Logo />
          <h2 className="text-4xl font-bold leading-relaxed">
            Streamline your AUFCDN online waybill requests effortlessly.
          </h2>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex text-center justify-center items-center">
            <Logo />
          </div>

          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Welcome Back!</h1>
            <p className="text-gray-500">Please log in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Email Address"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Password"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-500">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-green-700 hover:text-green-800">
                Forgot Password
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-gray-500">
            Don't have an account yet?{" "}
            <Link to="/register" className="text-green-700 hover:text-green-800">
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
// const Info = styled.div`
//   background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("bg.jpeg");
//   background-position: center;
//   background-repeat: no-repeat;
//   width: 70%;
// `;

// const Container = styled.div`
//   min-height: 100vh;
//   display: flex;
// `;
