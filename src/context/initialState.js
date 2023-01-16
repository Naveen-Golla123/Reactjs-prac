import fetchUserData from "../utils/fetchLocalStorage";

export const initialState = {
    user : fetchUserData(),
    menuCategoryTab  : null
}


