import { ReactNode } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { TFormInput } from "../../pages/Login";

type TFormProps = {
  onSubmit: SubmitHandler<TFormInput>;
  children: ReactNode;
};
const PHForm = ({ children, onSubmit }: TFormProps) => {
  const methods = useForm({
    defaultValues: { id: "A-0001", password: "admin123" },
  });
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default PHForm;
