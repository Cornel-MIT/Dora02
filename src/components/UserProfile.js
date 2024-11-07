import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../store/userActions';

const UserProfile = () => {
  const { profile, purchaseHistory } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedProfile = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      address: formData.get('address')
    };
    dispatch(updateProfile(updatedProfile));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        <form onSubmit={handleProfileUpdate}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                defaultValue={profile.firstName}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                defaultValue={profile.lastName}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                defaultValue={profile.email}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                defaultValue={profile.phone}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Address</label>
              <textarea
                name="address"
                defaultValue={profile.address}
                className="w-full p-2 border rounded"
                rows="3"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </form>
      </div>

      {/* Purchase History */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Purchase History</h2>
        {purchaseHistory.length > 0 ? (
          <div className="space-y-4">
            {purchaseHistory.map((purchase) => (
              <div
                key={purchase.id}
                className="border-b pb-4 last:border-b-0 last:pb-0"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Order #{purchase.id}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(purchase.date).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="font-medium">${purchase.total.toFixed(2)}</p>
                </div>
                <div className="mt-2">
                  {purchase.items.map((item) => (
                    <div key={item.id} className="text-sm text-gray-600">
                      {item.quantity}x {item.name} - ${item.price.toFixed(2)}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No purchase history available</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;