import Axios from "axios";
import { baseURL } from "../api";

interface IProps {
  method?: "POST" | "GET" | "PUT" | "UPDATE" | "DELETE";
  url: string;
  file?: boolean;
  data?: any;
}

export default function <T>({ method, url, data, file }: IProps) {
  return new Promise<T>((resolve, reject) => {
    try {
      Axios({
        baseURL,
        url,
        data,
        method: method ? method : "POST",
        headers: {
          contentType: file ? "multipart/form-data" : "application/json",
        },
      })
        .then((response) => resolve(response.data))
        .catch((error) =>
          reject(error?.response?.data || error?.message || error)
        );
    } catch (error) {
      reject(error);
    }
  });
}
