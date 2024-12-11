import { Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
};

const PHInput = ({ type, name, label }: TInputProps) => {
  return (
    <div style={{ marginBottom: "16px" }}>
      <Controller
        name={name}
        render={({ field }) => (
          <>
            {label ? <label htmlFor={name}>{label}</label> : null}
            <Input type={type} id={name} {...field} />
          </>
        )}
      />
    </div>
  );
};

export default PHInput;
