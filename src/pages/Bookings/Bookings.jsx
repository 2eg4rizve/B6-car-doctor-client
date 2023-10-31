import { useContext, useEffect } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useState } from "react";
import BookingRow from "./BookingRow";
// import axios from "axios";
import useAxiosSecure from "../../hook/useAxiosSecure";


const Bookings = () => {

    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const axiosSecure = useAxiosSecure();
    const [isLoading,setIsLoading]= useState(true);

    const url = `/bookings?email=${user?.email}`

    // const url = `http://localhost:5000/bookings?email=${user?.email}`


    useEffect(() => {

        axiosSecure.get(url)
        .then(res => {
            setBookings(res.data)
            setIsLoading(false);
        })

        // axios.get(url,{withCredentials: true})
        // .then(res=>{
        //     setBookings(res.data)
        // })

        // fetch(url,{credentials: 'include'})
        //     .then(res => res.json())
        //     .then(data => setBookings(data))
    }, [axiosSecure, url])


    const handleDelete = id => {
        const proceed = confirm('Are you sure you want to delete');
        if (proceed) {
            fetch(`http://localhost:5000/bookings/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        alert("Delete Successfully");
                        const remaining = bookings.filter(booking => booking._id !== id);

                        setBookings(remaining);
                    }
                })
        }
    }

    const handleBookingConfirm = id => {
        console.log("confirm click")
        fetch(`http://localhost:5000/bookings/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: 'confirm' })

        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    //update stat
                    const remaining = bookings.filter(booking => booking._id !== id);
                    const updated = bookings.find(booking => booking._id !== id);
                    updated.status = 'Confirm';

                    const newBooking = [updated, ...remaining];

                    setBookings(newBooking);

                }
            })
    }

    if(isLoading){
        return <span className="loading loading-spinner loading-lg"></span>
    }

    return (
        <div>
            <h2> Your Email : {user?.email} </h2>

            <h2> Your Total Booking : {bookings?.length} </h2>:



            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                DELETE
                            </th>
                            <th>image</th>
                            <th>email</th>
                            <th>service</th>
                            <th>date</th>
                            <th>price</th>
                            <th>status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings?.map(booking => <BookingRow

                                key={booking._id}
                                booking={booking}
                                handleDelete={handleDelete}
                                handleBookingConfirm={handleBookingConfirm}

                            ></BookingRow>)

                        }
                    </tbody>


                </table>



            </div>

        </div>
    );
};

export default Bookings;