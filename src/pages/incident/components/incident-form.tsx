import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SelectComponent from "@/common/input/select";
import Text from "@/common/text/text";
import EmergencyIcon from "@/assets/emergency-siren.svg";
import FileIcon from "@/assets/file-folder.svg";
import { useState } from "react";
import { Save, Trash2 } from "lucide-react";
import Button from "@/common/button/button";
import { useNavigate } from "react-router-dom";
import { appPaths } from "@/utils/app-paths";
import Input from "@/common/input/input";
import { useCreateIncidentMutation } from "../incidents.api";
import { useUserSlice } from "@/pages/auth/authSlice";

// Define the Incident interface
export interface Incident {
  waybillId: string;
  type: "ACCIDENT" | "THEFT" | "VEHICLE_BREAKDOWN" | "DELAY";
  description: string;
  location: string;
  reportedDate: string; // ISO string format (e.g., "2025-02-26T12:00:00Z")

  // Status Management
  status?: string;

  // Resolution Details
  resolutionNotes?: string;
  resolvedDate?: string; // Nullable timestamp

  assignTeam?: string;
}

// Define the validation schema using yup
const schema = yup.object().shape({
  waybillId: yup.string().required("Waybill ID is required"),
  type: yup
    .string()
    .oneOf(["ACCIDENT", "THEFT", "VEHICLE_BREAKDOWN", "DELAY"], "Invalid incident type")
    .required("Incident type is required"),
  description: yup.string().required("Description is required"),
  location: yup.string().required("Location is required"),
  reportedDate: yup.string().required("Reported date is required"),
  status: yup.string().oneOf(["REPORTED", "REVIEWING", "RESOLVED"]),
  resolutionNotes: yup.string(),
  resolvedDate: yup.string(),
  assignTeam: yup.string(),
});

function IncidentForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Incident>({
    resolver: yupResolver(schema),
    defaultValues: {
      status: "REPORTED", // Default status
    },
  });

  const [files, setFiles] = useState<File[]>([]);
  const navigate = useNavigate();
  const { loginResponse } = useUserSlice();
  const [handlePostIncident, { isLoading }] = useCreateIncidentMutation();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles([...files, ...Array.from(event.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const onSubmit = (data: Incident) => {
    const userId = loginResponse?.user.id;
    const dataToSubmit = {
      createdBy: userId,
      ...data,
    };
    handlePostIncident(dataToSubmit)
      .unwrap()
      .then(() => {
        navigate(-1);
      });
  };

  return (
    <div className="">
      <div className="flex justify-between items-center my-2">
        <div>
          <Text h1>Create New Incident Reporting</Text>
          <Text secondaryColor block>
            Users can report issues or incidents related to their waybills or shipments, such as
            delivery delays, product damage, or fraud.
          </Text>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-2 items-start justify-between mt-5 p-4 border rounded-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div>
                <img src={EmergencyIcon} alt="user_icon" />
              </div>
              <div>
                <Text h2 style={{ fontWeight: 600 }}>
                  Incident Details
                </Text>
                <Text secondaryColor block>
                  We need to know the incidents that occur in the field so that we can check and
                  verify.
                </Text>
              </div>
            </div>
          </div>
          <div className="">
            {/* <Controller
              name="waybillId"
              control={control}
              render={({ field }) => (
                <SelectComponent
                  {...field}
                  onChange={(value) => field.onChange(value)}
                  label="Waybill ID"
                  className="my-2"
                  options={[{ label: "one", value: "1" }]}
                  error={errors.waybillId?.message}
                />
              )}
            /> */}
            {/* bec28ccc-c610-45b8-b58b-d74431954887 */}
            <Controller
              name="waybillId"
              control={control}
              render={({ field }) => (
                <Input {...field} label="Waybill Id" error={errors.waybillId?.message} />
              )}
            />
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <SelectComponent
                  {...field}
                  onChange={(value) => field.onChange(value)}
                  label="Incident Type"
                  className="my-2"
                  options={[
                    { label: "Accident", value: "ACCIDENT" },
                    { label: "Theft", value: "THEFT" },
                    { label: "Vehicle Breakdown", value: "VEHICLE_BREAKDOWN" },
                    { label: "Delay", value: "DELAY" },
                  ]}
                  error={errors.type?.message}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <div>
                  <label>Incident Description</label>
                  <textarea
                    {...field}
                    className="border block w-full h-[100px] rounded-md my-2 p-2 outline-none"
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                  )}
                </div>
              )}
            />
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Location"
                  error={errors.location?.message}
                  placeholder="Enter incident location"
                />
              )}
            />
            <Controller
              name="reportedDate"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="datetime-local"
                  label="Reported Date"
                  error={errors.reportedDate?.message}
                />
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 items-start justify-between mt-5 p-4 border rounded-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div>
                <img src={EmergencyIcon} alt="user_icon" />
              </div>
              <div>
                <Text h2 style={{ fontWeight: 600 }}>
                  Incident Evidence
                </Text>
                <Text secondaryColor block>
                  For verification purposes, we require supporting evidence in the form of photos or
                  document at the time of the incident.
                </Text>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Upload Evidence</label>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 cursor-pointer">
              <img src={FileIcon} className="w-12" />
              <p className="text-sm">Drag & drop files here or</p>
              <label className="text-blue-600 cursor-pointer mt-1">
                Click to upload
                <input type="file" multiple className="hidden" onChange={handleFileChange} />
              </label>
            </div>

            {/* Preview thumbnails */}
            {files.length > 0 && (
              <div className="mt-4 space-y-3">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-2 border border-gray-200 rounded-lg shadow-sm"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-12 h-12 object-cover rounded-lg border"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{file.name}</p>
                      <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                    </div>
                    <button
                      className="text-red-500 hover:bg-red-100 p-1 rounded-full"
                      onClick={() => removeFile(index)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center gap-3 my-3">
          <div>
            <Button className="!w-[140px] border !border-[red] !text-[red]" variant="outlined">
              Clear
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => navigate(`/${appPaths.incident}/preview`)}
              className="!w-[140px]"
              variant="outlined"
            >
              Save as Draft
            </Button>
            <Button loading={isLoading} type="submit" className="!w-[100px]" leftIcon={<Save />}>
              Save
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default IncidentForm;
