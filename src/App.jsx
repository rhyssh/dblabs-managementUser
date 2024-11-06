import { useEffect, useState } from 'react'
import './App.css'
import Table from './components/Table'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import Form from './components/Form'
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [datas, setDatas] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [sortKey, setSortKey] = useState(null)
  const [sortOrder, setSortOrder] = useState('ascending');



  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('users'));
    if (savedUsers && savedUsers.length > 0) {
      setDatas(savedUsers)
      console.log(datas)
    } else {
      fetchData()
    }
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.get('https://api.github.com/users');
      const fetcedData = response.data.map((user) => ({
        name: user.login,
        id: user.id,
        email: `${user.login}@example.com`,
        age: Math.floor(Math.random() * 50) + 18,
        membershipStatus: Math.random() > 0.5 ? 'active' : 'inactive',
      }));
      setDatas(fetcedData);
      console.log(fetcedData)
      setError(null);
    } catch (err) {
      toast.error('Failed to fetch users from API');
      setError(err.message);
    } finally {
      setLoading(false)
    }
  }


  // handle add data
  const handleAddUser = (user) => {
    const id = uuidv4();
    const newUser = { id, ...user };
    setDatas([...datas, newUser]);
    toast.success('User added successfully');
    localStorage.setItem('users', JSON.stringify([...datas, newUser]));
  };

  // handle delete data
  const handleDelete = (id) => {
    const updatedUsers = datas.filter((user) => user.id !== id);
    setDatas(updatedUsers);
    toast.success('User deleted successfully');
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  // handle edit dat

  // Update handleSort function
  const handleSort = (key) => {
    // Toggle sortOrder setiap kali sort dipanggil
    const newSortOrder = sortKey === key && sortOrder === 'ascending' ? 'descending' : 'ascending';
    setSortOrder(newSortOrder);
    setSortKey(key);

    const sortedData = [...datas].sort((a, b) => {
      if (key === 'name' || key === 'membershipStatus') {
        return newSortOrder === 'ascending'
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      }
      return newSortOrder === 'ascending' ? a[key] - b[key] : b[key] - a[key];
    });
    setDatas(sortedData);
  };

  return (
    <>
      <div>
        <p className='text-start'>Tambah Data</p>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (<>
          <Form onAddUser={handleAddUser} />
          <Table datas={datas} onDelete={handleDelete} onSort={handleSort} />
        </>
        )}

        <ToastContainer />
      </div>
    </>
  )
}

export default App
