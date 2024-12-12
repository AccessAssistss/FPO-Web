import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import Navbar from "../../Navbar";

const BankDetailsForm = () => {
  
  const [bankName, setBankName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [registrationId, setRegistrationId] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [businessEstablishDate, setBusinessEstablishDate] = useState(""); 
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the token from localStorage or context (wherever you're storing it)
    const token = localStorage.getItem("access_token");

    if (!token) {
      Swal.fire("Error", "No token found, please login again!", "error");
      return;
    }

    // Prepare the request body based on the API body structure
    const body = {
      accountholder_name: accountName,
      account_number: accountNumber,
      bank_name: bankName,
      ifsc_code: ifscCode,
      business_establishdate: businessEstablishDate, // Add this to the request body
      pan_no: panNumber,
      registration_id: registrationId,
      gst_number: gstNumber,
    };

    try {
      const response = await axios.put(
        "https://apis.agrisarathi.com/fposupplier/UpdateProfile",
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token for authentication
          },
        }
      );

      // Success response handling
      if (response.status === 200) {
        Swal.fire("Success", "Bank details updated successfully!", "success").then(() => {
          // Redirect to the dashboard after a successful submission
          navigate("/dashboard"); // Adjust the path if needed
        });
      }
    } catch (error) {
      // Error handling
      Swal.fire("Error", "Failed to update profile, please try again.", "error");
    }
  };

  return (
    <>
    <Navbar/>
    <div className="flex flex-col items-center bg-gray-50 p-6 min-h-screen mt-16">
      {/* Step Progress */}
      <div className="flex justify-center items-center space-x-4 mb-6">
        <div className="flex items-center space-x-2">
          <div className="md:w-4 md:h-4 w-6 h-4 rounded-full bg-green-500" />
          <button className="text-sm text-gray-700">Profile details</button>
        </div>
        <div className="w-16 h-[2px] bg-gray-400" />
        <div className="flex items-center space-x-2">
          <div className="md:w-4 md:h-4 w-6 h-4 rounded-full bg-green-500" />
          <span className="text-sm text-gray-700">Shop Details</span>
        </div>
        <div className="w-16 h-[2px] bg-gray-400" />
        <div className="flex items-center space-x-2">
          <div className="md:w-4 md:h-4 w-6 h-4 rounded-full bg-green-500" />
          <span className="text-sm text-gray-700">Bank Details</span>
        </div>
      </div>

      {/* Form Section */}
      <form className="grid grid-cols-2 gap-6 w-full max-w-4xl bg-white p-6 shadow-md rounded-md" onSubmit={handleSubmit}>
        {/* Bank Details Fields */}
        <TextField
          label="Bank Name"
          variant="outlined"
          fullWidth
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
          className="col-span-2"
        />
        <TextField
          label="Account Name"
          variant="outlined"
          fullWidth
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
        />
        <TextField
          label="Account Number"
          variant="outlined"
          fullWidth
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
        />
        <TextField
          label="IFSC Code"
          variant="outlined"
          fullWidth
          value={ifscCode}
          onChange={(e) => setIfscCode(e.target.value)}
        />
        <TextField
          label="Pan Number"
          variant="outlined"
          fullWidth
          value={panNumber}
          onChange={(e) => setPanNumber(e.target.value)}
        />
        <TextField
          label="Registration Id"
          variant="outlined"
          fullWidth
          value={registrationId}
          onChange={(e) => setRegistrationId(e.target.value)}
        />
        <TextField
          label="GST Number"
          variant="outlined"
          fullWidth
          value={gstNumber}
          onChange={(e) => setGstNumber(e.target.value)}
        />

        {/* Business Establishment Date Field */}
        <TextField
          label="Business Establish Date"
          variant="outlined"
          fullWidth
          type="date" // Use type="date" for date input
          value={businessEstablishDate}
          onChange={(e) => setBusinessEstablishDate(e.target.value)}
          InputLabelProps={{
            shrink: true, // This keeps the label inside the input when a date is selected
          }}
        />

        {/* Buttons */}
        <div className="col-span-2 flex justify-between mt-4">
          <Button
            variant="outlined"
            color="secondary"
            className="!text-green-600 !border-green-600 hover:!bg-green-50"
            onClick={() => navigate("/shopdetails")} // Navigate to dashboard if cancelled
          >
            Back
          </Button>
          <Button
            variant="contained"
            className="!bg-green-600 !hover:bg-green-700"
            type="submit" // Trigger form submit when clicked
          >
            Save
          </Button>
        </div>
      </form>
    </div>
    </>
  );
};

export default BankDetailsForm;
