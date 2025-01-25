import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "../../../../components/Loading";
import { addBook } from '../../../../api/bookApi/bookApi';

function AddBook() {
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
       console.log(data);
      const response = await addBook(data);
      console.log(response);
      toast.success(response.data.data.message || "Book added successfully!");
      navigate("/dashboard/viewBook");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add book");
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
            <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Add New Book</h1>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Book Title
                </label>
                <input
                  type="text"
                  {...register("title", { 
                    required: "Title is required",
                    minLength: {
                      value: 2,
                      message: "Title must be at least 2 characters"
                    }
                  })}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter book title"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Author Name
                </label>
                <input
                  type="text"
                  {...register("author", { required: "Author name is required" })}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter author name"
                />
                {errors.author && (
                  <p className="text-red-500 text-sm">{errors.author.message}</p>
                )}
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Genre
                </label>
                <input
                  type="text"
                  {...register("genre", { required: "Genre is required" })}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter genre"
                />
                {errors.genre && (
                  <p className="text-red-500 text-sm">{errors.genre.message}</p>
                )}
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Serial Number
                </label>
                <input
                  type="text"
                  {...register("serialNo", { required: "Serial number is required" })}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter serial number"
                />
                {errors.serialNo && (
                  <p className="text-red-500 text-sm">{errors.serialNo.message}</p>
                )}
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
                  Add Book
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AddBook;