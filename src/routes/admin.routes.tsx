import AdminDashboard from "../pages/Admin/AdminDashboard";
import CreateAdmin from "../pages/Admin/userManagement/CreateAdmin";
import CreateFaculty from "../pages/Admin/userManagement/CreateFaculty";
import CreateStudent from "../pages/Admin/userManagement/CreateStudent";
import AcademicSemester from "../pages/Admin/semesterManagement/AcademicSemester";
import CreateAcademicSemester from "../pages/Admin/semesterManagement/CreateAcademicSemester";

import CreateAcademicFaculty from "../pages/Admin/semesterManagement/CreateAcademicFaculty";
import CreateAcademicDepartment from "../pages/Admin/semesterManagement/CreateAcademicDepartment";
import AcademicDepartment from "../pages/Admin/semesterManagement/AcademicDepartment";
import AcademicFaculty from "../pages/Admin/semesterManagement/AcademicFaculty";
import Students from "../pages/Admin/userManagement/Students";
import UpdateStudent from "../pages/Admin/userManagement/UpdateStudent";
import Faculty from "../pages/Admin/userManagement/Faculty";
import UpdateFaculty from "../pages/Admin/userManagement/UpdateFaculty";
import Admin from "../pages/Admin/userManagement/Admin";
import SemesterRegistration from "../pages/Admin/courseManagement/SemesterRegistration";
import RegisteredSemester from "../pages/Admin/courseManagement/RegisteredSemester";
import Courses from "../pages/Admin/courseManagement/Courses";
import CreateCourse from "../pages/Admin/courseManagement/CreateCourse";
import OfferedCourses from "../pages/faculty/OfferedCourse";
import OfferCourse from "../pages/Admin/courseManagement/OfferCourses";

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
        path: "create-academic-faculty",
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
        name: "Admin",
        path: "admin",
        element: <Admin />,
      },
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
      {
        path: "update-student/:studentId",
        element: <UpdateStudent />,
      },
      {
        name: "Students",
        path: "students-data",
        element: <Students />,
      },
      {
        name: "Faculty",
        path: "faculty-data",
        element: <Faculty />,
      },
      {
        path: "update-faculty/:facultyId",
        element: <UpdateFaculty />,
      },
    ],
  },
  {
    name: "Course Management",
    children: [
      {
        name: "Semester Registration",
        path: "semester-registration",
        element: <SemesterRegistration />,
      },
      {
        name: "Registered Semester",
        path: "registered-semester",
        element: <RegisteredSemester />,
      },
      {
        name: "Courses",
        path: "courses",
        element: <Courses />,
      },
      {
        name: "Create Course",
        path: "create-course",
        element: <CreateCourse />,
      },
      {
        name: "Offer Courses",
        path: "offer-courses",
        element: <OfferCourse />,
      },
      {
        name: "Offered Course",
        path: "offered-course",
        element: <OfferedCourses />,
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
