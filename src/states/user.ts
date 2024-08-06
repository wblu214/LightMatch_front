import {TeamType} from "@/models/user";

let currentUser: TeamType = null;

const setCurrentUserState = (user:TeamType) => {
    currentUser = user;
}
const getCurrentUserState = () => {
    return currentUser;
}

export {setCurrentUserState, getCurrentUserState}