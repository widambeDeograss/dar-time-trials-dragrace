import React, { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { Calendar, Mail, Phone, User, Key, Car, Loader } from "lucide-react";

const FormField = ({
  label,
  // @ts-ignore
  icon: Icon = null,
  ...props
}: {
  label: string;
  icon?: React.ComponentType;
  [key: string]: any;
}) => (
  <div className="relative">
    <label className="block text-sm font-medium text-gray-700 mb-1.5">
      {label}
    </label>
    <div className="relative rounded-md shadow-sm">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {/* @ts-ignore */}
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
      )}
      <input
        {...props}
        className={`
          block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-3
          ${Icon ? "pl-10" : "pl-4"}
          placeholder-gray-400
          focus:border-blue-500 focus:ring-blue-500 focus:bg-white
          hover:border-gray-400
          transition-colors duration-200
          shadow-sm
        `}
      />
    </div>
  </div>
);

const SectionTitle = ({ children }: any) => (
  <div className="relative">
    <h3 className="text-lg font-semibold text-gray-900 bg-gradient-to-r from-blue-50 to-transparent p-3 rounded-lg mb-6">
      {children}
    </h3>
  </div>
);

const RegistrationForm = () => {
  const [IsLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    racingTeamName: "",
    dateOfBirth: "",
    nationality: "",
    idNumber: "",
    address: "",
    mobile: "",
    email: "",
    drivingLicense: "",
    dlExpiryDate: "",
    carMake: "",
    carModel: "",
    manufactureYear: "",
    registrationNo: "",
    engineCC: "",
    estimatedHP: "",
    color: "",
    brakingSystem: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch("https://dar-race-express-server-k3852yzqg.vercel.app/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Registration successful!");
        //@ts-ignore
        setFormData({
          firstName: "",
          surname: "",
          racingTeamName: "",
          dateOfBirth: "",
          nationality: "",
          idNumber: "",
          address: "",
          mobile: "",
          email: "",
          drivingLicense: "",
          dlExpiryDate: "",
          carMake: "",
          carModel: "",
          manufactureYear: "",
          registrationNo: "",
          engineCC: "",
          estimatedHP: "",
          color: "",
          brakingSystem: "",
        }); // Reset form
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <Toaster/>
      <div className="text-center mb-8">
        <img
          src="/logo.png"
          alt="DAR Time Trials Logo"
          className="mx-auto w-48 mb-4"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          DAR TIME TRIALS (DRAG RACE)
        </h1>
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl mb-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-3 text-blue-900">
            Registration Information
          </h2>
          <div className="text-gray-700 space-y-2">
            <p className="font-medium">Entry Fee:</p>
            <p>TSH 60,000 (Tanzania Citizen) / USD 40.00 (Foreigner/EA)</p>
            <p className="text-sm text-gray-600">
              Includes TSH 10,000 Temporary Competition license
            </p>
            <div className="mt-4 pt-4 border-t border-blue-200">
              <p className="font-medium">Payment Details:</p>
              <p>
                Lapa Tigo #: <span className="font-mono font-extrabold">7757960</span>
              </p>
              <p>
                VodaCom #: <span className="font-mono font-extrabold">57983245</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-10 bg-white p-8 rounded-xl shadow-lg"
      >
        {/* Personal Information Section */}
        <div className="space-y-6">
          <SectionTitle>Personal Information</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="First Name"
              icon={User}
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter your first name"
              required
              value={formData.firstName}
              onChange={handleChange}
            />
            <FormField
              label="Surname"
              icon={User}
              type="text"
              id="surname"
              name="surname"
              placeholder="Enter your surname"
              required
              value={formData.surname}
              onChange={handleChange}
            />
            <FormField
              label="Racing Team Name"
              type="text"
              id="racingTeamName"
              name="racingTeamName"
              placeholder="Enter your team name"
              required
              value={formData.racingTeamName}
              onChange={handleChange}
            />
            <FormField
              label="Date of Birth"
              icon={Calendar}
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              required
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Contact & Identification Section */}
        <div className="space-y-6">
          <SectionTitle>Contact & Identification</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Nationality"
              type="text"
              id="nationality"
              name="nationality"
              placeholder="Enter your nationality"
              required
              value={formData.nationality}
              onChange={handleChange}
            />
            <FormField
              label="ID No. (Passport/NIDA)"
              icon={Key}
              type="text"
              id="idNumber"
              name="idNumber"
              placeholder="Enter your ID number"
              required
              value={formData.idNumber}
              onChange={handleChange}
            />
            <FormField
              label="Email Address"
              icon={Mail}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <FormField
              label="Mobile"
              icon={Phone}
              type="tel"
              id="mobile"
              name="mobile"
              placeholder="Enter your mobile number"
              required
              value={formData.mobile}
              onChange={handleChange}
            />
            <div className="md:col-span-2">
              <FormField
                label="Address"
                type="text"
                id="address"
                name="address"
                placeholder="Enter your full address"
                required
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Driving License Section */}
        <div className="space-y-6">
          <SectionTitle>Driving License Information</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Driving License Number"
              icon={Key}
              type="text"
              id="drivingLicense"
              name="drivingLicense"
              placeholder="Enter your license number"
              required
              value={formData.drivingLicense}
              onChange={handleChange}
            />
            <FormField
              label="License Expiry Date"
              icon={Calendar}
              type="date"
              id="dlExpiryDate"
              name="dlExpiryDate"
              required
              value={formData.dlExpiryDate}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Vehicle Information Section */}
        <div className="space-y-6">
          <SectionTitle>Vehicle Information</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Make"
              icon={Car}
              type="text"
              id="carMake"
              name="carMake"
              placeholder="Enter vehicle make"
              required
              value={formData.carMake}
              onChange={handleChange}
            />
            <FormField
              label="Model"
              icon={Car}
              type="text"
              id="carModel"
              name="carModel"
              placeholder="Enter vehicle model"
              required
              value={formData.carModel}
              onChange={handleChange}
            />
            <FormField
              label="Year of Manufacture"
              type="number"
              id="manufactureYear"
              name="manufactureYear"
              placeholder="Enter manufacture year"
              required
              value={formData.manufactureYear}
              onChange={handleChange}
            />
            <FormField
              label="Registration No."
              type="text"
              id="registrationNo"
              name="registrationNo"
              placeholder="Enter registration number"
              required
              value={formData.registrationNo}
              onChange={handleChange}
              icon={undefined}
            />
            <FormField
              label="Engine CC"
              type="text"
              id="engineCC"
              name="engineCC"
              placeholder="Enter engine capacity"
              required
              value={formData.engineCC}
              onChange={handleChange}
            />
            <FormField
              label="Estimated Horse Power"
              type="text"
              id="estimatedHP"
              name="estimatedHP"
              placeholder="Enter estimated HP"
              required
              value={formData.estimatedHP}
              onChange={handleChange}
            />
            <FormField
              label="Predominant Color"
              type="text"
              id="color"
              name="color"
              placeholder="Enter vehicle color"
              required
              value={formData.color}
              onChange={handleChange}
            />
            <FormField
              label="Breaking System Type"
              icon={Car}
              type="text"
              id="brakingSystem"
              name="brakingSystem"
              placeholder="Enter braking system type"
              required
              value={formData.brakingSystem}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex flex-col items-center pt-6">
          <div className="bg-blue-50 p-4 rounded-lg mb-6 max-w-2xl text-center">
            <p className="text-sm text-gray-600">
              By submitting this form, you confirm that all provided information
              is accurate and complete.
            </p>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-12 py-4 rounded-lg
                     hover:bg-blue-700 focus:outline-none focus:ring-2 
                     focus:ring-blue-500 focus:ring-offset-2 
                     transition-all duration-200 transform hover:scale-105
                     font-medium text-lg shadow-lg"
          >
            Submit Registration
          </button>

          {IsLoading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-xl flex items-center space-x-4">
                <Loader className="animate-spin h-8 w-8 text-blue-600" />
                <p className="text-gray-700">Submitting registration...</p>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
