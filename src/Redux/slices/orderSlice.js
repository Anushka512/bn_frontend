import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axios/axios";
import { setLoading } from "./appConfigSlice";

//Get all Orders:
export const getOrders = createAsyncThunk(
    "api/v1/admin/orders",
    async (_, thunkAPI) => {
        try{
            thunkAPI.dispatch(setLoading(true));
            const response = await axiosClient.get("/api/v1/admin/orders");
            console.log(response);
            return response.data;
        }
        catch(e){
            return Promise.reject(e);
        }
        finally{
            thunkAPI.dispatch(setLoading(false));
        }
    }
);

//Delete order:
export const deleteOrder = createAsyncThunk(
    "api/v1/order/delete",
    async (body, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            console.log(body);
            const response = await axiosClient.delete(`api/v1/admin/order/${body.id}`);
            console.log("This is deleted", response);
            return response.data;
        }
        catch(e){
            return Promise.reject(e);
        }
        finally{
            thunkAPI.dispatch(setLoading(false));
        }
    }
);


export const validateCoupon = createAsyncThunk(
    `/api/v1/util/coupons/:code`,
    async (body, thunkAPI) => {
      try {
        thunkAPI.dispatch(setLoading(true));
        console.log("This is bOdy", body);
        const response = await axiosClient.get(`/api/v1/util/coupons/${body}`);
        return response.data;
      } catch (error) {
        return Promise.reject(error.message);
      } finally {
        thunkAPI.dispatch(setLoading(false));
      }
    }
  );

  export const couponCode = createAsyncThunk(
    `/api/v1/util/coupons`,
    async (body, thunkAPI) => {
      try {
        thunkAPI.dispatch(setLoading(true));
        console.log("This is bOdy", body);
        const response = await axiosClient.get(`/api/v1/util/coupons/${body}`);
        return response.data;
      } catch (error) {
        return Promise.reject(error.message);
      } finally {
        thunkAPI.dispatch(setLoading(false));
      }
    }
  );

  export const createCoupon = createAsyncThunk(
    `/api/v1/util/coupons/create`,
    async (body, thunkAPI) => {
      try {
        thunkAPI.dispatch(setLoading(true));
        console.log("This is bOdy", body);
        const response = await axiosClient.get(`/api/v1/util/coupons/${body}`);
        return response.data;
      } catch (error) {
        return Promise.reject(error.message);
      } finally {
        thunkAPI.dispatch(setLoading(false));
      }
    }
  );

//Setting Slice:
const orderSlice = createSlice({
    name:"order",
    initialState: {
        orders:[],
        error: "",
        success: false,
        order:{},
        totoalAmount:0,
    },
    reducer: {
        setStatusResponse: (state) => {
            state.success = false;
            state.error = "";
        },
    },
    extraReducer: (builder) => {
        builder
          .addCase(getOrders.fulfilled, (state, action) => {
            if (action.payload.statusCode == 200){
                console.log(action.payload.result, "aman")
                state.orders = action.payload.result.orders; 
            }
            else {
                state.error = action.payload.message;
            }
        })
        .addCase(deleteOrder.fulfilled, (state, action) => {
            if(action.payload?.statusCode == 200){
                state.success = true;
            }
            else {
                state.error = action.payload.message;
            }
        })
    }
});

const orderReducer = orderSlice.reducer;
export const { setStatusResponse } = orderSlice.actions;
export default orderReducer;