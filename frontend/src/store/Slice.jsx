import { createSlice} from "@reduxjs/toolkit"

const authSlice = createSlice({
    name:"auth",
    initialState:{
    loading:false,
    user:null
    },
    reducers:{
        setLoading:(state,action) =>{
            state.loading = action.payload;
        },
        setUser:(state,action) =>{
            state.user = action.payload;
        },
        logoutUser:(state,action )=>{
            state.user = null;
        }
    }
    
})
export const {setLoading,setUser,logoutUser} = authSlice.reducer;
export default authSlice.reducer;