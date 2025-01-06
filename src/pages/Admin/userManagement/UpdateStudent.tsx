import { Button, Col, Divider, Flex, Form, Input, Row, Spin } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import {
  bloodGroupOptions,
  genderOptions,
} from "../../../constant/semester.global";
import { FieldValues, SubmitHandler } from "react-hook-form";
import {
  useGetAcademicDepartmentQuery,
  useGetAllAcademicSemesterQuery,

} from "../../../redux/features/admin/academicManagement";

import { toast } from "sonner";
import { TAcademicDepartment } from "../../../types/academicManagement.type";
import { useParams } from "react-router-dom";
import {
  useGetSingleStudentQuery,
  useUpdateStudentMutation,
} from "../../../redux/features/admin/userManagementApi";

const UpdateStudent = () => {
  const { studentId } = useParams();

  const { data: student, isLoading } = useGetSingleStudentQuery(studentId);

  const { dateOfBirth, ...defaultStudent } = student?.data || {};

  const [updateStudent] = useUpdateStudentMutation(defaultStudent.id);
  const { data: allSemester, isLoading: sIsLoading } =
    useGetAllAcademicSemesterQuery(undefined);

  const { data: allDepartment, isLoading: DIsLoading } =
    useGetAcademicDepartmentQuery(undefined);

  const semesterOptions = allSemester?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));
  const departmentOptions = allDepartment?.data?.map(
    (item: TAcademicDepartment) => ({
      value: item._id,
      label: item.name,
    })
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const studentData = {
      student: {
        user: data.user,
        name: data.name,
        gender: data.gender,
        email: data.email,
        contactNo: data.contactNo,
        emergencyContactNo: data.emergencyContactNo,
        bloodGroup: data.bloodGroup,
        presentAddress: data.presentAddress,
        permanentAddress: data.permanentAddress,
        guardian: data.guardian,
        localGuardian: data.localGuardian,
        admissionSemester:
          data.admissionSemester?._id || student.data.admissionSemester,
        academicDepartment:
          data.academicDepartment?._id || student.data.academicDepartment,
      },
    };
    console.log("studentData : ", studentData);
    const toastId = toast.loading("Creating...");
    try {
      const res = await updateStudent({ studentData, id: data?.id });
      console.log("res : ", res);
      toast.success("success", { id: toastId });
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };
  return (
    <div>
      {isLoading ? (
        <Flex align="center" justify="center" style={{ height: "50vh" }}>
          <Spin size="large" />
        </Flex>
      ) : (
        <Row>
          <Col span={24}>
            <PHForm onSubmit={onSubmit} defaultValues={defaultStudent}>
              <Divider>Personal Info</Divider>

              <Row gutter={10}>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput label="Name" type="text" name="name.firstName" />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput label="Name" type="text" name="name.middleName" />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput label="Name" type="text" name="name.lastName" />
                </Col>

                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHSelect
                    label="Gender"
                    options={genderOptions}
                    name="gender"
                  />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHSelect
                    label="BloodGroup"
                    options={bloodGroupOptions}
                    name="bloodGroup"
                  />
                </Col>
              </Row>

              <Divider>Contact Info</Divider>

              <Row gutter={10}>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput label="Email" type="text" name="email" />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput label="Contact No" type="text" name="contactNo" />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput
                    label="EmergencyContactNo"
                    type="text"
                    name="emergencyContactNo"
                  />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput
                    label="Present Address"
                    type="text"
                    name="presentAddress"
                  />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput
                    label="PermanentAddress"
                    type="text"
                    name="permanentAddress"
                  />
                </Col>
              </Row>

              <Divider>Guardian</Divider>

              <Row gutter={10}>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput
                    label="FatherName"
                    type="text"
                    name="guardian.fatherName"
                  />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput
                    label="Father Contact No"
                    type="text"
                    name="guardian.fatherContactNo"
                  />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput
                    label="FatherOccupation"
                    type="text"
                    name="guardian.fatherOccupation"
                  />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput
                    label="Mother Name"
                    type="text"
                    name="guardian.motherName"
                  />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput
                    label="Mother Contact No"
                    type="text"
                    name="guardian.motherContactNo"
                  />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput
                    label="Mother Occupation"
                    type="text"
                    name="guardian.motherOccupation"
                  />
                </Col>
              </Row>
              <Divider>Local Guardian</Divider>

              <Row gutter={10}>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput label="Name" type="text" name="localGuardian.name" />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput
                    label="Contact No"
                    type="text"
                    name="localGuardian.contactNo"
                  />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput
                    label="Occupation"
                    type="text"
                    name="localGuardian.occupation"
                  />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput
                    label="Address"
                    type="text"
                    name="localGuardian.address"
                  />
                </Col>
              </Row>
              <Row gutter={10}>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHSelect
                    label="AcademicSemester"
                    disabled={sIsLoading}
                    options={semesterOptions}
                    name="admissionSemester"
                  />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHSelect
                    disabled={DIsLoading}
                    label="Academic Department"
                    options={departmentOptions}
                    name="academicDepartment"
                  />
                </Col>
              </Row>
              <Button htmlType="submit">Submit</Button>
            </PHForm>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default UpdateStudent;
