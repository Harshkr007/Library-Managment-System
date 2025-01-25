import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";
import { loginUser } from "../../api/userApi/userApi";
import { useDispatch } from "react-redux";
import { setUser, setAccessToken } from "../../redux/UserSlice/userSlice";

function UserLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setLoading(true);
      const response = await loginUser(data);
      if (response.data) {
        toast.success(response?.data?.message);
        console.log(response.data);
        console.log(response.data);
        dispatch(setUser(response.data.data.user));
        dispatch(setAccessToken(response.data.data.accessToken));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="min-h-full flex items-center justify-center py-8">
          {" "}
          {/* Changed from h-full to min-h-full and added py-8 */}
          <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-md mx-4">
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Login
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Email..."
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Password..."
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Login
              </button>
            </form>
            <div className="flex justify-between text-sm text-gray-500">
              <p className="text-center">
                New User?{" "}
                <Link
                  to="/register"
                  className="text-blue-700 hover:text-blue-800"
                >
                  Register
                </Link>
              </p>
              <p className="text-center">
                Are you admin?{" "}
                <Link
                  to="/loginAdmin"
                  className="text-blue-700 hover:text-blue-800"
                >
                  Admin Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserLogin;
