import SelectComponent from "@/common/input/select";
import Text from "@/common/text/text";
import EmergencyIcon from "@/assets/emergency-siren.svg";
import FileIcon from "@/assets/file-folder.svg";
import { useState } from "react";
import { Save, Trash2 } from "lucide-react";
import Button from "@/common/button/button";
import { useNavigate } from "react-router-dom";
import { appPaths } from "@/utils/app-paths";

function IncidentForm() {
  const [files, setFiles] = useState<File[]>([]);
  const navigate = useNavigate();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles([...files, ...Array.from(event.target.files)]);
    }
  };
  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
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
          <SelectComponent
            onChange={() => {}}
            label="Waybill ID"
            className="my-2"
            // triggerStyle={{ width: "100%", height: "45px" }}
            options={[{ label: "one", value: "1" }]}
          />
          <SelectComponent
            onChange={() => {}}
            label="Incident Type"
            className="my-2"
            // triggerStyle={{ width: "100%", height: "45px" }}
            options={[{ label: "one", value: "1" }]}
          />
          <div>
            <label>Incident Description</label>
            <textarea className="border block w-full h-[100px] rounded-md my-2 p-2 outline-none" />
          </div>
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
            {/* <UploadCloud size={40} className="mb-2 text-gray-400" /> */}
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

        {/* grid end */}
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
          <Button
            onClick={() => navigate(`/${appPaths.incident}/preview`)}
            className="!w-[100px]"
            leftIcon={<Save />}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default IncidentForm;
