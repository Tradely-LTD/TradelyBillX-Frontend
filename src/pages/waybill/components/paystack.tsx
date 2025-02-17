import { useState, useEffect } from "react";
import { usePaystackPayment } from "react-paystack";
import Button from "@/common/button/button";
import { useCreateWayBillsMutation } from "../waybill.api";
import { useUserSlice } from "@/pages/auth/authSlice";
import { useFormContext } from "./formContext";
import { useNavigate } from "react-router-dom";
import urls from "@/utils/config";

interface Props {
  amount: number;
  stateId: string;
  email: string;
  reference: string;
}

const PaystackPayment = ({ amount, stateId, email, reference }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getValues } = useFormContext();

  const [paymentConfig, setPaymentConfig] = useState<{
    amount: number;
    split_code: string;
  } | null>(null);
  const [createWayBill, { isLoading: isCreatingWaybill, isSuccess }] = useCreateWayBillsMutation();
  const { loginResponse } = useUserSlice();

  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      navigate("/waybill/list");
    }
  }, [isSuccess]);

  // Paystack configuration
  const config = {
    email,
    amount: paymentConfig?.amount || 0,
    publicKey: "pk_test_dec2039127e6a19857b73b6c0c44302d8593252a",
    split_code: paymentConfig?.split_code,
    reference,
  };

  // Initialize Paystack hook
  const initializePaystackPayment = usePaystackPayment(config);

  // Initialize payment configuration
  const initializePayment = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${urls.API_BASE_URL}/payment/initiate-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stateId: stateId,
          amount: amount * 100, // Convert to kobo
          agentAccountNumber: "0238465058",
          agentBankCode: "058",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to initialize payment");
      }

      const data = await response.json();
      setPaymentConfig({
        amount: data.amount,
        split_code: data.splitCode,
      });
    } catch (err: any) {
      const errorMessage = err.message || "Failed to initialize payment";
      setError(errorMessage);
      // onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Use effect to trigger Paystack payment after paymentConfig is set
  useEffect(() => {
    if (paymentConfig) {
      initializePaystackPayment({
        onSuccess: (trans) => {
          createWayBill({
            ...getValues(),
            paymentStatus: trans?.status.toUpperCase(),
            transactionReference: trans?.reference,
            shipmentStatus: "IN_TRANSIT",
            incidentStatus: "SAFE",
            createdBy: loginResponse?.user.id,
          });
          setPaymentConfig(null);
        },
        onClose: () => {
          setPaymentConfig(null);
        },
      });
    }
  }, [paymentConfig, initializePaystackPayment]);

  return (
    <div className="w-full  mx-auto">
      <div>
        {error && (
          <div className="mb-4 text-red-600 bg-red-50 p-3 rounded">
            <div>{error}</div>
          </div>
        )}
        <Button onClick={initializePayment} disabled={isLoading} className="!w-full">
          {isLoading || isCreatingWaybill ? "Initializing..." : "Pay Now"}
        </Button>
      </div>
    </div>
  );
};

export default PaystackPayment;
