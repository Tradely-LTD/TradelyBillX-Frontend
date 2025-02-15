import { Package } from "lucide-react";
import Text from "@/common/text/text";
import Button from "@/common/button/button";

interface EmptyStateProps {
  title?: string;
  description?: string;
  showButton?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
  isLoading?: boolean;
}

const EmptyState = ({
  title = "No data Found",
  description = "We couldn't find the record you're looking for. Please check the ID and try again.",
  showButton = true,
  buttonText = "Go Back",
  onButtonClick,
}: EmptyStateProps) => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="bg-green-50 w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4">
            <Package className="w-10 h-10 text-green-600" />
          </div>

          <>
            <Text h3 block className="mb-2">
              {title}
            </Text>
            <Text block color="#64748B" className="mb-6">
              {description}
            </Text>
            {showButton && (
              <div className="flex justify-center">
                <Button onClick={onButtonClick} className="!h-[40px]">
                  {buttonText}
                </Button>
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
