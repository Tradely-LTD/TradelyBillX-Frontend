import { Select } from "@radix-ui/themes";

interface SelectComponentProps {
  label?: string;
  value?: string;
  defaultValue?: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  className?: string;
  triggerStyle?: React.CSSProperties;
  labelStyles?: React.CSSProperties;
  required?: boolean;
}

const SelectComponent: React.FC<SelectComponentProps> = ({
  label,
  value,
  defaultValue,
  options,
  onChange,
  className,
  triggerStyle,
  labelStyles,
  required,
}) => {
  return (
    <div className={`relative ${className}`}>
      {label && (
        <label style={labelStyles} className="block">
          {label}
          {required && <span style={{ color: "#ef4444" }}> *</span>}
        </label>
      )}

      <Select.Root onValueChange={onChange} value={value} defaultValue={defaultValue}>
        <Select.Trigger style={{ width: "80px", ...triggerStyle }} />
        <Select.Content>
          <Select.Group>
            {label && <Select.Label>{label}</Select.Label>}
            {options.map((option) => (
              <Select.Item key={option.value} value={option.value}>
                {option.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </div>
  );
};

export default SelectComponent;
