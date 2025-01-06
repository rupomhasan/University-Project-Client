import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import {
  useAddAcademicDepartmentMutation,
  useGetAcademicFacultyQuery,
} from "../../../redux/features/admin/academicManagement";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicDepartmentValidationSchema } from "../../../academicManagementSchema/academicManagement.Schema";
import { toast } from "sonner";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { TResponse } from "../../../types";
import { TAcademicDepartment } from "../../../types/academicManagement.type";

const CreateAcademicDepartment = () => {
  const { data: academicFaculty } = useGetAcademicFacultyQuery(undefined);

  const [addDepartment] = useAddAcademicDepartmentMutation();

  const facultyData = academicFaculty?.data?.map(
    ({ _id, name }: { _id: string; name: string }) => ({
      label: name,
      value: _id,
    })
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    const academicDepartData = {
      name: data.name,
      academicFaculty: data.academicFaculty,
    };

    try {
      const res = (await addDepartment(
        academicDepartData
      )) as TResponse<TAcademicDepartment>;

      if (res.error) {
        toast.error(res.error.data?.message, { id: toastId });
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
          onSubmit={onSubmit}
          resolver={zodResolver(academicDepartmentValidationSchema)}
        >
          <PHInput
            label="Academic Department"
            name="name"
            type="text"
          ></PHInput>
          <PHSelect
            label="Academic Faculty"
            name="academicFaculty"
            options={facultyData}
          ></PHSelect>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;
