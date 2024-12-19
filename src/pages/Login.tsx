import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { addUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { Button, Row } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
export type TFormInput = {
  id: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Logging In ");

    try {
      const res = await login(data).unwrap();

      const user = verifyToken(res.data.accessToken) as TUser;

      dispatch(addUser({ user, token: res.data.accessToken }));

      navigate(`/${user.role}/dashboard`);

      toast.success("Logged In", { id: toastId, duration: 2000 });
    } catch (error) {
      toast.error("Something went wrong ...", { id: toastId, duration: 2000 });
    }
    console.log("user => ", data);
  };
  const defaultValues = { id: "A-0001", password: "admin123" };
  return (
    <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
        
        <PHInput type="text" name="id" label="UserId : " />
        <PHInput type="text" name="password" label="Password : " />
        <Button
          style={{
            width: "100%",
            background: " green",
            color: "white",
            fontFamily: "monospace",
            fontWeight: "bold",
            fontSize: "15px",
          }}
          htmlType="submit"
        >
          Login
        </Button>
      </PHForm>
    </Row>
  );
};

export default Login;
