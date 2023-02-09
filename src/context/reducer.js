export const actionType = {
    SET_USER: "SET_USER",
    INCREMENT_CART_COUNT: "INCREMENT_CART_COUNT",
    CHANGE_VISIBILITY: "CHANGE_VISIBILITY",
    SET_VISIBILIYMAP: "SET_VISIBILIYMAP"
}

const reducer = (state, action) => {

    switch (action.type) {
        case actionType.SET_USER:
            return {
                ...state,
                user: action.user,
            }
        case actionType.SET_CATEGORIES:
            return {
                ...state,
                categories: action.categories
            }
        case actionType.INCREMENT_CART_COUNT:
            return {
                ...state,
                cartItemCount: action.cartItemCount
            }
        case actionType.CHANGE_VISIBILITY:
            var visibilityMap = state.visibilityMap;
            Object.entries(visibilityMap).map(([key, value]) => {
                visibilityMap[key] = (key == action.id)
            })
            return {
                ...state,
                visibilityMap : visibilityMap
            }
        case actionType.SET_VISIBILIYMAP:
            return {
                ...state,
                visibilityMap: action.visibilityMap
            }
        default:
            return state
    }
};

export default reducer;