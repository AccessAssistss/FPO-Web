import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Checkbox, FormControlLabel } from '@mui/material';
import { Box } from '@mui/system';
import { mediaUrl } from '../../../Api_url';
import AddFarmerLand from './AddFarmerLand';
import Swal from 'sweetalert2';
import {GetSingleFarmerDetails} from '../../../Api_url';

const FarmerDetails = () => {
    const { id } = useParams();
    const [farmerDetails, setFarmerDetails] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedLands, setSelectedLands] = useState([]); 
    const [openDialog, setOpenDialog] = useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    useEffect(() => {
        const fetchFarmerDetails = async () => {
            setLoading(true);
            try {
                const accessToken = localStorage.getItem('access_token');
                if (!accessToken) {
                    setError('No access token found.');
                    setLoading(false);
                    return;
                }

                const response = await axios.get(GetSingleFarmerDetails, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                    params: {
                        farmer_id: id,
                    },
                });

                setFarmerDetails(response.data);
            } catch (error) {
                console.error('Error fetching farmer details:', error);
                setError('Error fetching farmer details.');
            } finally {
                setLoading(false);
            }
        };

        fetchFarmerDetails();
    }, [id,]);

    const handleCheckboxChange = (landId) => {
        setSelectedLands((prevSelected) => {
            if (prevSelected.includes(landId)) {
                return prevSelected.filter((id) => id !== landId);
            } else {
                return [...prevSelected, landId];
            }
        });
    };

    const deleteSelectedLands = async () => {
        if (selectedLands.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'No land selected',
                text: 'Please select at least one land record to delete.',
            });
            return;
        }

        // SweetAlert2 confirmation dialog
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'This action will permanently delete the selected land records.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        });

        if (result.isConfirmed) {
            try {
                const accessToken = localStorage.getItem('access_token');
                if (!accessToken) {
                    Swal.fire('Error!', 'Access token is missing or invalid.', 'error');
                    return;
                }

                // Log the payload to ensure it's formatted correctly
                console.log('Selected land IDs:', selectedLands);

                // Sending an array of land_ids in the body of the request
                const response = await axios.delete(
                    'https://apis.agrisarathi.com/home/AddDelFarmerLandSuperAdmin',
                    {
                        data: { land_id: selectedLands }, // Pass land_ids as an array
                        headers: {
                            'Authorization': `Bearer ${accessToken}`, // Attach token here
                        },
                    }
                );

                // Log the response to see what the backend returns
                console.log('Delete Response:', response.data);

                if (response.data.status === 'success') {
                    // Remove the deleted lands from the state
                    setFarmerDetails((prevDetails) => ({
                        ...prevDetails,
                        land_records: prevDetails.land_records.filter(
                            (land) => !selectedLands.includes(land.id)  // Filter out the deleted lands
                        ),
                    }));

                    Swal.fire('Deleted!', response.data.message, 'success');
                    setSelectedLands([]); // Clear selection
                } else {
                    Swal.fire('Error!', response.data.message || 'There was an error deleting the lands.', 'error');
                }
            } catch (error) {
                console.error('Error deleting lands:', error);
                Swal.fire('Error!', 'There was an error deleting the lands. Please try again.', 'error');
            }
        }
        

    };
  

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin h-16 w-16 border-4 border-blue-600 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    if (error) {
        return <p className="text-red-500 text-center">{error}</p>;
    }

    return (
        <>
            <h1 className="text-3xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-6 ">
                Farmer Details
            </h1>
            <div className="max-w-7xl mx-auto p-6">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-lg shadow-lg mb-8 hover:scale-105 transform transition-all duration-300">
                    <div className="text-center">
                        {farmerDetails?.farmer_data?.profile && (
                            <Box display="flex" justifyContent="center" mb={4}>
                                <img
                                    src={mediaUrl + farmerDetails.farmer_data.profile}
                                    alt="Farmer Profile"
                                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg transition-all duration-300 transform hover:scale-110"
                                />
                            </Box>
                        )}
                        <Typography variant="h5" className="text-white font-semibold mb-2">
                            <span className="font-medium">Name : </span>
                            {farmerDetails?.farmer_data?.name}
                        </Typography>
                        <Typography variant="body1" className="text-white text-opacity-90 mb-4">
                            <span className="font-medium">Mobile : </span>{farmerDetails?.farmer_data?.mobile}
                        </Typography>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-lg shadow-lg flex flex-col justify-center items-center">
                        <Typography className="text-lg text-white font-semibold">Total Lands</Typography>
                        <Typography className="text-4xl font-bold text-white mt-2">{farmerDetails?.total_lands}</Typography>
                    </div>
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-lg shadow-lg flex flex-col justify-center items-center">
                        <Typography className="text-lg text-white font-semibold">Total Posts</Typography>
                        <Typography className="text-4xl font-bold text-white mt-2">{farmerDetails?.total_posts}</Typography>
                    </div>
                    <div className="bg-gradient-to-r from-red-400 to-pink-500 p-6 rounded-lg shadow-lg flex flex-col justify-center items-center">
                        <Typography className="text-lg text-white font-semibold">Total Diseases</Typography>
                        <Typography className="text-4xl font-bold text-white mt-2">{farmerDetails?.total_disease}</Typography>
                    </div>
                </div>

                <div className="mb-3 space-x-4 flex">
                    <div >
                        <Button variant="contained" color="primary" onClick={handleClickOpen}>
                            Add Farmer Land
                        </Button>
                    </div>
                    <div>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={deleteSelectedLands}
                            disabled={selectedLands.length === 0}
                            style={{ marginLeft: '1rem' }}
                        >
                            Delete Selected Farmers
                        </Button>
                    </div>
                </div>

                {/* Land Records */}
                {farmerDetails?.land_records?.length > 0 && (
                    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                        <Typography variant="h6" className="mb-4">Land Records</Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow className="bg-gray-200">
                                        <TableCell>
                                            <Checkbox
                                                indeterminate={selectedLands.length > 0 && selectedLands.length < farmerDetails.land_records.length}
                                                checked={selectedLands.length === farmerDetails.land_records.length}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedLands(farmerDetails.land_records.map((land) => land.id));
                                                    } else {
                                                        setSelectedLands([]);
                                                    }
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>S.No</TableCell>
                                        <TableCell>State</TableCell>
                                        <TableCell>District</TableCell>
                                        <TableCell>Variety</TableCell>
                                        <TableCell>Sowing Date</TableCell>
                                        <TableCell>Crop</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {farmerDetails.land_records.map((land, index) => (
                                        <TableRow key={land.id} className="hover:bg-gray-100">
                                            <TableCell>
                                                <Checkbox
                                                    checked={selectedLands.includes(land.id)}
                                                    onChange={() => handleCheckboxChange(land.id)}
                                                />
                                            </TableCell>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{land.state}</TableCell>
                                            <TableCell>{land.district}</TableCell>
                                            <TableCell>{land.variety}</TableCell>
                                            <TableCell>{land.sowing_date || 'None'}</TableCell>
                                            <TableCell>{land.crop}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>


                    </div>
                )}

                {/* Farmer Posts */}
                {farmerDetails?.farmer_posts?.length > 0 && (
                    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                        <Typography variant="h6" className="mb-4">Farmer Posts</Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow className="bg-gray-200">
                                        <TableCell>S.No</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Created At</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {farmerDetails.farmer_posts.map((post, index) => (
                                        <TableRow key={post.id} className="hover:bg-gray-100">
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{post.description}</TableCell>
                                            <TableCell>{new Date(post.created_at).toLocaleString()}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                )}

                {/* Disease Records */}
                {farmerDetails?.disease_records?.length > 0 && (
                    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                        <Typography variant="h6" className="mb-4">Disease Records</Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow className="bg-gray-200">
                                        <TableCell>S.No</TableCell>
                                        <TableCell>Disease Name</TableCell>
                                        <TableCell>Crop</TableCell>
                                        <TableCell>Uploaded Image</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {farmerDetails.disease_records.map((disease, index) => (
                                        <TableRow key={disease.id} className="hover:bg-gray-100">
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{disease.disease_name}</TableCell>
                                            <TableCell>{disease.crop}</TableCell>
                                            <TableCell>
                                                <img
                                                    src={mediaUrl + disease.uploaded_image}
                                                    alt="Disease Image"
                                                    className="w-10 h-auto mx-auto rounded-sm"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                )}
            </div>

            {/* Add Farmer Land Dialog */}
            {openDialog && <AddFarmerLand openDialog={openDialog} handleClose={handleClose} farmerid={farmerDetails?.farmer_data?.id} />}
        </>
    );
};

export default FarmerDetails;
