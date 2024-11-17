import { useEffect, useState } from "react";
import { GetUser, DeleteUser } from "../apidata/API";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
const AllUser = () => {
    const notify = () => {
        toast.success('data is deleted Successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
        });
    };
    const errorNotify = () => {
        toast.error('something is wrong', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
        });
    }
    const [formData, setFormData] = useState([]);

    const getAllUser = async () => {
        const res = await GetUser();
        console.log(res?.data);
        setFormData(res?.data);
    };

    const DeleteOneUser = async (id: number) => {
        try {
            await DeleteUser(id);
            getAllUser();
            notify();
        } catch (error: any) {
            console.log(error.message, 'error');
            errorNotify();
        }
    }

    useEffect(() => {
        getAllUser();
    }, []);

    type User = {
        id: number;
        name: string;
        username: string;
        email: string;
        company: string;
    }

    return (
        <div className="container">
            <h3 className="text-center mt-3 text-success mb-4">All User Data Present</h3>
            {formData.length > 0 ? (
                <table className="table text-center table-bordered table-hover text-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>UserName</th>
                            <th>Email</th>
                            <th>Company</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formData.map((item: User) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.company}</td>
                                <td className="d-flex justify-content-center align-items-center gap-2">
                                    <button type="submit" className="btn btn-danger border-none" onClick={() => DeleteOneUser(item.id)}>Delete</button>
                                    <button type="submit" className="btn btn-success border-none w-25">
                                        <Link to={`/edituser/${item.id}`} className="text-decoration-none text-white">Edit</Link>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="text-center">
                    <h3 className="text-danger">Data is not found</h3>
                </div>
            )}
        </div>
    )
}

export default AllUser;
