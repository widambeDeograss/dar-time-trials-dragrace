import React, { useState, useEffect, useRef } from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';

interface Registration {
  firstName: string;
  surname: string;
  racingTeamName: string;
  dateOfBirth: string;
  nationality: string;
  idNumber: string;
  address: string;
  mobile: string;
  email: string;
  drivingLicense: string;
  dlExpiryDate: string;
  carMake: string;
  carModel: string;
  manufactureYear: string;
  registrationNo: string;
  engineCC: string;
  estimatedHP: string;
  color: string;
  brakingSystem: string;
  registrationDate: string;
}

const RegistrationList = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const visibleTableRef = useRef(null);
  const hiddenExcelTableRef = useRef(null);

  // Separate download handler for the full data
  const { onDownload } = useDownloadExcel({
    currentTableRef: hiddenExcelTableRef.current,
    filename: 'DAR_Time_Trials_Registrations',
    sheet: 'Registrations'
  });

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://dar-race-express-server-k3852yzqg.vercel.app/api/registrations');
      const data = await response.json();
      setRegistrations(data);
    } catch (error) {
      console.error('Error fetching registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const totalRegistrations = registrations.length;
  const uniqueTeams = new Set(registrations.map(reg => reg.racingTeamName)).size;
  const averageHP = registrations.length > 0 
    ? Math.round(registrations.reduce((acc, reg) => acc + Number(reg.estimatedHP || 0), 0) / registrations.length)
    : 0;

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-600">Total Registrations</h3>
          <p className="text-3xl font-bold text-blue-600">{totalRegistrations}</p>
        </div>
        {/* <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-600">Unique Teams</h3>
          <p className="text-3xl font-bold text-blue-600">{uniqueTeams}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-600">Average Horsepower</h3>
          <p className="text-3xl font-bold text-blue-600">{averageHP} HP</p>
        </div> */}
      </div>

      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Registered Participants</h2>
        <button
          onClick={onDownload}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Export to Excel
        </button>
      </div>

      {/* Visible Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full" ref={visibleTableRef}>
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nationality</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car Details</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engine</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {registrations.map((reg, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap">{`${reg.firstName} ${reg.surname}`}</td>
                <td className="px-6 py-4 whitespace-nowrap">{reg.racingTeamName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{reg.nationality}</td>
                <td className="px-6 py-4 whitespace-nowrap">{`${reg.carMake} ${reg.carModel}`}</td>
                <td className="px-6 py-4 whitespace-nowrap">{`${reg.engineCC}cc / ${reg.estimatedHP}HP`}</td>
                <td className="px-6 py-4 whitespace-nowrap">{reg.email}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        )}

        {!loading && registrations.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No registrations found
          </div>
        )}
      </div>

      {/* Hidden table for Excel export with all fields */}
      <div className="hidden">
        <table ref={hiddenExcelTableRef}>
          <thead>
            <tr>
              <th>Registration Date</th>
              <th>First Name</th>
              <th>Surname</th>
              <th>Racing Team</th>
              <th>Date of Birth</th>
              <th>Nationality</th>
              <th>ID/Passport Number</th>
              <th>Address</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Driving License</th>
              <th>License Expiry Date</th>
              <th>Car Make</th>
              <th>Car Model</th>
              <th>Manufacture Year</th>
              <th>Registration No.</th>
              <th>Engine CC</th>
              <th>Estimated HP</th>
              <th>Color</th>
              <th>Braking System</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg, index) => (
              <tr key={index}>
                <td>{formatDate(reg.registrationDate)}</td>
                <td>{reg.firstName}</td>
                <td>{reg.surname}</td>
                <td>{reg.racingTeamName}</td>
                <td>{formatDate(reg.dateOfBirth)}</td>
                <td>{reg.nationality}</td>
                <td>{reg.idNumber}</td>
                <td>{reg.address}</td>
                <td>{reg.mobile}</td>
                <td>{reg.email}</td>
                <td>{reg.drivingLicense}</td>
                <td>{formatDate(reg.dlExpiryDate)}</td>
                <td>{reg.carMake}</td>
                <td>{reg.carModel}</td>
                <td>{reg.manufactureYear}</td>
                <td>{reg.registrationNo}</td>
                <td>{reg.engineCC}</td>
                <td>{reg.estimatedHP}</td>
                <td>{reg.color}</td>
                <td>{reg.brakingSystem}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegistrationList;