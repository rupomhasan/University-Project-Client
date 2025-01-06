import { Button, Pagination, Space, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";

import { useState } from "react";
import { TQueryPrams } from "../../../types";
import { TStudent } from "../../../types/userManagement.type";
import {
  useGetAllAdminQuery,
  useGetAllStudentQuery,
} from "../../../redux/features/admin/userManagementApi";
import { Link } from "react-router-dom";

type TTableData = Pick<
  TStudent,
  "_id" | "name" | "academicDepartment" | "admissionSemester" | "id"
>;
const Admin = () => {
  const [page, setPage] = useState(1);
  const [params, setParams] = useState<TQueryPrams[]>([]);
  const { data: allAdmin, isFetching } = useGetAllAdminQuery([
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);

  const data = allAdmin?.data?.map(({ _id, name, id, email }) => ({
    key: _id,
    id,
    name: `${name.firstName || ""} ${name?.middleName || ""} ${
      name?.lastName || ""
    }`,
    email,
  }));

  const metaData = allAdmin?.meta;

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "ID",
      key: "id",
      dataIndex: "id",
    },

    {
      title: "Action",
      key: "x",
      render: (item) => {
        console.log(item.roll);
        return (
          <div style={{ maxWidth: "100%" }}>
            <Space>
              <Link to={`/admin/update-student/${item.roll}`}>
                <Button>Update</Button>
              </Link>
              <Button>Details</Button>
            </Space>
          </div>
        );
      },
      width: "100px",
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

export default Admin;
