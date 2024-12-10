import { createAsyncThunk, createSlice, isRejected } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialState = {
    isLoading: false,
    isRejected: false,
    data: null,
    deleteReport: null,
    allReport: null,
};

const api_url = process.env.APP_API_URL;


export const addreport = createAsyncThunk('user/addreport', async (data, thunkAPI) => {
    try {
        const token = localStorage.getItem('access_token') ?? "";

        const response = await axios.post(`${api_url}/user/addreport`, data, {
            headers: {
                Authorization: 'Bearer' + token
            }
        });
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
})



export const getreport = createAsyncThunk('user/getreport', async (_, thunkAPI) => {
    try {
        const token = localStorage.getItem('access_token') ?? "";

        const response = await axios.get(`${api_url}/user/getreport`, {
            headers: {
                Authorization: 'Bearer' + token
            }
        });
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
})

export const getallreport = createAsyncThunk('user/getallreport', async (_, thunkAPI) => {
    try {
        const token = localStorage.getItem('access_token') ?? "";

        const response = await axios.get(`${api_url}/user/getallreport`, {
            headers: {
                Authorization: 'Bearer' + token
            }
        });
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
})

export const deletereport = createAsyncThunk('user/deletereport', async (id, thunkAPI) => {
    try {
        const token = localStorage.getItem('access_token') ?? "";

        const response = await axios.get(`${api_url}/user/deletereport/${id}`, {
            headers: {
                Authorization: 'Bearer' + token
            }
        });
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
})

export const viewreport = createAsyncThunk('user/getsinglereport', async (id, thunkAPI) => {
    try {
        const token = localStorage.getItem('access_token') ?? "";

        const response = await axios.get(`${api_url}/user/getsinglereport/${id}`, {
            headers: {
                Authorization: 'Bearer' + token
            }
        });
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
})



export const editreport = createAsyncThunk('user/editreport', async (submissionData, thunkAPI) => {
    try {
        const token = localStorage.getItem('access_token') ?? "";
        const response = await axios.post(`${api_url}/user/editsinglereport`, submissionData, {
            headers: {
                Authorization: 'Bearer' + token
            }
        });
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
})


const reportSlice  = createSlice({
    name: 'report',
    initialState,
    extraReducers: builder => {
        builder

        //Add Report Slice
        .addCase(addreport.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(addreport.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload
        })
        .addCase(addreport.rejected, (state) => {
            state.isLoading = false;
            state.data = null;
            state.isRejected = true;
        })

        //Get Report Slice
        .addCase(getreport.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getreport.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload
        })
        .addCase(getreport.rejected, (state) => {
            state.isLoading = false;
            state.data = null;
            state.isRejected = true;
        })

        //Get All Report Slice
        .addCase(getallreport.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getallreport.fulfilled, (state, action) => {
            state.isLoading = false;
            state.allReport = action.payload
        })
        .addCase(getallreport.rejected, (state) => {
            state.isLoading = false;
            state.data = null;
            state.isRejected = true;
        })

        //Delete Report Slice
        .addCase(deletereport.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deletereport.fulfilled, (state, action) => {
            state.isLoading = false;
            state.deleteReport = action.payload
        })
        .addCase(deletereport.rejected, (state) => {
            state.isLoading = false;
            state.deleteReport = null;
            state.isRejected = true;
        })

        //Single Report Slice
        .addCase(viewreport.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(viewreport.fulfilled, (state, action) => {
            state.isLoading = false;
            state.viewReport = action.payload
        })
        .addCase(viewreport.rejected, (state) => {
            state.isLoading = false;
            state.viewReport = null;
            state.isRejected = true;
        })

        //Edit Single Report Slice
        .addCase(editreport.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(editreport.fulfilled, (state, action) => {
            state.isLoading = false;
            state.editReport = action.payload
        })
        .addCase(editreport.rejected, (state) => {
            state.isLoading = false;
            state.editReport = null;
            state.isRejected = true;
        })
    }
})

export default reportSlice.reducer;