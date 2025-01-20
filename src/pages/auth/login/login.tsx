// LoginPage.jsx
import { useState } from "react";
import styled from "styled-components";
import Input from "../../../common/input/input";
import Button from "../../../common/button/button";
import Logo from "../../../common/logo/logo";

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login submitted:");
  };

  return (
    <Container>
      {/* Left Section with Background Image */}
      <Info>
        <div className="absolute z-20 max-w-xl p-8 text-white top-1/4 left-8">
          <Logo />
          <h2 className="text-4xl font-bold leading-relaxed">
            Streamline your AUFCDN online waybill requests effortlessly.
          </h2>
        </div>
      </Info>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
            <p className="text-gray-500">Please log in to your account</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div>
                <Input label="Email" type="email" placeholder="Type Email" />
              </div>
              <div className="my-3">
                <Input
                  label="Password"
                  type="password"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm text-gray-500"
                >
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-sm text-green-700 hover:text-green-800"
              >
                Forgot Password
              </a>
            </div>

            <Button fullWidth type="submit">
              Login
            </Button>
          </form>

          <p className="text-center mt-8 text-gray-500">
            Don't have an account yet?{" "}
            <a href="#" className="text-green-700 hover:text-green-800">
              Create an Account
            </a>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;

const Info = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("https://s3-alpha-sig.figma.com/img/f36e/eda3/82a9acebc97b1c621256eb13648950a6?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aONR4dLiJlocr0d43KrMabRw7LSR2wxBv8YSWw1Q3LwatxDsATB7BJXDPXoO~aiqLv0vbSVTq5ApxT6O1aa8THkueMBJJkOoCWJNL3u31MNTWNCymxSkXXBvB~8HcnkGdQ1DncaYI6JlIe6ybmUNX~CHxImaaF9OclW0EF-BQCal10CD5BhkcoSkV0AMzP1n2sp98ckUf8TgyMN8nyAHiEg8f2bhZ1EGnyWPr2z9XmXhFicWE8Zp1GMucQbJFs~svZOyWGZXkD9jOfZyJ49feDmnJnU7pKbazAWTXNynELcynZ-9ACVtqq5tjFwB~ihiqiwmDYY0heWzRll64T3llg__");
  background-position: center;
  background-repeat: no-repeat;
  width: 70%;
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
`;
