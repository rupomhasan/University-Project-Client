import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TPHSelectOptions = {
  label: string;
  name: string;
  disabled?: boolean;
  options: { label: string; value: string; disable?: boolean }[] | undefined;
};

const PHSelect = ({ label, name, options, disabled }: TPHSelectOptions) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            {...field}
            style={{ width: "100%" }}
            options={options}
            disabled={disabled}
          />

          {error && <small style={{ color: "red" }}>{error?.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default PHSelect;
