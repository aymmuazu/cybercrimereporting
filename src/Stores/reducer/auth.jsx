import { createAsyncThunk, createSlice, isRejected } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialState = {
    authdata: null,
    isLoading: false,
    isRejected: false,
    user: null
};

const api_url = process.env.APP_API_URL;

export const register = createAsyncThunk('auth/register', async (userData, thinkAPI) => {
    try {
        const response = await axios.post(`${api_url}/auth/register`, userData);
        return response.data;
    } catch (err) {
        return thinkAPI.rejectWithValue(err.response.data);
    }

})

export const login = createAsyncThunk('auth/login', async (userData, thinkAPI) => {
    try {
        const response = await axios.post(`${api_url}/auth/login`, userData);
        return response.data;
    } catch (error) {
        return thinkAPI.rejectWithValue(err);
    }
})

export const getCurrentUser = createAsyncThunk('auth/getCurrentUser', async (_, thunkAPI) => {
    try {
        const token = localStorage.getItem('access_token') ?? "";
        const response = await axios.get(`${api_url}/auth/me`, {
            headers: {
                Authorization: 'Bearer' + token
            }
        });
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
})



export const logout = createAsyncThunk('auth/logout', async () => {
    localStorage.removeItem('access_token');
});

const authSlice  = createSlice({
    name: 'auth',
    initialState,
    extraReducers: builder => {
        builder
        //Registration
        .addCase(register.pending, (state) => {
            state.isLoading = true
        })
        .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false
            state.authdata = action.payload
        })
        .addCase(register.rejected, (state) => {
            state.isLoading = false
        })

        //Login
        .addCase(login.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.authdata = action.payload;
        })
        .addCase(login.rejected, (state) => {
            state.isLoading = false
        })

        //getCurrentUser
        .addCase(getCurrentUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getCurrentUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload
        })
        .addCase(getCurrentUser.rejected, (state) => {
            state.isLoading = false;
            state.user = null;
            state.isRejected = true;
        })

        //Logout
        .addCase(logout.pending, (state) => {
            state.isLoading = false,
            state.user = null,
            state.authdata = null
        })
        .addCase(logout.fulfilled, (state) => {
            state.isLoading = false,
            state.user = null,
            state.authdata = null
        })
        .addCase(logout.rejected, (state) => {
            state.isLoading = false,
            state.user = null,
            state.authdata = null
            state.isRejected = true;
        })
    }
})

export default authSlice.reducer;