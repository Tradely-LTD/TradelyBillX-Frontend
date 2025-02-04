import { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'; // Import yup for validation
import Input from "@/common/input/input"; // Assuming your Input component accepts an 'error' prop
import Button from "@/common/button/button";
import Logo from "@/common/logo/logo";

// Define the validation schema using Yup
const schema = yup.object().shape({
  firstName: yup.string().min(2, "First name is required").required("First name is required"),
  lastName: yup.string().min(2, "Last name is required").required("Last name is required"),
  email: yup.string().email("Invalid email address").required("Email is required"),
  phoneNumber: yup.string().min(10, "Phone number is required").required("Phone number is required"),
  timeZone: yup.string().min(3, "Time zone is required").required("Time zone is required"),
  password: yup.string().min(6, "Password must be at least 6 characters long").required("Password is required"),
  termsAccepted: yup.boolean().oneOf([true], "You must accept the terms").required("You must accept the terms"),
});

const Register = () => {
  const [rememberMe, setRememberMe] = useState(false);

  // Use React Hook Form with Yup validation
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
    // Handle the registration logic here
  };

  return (
    <Container>
      {/* Left Section with Background Image */}
      <Info>
        <div className="absolute z-20 max-w-xl p-8 text-white top-[20px] left-8">
          <Logo />
          <h2 className="text-4xl font-bold leading-relaxed">
            Streamline your AUFCDN online waybill requests effortlessly.
          </h2>
        </div>
      </Info>

      {/* Right Section - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-2">
              Register an account and start request waybill effortlessly
            </h1>
            <p className="text-gray-500">Please complete your information.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-1 grid grid-cols-2 items-center gap-2">
              <div>
                <Input
                  label="First Name"
                  type="text"
                  placeholder="First name"
                  {...register("firstName")}
                  error={errors.firstName?.message}
                />
              </div>
              <div className="my-3">
                <Input
                  label="Last Name"
                  type="text"
                  placeholder="Last name"
                  {...register("lastName")}
                  error={errors.lastName?.message}
                />
              </div>
            </div>

            <div className="mb-1 grid grid-cols-2 items-center gap-2">
              <div>
                <Input
                  label="Email"
                  type="text"
                  placeholder="Email Address"
                  {...register("email")}
                  error={errors.email?.message}
                />
              </div>
              <div className="my-3">
                <Input
                  label="Phone Number"
                  type="text"
                  placeholder="Phone number"
                  {...register("phoneNumber")}
                  error={errors.phoneNumber?.message}
                />
              </div>
            </div>

            <div className="mb-1 grid grid-cols-2 items-center gap-2">
              <div>
                <Input
                  label="Time zone"
                  type="text"
                  placeholder=""
                  {...register("timeZone")}
                  error={errors.timeZone?.message}
                />
              </div>
              <div className="my-3">
                <Input
                  label="Password"
                  type="password"
                  placeholder="Create Password"
                  {...register("password")}
                  error={errors.password?.message}
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
                <label htmlFor="remember" className="ml-2 text-sm text-gray-500">
                  By registering an account, I have agreed to the
                  <a href="#" className="text-sm text-green-700 hover:text-green-800">
                    Terms & Conditions
                  </a> of AUFCDN.
                </label>
              </div>
            </div>

            <Button fullWidth type="submit">
              Register
            </Button>
          </form>

          <p className="text-center mt-8 text-gray-500">
            Already have an account?{" "}
            <a href="#" className="text-green-700 hover:text-green-800">
              Sign in to your Account
            </a>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Register;

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
