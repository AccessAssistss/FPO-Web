import React from 'react';
import { useParams } from 'react-router';

const MemberProfile = () => {
    const {id} = useParams()

    
    // Example member data
    const member = {
        image: 'https://via.placeholder.com/150', 
        name: 'John Doe',
        mobile: '123-456-7890',
        gender: 'Male',
        village: 'Sunnydale',
        block: 'Block A',
    };

    return (
        <>
            <div className='md:mt-20 mt-10 md:px-0 px-5'>
                <div className="max-w-md mx-auto bg-gradient-to-br from-[#00B251] to-[#66BB6A]  shadow-2xl rounded-3xl overflow-hidden transform hover:scale-105 transition-all duration-500">
                    {/* Profile Image */}
                    <div className="flex justify-center mt-8">
                        <img
                            className="w-40 h-40 rounded-full border-4 border-white shadow-xl object-cover transform hover:scale-110 transition-transform duration-300"
                            src={member.image}
                            alt={member.name}
                        />
                    </div>

                    {/* Profile Info */}
                    <div className="text-center mt-6 px-6 pb-6">
                        <h2 className="text-3xl font-bold text-white">{member.name}</h2>
                        <p className="text-lg text-white mt-2">{member.mobile}</p>
                        <p className="text-lg text-white mt-1">{member.gender}</p>
                    </div>

                    <div className="mt-4 px-6 pb-6">
                        <div className="flex justify-between text-sm text-white opacity-80">
                            <div className="flex items-center space-x-2">
                                <span className="font-semibold">Village:</span>
                                <span>{member.village}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="font-semibold">Block:</span>
                                <span>{member.block}</span>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Accent Line */}
                    <div className="h-1 bg-gradient-to-r from-[#19ce6a] to-[#A0E0B4] mt-4 mb-6 mx-8 rounded-full"></div>
                </div>
            </div>
        </>
    );
};

export default MemberProfile;
