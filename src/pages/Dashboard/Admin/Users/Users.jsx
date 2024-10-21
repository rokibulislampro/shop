import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import LoadingSpinner from '../../../Shared/LoadingSpinner/LoadingSpinner';
import { FaArrowDown, FaArrowUp, FaEdit, FaSearch } from 'react-icons/fa';
import './Users.css';
import { AiOutlineDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false); // To control popup
  const [selectedUser, setSelectedUser] = useState(null); // To store selected user for role update
  const [newRole, setNewRole] = useState(''); // To store new role
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosSecure.get('/user');
        const users = response.data;

        setUsers(users); // Set users directly from the response
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [axiosSecure]);

  const handleDelete = async userId => {
    try {
      await axiosSecure.delete(`/user/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
      toast.success('User deleted successfully!', { autoClose: 3000 });
    } catch (error) {
      toast.error('Failed to delete the user.', { autoClose: 3000 });
      console.error('Error deleting user:', error);
    }
  };

  const handleRoleUpdate = async () => {
    try {
      const response = await axiosSecure.put(`/user`, {
        email: selectedUser.email,
        role: newRole,
      });

      if (response.data.message === 'Profile updated successfully') {
        toast.success('User role updated successfully!');
        setUsers(prev =>
          prev.map(user =>
            user.email === selectedUser.email
              ? { ...user, role: newRole }
              : user
          )
        );
      } else {
        toast.error('Failed to update role.');
      }
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error('Error updating role.');
    } finally {
      setIsPopupOpen(false);
    }
  };

  const openRolePopup = user => {
    setSelectedUser(user);
    setNewRole(user.role || 'user');
    setIsPopupOpen(true);
  };

  const filteredUsers = users.filter(user => {
    const userName = user.name ? user.name.toLowerCase() : ''; // Ensure user.name is defined
    const userIdString = user.userId ? user.userId.toString() : ''; // Ensure userId is defined
    const userRole = user.role ? user.role.toLowerCase() : ''; // Ensure user.role is defined

    return (
      userName.includes(searchTerm.toLowerCase()) || // Match by name
      userIdString.includes(searchTerm) || // Match by userId
      userRole.includes(searchTerm.toLowerCase()) // Match by role
    );
  });

  function getRoleColor(role) {
    switch (role) {
      case 'admin':
        return 'blue';
      case 'moderator':
        return 'navy';
      case 'user':
        return 'red';
      default:
        return 'red';
    }
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="container mx-auto px-[0.5rem] py-6 text-sm">
      {/* Search bar */}
      <div className="relative mb-4">
        <div className="absolute left-3 top-3 text-gray-400">
          <FaSearch />
        </div>
        <input
          type="text"
          placeholder="Search users by name, role or userId"
          className="border p-2 pl-10 pr-10 rounded-full w-full border-slate-300"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <div className="absolute right-3 top-3 flex items-center text-sm text-gray-400">
          <FaArrowUp className="mr-1" />
          <FaArrowDown />
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="table-auto w-full text-left whitespace-no-wrap">
          <thead className="bg-slate-100 shadow-sm">
            <tr>
              <th className="px-3 py-2">User Id</th>
              <th className="px-3 py-2">Photo</th>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Phone</th>
              <th className="px-3 py-2">Joined</th>
              <th className="px-3 py-2">Location</th>
              <th className="px-3 py-2">Role</th>
              <th className="px-3 py-2">Update</th>
              <th className="px-3 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index}>
                <td className="px-3 py-3 flex items-center">
                  {index + 1}.{' '}
                  <span className="font-semibold">#{user.userId}</span>
                </td>
                <td className="p-3">
                  <img
                    src={user.photo}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.phone}</td>
                <td className="p-3">{user.joined}</td>
                <td className="p-3">
                  {user.city}, {user.country}
                </td>
                <td className="p-3" style={{ color: getRoleColor(user.role) }}>
                  {user.role || 'user'}
                </td>
                <td className="px-4 py-2 text-start">
                  <button
                    className="bg-slate-100 hover:bg-[#1e1d29] hover:text-white transition-all shadow-md p-3.5 rounded-full flex items-center justify-center"
                    onClick={() => openRolePopup(user)}
                  >
                    <FaEdit />
                  </button>
                </td>
                <td className="px-3 py-3 flex justify-end">
                  <button
                    className="bg-[#ff5a00] hover:bg-orange-600 transition-all text-white font-bold shadow-md p-3.5 rounded-full flex items-center justify-center"
                    onClick={() => handleDelete(user._id)}
                  >
                    <AiOutlineDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Role update popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-md w-80">
            <h2 className="text-lg font-serif font-bold mb-4">Update Role</h2>
            <select
              value={newRole}
              onChange={e => setNewRole(e.target.value)}
              className="w-full p-2 border rounded-full"
            >
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
              <option value="user">User</option>
              <option value="blocked">Blocked</option>
            </select>
            <div className="flex justify-end mt-4 gap-2">
              <button
                className="px-7 py-2 bg-[#1e1f29] rounded-full text-white"
                onClick={() => setIsPopupOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-[#ff5a00] text-white rounded-full hover:bg-orange-600"
                onClick={handleRoleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Users;
