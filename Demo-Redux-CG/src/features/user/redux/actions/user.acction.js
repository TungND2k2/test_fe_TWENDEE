import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "../../../../utils/api";
const enumSort={
    sortUserNameAZ:1,
    sortUserNameZA:2,
    sortFullNameAZ:3,
    sortFullNameZA:4,
}
export const getUsers = createAsyncThunk(
    "users/getUsers",
    async (data) => {
        const res = await customAxios.get("api/?page=" + data[0] + "&results=" + data[1]);
        switch (data[2]) {
            case enumSort.sortUserNameAZ:
                return {
                    results:res.data.results.sort((a,b) => a.login.username.localeCompare(b.login.username)),
                    info: res.data.info
                }
                break;
            case enumSort.sortUserNameZA:
                return {
                    results: res.data.results.sort((a, b) => b.login.username.localeCompare(a.login.username)),
                    info: res.data.info
                }
                break;
            case enumSort.sortFullNameAZ:
                return {
                    results: res.data.results.sort((a, b) => {
                        if (a.name.first !== b.name.first) {
                            return a.name.first.localeCompare(b.name.first)
                        }
                        return a.name.last.localeCompare(b.name.last)
                    }),
                    info: res.data.info
                }
                break;
            case enumSort.sortFullNameZA:
                return {
                    results: res.data.results.sort((a, b) => {
                        if (a.name.first !== b.name.first) {
                            return b.name.first.localeCompare(a.name.first)
                        }
                        return b.name.last.localeCompare(a.name.last)
                    }),
                    info: res.data.info
                }
                break;
            default:
                return res.data
        }
    }
);