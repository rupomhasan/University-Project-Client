import { Menu } from "antd";
import { sideBarItemGenerator } from "../../utils/sideBarItemGenerator";
import Sider from "antd/es/layout/Sider";
import { adminPaths } from "../../routes/admin.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";

const userRole = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};

const Sidebar = () => {
  const user = useAppSelector(useCurrentUser);
  let sideBarItems;

  switch (user!.role) {
    case userRole.ADMIN:
      sideBarItems = sideBarItemGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.FACULTY:
      sideBarItems = sideBarItemGenerator(facultyPaths, userRole.FACULTY);
      break;
    case userRole.STUDENT:
      sideBarItems = sideBarItemGenerator(studentPaths, userRole.STUDENT);
      break;
  }

  return (
    <Sider
      breakpoint="xl"
      collapsedWidth="0"
      style={{ height: "100vh", position: "sticky", top: "0px", left: "0px" }}
    >
      <div
        style={{
          color: "white",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h3>PH University</h3>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sideBarItems}
      />
    </Sider>
  );
};

export default Sidebar;
