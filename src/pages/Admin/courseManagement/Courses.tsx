import { Table } from "antd";
import type { TableColumnsType} from "antd";

import { TCourse} from "../../../types";

import { useGetAllCoursesQuery } from "../../../redux/features/admin/courseManagementApi";
import AddFacultyModal from "./AddFacultyModal";

type TTableData = Pick<TCourse, "_id" | "title" | "code" | "credits">;

const Courses = () => {
  const { data: courses, isFetching } = useGetAllCoursesQuery(undefined);

  const data = courses?.data?.map(
    ({ _id, code, title, credits }: TTableData) => ({
      key: _id,
      code,
      title,
      credits,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Credits",
      key: "credits",
      dataIndex: "credits",
    },

    {
      title: "Action",
      key: "x",

      render: (item) => {
        return <AddFacultyModal courseId={item.key} />;
      },
      width: "100px",
    },
  ];

  return (
    <div>
      <Table
        loading={isFetching}
        columns={columns}
        pagination={false}
        dataSource={data}
      />
    </div>
  );
};

export default Courses;
