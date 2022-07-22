const initialState: any = {
    products : [],
    users : [],
    searchUser : [],
    orders: [],
    order: {},
};

function admin(state = initialState, action : any){
    switch(action.type){
        case "ALL_PRODUCTS":
            return{
                ...state,
                products : action.payload
            };
        case "GET_PRODUCT_BY_NAME":
            return {
                ...state,
                products: action.payload,
            };
        case "GET_ALL_USERS":
            return {
                ...state,
                users : action.payload.users,
            };
        case "GET_USER_BY_NAME":
            const filterUser: any = state.users.filter((user: any) =>
                user.name.toLowerCase().includes(action.payload.toLowerCase())
            );
            return {
                ...state,
                searchUser: filterUser,
            };
        case "GET_ORDERS":
            return {
                ...state,
                orders : action.payload,
            };
        case "GET_ORDERS_BY_ID":
            return {
                ...state,
                order : action.payload,
            };
        default:
            return state;
    };
};

export default admin;