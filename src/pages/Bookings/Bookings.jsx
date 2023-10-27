import { useContext, useEffect } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useState } from "react";
import BookingRow from "./BookingRow";


const Bookings = () => {

    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);

    const url = `http://localhost:5000/bookings?email=${user?.email}`

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setBookings(data))


    }, [])


    const handleDelete = id => {
        const proceed = confirm('Are you sure you want to delete');
        if(proceed){
            fetch(`http://localhost:5000/bookings/${id}`,{
                method: 'DELETE'
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                if(data.deletedCount>0){
                    alert("Delete Successfully");
                    const remaining = bookings.filter(booking => booking._id !== id);

                    setBookings(remaining);
                }
            })
        }
    }

    return (
        <div>
            <h2> Your Email : {user?.email} </h2>

            <h2> Your Total Booking : {bookings.length} </h2>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
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
                            bookings.map(booking => <BookingRow

                                key={booking._id}
                                booking={booking}
                                handleDelete={handleDelete }

                            ></BookingRow>)

                        }
                    </tbody>


                </table>



            </div>

        </div>
    );
};

export default Bookings;