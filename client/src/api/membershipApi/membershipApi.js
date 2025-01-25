import instance from "../axiosInstance";

const getAllMembership = async () => {
    try {
        return await instance.get("/membership/getAllMemberships")
    } catch (error) {
        console.log(error);
        throw error
    }
}

const addMembership = async (membershipData) => {
    try {
        return await instance.post("/membership/addMembership", membershipData)
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Keep this API call
const getMembershipByType = async (membershipType) => {
    try {
        return await instance.get(`/membership/getMembership/${membershipType}`)
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const purchaseMembership = async (membershipType) => {
    try {
        return await instance.post(`/membership/addMember/${membershipType}`);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export {
    getAllMembership,
    addMembership,
    getMembershipByType,
    purchaseMembership
}