import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import {
  bloodGroupOptions,
  genderOptions,
} from "../../../constant/semester.global";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import {
  useGetAcademicDepartmentQuery,
  useGetAllAcademicSemesterQuery,
} from "../../../redux/features/admin/academicManagement";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagementApi";
import { toast } from "sonner";
import { TAcademicDepartment } from "../../../types/academicManagement.type";

const defaultStudent = {
  name: {
    firstName: "Alice",
    middleName: "M",
    lastName: "Smith",
  },
  gender: "female",

  bloodGroup: "A+",
  email: "student11@gmail.com",
  contactNo: "9876543210",
  emergencyContactNo: "0123456789",
  presentAddress: "123 College Ave, University City",
  permanentAddress: "456 Home Street, Hometown",
  guardian: {
    fatherName: "Robert Smith",
    fatherContactNo: "0912345678",
    fatherOccupation: "Doctor",
    motherName: "Linda Smith",
    motherContactNo: "0765432109",
    motherOccupation: "Engineer",
  },
  localGuardian: {
    name: "Tom Brown",
    contactNo: "+0349282",
    occupation: "Professor",
    address: "789 University Road, University City",
  },
  admissionSemester: "66ac5d1c067499c2697c15f2",
  academicDepartment: "66ac5becae80408b7ce1bdc0",
};
/* export type TFaculty = {
  id,
  user,;
  name,
  designation,
  gender,
  dateOfBirth?,
  email,
  contactNo,
  emergencyContactNo,
  bloodGroup?,
  presentAddress,
  permanentAddress,
  profileImg?,
  academicDepartment,;
  academicFaculty,;
  isDeleted,
}; */
const CreateStudent = () => {
  const [addStudent, { error }] = useAddStudentMutation();

  console.log("error => ", error);

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
      password: "student123",
      student: data,
    };
    console.log("studentData : ", studentData);
    const fromData = new FormData();
    fromData.append("data", JSON.stringify(studentData));
    fromData.append("file", data.profileImg);
    console.log("fromData => ", Object.fromEntries(fromData));

    const toastId = toast.loading("Creating...");
    try {
      const res = await addStudent(fromData);
      console.log(res);
      toast.success("success", { id: toastId });
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };
  return (
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
              <PHSelect label="Gender" options={genderOptions} name="gender" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                label="BloodGroup"
                options={bloodGroupOptions}
                name="bloodGroup"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="profileImg"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Picture">
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    ></Input>
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHDatePicker label="Date of Birth" name="dateOfBirth" />
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
  );
};

export default CreateStudent;
