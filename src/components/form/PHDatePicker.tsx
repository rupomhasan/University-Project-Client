import { DatePicker, Form} from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  name: string;
  label?: string;
};

const PHDatePicker = ({ name, label }: TInputProps) => {
  return (
    <div style={{ marginBottom: "16px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <>
            <Form.Item label={label}>
              <DatePicker id={name} {...field} style={{ width: "100%" }} />
              {error && <div style={{ color: "red" }}>{error.message}</div>}
            </Form.Item>
          </>
        )}
      />
    </div>
  );
};

export default PHDatePicker;
