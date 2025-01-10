import { Button, Modal } from "antd";
import { useState } from "react";
import PHForm from "../../../components/form/PHForm";
import { useGetAllFacultyQuery } from "../../../redux/features/admin/userManagementApi";
import PHSelect from "../../../components/form/PHSelect";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useAddFacultiesInCourseMutation } from "../../../redux/features/admin/courseManagementApi";
import { TCourse, TResponse } from "../../../types";

const AddFacultyModal = ({ courseId }: { courseId: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addFaculties] = useAddFacultiesInCourseMutation();
  const { data: faculties } = useGetAllFacultyQuery(undefined);

  const facultyOptions = faculties?.data?.map(({ _id, fullName }) => ({
    value: _id,
    label: fullName,
  }));

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating...");

    try {
      const res = (await addFaculties({
        faculties: data.faculties,
        courseId,
      })) as TResponse<TCourse>;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data?.message, { id: toastId });
      } else {
        toast.success("Semester is created successfully", { id: toastId });
      }
    } catch (error: any) {
      toast.error(error, { id: toastId });
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button onClick={showModal}>Add Faculty</Button>
      <Modal
        footer={[null]}
        title="Chose Faculties"
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <PHForm onSubmit={handleSubmit}>
          <PHSelect
            mode="multiple"
            options={facultyOptions}
            label="Faculty"
            name="faculties"
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Modal>
    </>
  );
};

export default AddFacultyModal;
