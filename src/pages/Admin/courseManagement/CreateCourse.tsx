import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";

import { toast } from "sonner";
import { TResponse } from "../../../types/global.types";


import PHInput from "../../../components/form/PHInput";
import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagementApi";
const CreateCourse = () => {
  const [addCourse] = useAddCourseMutation();

  const { data: allCourse } = useGetAllCoursesQuery(undefined);

  console.log(allCourse);

  const courseOptions = allCourse?.data?.map(
    ({ _id, title }: { _id: string; title: string }) => ({
      label: title,
      value: _id,
    })
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Crating....");
    console.log(data);
    const course = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      isDeleted: false,
      preRequisiteCourse: data.preRequisiteCourse
        ? data?.preRequisiteCourse?.map((item: string) => ({
            course: item,
            isDeleted: false,
          }))
        : [],
    };

    try {
      const res = (await addCourse(course)) as TResponse<any>;

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
          <PHInput type="text" name="title" label="Title" />
          <PHInput type="text" name="prefix" label="Prefix" />
          <PHInput type="text" name="code" label="Code" />
          <PHInput type="text" name="credits" label="Credits" />
          <PHSelect
            mode="multiple"
            label="PreRequisiteCourse"
            name="preRequisiteCourse"
            options={courseOptions}
          />
          <Button htmlType="submit">Conform</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
