import { Button, Pagination, Space, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";

import { useState } from "react";
import { TQueryPrams } from "../../../types";
import { TStudent } from "../../../types/userManagement.type";

import { Link } from "react-router-dom";
import { useGetAllFacultyQuery } from "../../../redux/features/admin/userManagementApi";

type TTableData = Pick<
  TStudent,
  "_id" | "name" | "academicDepartment" | "admissionSemester" | "id" 
>;
const Faculty = () => {
  const [page, setPage] = useState(1);
  const [params, setParams] = useState<TQueryPrams[]>([]);
  const { data: allStudents, isFetching } = useGetAllFacultyQuery([
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);
  console.log("all Students => ", allStudents);

  const data = allStudents?.data?.map(
    ({ _id, name, academicDepartment, id }) => ({
      key: _id,
      roll: id,
      name: `${name.firstName} ${name?.middleName} ${name?.lastName}`,
      department: academicDepartment.name,
    })
  );

  const metaData = allStudents?.meta;

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Roll",
      key: "roll",
      dataIndex: "roll",
    },
    {
      title: "Department",
      key: "department",
      dataIndex: "department",
    },

    {
      title: "Action",
      key: "x",
      render: (item) => {
        console.log(item.roll);
        return (
          <Space>
            <Link to={`/admin/update-faculty/${item.roll}`}>
              <Button>Update</Button>
            </Link>
            <Button>Details</Button>
          </Space>
        );
      },
      width: "10",
    },
  ];
  const onChange: TableProps<TTableData>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryPrams: TQueryPrams[] = [];
      filters.name?.forEach((item) =>
        queryPrams.push({ name: "name", value: item })
      );
      filters.year?.forEach((item) =>
        queryPrams.push({ name: "year", value: item })
      );
      setParams(queryPrams);
    }
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div>
      <Table
        onChange={onChange}
        loading={isFetching}
        columns={columns}
        pagination={false}
        dataSource={data}
      />
      <Pagination
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </div>
  );
};

export default Faculty;
