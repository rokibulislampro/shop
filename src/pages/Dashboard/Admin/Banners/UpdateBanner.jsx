import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import './Banners.css';

const UpdateBanner = ({ banner, onClose, onUpdate }) => {
  const formatDateTime = date => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };
    return date.toLocaleString('en-US', options).replace(',', '');
  };

  const currentDate = new Date();
  const updateDate = formatDateTime(currentDate);

  const [formData, setFormData] = useState({
    name: banner.name || '',
    status: banner.status || '',
    image: banner.image || '',
    updateDate: updateDate,
  });

  const [imageFile, setImageFile] = useState(null); // For storing the selected image file

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = e => {
    setImageFile(e.target.files[0]);
  };

  const uploadImageToFirebase = () => {
    return new Promise((resolve, reject) => {
      if (!imageFile) {
        resolve(null);
        return;
      }

      const storage = getStorage();
      const storageRef = ref(storage, `banners/${imageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        'state_changed',
        snapshot => {},
        error => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then(downloadURL => {
              resolve(downloadURL);
            })
            .catch(error => {
              reject(error);
            });
        }
      );
    });
  };

  const handleSubmit = async event => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      const imageUrl = await uploadImageToFirebase();

      const updatedFormData = imageUrl
        ? { ...formData, image: imageUrl }
        : formData;

      await onUpdate(banner._id, updatedFormData);
      onClose();
    } catch (error) {
      toast.error('Failed to update banner.');
      console.error('Error updating banner:', error);
    }
  };

  return (
    <section className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[90%] max-w-2xl">
        <h2 className="text-xl mb-4 font-semibold">Update Banner</h2>
        <form className=" text-sm" onSubmit={handleSubmit}>
          {' '}
          {/* Updated to use onSubmit */}
          <div className="flex items-center gap-3 my-3 w-full">
            <div className="flex flex-col w-full gap-4">
              <div className="w-full">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full p-3 px-5 border rounded-full input-field"
                />
              </div>
              <div className="w-full">
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full p-3 px-5 border rounded-full input-field"
                >
                  <option value="" disabled>
                    Select Status
                  </option>{' '}
                  {/* Placeholder option */}
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="w-full">
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  placeholder="Upload Image"
                  className="w-full p-3 px-5 border rounded-full input-field"
                />
              </div>
            </div>
          </div>
          {/* Action buttons */}
          <div className="w-full flex justify-end items-center gap-3">
            <button
              type="button"
              className="bg-[#1d1e29] hover:bg-black text-white px-7 py-2.5 rounded-full font-semibold transition-all"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit" // Changed to type="submit" so form submission is handled by onSubmit
              className="bg-[#ff5a00] hover:bg-orange-600 text-white px-5 py-2.5 rounded-full font-semibold transition-all"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateBanner;
