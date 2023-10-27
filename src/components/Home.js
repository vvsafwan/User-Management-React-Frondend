import Navbar from "./Navbar";
import "./Home.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(()=>{
    const dataFetch = async() => {
      let fetchdata = await axios.get("http://localhost:5000/loadData")
      setData(fetchdata.data)
    }
    dataFetch();
  },[data]);
  async function handleDelete(id){
    try {
      let response = await axios.post(`http://localhost:5000/deleteUser?id=${id}`)
      toast.success(response.data.message);
      let fetchdata = await axios.get("http://localhost:5000/loadData")
      setData(fetchdata.data)
      // navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div className="Home">
      <Navbar />
      <div>
        <div
          class="relative overflow-x-auto mx-auto pt-40"
          style={{ width: "80%" }}
        >
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-white-50 dark:bg-white-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  First Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Last Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Date
                </th>
                <th scope="col" class="px-6 py-3">
                  Address
                </th>
                <th scope="col" class="px-6 py-3">
                  Edit
                </th>
                <th scope="col" class="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            {
              data.map((d) => {
                return (
                  <tbody>
                  <tr class="bg-white border-b dark:bg-white-800 dark:border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray"
                    >
                      {d.firstname}
                    </th>
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray"
                    >
                      {d.lastname}
                    </th>
                    <td class="px-6 py-4">{d.date}</td>
                    <td class="px-6 py-4">{d.address}</td>
                    <td class="px-6 py-4">
                        <Link
                       to={{
                        pathname: `/edituser/${d.id}`, 
                        state: { id: d.id } 
                       }}
                        class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >Edit</Link>
                    </td>
                    <td class="px-6 py-4">
                      <button
                        type="button"
                        class="focus:outline-none text-white bg-green-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        onClick={()=>handleDelete(d.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
                )
              })
            }
          </table>
        </div>
      </div>
    </div>
  );
}
