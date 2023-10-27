import Navbar from "./Navbar";
import "./AddUser.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddUser() {
  const navigate = useNavigate()
  const [value, setValue] = useState({
    firstname: "",
    lastname: "",
    address: "",
  });

  const [formError, setFormErrors] = useState({
    firstname: '',
    lastname: '',
    address:''
  });

  const [date, setDate] = useState(new Date());
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit = async(event) => {
    event.preventDefault();
    const stringdate = date.toLocaleDateString();
    const data = {
      firstname: value.firstname,
      lastname: value.lastname,
      date: stringdate,
      address: value.address
    }
    if(!(value.address==""||value.firstname==""||value.lastname=="")){
      try {
        const response = await axios.post('http://localhost:5000/adduser', data);
        toast.success(response.data.message);
        navigate('/');
      } catch (error) {
        toast.error(error.message)
      }
    }
    setFormErrors(validate(value));
  }

  const validate = (values) => {
    const errors = {};
    if(!values.firstname){
      errors.firstname = "First name is Required";
    }
    if(!values.lastname){
      errors.lastname = "Last name is Required";
    }
    if(!values.address){
      errors.address = "Address is required";
    }
    return errors;
  }

  return (
    <div className="AddUser">
      <Navbar />
      <div className="flex w-full h-full justify-center items-center">
        <div className="w-full max-w-lg">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="First Name"
              >
                First Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="firstname"
                type="text"
                placeholder="Enter the First Name"
                name="firstname"
                onChange={(e) =>
                  setValue({ ...value, firstname: e.target.value })
                }
              />
            </div>
            <p className="text-red-500 text-xs italic mb-4">{ formError.firstname }</p>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Last Name"
              >
                Last Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="lastname"
                type="text"
                placeholder="Enter the Last Name"
                name="lastname"
                onChange={(e) =>
                  setValue({ ...value, lastname: e.target.value })
                }
              />
            </div>
            <p className="text-red-500 text-xs italic mb-4">{ formError.lastname }</p>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
                htmlFor="Date"
              >
                Date of Birth
              </label>
            <div 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

            >
                <DatePicker
                    selected={date}
                    onChange={(date) => setDate(date)}
                />
            </div>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Address"
              >
                Address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="address"
                type="text"
                placeholder="Enter the Address"
                name="address"
                onChange={e => setValue({...value, address: e.target.value})}
              />
            </div>
            <p className="text-red-500 text-xs italic mb-4">{ formError.address }</p>
            {/* border-red-500 --> classNamename in input */}
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
