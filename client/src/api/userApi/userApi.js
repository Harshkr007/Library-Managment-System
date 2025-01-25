import instance from "../axiosInstance";

const registerUser = async (data) => {
  try {
    return await instance.post("/user/register", data);
  } catch (error) {
    console.log(error)
    throw error;
  }
};

const loginUser = async (data) => {
  try {
    return await instance.post("/user/login", data);
  } catch (error) {
    console.log(error)
    throw error;
  }
}

const loginAdmin = async (data) => {
  try {
    return await instance.post("/user/admin/login",data); 
  } catch (error) {
    throw error;
  }
}

const getAllUsers = async () => {
  try {
    return await instance.get("/user/getAllUser");
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const getUserbyInfo = async (searchQuery) => {
  try {
    return await instance.get(`/user/getUser?search=${searchQuery}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const updateUser = async (date) => {
  try {
    await instance.put("/user/update",date);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export {
  registerUser,
  loginUser,
  loginAdmin,
  getAllUsers,
  getUserbyInfo,
  updateUser,

}