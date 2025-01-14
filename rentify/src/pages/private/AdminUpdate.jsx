import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getSingleProduct, updateProduct } from '../../api/Api';
import '../private/AdminUpdate.css';

const AdminUpdate = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
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
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch product data by ID for editing
        getSingleProduct(id)
            .then((res) => {
                const productData = res.data.product;
                setProduct(productData);
                setRoomDescription(productData.roomDescription);
                setPurpose(productData.purpose);
                setFloor(productData.floor);
                setStatus(productData.status);
                setRentPrice(productData.rentPrice);
                setParking(productData.parking);
                setSellContactNo(productData.sellContactNo);
                setBathroom(productData.bathroom);
                setPostedOn(productData.postedOn);
                setExpiredOn(productData.expiredOn);
                setPreviewImage(`http://localhost:5000/rooms/${productData.roomImage}`);
            })
            .catch((error) => toast.error(error.response?.data?.message || 'Error fetching product data.'));
    }, [id]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setRoomImage(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('roomImage', roomImage);
        formData.append('roomDescription', roomDescription);
        formData.append('purpose', purpose);
        formData.append('floor', floor);
        formData.append('status', status);
        formData.append('rentPrice', rentPrice);
        formData.append('parking', parking);
        formData.append('sellContactNo', sellContactNo);
        formData.append('bathroom', bathroom);
        formData.append('postedOn', postedOn);
        formData.append('expiredOn', expiredOn);

        updateProduct(id, formData)
            .then((res) => {
                toast.success(res.data.message);
                navigate('/admin'); // Navigate back to admin dashboard
            })
            .catch((error) => toast.error(error.response?.data?.message || 'Error updating product.'));
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h2>Update Product</h2>
            <form onSubmit={handleSubmit}>
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

                <button type="submit" className="btn btn-primary mt-3">
                    Update Product
                </button>
            </form>
        </div>
    );
};

export default AdminUpdate;
