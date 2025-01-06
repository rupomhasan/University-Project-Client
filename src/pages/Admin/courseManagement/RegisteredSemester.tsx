import { Button, Dropdown, Table, Tag } from "antd";
import type { TableColumnsType } from "antd";

import {
  useGetAllSemesterRegistrationQuery,
  useUpdateSemesterRegistrationStatusMutation,
} from "../../../redux/features/admin/courseManagementApi";

import { TResponse, TSemesterRegistration } from "../../../types";
import moment from "moment";
import { useState } from "react";
import { toast } from "sonner";
import { FieldValues, SubmitHandler } from "react-hook-form";
type TTableData = Pick<
  TSemesterRegistration,
  "_id" | "startDate" | "endDate" | "status" | "academicSemester"
>;

const items = [
  {
    label: "Upcoming",
    key: "UPCOMING",
  },
  {
    label: "Ongoing",
    key: "ONGOING",
  },
  {
    label: "Ended",
    key: "ENDED",
  },
];
const RegisteredSemester = () => {
  const [semesterId, setSemesterId] = useState("");
  const [updateStatus] = useUpdateSemesterRegistrationStatusMutation();

  const { data: allSemester, isFetching } =
    useGetAllSemesterRegistrationQuery(undefined);

  const data = allSemester?.data?.map(
    ({ _id, academicSemester, status, startDate, endDate }) => ({
      key: _id,
      name: `${academicSemester?.name} ${academicSemester.year}`,
      status,
      startDate: moment(new Date(startDate)).format("MMMM"),
      endDate: moment(new Date(endDate)).format("MMMM"),
    })
  );

  const onClick: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("updateIng...");
    try {
      const res = (await updateStatus({
        data: { status: data?.key },
        semesterId,
      })) as TResponse<TSemesterRegistration>;

      if (res.error) {
        toast.error(res.error?.data?.message, { id: toastId });
      } else {
        toast.success("Semester is created successfully", { id: toastId });
      }

      console.log(res);
    } catch (error: any) {
      toast.error(error, { id: toastId });
    }
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (item) => {
        let color;
        if (item === "UPCOMING") {
          color = "blue";
        }

        if (item === "ONGOING") {
          color = "green";
        }
        if (item === "ENDED") {
          color = "red";
        }

        return <Tag color={color}>{item}</Tag>;
      },
    },
    {
      title: "Start Date",
      key: "startDate",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      key: "endDate",
      dataIndex: "endDate",
    },

    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Dropdown menu={{ items, onClick }} trigger={["click"]}>
            <Button onClick={() => setSemesterId(item.key)}>Update</Button>
          </Dropdown>
        );
      },
    },
  ];
  // const onChange: TableProps<TTableData>["onChange"] = (
  //   pagination,
  //   filters,
  //   sorter,
  //   extra
  // ) => {
  //   if (extra.action === "filter") {
  //     const queryPrams: TQueryPrams[] = [];
  //     filters.name?.forEach((item) =>
  //       queryPrams.push({ name: "name", value: item })
  //     );
  //     filters.year?.forEach((item) =>
  //       queryPrams.push({ name: "year", value: item })
  //     );
  //     setParams(queryPrams);
  //   }
  //   console.log("params", pagination, filters, sorter, extra);
  // };

  return (
    <div>
      <Table<TTableData>
        // onChange={onChange}
        loading={isFetching}
        columns={columns}
        dataSource={data}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </div>
  );
};

export default RegisteredSemester;
