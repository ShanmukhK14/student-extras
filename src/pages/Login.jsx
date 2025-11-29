import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required")
});

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    login(data.email);
    navigate("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <div>
          <label>Email</label>
          <input
            {...register("email")}
            className="w-full p-2 border rounded mt-1"
          />
          <p className="text-red-600 text-sm">{errors.email?.message}</p>
        </div>

        <button className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
}
