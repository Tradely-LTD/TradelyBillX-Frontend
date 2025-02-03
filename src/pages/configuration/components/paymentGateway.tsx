import { useState } from "react";
import Button from "../../../common/button/button";
import { ArrowLeft, ArrowRight, Pencil, Trash2 } from "lucide-react";

const gateways = [
  {
    name: "Paystack",
    apiKey: "sdk21129SJDHGccsfy2dgjasd19",
    status: false,
    logo: "≡",
  },
  {
    name: "Flutterwave",
    apiKey: "hasfka729GDAJ87912dbcjsdhb",
    status: true,
    logo: "⚛",
  },
  {
    name: "Stripe",
    apiKey: "9213hJDAKbdi612ghdL9283bdc",
    status: true,
    logo: "S",
  },
  {
    name: "Square Cash",
    apiKey: "sdk21129SJDHGccsfy2dgjasd19",
    status: true,
    logo: "□",
  },
];

function PaymentGateway() {
  const [status, setStatus] = useState(true);
  return (
    <div>
      <div className="border border-[#F0F2F4] rounded-lg p-2 ">
        <table className="w-full bg-white px-3 rounded-lg overflow-hidden ">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-8 p-4">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="text-left p-4 text-gray-600 font-normal">Gateway Selection</th>
              <th className="text-left p-4 text-gray-600 font-normal">API & Secret Key</th>
              <th className="text-left p-4 text-gray-600 font-normal">Status</th>
              <th className="text-left p-4 text-gray-600 font-normal">Action</th>
            </tr>
          </thead>
          <tbody>
            {gateways.map((gateway, index) => (
              <tr key={index} className="border-t border-gray-100">
                <td className="p-4">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded ${
                        gateway.name === "Stripe"
                          ? "bg-purple-500 text-white"
                          : gateway.name === "Flutterwave"
                            ? "bg-orange-500 text-white"
                            : gateway.name === "Paystack"
                              ? "bg-blue-500 text-white"
                              : "bg-gray-500 text-white"
                      }`}
                    >
                      {gateway.logo}
                    </span>
                    <span className="font-medium">{gateway.name}</span>
                  </div>
                </td>
                <td className="p-4 font-mono text-sm text-gray-600">{gateway.apiKey}</td>
                <td className="p-4">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={status}
                      className="sr-only peer"
                      readOnly
                      onClick={() => {
                        setStatus(!status);
                      }}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    <span className="ml-2">{gateway.status ? "Enable" : "Disable"}</span>
                  </label>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button className="p-1 text-gray-500 hover:text-gray-700">
                      <Pencil size={18} />
                    </button>
                    <button className="p-1 text-gray-500 hover:text-gray-700">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-3 justify-between py-3">
        <Button disabled leftIcon={<ArrowLeft />} variant="outlined">
          Previous
        </Button>
        <Button disabled rightIcon={<ArrowRight />} variant="outlined">
          Next
        </Button>
      </div>
    </div>
  );
}

export default PaymentGateway;
