import { createAsyncThunk, createSlice, isRejected } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialState = {
    isLoading: false,
    isRejected: false,
    userData: null
};

const api_url = process.env.APP_API_URL;


export const changepassword = createAsyncThunk('user/changepassword', async (data, thunkAPI) => {
    try {
        const token = localStorage.getItem('access_token') ?? "";

        const response = await axios.post(`${api_url}/user/changepassword`, data, {
            headers: {
                Authorization: 'Bearer' + token
            }
        });
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
})


const userSlice  = createSlice({
    name: 'user',
    initialState,
    extraReducers: builder => {
        builder

        //ChangePasword
        .addCase(changepassword.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(changepassword.fulfilled, (state, action) => {
            state.isLoading = false;
            state.userData = action.payload
        })
        .addCase(changepassword.rejected, (state) => {
            state.isLoading = false;
            state.userData = null;
            state.isRejected = true;
        })
    }
})

export default userSlice.reducer;