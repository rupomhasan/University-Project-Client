import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHSelect from "../../../components/form/PHSelect";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";

import { useState } from "react";
import PHInput from "../../../components/form/PHInput";

import moment from "moment";

import PHTimePicker from "../../../components/form/PHTimePicker";
import {
  useAddOfferedMutation,
  useGetAllCoursesQuery,
  useGetAllSemesterRegistrationQuery,
  useGetCoursesFacultiesQuery,
} from "../../../redux/features/admin/courseManagementApi";
import {
  useGetAcademicDepartmentQuery,
  useGetAcademicFacultyQuery,
} from "../../../redux/features/admin/academicManagement";

import { TResponse } from "../../../types";
import { toast } from "sonner";
import { weekDaysOptions } from "../../../constant/course.global";

const OfferCourse = () => {
  const [courseId, setCourseId] = useState("");

  const [addOfferedCourse] = useAddOfferedMutation();

  const { data: semesterRegistrationData } = useGetAllSemesterRegistrationQuery(
    [
      { name: "sort", value: "year" },
      { name: "status", value: "UPCOMING" },
    ]
  );

  const { data: academicFacultyData } = useGetAcademicFacultyQuery(undefined);

  const { data: academicDepartmentData } =
    useGetAcademicDepartmentQuery(courseId);

  const { data: coursesData } = useGetAllCoursesQuery([]);

  const { data: courseFaculties, isFetching: fetchingFaculties } =
    useGetCoursesFacultiesQuery(courseId, { skip: !courseId });

  const semesterRegistrationOptions = semesterRegistrationData?.data?.map(
    (item) => ({
      value: item._id,
      label: `${item.academicSemester.name} ${item.academicSemester.year}`,
    })
  );

  const academicFacultyOptions = academicFacultyData?.data?.map(
    ({ _id, name }: { _id: string; name: string }) => ({
      value: _id,
      label: name,
    })
  );

  const academicDepartmentOptions = academicDepartmentData?.data?.map(
    ({ _id, name }: { _id: string; name: string }) => ({
      value: _id,
      label: name,
    })
  );

  const courseOptions = coursesData?.data?.map(
    ({ _id, title }: { _id: string; title: string }) => ({
      value: _id,
      label: title,
    })
  );

  const facultiesOptions = courseFaculties?.data?.faculties?.map(
    ({ _id, fullName }: { _id: string; fullName: string }) => ({
      value: _id,
      label: fullName,
    })
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const offeredCourseData = {
      ...data,
      maxCapacity: Number(data.maxCapacity),
      section: Number(data.section),
      startTime: moment(new Date(data.startTime)).format("HH:mm"),
      endTime: moment(new Date(data.endTime)).format("HH:mm"),
    };

    const toastId = toast.loading("Crating....");

    try {
      const res = (await addOfferedCourse(offeredCourseData)) as TResponse<any>;

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
    <Flex justify="center" align="center">
      <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
        <PHForm onSubmit={onSubmit}>
          <PHSelect
            name="semesterRegistration"
            label="Semester Registrations"
            options={semesterRegistrationOptions}
          />
          <PHSelect
            name="academicFaculty"
            label="Academic Faculty"
            options={academicFacultyOptions}
          />
          <PHSelect
            name="academicDepartment"
            label="Academic Department"
            options={academicDepartmentOptions}
          />
          <PHSelectWithWatch
            onValueChange={setCourseId}
            options={courseOptions}
            name="course"
            label="Course"
          />
          <PHSelect
            disabled={!courseId || fetchingFaculties}
            name="faculty"
            label="Faculty"
            options={facultiesOptions}
          />

          <PHInput type="text" name="section" label="Section" />
          <PHInput type="text" name="maxCapacity" label="Max Capacity" />
          <PHSelect
            mode="multiple"
            options={weekDaysOptions}
            name="days"
            label="Days"
          />
          <PHTimePicker name="startTime" label="Start Time" />
          <PHTimePicker name="endTime" label="End Time" />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
