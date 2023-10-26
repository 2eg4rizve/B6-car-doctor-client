import { useLoaderData } from "react-router-dom";


const CheckOut = () => {

    const service = useLoaderData();

    const { title, _id } = service;

    return (
        <div>
            <h2 className="text-center text-3xl"> {title}</h2>

            <div>

                <form className="card-body">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" className="input input-bordered" required />

                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" className="input input-bordered" required />

                        </div>
                    </div>

                    <div className="form-control mt-6">
                        <button >Login</button>
                        <input type="submit" value="order Confirm" className="btn btn-primary btn-block" />
                    </div>

                </form>

            </div>
        </div>

    );
};

export default CheckOut;