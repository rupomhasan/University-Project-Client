/*  import AdminDashboard from "../pages/Admin/AdminDashboard";
import CreateAdmin from "../pages/Admin/CreateAdmin";
import CreateFaculty from "../pages/Admin/CreateFaculty";
import CreateStudent from "../pages/Admin/CreateStudent"; */

export const adminPaths = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    element: "",
  },
  {
    name: "UserManagement",
    path: "UserManagement",
    children: [
      {
        name: "Create Admin",
        path: "/admin/create-admin",
        element: "",
      },
      {
        name: "Create Faculty",
        path: "/admin/create-faculty",
        element: "",
      },
      {
        name: "Create Student",
        path: "/admin/create-student",
        element: "",
      },
    ],
  },
];

export const adminRoutes = adminPaths.reduce((acc, item) => {
  if (item.path && item.element) {
    acc.push({
      path: item.path,
      element: item.element,
    });
  }
  if (item.children) {
    item.children.forEach((child) => {
      acc.push({
        name: child.name,
        path: child.path,
      });
    });
  }
  return acc;
}, []);

console.log(adminRoutes);

/* const myArray = [1, 2, 3, 4];

const newArray = myArray.reduce((acc, item) => {
  acc.push(acc + item);

  return acc;
}, []);

console.log(newArray);
 */
