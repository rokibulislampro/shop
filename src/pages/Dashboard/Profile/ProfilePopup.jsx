import { useEffect, useState } from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { storage, auth } from '../../../firebase/firebase.config'; // Your Firebase config
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ProfilePopup = ({ user, onClose }) => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [imageFile, setImageFile] = useState(null); // State for image file
  const [uploading, setUploading] = useState(false); // Track upload status
  const axiosSecure = useAxiosSecure();
  const [activeTab, setActiveTab] = useState('contact');

  useEffect(() => {
    if (user?.email) {
      const fetchUserData = async () => {
        try {
          const response = await axiosSecure.get(`/user/email/${user.email}`);
          setUserData(response.data);
          setEditedData(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, [user, axiosSecure]);

  if (!userData) {
    return null;
  }

  const handleOutsideClick = event => {
    if (event.target.classList.contains('overlay')) {
      onClose();
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setEditedData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = e => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]); // Set image file to state
    }
  };

  const handleSave = async () => {
    const updatedData = { ...editedData };

    // Image upload logic (if needed)
    if (imageFile) {
      setUploading(true);
      const storageRef = ref(
        storage,
        `profile_images/${userData.userId}/${imageFile.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        'state_changed',
        () => {},
        error => {
          console.error('Upload failed:', error);
          setUploading(false);
          toast.error('Failed to upload image');
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          updatedData.photo = downloadURL;

          try {
            // Update Firebase Authentication profile
            await updateProfile(auth.currentUser, {
              displayName: updatedData.name,
              photoURL: updatedData.photo,
            });

            // Update MongoDB with new profile data
            await axiosSecure.put(`/user`, {
              ...updatedData,
              phone: editedData.phone,
              city: editedData.city,
              country: editedData.country,
            });

            setUserData(updatedData);
            setIsEditing(false);
            setUploading(false);
            toast.success('Profile updated successfully');
          } catch (error) {
            console.error('Error updating user data:', error);
            setUploading(false);
            toast.error('Failed to update profile');
          }
        }
      );
    } else {
      // If no new image is selected, update without photo
      try {
        // Update Firebase Authentication profile (name only)
        await updateProfile(auth.currentUser, {
          displayName: updatedData.name,
        });

        // Update MongoDB with new profile data
        await axiosSecure.put(`/user`, {
          ...updatedData,
          phone: editedData.phone,
          city: editedData.city,
          country: editedData.country,
        });

        setUserData(updatedData);
        setIsEditing(false);
        toast.success('Profile updated successfully');
      } catch (error) {
        console.error('Error updating user data:', error);
        toast.error('Failed to update profile');
      }
    }
  };

  return (
    <section
      className="fixed inset-0 flex justify-center items-center z-50 overflow-auto bg-[#15161d] bg-opacity-50 overlay"
      onClick={handleOutsideClick}
    >
      <div className="bg-white rounded m-10 p-10 md:mx-20 xl:mx-[30rem] shadow-md relative">
        <button
          onClick={onClose}
          className="absolute text-3xl top-2 right-3 text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>

        <div className="md:flex w-full gap-10">
          <div className="flex md:flex-col mb-6 w-full">
            <div className="mr-4">
              {isEditing ? (
                <>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="border p-2 rounded-md w-full"
                  />
                  <img
                    src={
                      imageFile
                        ? URL.createObjectURL(imageFile)
                        : userData.photo
                    }
                    alt="Profile Preview"
                    className="w-56 h-44 rounded object-cover"
                  />
                </>
              ) : (
                <img
                  src={userData.photo}
                  alt="Profile"
                  className="w-56 h-44 rounded object-cover"
                />
              )}
            </div>
            <div>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={editedData.name}
                  onChange={handleInputChange}
                  className="border p-2 rounded-full w-full mt-2"
                />
              ) : (
                <h2 className="text-lg font-bold my-2">{userData.name}</h2>
              )}
              <p className="my-1 text-gray-600">
                <strong>User ID:</strong> {userData.userId || 'UserId'}
              </p>
              <p className="text-gray-600">
                <strong>Status:</strong> {userData.role || 'User'}
              </p>
            </div>
          </div>

          <div className="w-full">
            <div>
              <div className="flex gap-2">
                <h3 className="text-lg font-bold">About Me</h3>
                {!isEditing && (
                  <FaEdit
                    onClick={handleEditClick}
                    className="cursor-pointer"
                  />
                )}
              </div>
              {isEditing ? (
                <textarea
                  name="description"
                  value={editedData.description || userData.description || ''}
                  onChange={handleInputChange}
                  className="border p-2 rounded-md w-full"
                />
              ) : (
                <p className="text-sm text-slate-500 my-2">
                  {userData.description ||
                    "I'm always on the lookout for sites that offer great functionality and creativity."}
                </p>
              )}
            </div>

            <div className="border-b border-gray-200 mb-4">
              <ul className="flex justify-around">
                <li>
                  <button
                    className={`py-2 font-semibold ${
                      activeTab === 'contact'
                        ? 'text-[#ff5a00]'
                        : 'text-slate-700'
                    }`}
                    onClick={() => setActiveTab('contact')}
                  >
                    Contact~Info
                  </button>
                </li>
                <li>
                  <button
                    className={`py-2 font-semibold ${
                      activeTab === 'additional'
                        ? 'text-[#ff5a00]'
                        : 'text-slate-700'
                    }`}
                    onClick={() => setActiveTab('additional')}
                  >
                    Additional~Info
                  </button>
                </li>
              </ul>
            </div>

            {activeTab === 'contact' && (
              <div className="space-y-2">
                <p>
                  <strong>Email:</strong> {userData.email}
                </p>
                {isEditing ? (
                  <>
                    <p className="flex items-center gap-2">
                      <strong>Phone:</strong>{' '}
                      <input
                        type="text"
                        name="phone"
                        value={editedData.phone || ''}
                        onChange={handleInputChange}
                        className="border p-2 rounded-full w-full"
                      />
                    </p>
                    <p className="flex items-center gap-2">
                      <strong>City:</strong>{' '}
                      <input
                        type="text"
                        name="city"
                        value={editedData.city || ''}
                        onChange={handleInputChange}
                        className="border p-2 rounded-full w-full"
                      />
                    </p>
                    <p className="flex items-center gap-2">
                      <strong>Country:</strong>{' '}
                      <input
                        type="text"
                        name="country"
                        value={editedData.country || ''}
                        onChange={handleInputChange}
                        className="border p-2 rounded-full w-full"
                      />
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      <strong>Phone:</strong> {userData.phone || 'N/A'}
                    </p>
                    <p>
                      <strong>City:</strong> {userData.city || 'N/A'}
                    </p>
                    <p>
                      <strong>Country:</strong> {userData.country || 'N/A'}
                    </p>
                  </>
                )}
              </div>
            )}

            {activeTab === 'additional' && (
              <div className="space-y-2">
                <p>
                  <strong>User ID:</strong> {userData.userId || 'N/A'}
                </p>
                <p>
                  <strong>Status:</strong> {userData?.role || 'User'}
                </p>

                <p>
                  <strong>Joined on:</strong> {userData.joined || 'N/A'}
                </p>
              </div>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end gap-2 mt-4">
            <button
              className="px-7 py-2 bg-[#1e1f29] rounded-full text-white"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
            <button
              className="px-6 py-2 bg-[#ff5a00] text-white rounded-full hover:bg-orange-600"
              onClick={handleSave}
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Save Change'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfilePopup;
