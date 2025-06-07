import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PostUser } from '../apidata/API';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        company: '',
        error: {
            name: '',
            username: '',
            email: '',
            company: '',
        }
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const notify = () => {
            toast.success('data is created Successfully', {
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
        const { name, username, email, company } = formData;
        const errors: any = {};
        let hasTrue = true;

        if (name === '') {
            errors.name = 'Name is required';
            hasTrue = false;
        } else if (name.length < 2) {
            errors.name = 'Name must be at least 3 characters';
            hasTrue = false;
        }
        if (username === '') {
            errors.username = 'Username is required';
            hasTrue = false;
        } else if (username.length < 2) {
            errors.username = 'Username must be at least 3 characters';
            hasTrue = false;
        }
        if (email === '') {
            errors.email = 'Email is required';
            hasTrue = false;
        } else if (!email.includes('@')) {
            errors.email = 'Email must be at @ characters';
            hasTrue = false;
        }
        if (company === '') {
            errors.company = 'Company is required';
            hasTrue = false;
        } else if (company.length < 2) {
            errors.company = 'Company must be at least 3 characters';
            hasTrue = false;
        }

        if (hasTrue) {
            try {
                const{name,username,email,company} = formData;
                await PostUser(name,username,email,company);
                setFormData({
                    name: '',
                    username: '',
                    email: '',
                    company: '',
                    error: {
                        name: '',
                        username: '',
                        email: '',
                        company: '',
                    }
                });
                notify();
                navigate('/alluser');
            } catch (error: any) {
                errorNotify();
                console.log(error.message, 'error');
            }
        }
        else {
            setFormData((prevData) => ({
                ...prevData,
                error: errors,
            }));
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center text-primary mb-4">Register Here</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input
                            type="text"
                            className="form-control rounded-pill"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                        />
                        {formData.error.name && <p className='text-danger mb-0'>{formData.error.name}</p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control rounded-pill"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Choose a username"
                        />
                        {formData.error.username && <p className='text-danger mb-0'>{formData.error.username}</p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control rounded-pill"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />
                        {formData.error.email && <p className='text-danger mb-0'>{formData.error.email}</p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="company" className="form-label">Company</label>
                        <input
                            type="text"
                            className="form-control rounded-pill"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Enter your company name"
                        />
                        {formData.error.company && <p className='text-danger'>{formData.error.company}</p>}
                    </div>

                    <button type="submit" className="btn btn-primary w-100 rounded-pill py-2 text-uppercase">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default CreateUser;
