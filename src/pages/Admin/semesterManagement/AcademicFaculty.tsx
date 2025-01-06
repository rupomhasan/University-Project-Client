import React from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useGetAcademicFacultyQuery } from "../../../redux/features/admin/academicManagement";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const AcademicFaculty = () => {
  const { data: faculty, isFetching } = useGetAcademicFacultyQuery(undefined);

  const facultyData = faculty?.data?.map(({ _id, name }  : {_id : string , name : string}) => ({
    key: _id,
    name,
  }));
  console.log(faculty);
  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <Table<DataType>
      loading={isFetching}
      columns={columns}
      dataSource={facultyData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default AcademicFaculty;
