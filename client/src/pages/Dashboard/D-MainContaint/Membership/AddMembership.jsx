import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "../../../../components/Loading";
import { addMembership } from '../../../../api/membershipApi/membershipApi';

function AddMembership() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const membershipData = {
        membershipType: data.membershipType,
        duration: Number(data.duration),
        price: Number(data.price),
        benefits: {
          BookIssueLimit: Number(data.bookIssueLimit),
          BookIssueTime: Number(data.bookIssueTime),
          FinePerDay: Number(data.finePerDay)
        }
      };
      console.log(membershipData);
      const response = await addMembership(membershipData);
      toast.success("Membership added successfully!");
      navigate("/dashboard/membership");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add membership");
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
          <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Add New Membership</h1>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Membership Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Membership Type
                </label>
                <input
                  type="text"
                  {...register("membershipType", { required: "Membership type is required" })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.membershipType && (
                  <p className="mt-1 text-sm text-red-600">{errors.membershipType.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Duration */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Duration (months)
                  </label>
                  <input
                    type="number"
                    {...register("duration", { 
                      required: "Duration is required",
                      min: { value: 0, message: "Minimum duration is 1 month" }
                    })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.duration && (
                    <p className="mt-1 text-sm text-red-600">{errors.duration.message}</p>
                  )}
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    {...register("price", { 
                      required: "Price is required",
                      min: { value: 0, message: "Price cannot be negative" }
                    })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                  )}
                </div>
              </div>

              {/* Benefits Section */}
              <div className="border-t pt-4">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Benefits</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Book Issue Limit
                    </label>
                    <input
                      type="number"
                      {...register("bookIssueLimit", { 
                        required: "Issue limit is required",
                        min: { value: 1, message: "Minimum limit is 1" }
                      })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.bookIssueLimit && (
                      <p className="mt-1 text-sm text-red-600">{errors.bookIssueLimit.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Issue Duration (days)
                    </label>
                    <input
                      type="number"
                      {...register("bookIssueTime", { 
                        required: "Issue duration is required",
                        min: { value: 1, message: "Minimum duration is 1 day" }
                      })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.bookIssueTime && (
                      <p className="mt-1 text-sm text-red-600">{errors.bookIssueTime.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Fine Per Day (₹)
                    </label>
                    <input
                      type="number"
                      {...register("finePerDay", { 
                        required: "Fine amount is required",
                        min: { value: 0, message: "Fine cannot be negative" }
                      })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.finePerDay && (
                      <p className="mt-1 text-sm text-red-600">{errors.finePerDay.message}</p>
                    )}
                  </div>
                </div>
              </div>

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
                  Add Membership
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AddMembership;