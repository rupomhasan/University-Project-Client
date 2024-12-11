import { useGetAllSemesterQuery } from "../../../redux/features/academicSemesterApi/academicSemesterApi";

const AcademicSemester = () => {
  const { data } = useGetAllSemesterQuery(undefined);
  console.log("data =>", data);

  return (
    <div>
      <h2>AcademicSemester</h2>
    </div>
  );
};
export default AcademicSemester;
