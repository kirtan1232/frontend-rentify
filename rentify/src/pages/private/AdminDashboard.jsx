import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createProductApi, deleteProduct, getAllProducts } from '../../api/Api';
import '../private/AdminDashboard.css';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [userName, setUserName] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for controlling sidebar visibility
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.name) {
            setUserName(capitalizeFirstLetter(user.name));
        }
    }, []);

    const capitalizeFirstLetter = (str) => {
        return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
    };

    useEffect(() => {
        getAllProducts()
            .then((res) => setProducts(res.data.products))
            .catch((error) => console.error(error));
    }, []);

    // Form states
    const [roomImage, setRoomImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [roomDescription, setRoomDescription] = useState('');
    const [purpose, setPurpose] = useState('');
    const [floor, setFloor] = useState('');
    const [status, setStatus] = useState('');
    const [rentPrice, setRentPrice] = useState('');
    const [parking, setParking] = useState(false);
    const [sellContactNo, setSellContactNo] = useState('');
    const [bathroom, setBathroom] = useState('');
    const [postedOn, setPostedOn] = useState('');
    const [expiredOn, setExpiredOn] = useState('');

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setRoomImage(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            deleteProduct(id)
                .then((res) => {
                    toast.success(res.data.message);
                    setProducts((prev) => prev.filter((product) => product._id !== id));
                })
                .catch((error) => toast.error(error.response?.data?.message || 'Error deleting product.'));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('roomImage', roomImage);
        formData.append('roomDescription', capitalizeFirstLetter(roomDescription));
        formData.append('purpose', purpose);
        formData.append('floor', floor);
        formData.append('status', status);
        formData.append('rentPrice', rentPrice);
        formData.append('parking', parking);
        formData.append('sellContactNo', sellContactNo);
        formData.append('bathroom', bathroom);
        formData.append('postedOn', postedOn);
        formData.append('expiredOn', expiredOn);

        createProductApi(formData)
            .then((res) => {
                toast.success(res.data.message);
                setProducts((prev) => [...prev, res.data.product]);
            })
            .catch((error) => toast.error(error.response?.data?.message || 'Error creating product.'));
    };

    // Toggle Sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="container">
            {/* Sidebar */}
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <button className="btn btn-close" onClick={toggleSidebar}>X</button>
                <ul className="sidebar-menu">
                    <li><Link to="/admin">Admin</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/booking">Booking</Link></li>
                    <li><Link to="/">Home</Link></li>
                </ul>
            </div>

            {/* Button to toggle sidebar */}
            <button className="btn btn-primary" onClick={toggleSidebar}>☰</button>

            <div className="d-flex justify-content-between mt-5">
                <h2>Welcome to Rentify! Admin Dashboard, {userName}</h2>
                <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Add Product
                </button>
            </div>

            {/* Modal for Adding a Product */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Create a new product!</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                            <label>Room Image</label>
                <input type="file" className="form-control" onChange={handleImageUpload} />
                {previewImage && <img src={previewImage} alt="Preview" className="img-fluid rounded mt-2" />}

                <label className="mt-2">Room Description</label>
                <textarea
                    className="form-control"
                    value={roomDescription}
                    onChange={(e) => setRoomDescription(e.target.value)}
                ></textarea>

                <label className="mt-2">Purpose</label>
                <select className="form-control" value={purpose} onChange={(e) => setPurpose(e.target.value)}>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                </select>

                <label className="mt-2">Floor</label>
                <input
                    type="text"
                    className="form-control"
                    value={floor}
                    onChange={(e) => setFloor(e.target.value)}
                />

                <label className="mt-2">Status</label>
                <input
                    type="text"
                    className="form-control"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                />

                <label className="mt-2">Rent Price</label>
                <input
                    type="number"
                    className="form-control"
                    value={rentPrice}
                    onChange={(e) => setRentPrice(e.target.value)}
                />

                <label className="mt-2">Parking</label>
                <select className="form-control" value={parking} onChange={(e) => setParking(e.target.value === 'true')}>
                    <option value="true">Available</option>
                    <option value="false">Not Available</option>
                </select>

                <label className="mt-2">Contact Number</label>
                <input
                    type="text"
                    className="form-control"
                    value={sellContactNo}
                    onChange={(e) => setSellContactNo(e.target.value)}
                />

                <label className="mt-2">Bathroom Count</label>
                <input
                    type="number"
                    className="form-control"
                    value={bathroom}
                    onChange={(e) => setBathroom(e.target.value)}
                />

                <label className="mt-2">Posted On</label>
                <input
                    type="date"
                    className="form-control"
                    value={postedOn}
                    onChange={(e) => setPostedOn(e.target.value)}
                />

                <label className="mt-2">Expiration Date</label>
                <input
                    type="date"
                    className="form-control"
                    value={expiredOn}
                    onChange={(e) => setExpiredOn(e.target.value)}
                />

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleSubmit} type="button" className="btn btn-primary">Create</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Table */}
            <table className="table mt-3">
                <thead className="table-dark">
                    <tr>
                        <th>Room Image</th>
                        <th>Description</th>
                        <th>Purpose</th>
                        <th>Floor</th>
                        <th>Status</th>
                        <th>Rent Price</th>
                        <th>Parking</th>
                        <th>Contact</th>
                        <th>Bathroom</th>
                        <th>Posted On</th>
                        <th>Expires On</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.length > 0 ? (
                        products.map((product) => (
                            <tr key={product._id}>
                                <td>
                                    <img
                                        src={product.roomImage ? `http://localhost:5000/rooms/${product.roomImage}` : 'placeholder-image-url.jpg'}
                                        alt="Room"
                                        height="40"
                                    />
                                </td>
                                <td>{product.roomDescription}</td>
                                <td>{product.purpose}</td>
                                <td>{product.floor}</td>
                                <td>{product.status}</td>
                                <td>{product.rentPrice}</td>
                                <td>{product.parking ? 'Yes' : 'No'}</td>
                                <td>{product.sellContactNo}</td>
                                <td>{product.bathroom}</td>
                                <td>{product.postedOn}</td>
                                <td>{product.expiredOn}</td>
                                <td>

                                    <div className='btn-group' role='group'>
                                        <Link to={`/admin/update/${product._id}`} className='btn btn-success'>Edit</Link>
                                        <button onClick={() => handleDelete(product._id)} className="btn btn-danger">
                                            Delete
                                        </button>

                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="12">No products available.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;
