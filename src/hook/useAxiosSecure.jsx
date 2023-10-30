import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
})

const useAxiosSecure = () => {

    const { logOut } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.interceptors.response.use(res => {
            return res;
        },
            error => {
                console.log("error tracked in the interceptor : ", error.response)
                if (error.response.status === 401 || error.response.status === 403) {

                    console.log("Log out The user")

                    logOut()
                        .then(() => {
                            console.log("Log out The userrrr123")
                            navigate('/login')

                        })
                        .catch(error => console.log(error))



                }

            }

        )


    }, [])

    return axiosSecure;

};

export default useAxiosSecure;