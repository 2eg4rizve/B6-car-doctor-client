import { useContext, useEffect } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useState } from "react";
import BookingRow from "./BookingRow";
import axios from "axios";


const Bookings = () => {

    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);

     const url = `http://localhost:5000/bookings?email=${user?.email}`


    useEffect(() => {


        axios.get(url,{withCredentials: true})
        .then(res=>{
            setBookings(res.data)
        })




        // fetch(url)
        //     .then(res => res.json())
        //     .then(data => setBookings(data))




    }, [url])


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
                    updated.status='Confirm';

                    const newBooking = [updated,...remaining];

                    setBookings(newBooking);

                }
            })
    }

    return (
        <div>
            <h2> Your Email : {user?.email} </h2>

            {
                bookings?.length>0 ? <h2> Your Total Booking : {bookings?.length} </h2>:
                <h2> Your Total Booking : 0 </h2>
            }

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