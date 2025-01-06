import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { semesterOptions } from "../../../constant/semester";
import { monthOptions } from "../../../constant/semester.global";
import { zodResolver } from "@hookform/resolvers/zod";
import { semesterValidationSchema } from "../../../academicManagementSchema/academicManagement.Schema";
import { toast } from "sonner";
import { TResponse } from "../../../types/global.types";
import { TAcademicSemester } from "../../../types/academicManagement.type";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement";

const currentYear = new Date().getFullYear();

const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  label: String(currentYear + number),
  value: String(currentYear + number),
}));

const CreateAcademicSemester = () => {
  const [addSemester] = useAddAcademicSemesterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Crating....");
    const name = semesterOptions[Number(data.name) - 1]?.label;
    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };
    try {
      const res = (await addSemester(
        semesterData
      )) as TResponse<TAcademicSemester>;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Semester is created successfully", { id: toastId });
      }

      console.log(res);
    } catch (error: any) {
      toast.error(error, { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center" style={{ height: "80vh" }}>
      <Col span={7}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(semesterValidationSchema)}
        >
          <PHSelect label="Name" name="name" options={semesterOptions} />{" "}
          <PHSelect label="Year" name="year" options={yearOptions} />
          <PHSelect
            label="StartMonth"
            name="startMonth"
            options={monthOptions}
          />
          <PHSelect label="EndMonth" name="endMonth" options={monthOptions} />
          <Button htmlType="submit">Conform</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
