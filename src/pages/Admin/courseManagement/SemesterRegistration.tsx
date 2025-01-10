import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";


import { toast } from "sonner";
import { TResponse } from "../../../types/global.types";

import { useGetAllAcademicSemesterQuery } from "../../../redux/features/admin/academicManagement";
import { courseStatusOptions } from "../../../constant/course.global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHInput from "../../../components/form/PHInput";
import { useAddSemesterRegistrationMutation } from "../../../redux/features/admin/courseManagementApi";
const SemesterRegistration = () => {
  const [addSemesterRegistration] = useAddSemesterRegistrationMutation();

  const { data: academicSemester } = useGetAllAcademicSemesterQuery([
    { name: "sort", value: "year" },
  ]);

  console.log(academicSemester);

  const academicSemesterOptions = academicSemester?.data?.map(
    ({ _id, name, year }) => ({
      value: _id,
      label: `${name} ${year}`,
    })
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Crating....");
    console.log(data);
    const semesterRegistrationData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };

    try {
      const res = (await addSemesterRegistration(
        semesterRegistrationData
      )) as TResponse<any>;

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
      <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
        <PHForm
          onSubmit={onSubmit}
          // resolver={zodResolver(semesterValidationSchema)}
        >
          <PHSelect
            label="Academic Semester"
            name="academicSemester"
            options={academicSemesterOptions}
          />{" "}
          <PHSelect
            label="Status"
            name="status"
            options={courseStatusOptions}
          />
          <PHDatePicker name="startDate" label="Start Date" />
          <PHDatePicker name="endDate" label="End Date" />
          <PHInput type="text" name="minCredit" label="Min Credit" />
          <PHInput type="text" name="maxCredit" label="Max Credit" />
          <Button htmlType="submit">Conform</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
