import Button from "@/common/button/button";
import Input from "@/common/input/input";
import SelectComponent from "@/common/input/select";
import Text from "@/common/text/text";
import { Save } from "lucide-react";
import UserIcon from "@/assets/user.svg";
import {
  useGetLGAsQuery,
  useGetMarketQuery,
  useGetStatesQuery,
} from "@/pages/location/location.api";
import { useGetUnionQuery } from "@/pages/union/union";
import { useRegisterMutation } from "@/pages/auth/auth.api";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";

interface Props {
  mode: "create" | "update";
  userId?: string;
}

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
  stateId: yup.string().required("State is required"),
  lgaId: yup.string().required("LGA is required"),
  marketId: yup.string().required("Market is required"),
  union: yup.string(),
  city: yup.string().required("City is required"),
});

function UserForm({ mode, userId }: Props) {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState<any | null>(null);
  const [selectedLGA, setSelectedLGA] = useState<string | null>(null);

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

  const { data: markets, isLoading: isLoadingMarket } = useGetMarketQuery(
    {
      lgaId: selectedLGA ?? "",
    },
    { skip: selectedLGA === null || selectedLGA === "" }
  );

  const onSubmit = (data: any) => {
    const { termsAccepted, ...rest } = data;

    handleRegister(rest);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(-1);
    }
  }, [isSuccess]);

  return (
    <div className="">
      <div className="flex justify-between items-center my-2">
        {mode === "create" ? (
          <div>
            <Text h1>Create New User & Role</Text>
            <Text secondaryColor block>
              New user only can be manual registration by Super Admin
            </Text>
          </div>
        ) : (
          <div>
            <Text h1>Edit User & Role</Text>
            <Text secondaryColor block>
              New user only can be manual registration by Super Admin
            </Text>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 items-start justify-between mt-5">
        {/* Minimum Password Length Dropdown */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div>
              <img src={UserIcon} alt="user_icon" />
            </div>
            <div>
              <Text h2 style={{ fontWeight: 600 }}>
                User Form
              </Text>
              <Text secondaryColor block>
                Complete the data to add a new user.
              </Text>
              <p className="text-[#FFA500]">
                Please make sure you select thesame state, lga and market
              </p>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-1 grid grid-cols-1 items-center gap-2 md:grid-cols-2">
            <div>
              <Input
                label="First Name"
                required
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
                required
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
                required
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
                required
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
                required
                label="Union"
                options={
                  unions?.data?.map((item) => ({
                    label: item.name,
                    value: item.code,
                  })) ?? []
                }
                onChange={(val, id) => {
                  setValue("union", val);
                  clearErrors("union");
                }}
                isLoading={isFetchingUnion}
              />
            </div>
            <div className="my-3">
              <Input
                required
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
              required
              error={errors.stateId?.message}
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
              onChange={(_, id) => {
                setValue("stateId", id ?? "");
                setSelectedState(id);
              }}
              isLoading={isStatesLoading}
            />

            <SelectComponent
              label="LGA"
              required
              error={errors.lgaId?.message}
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
              onChange={(_, id) => {
                setValue("lgaId", id ?? "");
                setSelectedLGA(id ?? "");
              }}
              isLoading={isLGALoading || isFetchingLGA}
              disabled={!selectedState}
            />
          </div>

          <div className="mb-1 grid grid-cols-1 items-center gap-2 md:grid-cols-2">
            <SelectComponent
              label="Market"
              required
              error={errors.marketId?.message}
              className="my-2 min-w-[50%] mr-2"
              options={
                markets?.data?.length
                  ? markets.data.map((lga) => ({
                      label: lga.label,
                      value: lga.value,
                      id: lga.id,
                    }))
                  : selectedState
                  ? [{ label: "No Market found for this state", value: "no data ", id: "" }]
                  : [{ label: "Select a LGA first", value: "no data ", id: "" }]
              }
              onChange={(_, id) => {
                setValue("marketId", id ?? "");
              }}
              isLoading={isLoadingMarket}
              disabled={!selectedLGA}
            />
            <Input
              label="City"
              required
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

          <Button loading={isLoading} fullWidth type="submit">
            Register
          </Button>
        </form>
      </div>
      {/* <div className="flex justify-between items-center gap-3 ">
        <div>
          <Button className="!w-[140px] border !border-[red] !text-[red]" variant="outlined">
            Clear
          </Button>
        </div>
        <div className="flex gap-2">
          <Button className="!w-[140px]" variant="outlined">
            Save as Draft
          </Button>
          <Button className="!w-[100px]" leftIcon={<Save />}>
            Save
          </Button>
        </div>
      </div> */}
    </div>
  );
}

export default UserForm;
