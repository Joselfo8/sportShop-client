const initialState: any = {
    products : [],
    searchProduct : [],
    users : [],
    searchUser : [],
};

function admin(state = initialState, action : any){
    switch(action.type){
        case "ALL_PRODUCTS":
            return{
                ...state,
                products : action.payload
            };
        case "GET_PRODUCT_BY_NAME":
            console.log(state.products.products)
            const filterProduct: any = state.products.products.filter((product: any) =>
                product.title.toLowerCase().includes(action.payload.toLowerCase())
            );
            return {
                ...state,
                searchProduct: filterProduct,
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
        default:
            return state;
    }
}

export default admin;