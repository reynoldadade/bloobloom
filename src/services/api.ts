import axios, { AxiosInstance, AxiosRequestHeaders } from "axios";
import { Collections } from "../models/collections.model";
const instance: AxiosInstance = axios.create({
  baseURL:
    "https://staging-api.bloobloom.com/user/v1/sales_channels/website/collections",
});

// get the collections menu
export async function GET_Collections(): Promise<Collections[] | null> {
  try {
    const response = await instance.get("");
    return response.data;
  } catch (error) {
    return null;
  }
}
