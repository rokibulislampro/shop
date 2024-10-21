import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import './Banners';

const UpdateDeals = ({ deal, onClose, onUpdate }) => {
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
    name: deal.name || '',
    offer: deal.offer || '',
    link: deal.link || '',
    day: deal.day || '',
    video: deal.video || '',
    image: deal.image || '',
    updateDate: updateDate,
  });

  const [imageFile, setImageFile] = useState(null); // For storing the selected image file
  const [videoFile, setVideoFile] = useState(null); // For storing the selected video file

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = e => {
    setImageFile(e.target.files[0]);
  };

  const handleVideoChange = e => {
    setVideoFile(e.target.files[0]);
  };

  const uploadFileToFirebase = (file, fileType) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve(null);
        return;
      }

      const storage = getStorage();
      const storageRef = ref(storage, `deals/${fileType}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

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
      // Upload image and video to Firebase
      const imageUrl = await uploadFileToFirebase(imageFile, 'images');
      const videoUrl = await uploadFileToFirebase(videoFile, 'videos');

      // Prepare updated form data with new image and video URLs if they exist
      const updatedFormData = {
        ...formData,
        ...(imageUrl && { image: imageUrl }),
        ...(videoUrl && { video: videoUrl }),
      };

      // Send updated form data to the API
      await onUpdate(deal._id, updatedFormData);
      onClose();
    } catch (error) {
      toast.error('Failed to update deal.');
      console.error('Error updating deal:', error);
    }
  };

  return (
    <section className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[90%] max-w-2xl">
        <h2 className="text-xl mb-4 font-semibold">Update deal</h2>
        <form className=" text-sm" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center gap-3 my-3 w-full">
            <div className="flex w-full gap-4">
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
                <input
                  type="text"
                  name="offer"
                  value={formData.offer}
                  onChange={handleChange}
                  placeholder="Deal Offer"
                  className="w-full p-3 px-5 border rounded-full input-field"
                />
              </div>
            </div>
            <div className="flex w-full gap-4">
              <div className="w-full">
                <input
                  type="text"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  placeholder="Deal Product Link"
                  className="w-full p-3 px-5 border rounded-full input-field"
                />
              </div>
              <div className="w-full">
                <input
                  type="number"
                  name="day"
                  value={formData.day}
                  onChange={handleChange}
                  placeholder="Deal Day"
                  className="w-full p-3 px-5 border rounded-full input-field"
                />
              </div>
            </div>
            <div className="flex w-full gap-4">
              <div className="w-full space-y-1">
                <label htmlFor="video" className="text-sm ml-2">
                  Deal Video
                </label>
                <input
                  type="file"
                  name="video"
                  id="video"
                  onChange={handleVideoChange}
                  placeholder="Upload Video"
                  className="w-full p-3 px-5 border rounded-full input-field"
                />
              </div>
              <div className="w-full">
                <label htmlFor="image" className="text-sm ml-2">
                  Deal Photo
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
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

export default UpdateDeals;
