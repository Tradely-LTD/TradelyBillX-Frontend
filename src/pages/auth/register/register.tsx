import { useState, ChangeEvent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "@/common/input/input";
import Button from "@/common/button/button";
import Logo from "@/common/logo/logo";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../auth.api";
import { useGetUnionQuery } from "@/pages/union/union";
import SelectComponent from "@/common/input/select";
import { useGetLGAsQuery, useGetStatesQuery } from "@/pages/location/location.api";

const schema = yup.object().shape({
  firstName: yup.string().min(2, "First name is required").required("First name is required"),
  lastName: yup.string().min(2, "Last name is required").required("Last name is required"),
  email: yup.string().email("Invalid email address").required("Email is required"),
  phoneNumber: yup
    .string()
    .min(10, "Phone number is required")
    .required("Phone number is required"),
  timeZone: yup.string().min(3, "Time zone is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
  state: yup.string().required("State is required"),
  lga: yup.string().required("LGA is required"),
  union: yup.string().required("Union is required"),
  city: yup.string().required("City is required"),

  termsAccepted: yup
    .boolean()
    .oneOf([true], "You must accept the terms")
    .required("You must accept the terms"),
});

const Register = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState<any | null>(null);
  const [_, setSelectedLGA] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [handleRegister, { isLoading, isSuccess }] = useRegisterMutation();
  const { data: unions, isLoading: isFetchingUnion } = useGetUnionQuery();
  const { data: statesData, isLoading: isStatesLoading } = useGetStatesQuery();
  const {
    data: lgasData,
    isLoading: isLGALoading,
    isFetching: isFetchingLGA,
  } = useGetLGAsQuery({ stateId: selectedState }, { skip: selectedState === null });

  const onSubmit = (data: any) => {
    const { termsAccepted, ...rest } = data;
    handleRegister(rest);
  };
  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <div className="flex min-h-screen">
      <div
        className="w-[70%] bg-cover bg-center bg-no-repeat relative hidden md:block"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('your-background-url')",
        }}
      >
        <div className="absolute z-20 max-w-xl p-8 text-white top-[20px] left-8">
          <Logo />
          <h2 className="text-4xl font-bold leading-relaxed">
            Streamline your AUFCDN online waybill requests effortlessly.
          </h2>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-2">
              Register an account and start request waybill effortlessly
            </h1>
            <p className="text-gray-500">Please complete your information.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-1 grid grid-cols-1 items-center gap-2 md:grid-cols-2">
              <div>
                <Input
                  label="First Name"
                  type="text"
                  placeholder="First name"
                  {...register("firstName")}
                  error={errors.firstName?.message}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setValue("firstName", e.target.value.trim());
                    clearErrors("firstName");
                  }}
                />
              </div>
              <div className="my-3">
                <Input
                  label="Last Name"
                  type="text"
                  placeholder="Last name"
                  {...register("lastName")}
                  error={errors.lastName?.message}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setValue("lastName", e.target.value.trim());
                    clearErrors("lastName");
                  }}
                />
              </div>
            </div>

            <div className="mb-1 grid grid-cols-1 items-center gap-2 md:grid-cols-2">
              <div>
                <Input
                  label="Email"
                  type="text"
                  placeholder="Email Address"
                  {...register("email")}
                  error={errors.email?.message}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const emailValue = e.target.value.toLowerCase();
                    setValue("email", emailValue);
                    clearErrors("email");
                  }}
                />
              </div>
              <div className="my-3">
                <Input
                  label="Phone Number"
                  type="text"
                  placeholder="Phone number"
                  {...register("phoneNumber")}
                  error={errors.phoneNumber?.message}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setValue("phoneNumber", e.target.value.replace(/\D/g, ""));
                    clearErrors("phoneNumber");
                  }}
                />
              </div>
            </div>

            <div className="mb-1 grid grid-cols-1 items-center gap-2 md:grid-cols-2">
              <div>
                <SelectComponent
                  label="Union"
                  options={
                    unions?.data?.map((item) => ({
                      label: item.name,
                      value: item.code,
                    })) ?? []
                  }
                  onChange={(val, id) => {
                    console.log(val, id);
                    setValue("union", val);
                    clearErrors("union");
                  }}
                  isLoading={isFetchingUnion}
                />
              </div>
              <div className="my-3">
                <Input
                  label="Password"
                  type="password"
                  placeholder="Create Password"
                  {...register("password")}
                  error={errors.password?.message}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setValue("password", e.target.value);
                    clearErrors("password");
                  }}
                />
              </div>
            </div>
            <div className="mb-1 grid grid-cols-1 items-center gap-2 md:grid-cols-2">
              <SelectComponent
                label="State"
                className="my-2 min-w-[50%] mr-2"
                options={
                  statesData?.data?.length
                    ? statesData.data.map((state) => ({
                        label: state.label,
                        value: state.value,
                        id: state.id,
                      }))
                    : [{ label: "No States available", value: "no data ", id: "" }]
                }
                onChange={(value, id) => {
                  setValue("state", value);
                  setSelectedState(id);
                }}
                isLoading={isStatesLoading}
              />

              <SelectComponent
                label="LGA"
                className="my-2 min-w-[50%] mr-2"
                options={
                  lgasData?.data?.length
                    ? lgasData.data.map((lga) => ({
                        label: lga.label,
                        value: lga.value,
                        id: lga.id,
                      }))
                    : selectedState
                    ? [{ label: "No LGAs found for this state", value: "no data ", id: "" }]
                    : [{ label: "Select a state first", value: "no data ", id: "" }]
                }
                onChange={(value, id) => {
                  setValue("lga", value);
                  setSelectedLGA(id ?? "");
                }}
                // value={selectedLGA}
                isLoading={isLGALoading || isFetchingLGA}
                disabled={!selectedState}
              />
            </div>

            <div className="my-3">
              <Input
                label="City"
                type="text"
                placeholder="City"
                {...register("city")}
                error={errors.city?.message}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setValue("city", e.target.value);
                  clearErrors("city");
                }}
              />
            </div>

            <div className="flex flex-col justify-between mb-6">
              <div className="flex items-center ">
                <div>
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => {
                      setRememberMe(e.target.checked);
                      setValue("termsAccepted", e.target.checked);
                      clearErrors("termsAccepted");
                    }}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-500">
                    By registering an account, I have agreed to the{" "}
                    <a href="#" className="text-sm text-green-700 hover:text-green-800">
                      Terms & Conditions
                    </a>{" "}
                    of AUFCDN.
                  </label>
                </div>
              </div>
              {errors.termsAccepted?.message && (
                <div className="text-sm text-red-500">{errors.termsAccepted?.message}</div>
              )}
            </div>

            <Button loading={isLoading} fullWidth type="submit">
              Register
            </Button>
          </form>

          <p className="text-center mt-8 text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-green-700 hover:text-green-800">
              Sign in to your Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
