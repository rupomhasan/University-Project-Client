import { FieldValues, SubmitHandler } from "react-hook-form";

import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button, Col, Flex } from "antd";
import { academicFacultyValidationSchema } from "../../../academicManagementSchema/academicManagement.Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement";
import { toast } from "sonner";
import { TResponse } from "../../../types";
import { TAcademicFaculty } from "../../../types/academicManagement.type";

const CreateAcademicFaculty = () => {
  const [addFaculty] = useAddAcademicFacultyMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    const academicFaculty = {
      name: data.name,
    };

    try {
      const res = (await addFaculty(
        academicFaculty
      )) as TResponse<TAcademicFaculty>;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Semester is created successfully", { id: toastId });
      }
    } catch (error: any) {
      toast.error(error, { id: toastId });
    }
  };

  return (
    <Flex justify="center">
      <Col span={10}>
        <PHForm
          resolver={zodResolver(academicFacultyValidationSchema)}
          onSubmit={onSubmit}
        >
          <PHInput label="Name" type="text" name="name"></PHInput>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
