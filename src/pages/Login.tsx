import { Button, Row } from "antd";
// import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { addUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
export type TFormInput = {
  id: string;
  password: string;
};
const Login = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  /*   const { register, handleSubmit } = useForm<TFormInput>(,
  });
 */
  const onSubmit = async (data: TFormInput) => {
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
  return (
    <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit}>
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
