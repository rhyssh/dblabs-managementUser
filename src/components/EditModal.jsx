/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const EditModal = ({ isOpen, onClose, onSave, userData }) => {
    const [formData, setFormData] = useState({
        name: userData?.name || '',
        email: userData?.email || '',
        age: userData?.age || '',
        membershipStatus: userData?.membershipStatus || 'active',
    });

    const [errors, setErrors] = useState({});

    // Handle form data change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Validation function
    const validateForm = () => {
        const newErrors = {};

        // Validate name
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        // Validate email
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is not valid';
        }

        // Validate age
        if (!formData.age) {
            newErrors.age = 'Age is required';
        } else if (isNaN(formData.age) || formData.age <= 0) {
            newErrors.age = 'Age must be a positive number';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return; // Only save if form is valid
        onSave(formData); // Send updated data back to parent
        onClose(); // Close modal
    };

    return (
        <div
            className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity ${isOpen ? 'block' : 'hidden'}`}
            onClick={onClose}
        >
            <div
                className="flex justify-center items-center min-h-screen"
                onClick={(e) => e.stopPropagation()} // Prevent modal closing when clicking inside modal
            >
                <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Edit User</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                            {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                            {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                            {errors.age && <p className="text-sm text-red-600">{errors.age}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="membershipStatus" className="block text-sm font-medium text-gray-700">Membership Status</label>
                            <select
                                id="membershipStatus"
                                name="membershipStatus"
                                value={formData.membershipStatus}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={onClose}
                                className="mr-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

EditModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    userData: PropTypes.object.isRequired,
};

export default EditModal;
