import { Button, Col, Divider, Flex, Form, Input, Row, Spin } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import PHInput from "../../../components/form/PHInput";
import PHForm from "../../../components/form/PHForm";
import {
  bloodGroupOptions,
  genderOptions,
} from "../../../constant/semester.global";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { useGetAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagement";
import { TAcademicDepartment } from "../../../types/academicManagement.type";
import { useParams } from "react-router-dom";
import {
  useGetSingleFacultyQuery,
  useUpdateFacultyMutation,
} from "../../../redux/features/admin/userManagementApi";
import { toast } from "sonner";

const UpdateFaculty = () => {
  const { facultyId } = useParams();

  const { data: faculty, isLoading } = useGetSingleFacultyQuery(facultyId);
  console.log("faculty => ", faculty);
  const { data: allDepartment, isLoading: DIsLoading } =
    useGetAcademicDepartmentQuery(undefined);
  const [UpdateFaculty] = useUpdateFacultyMutation(faculty?.data?._id);
  const departmentOptions = allDepartment?.data?.map(
    (item: TAcademicDepartment) => ({
      value: item._id,
      label: item.name,
    })
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const facultyData = {
      faculty: {
        user: data?.user,
        designation: data?.designation,
        name: data?.name,
        gender: data?.gender,
        email: data?.email,
        contactNo: data?.contactNo,
        emergencyContactNo: data?.emergencyContactNo,
        bloodGroup: data?.bloodGroup,
        presentAddress: data?.presentAddress,
        permanentAddress: data?.permanentAddress,
        guardian: data?.guardian,
        localGuardian: data?.localGuardian,
        academicDepartment:
          data?.academicDepartment?._id ||
          faculty?.data?.academicDepartment?._id,
      },
    };
    console.log("facultyData : ", facultyData);
    const toastId = toast.loading("Creating...");
    try {
      const res = await UpdateFaculty({ facultyData, id: data?.id });
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
            <PHForm onSubmit={onSubmit} defaultValues={faculty.data}>
              <Divider>Personal Info</Divider>

              <Row gutter={10}>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput
                    label="First Name"
                    type="text"
                    name="name.firstName"
                  />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput
                    label="Middle Name"
                    type="text"
                    name="name.middleName"
                  />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput label="Last Name" type="text" name="name.lastName" />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput label="Designation" type="text" name="designation" />
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

              <Row gutter={10}>
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

export default UpdateFaculty;
