import React, { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "../../Navbar";
import { useApis } from "../../Api_url";

const ShopDetailsForm = () => {
  const navigate = useNavigate();
  const {putJson, postJson, putFormData, postFormData} = useApis()

  // State to manage multiple forms
  const [forms, setForms] = useState([
    {
      shopId: '', // Adding shopId in the state for each shop
      shopName: '',
      shopContact: '',
      alternateContact: '',
      shopAddress: '',
      openTime: '',
      closeTime: '',
      openDays: '',
      closeDays: ''
    }
  ]);

  // Function to handle the change in form values
  const handleFormChange = (index, event) => {
    const newForms = [...forms];
    newForms[index][event.target.name] = event.target.value;
    setForms(newForms);
  };

  // Function to handle adding a new form
  const handleAddForm = () => {
    setForms([
      ...forms,
      {
        shopId: '', // Initialize shopId for new forms
        shopName: '',
        shopContact: '',
        alternateContact: '',
        shopAddress: '',
        openTime: '',
        closeTime: '',
        openDays: '',
        closeDays: ''
      }
    ]);
  };

  // Function to handle removing a form
  const handleRemoveForm = (index) => {
    const newForms = forms.filter((_, i) => i !== index);
    setForms(newForms);
  };

  // Function to handle image upload
  // const handleImageUpload = async (event, index) => {
  //   const file = event.target.files[0]; // Get the selected file
  //   if (!file) return; // If no file is selected, exit

  //   const formData = new FormData();
  //   formData.append("shop", file); // Append the image to FormData

  //   try {
  //     const token = localStorage.getItem("access_token"); // Get the token from localStorage

  //     const response = await axios.put(
  //       "https://apis.agrisarathi.com/fposupplier/UpdateShopPicture",
  //       formData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "multipart/form-data", // Set the content type for file upload
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       Swal.fire({
  //         icon: "success",
  //         title: "Image uploaded successfully!",
  //         text: response.data.message || "The shop image has been uploaded.",
  //       });

  //       // You can update the form with the image URL or display the image preview
  //       const newForms = [...forms];
  //       newForms[index].shopImage = URL.createObjectURL(file); // Add a preview of the uploaded image
  //       setForms(newForms);
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Image Upload Failed",
  //         text: response.data.message || "There was an error uploading the image.",
  //       });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Network Error",
  //       text: "There was an error while uploading the image. Please try again later.",
  //     });
  //   }
  // };


 
  const handleSubmit = async (isUpdate = false) => {
    try {
      const payload = {
        shops: forms.map(form => ({
          shopId: form.shopId,  
          shopName: form.shopName,
          shopContact: form.shopContact,
          alternateContact: form.alternateContact,
          shopAddress: form.shopAddress,
          openTime: form.openTime,
          closeTime: form.closeTime,
          openDays: form.openDays,
          closeDays: form.closeDays
        }))
      };

      // Get token from localStorage
      const token = localStorage.getItem('access_token');

      let response;

      // Make PUT request for updating
      if (isUpdate) {
        response = await putJson('UpdateShopbyFPOSupplier', payload)
      
      } else {
        // Make POST request for adding
        response = await postJson('AddShopbyFPOSupplier', payload)
      }

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: isUpdate ? "Shop details updated successfully!" : "Shop details saved successfully!",
          text: response.data.message || "Your shop details have been submitted successfully.",
        });
        navigate("/bankdetails"); // Redirect to profile page after successful submission
      } else {
        Swal.fire({
          icon: "error",
          title: isUpdate ? "Update Failed" : "Submission Failed",
          text: response.data.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "There was an error while submitting the form. Please try again later.",
      });
    }
  };

  // Example to load existing shop details if you are editing an existing shop
  const loadShopDetails = (shopData) => {
    setForms(shopData.map(shop => ({
      shopId: shop.shopId,  // Ensure shopId is included for update
      shopName: shop.shopName,
      shopContact: shop.shopContact,
      alternateContact: shop.alternateContact,
      shopAddress: shop.shopAddress,
      openTime: shop.openTime,
      closeTime: shop.closeTime,
      openDays: shop.openDays,
      closeDays: shop.closeDays
    })));
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center bg-gray-50 p-6 min-h-screen mt-16">
        {/* Step Progress */}
        <div className="flex justify-center items-center space-x-4 mb-6">
          <div className="flex items-center space-x-2">
            <div className="md:w-4 md:h-4 w-6 h-4 rounded-full bg-green-500" />
            <span className="text-sm text-gray-700">Profile details</span>
          </div>
          <div className="w-16 h-[2px] bg-gray-400" />
          <div className="flex items-center space-x-2">
            <div className="md:w-4 md:h-4 w-6 h-4 rounded-full bg-green-500" />
            <span className="text-sm text-gray-700">Shop Details</span>
          </div>
          <div className="w-16 h-[2px] bg-gray-400" />
          <div className="flex items-center space-x-2">
            <div className="md:w-4 md:h-4 w-6 h-4 rounded-full bg-gray-400" />
            <span className="text-sm text-gray-700">Bank Details</span>
          </div>
        </div>

        {/* Form Section */}
        {forms.map((form, index) => (
          <form key={index} className="flex justify-center flex-col gap-6 w-full max-w-5xl bg-white p-6 shadow-md rounded-md mb-8 ">
            {/* Left Side: Image and Time Fields */}
            <div className="col-span-4 flex flex-col items-center space-y-4">
              {/* Image Upload */}
              <div className="flex flex-col items-center">
                <img
                  src={form.shopImage || "https://via.placeholder.com/120"} // Use uploaded image or a placeholder
                  alt="Shop"
                  className="w-32 h-32 object-cover mb-2 rounded"
                />
                <input
                  type="file"
                  accept="image/*"
                  
                  style={{ display: "none" }} // Hide the default input
                  id={`upload-image-${index}`} // Unique ID for each form
                />
                <Button
                  className="!text-green-600 !border-green-600 hover:!bg-green-50"
                  variant="outlined"
                  size="small"
                  component="label" // Use label to trigger file input
                  htmlFor={`upload-image-${index}`} // Link to the hidden input
                >
                  Upload Image
                </Button>
              </div>

              {/* Time Fields */}
              <FormControl fullWidth>
                <InputLabel>Open Time</InputLabel>
                <Select
                  name="openTime"
                  value={form.openTime}
                  onChange={(e) => handleFormChange(index, e)}
                >
                  <MenuItem value="1 a.m">1 a.m</MenuItem>
                  <MenuItem value="2 a.m">2 a.m</MenuItem>
                  <MenuItem value="3 a.m">3 a.m</MenuItem>
                  <MenuItem value="4 a.m">4 a.m</MenuItem>
                  <MenuItem value="5 a.m">5 a.m</MenuItem>
                  <MenuItem value="6 a.m">6 a.m</MenuItem>
                  <MenuItem value="7 a.m">7 a.m</MenuItem>
                  <MenuItem value="8 a.m">8 a.m</MenuItem>
                  <MenuItem value="9 a.m">9 a.m</MenuItem>
                  <MenuItem value="10 a.m">10 a.m</MenuItem>
                  <MenuItem value="11 a.m">11 a.m</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Close Time</InputLabel>
                <Select
                  name="closeTime"
                  value={form.closeTime}
                  onChange={(e) => handleFormChange(index, e)}
                >
                  <MenuItem value="12 p.m">12 p.m</MenuItem>
                  <MenuItem value="1 p.m">1 p.m</MenuItem>
                  <MenuItem value="2 p.m">2 p.m</MenuItem>
                  <MenuItem value="3 p.m">3 p.m</MenuItem>
                  <MenuItem value="4 p.m">4 p.m</MenuItem>
                  <MenuItem value="5 p.m">5 p.m</MenuItem>
                  <MenuItem value="6 p.m">6 p.m</MenuItem>
                  <MenuItem value="7 p.m">7 p.m</MenuItem>
                  <MenuItem value="8 p.m">8 p.m</MenuItem>
                  <MenuItem value="9 p.m">9 p.m</MenuItem>
                  <MenuItem value="10 p.m">10 p.m</MenuItem>
                  <MenuItem value="11 p.m">11 p.m</MenuItem>
                </Select>
              </FormControl>

              {/* Days Dropdown */}
              <FormControl fullWidth>
                <InputLabel>Open Days</InputLabel>
                <Select
                  name="openDays"
                  value={form.openDays}
                  onChange={(e) => handleFormChange(index, e)}
                >
                  <MenuItem value="Monday - Tuesday">Monday - Tuesday</MenuItem>
                  <MenuItem value="Monday - Wednesday">Monday - Wednesday</MenuItem>
                  <MenuItem value="Monday - Thursday">Monday - Thursday</MenuItem>
                  <MenuItem value="Monday - Friday">Monday - Friday</MenuItem>
                  <MenuItem value="Monday - Saturday">Monday - Saturday</MenuItem>
                  <MenuItem value="Monday - Sunday">Monday - Sunday</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Close Days</InputLabel>
                <Select
                  name="closeDays"
                  value={form.closeDays}
                  onChange={(e) => handleFormChange(index, e)}
                >
                  <MenuItem value="Sunday">Sunday</MenuItem>
                  <MenuItem value="Monday">Monday</MenuItem>
                  <MenuItem value="Tuesday">Tuesday</MenuItem>
                  <MenuItem value="Wednesday">Wednesday</MenuItem>
                  <MenuItem value="Thursday">Thursday</MenuItem>
                  <MenuItem value="Friday">Friday</MenuItem>
                  <MenuItem value="Saturday">Saturday</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/* Right Side: Shop Details */}
            <div className="col-span-8 grid grid-cols-2 gap-4">
              <TextField
                name="shopName"
                label="Shop Name"
                variant="outlined"
                fullWidth
                value={form.shopName}
                onChange={(e) => handleFormChange(index, e)}
              />
              <TextField
                name="shopContact"
                label="Shop Contact No."
                variant="outlined"
                fullWidth
                value={form.shopContact}
                onChange={(e) => handleFormChange(index, e)}
              />
              <TextField
                name="alternateContact"
                label="Alternate Contact No."
                variant="outlined"
                fullWidth
                value={form.alternateContact}
                onChange={(e) => handleFormChange(index, e)}
              />
              <TextField
                name="shopAddress"
                label="Shop Address"
                variant="outlined"
                fullWidth
                value={form.shopAddress}
                onChange={(e) => handleFormChange(index, e)}
              />
            </div>

            {/* Remove Button */}
            {forms.length > 1 && (
              <div className="flex justify-end mt-4">
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleRemoveForm(index)}
                >
                  Remove Shop
                </Button>
              </div>
            )}
            <Button
              className="!text-green-600 !border-green-600 hover:!bg-green-50"
              variant="outlined"
              color="primary"
              onClick={handleAddForm}
            >
              Add Another Shop
            </Button>

            {/* Cancel and Save Buttons */}
            <div className="col-span-2 flex justify-between mt-4 ">
              <Button className="!text-green-600 !border-green-600 hover:!bg-green-50" variant="outlined" color="secondary" onClick={() => navigate("/profile")}>
                Back
              </Button>
              <Button
                variant="contained"
                color="success"
                className="bg-green-500 hover:bg-green-600"
                type="submit"
                onClick={() => navigate("/bankdetails")}>

                Next
              </Button>
              {/* <Button variant="contained" color="primary" onClick={() => handleSubmit(true)}>
            Update
          </Button> */}
            </div>
          </form>
        ))}

        {/* Add Another Shop Button */}


        {/* Cancel and Save Buttons */}

      </div>
    </>
  );
};

export default ShopDetailsForm;
