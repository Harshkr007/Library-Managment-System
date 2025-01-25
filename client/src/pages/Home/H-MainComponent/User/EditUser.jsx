import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import toast from "react-hot-toast";
import Loading from "../../../../components/Loading";
import { updateUser } from '../../../../api/userApi/userApi';

function EditUser() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const user = useSelector(state => state.user.user);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || ''
    }
  });

  const newPassword = watch("newPassword");

  const onSubmit = async (data) => {
    try {
      if (changePassword && data.newPassword !== data.confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }

      setLoading(true);
      const userData = {
        name: data.name,
        email: data.email,
        ...(changePassword && {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword
        })
      };
      
      const response = await updateUser(userData);
      toast.success("Profile updated successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="h-full flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Edit Profile</h1>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  {...register("name", { 
                    required: "Username is required",
                    minLength: {
                      value: 2,
                      message: "Username must be at least 2 characters"
                    }
                  })}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Password Change Toggle */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="changePassword"
                  onChange={(e) => setChangePassword(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="changePassword" className="text-sm font-medium text-gray-700">
                  Change Password
                </label>
              </div>

              {/* Password Fields */}
              {changePassword && (
                <div className="space-y-4 pt-4">
                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Current Password
                    </label>
                    <input
                      type="password"
                      {...register("oldPassword", { 
                        required: "Current password is required" 
                      })}
                      className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.oldPassword && (
                      <p className="text-red-500 text-sm">{errors.oldPassword.message}</p>
                    )}
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <input
                      type="password"
                      {...register("newPassword", {
                        required: "New password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters"
                        }
                      })}
                      className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.newPassword && (
                      <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
                    )}
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      {...register("confirmPassword", {
                        validate: value => !changePassword || value === newPassword || "Passwords do not match"
                      })}
                      className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default EditUser;