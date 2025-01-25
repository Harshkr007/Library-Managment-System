import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Loading from '../../../../components/Loading';
import { issueBook } from '../../../../api/bookApi/bookApi';

function NewTransation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const user = useSelector(state => state.user.user);
  const bookDetails = location.state;
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {
    try {
        setLoading(true);
        const response = await issueBook({
            userId: user._id,
            serialNo: bookDetails.serialNo
        });
        toast.success("Book issued successfully!");
        navigate("/allBooks");
    } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to issue book");
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
            <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">New Transaction</h1>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Transaction Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Transaction Type
                </label>
                <input
                  type="text"
                  value="Book Issue"
                  disabled
                  className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Book Details Section */}
              <div className="border-t pt-4">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Book Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Book Name
                    </label>
                    <input
                      type="text"
                      value={bookDetails?.bookName || ''}
                      disabled
                      className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Author
                    </label>
                    <input
                      type="text"
                      value={bookDetails?.authorName || ''}
                      disabled
                      className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Serial Number
                  </label>
                  <input
                    type="text"
                    value={bookDetails?.serialNo || ''}
                    disabled
                    className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              {/* Issue Details */}
              <div className="border-t pt-4">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Issue Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Issue Date
                    </label>
                    <input
                      type="text"
                      value={new Date().toLocaleDateString()}
                      disabled
                      className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Amount
                    </label>
                    <input
                      type="text"
                      value="₹0"
                      disabled
                      className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md"
                    />
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
                  Confirm Issue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default NewTransation;