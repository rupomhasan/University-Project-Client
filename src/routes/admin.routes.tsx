import AdminDashboard from "../pages/Admin/AdminDashboard";
import CreateAdmin from "../pages/Admin/CreateAdmin";
import CreateFaculty from "../pages/Admin/CreateFaculty";
import CreateStudent from "../pages/Admin/CreateStudent";
import AcademicSemester from "../pages/Admin/semesterManagement/AcademicSemester";
import CreateAcademicSemester from "../pages/Admin/semesterManagement/CreateAcademicSemester";
import AcademicFaculty from "../pages/Admin/semesterManagement/AcademicFaculty";
import CreateAcademicFaculty from "../pages/Admin/semesterManagement/CreateAcademicFaculty";
import CreateAcademicDepartment from "../pages/Admin/semesterManagement/CreateAcademicDepartment";
import AcademicDepartment from "../pages/Admin/semesterManagement/AcademicDepartment";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Academic Management",
    children: [
      {
        name: "Create A.Semester",
        path: "create-academic-semester",
        element: <CreateAcademicSemester />,
      },
      {
        name: "Academic Semester",
        path: "academic-semester",
        element: <AcademicSemester />,
      },
      {
        name: "Create A.Faculty",
        path: "create-academic-semester",
        element: <CreateAcademicFaculty />,
      },
      {
        name: "Academic Faculty",
        path: "academic-Faculty",
        element: <AcademicFaculty />,
      },
      {
        name: "Crate Academic Department",
        path: "create-academic-department",
        element: <CreateAcademicDepartment />,
      },
      {
        name: "Academic Department",
        path: "academic-department",
        element: <AcademicDepartment />,
      },
    ],
  },
  {
    name: "UserManagement",
    path: "UserManagement",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateFaculty />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateStudent />,
      },
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateAdmin />,
      },
    ],
  },
];

// export const adminSidebarItems = adminPaths.reduce(
//   (acc: TAdminSideBarItem[], item) => {
//     if (item.path && item.element) {
//       acc.push({
//         key: item.name,
//         label: <NavLink to={`/admin/${item.path}`}>{item.name}</NavLink>,
//       });
//     }
//     if (item.children) {
//       acc.push({
//         key: item.name,
//         label: item.name,
//         children: item.children.map((child) => ({
//           key: child.name,
//           label: <NavLink to={`/admin/${child.path}`}>{child.name}</NavLink>,
//         })),
//       });
//     }
//     return acc;
//   },
//   []
// );

// export const adminRoutes = adminPaths.reduce((acc: TRoute[], item) => {
//   if (item.path && item.element) {
//     acc.push({
//       path: item.path,
//       element: item.element,
//     });
//   }
//   if (item.children) {
//     item.children.forEach((child) => {
//       acc.push({
//         path: child.path,
//         element: child.element,
//       });
//     });
//   }
//   return acc;
// }, []);
