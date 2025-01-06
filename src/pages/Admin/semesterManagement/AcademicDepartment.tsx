import { Table } from "antd";
import type { TableColumnsType } from "antd";
import { useGetAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagement";
import { TAcademicFaculty } from "../../../types/academicManagement.type";
interface DataType {
  _id: string;
  name: string;
  academicFaculty: TAcademicFaculty;
}

const AcademicDepartment = () => {
  const { data: academicDepartment, isFetching } =
    useGetAcademicDepartmentQuery(undefined);

  const data = academicDepartment?.data?.map(
    ({ _id, name, academicFaculty }: DataType) => ({
      key: _id,
      department: name,
      faculty: academicFaculty.name,
    })
  );

  const columns: TableColumnsType<DataType> = [
    {
      key: "key",
      title: "Department",
      dataIndex: "department",
    },

    {
      key: "key",
      title: "Academic Faculty",
      dataIndex: "faculty",
    },
  ];

  return (
    <Table<DataType> loading={isFetching} columns={columns} dataSource={data} />
  );
};

export default AcademicDepartment;
