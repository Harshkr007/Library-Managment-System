import instance from "../axiosInstance";

const getBooks = async () => {
    try {
        return await instance.get("/book/getAllBooks");
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const addBook = async (data) => {
    try {
        return await instance.post("/book/addBook", data);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getBooksByInfo = async (searchQuery) => {
    try {
        return await instance.get(`/book/getBookInfo?search=${searchQuery}`);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateBook = async (serialNo,data) => {
    try {
        return await instance.put(`/book/updateBook/${serialNo}`,data);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getUserBooks = async () => {
    try {
        return await instance.get("/book/getUserBooks");
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const issueBook = async (data) => {
    try {
        return await instance.post(`/book/issueBook/${data.serialNo}`, {
            userId: data.userId
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}
 
export {
    getBooks,
    addBook,
    getBooksByInfo,
    updateBook,
    getUserBooks,
    issueBook
}