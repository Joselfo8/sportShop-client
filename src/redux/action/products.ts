import axios from "axios";
const API_URL = "https://vlixes-server.herokuapp.com";


export const allProducts =
  (
    category: string,
    subCategory: string,
    page: number,
    order?: string,
    title?: any
  ) =>
  async (dispatch: any) => {
    try {
      const response = title

        ? await axios.get(
            `${API_URL}/products?pag=${
              page ? page : 1
            }&limit=${3}&title=${title}&${order ? order : "order="}`
          )
        : await axios.get(
            `${API_URL}/products?pag=${page ? page : 1}&limit=${3}&${
              order ? order : "order="
            }&category=${category}&subCategory=${subCategory}`
          );
      return dispatch({
        type: "ALL_PRODUCTS",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
