import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TPHSelectOptions = {
  label: string;
  name: string;
  options: { label: string; value: string; disable?: boolean }[];
};

const PHSelect = ({ label, name, options }: TPHSelectOptions) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select {...field} style={{ width: "100%" }} options={options} />

          {error && <small style={{ color: "red" }}>{error?.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default PHSelect;  
