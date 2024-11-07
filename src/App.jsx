/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import './App.css'
import Table from './components/Table'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import Form from './components/Form'
import EditModal from './components/EditModal'
import 'react-toastify/dist/ReactToastify.css';
// import { data } from 'autoprefixer'


function App() {
  const [datas, setDatas] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [sortKey, setSortKey] = useState(null)
  const [sortOrder, setSortOrder] = useState('ascending');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);


  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('users'));
    if (savedUsers && savedUsers.length > 0) {
      setDatas(savedUsers)
      // console.log(datas)
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
        id: (user.id).toString(),
        email: `${user.login}@example.com`,
        age: Math.floor(Math.random() * 50) + 18,
        membershipStatus: Math.random() > 0.5 ? 'active' : 'inactive',
      }));
      setDatas(fetcedData);
      localStorage.setItem('users', JSON.stringify(fetcedData));
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
    try {
      const id = uuidv4();
      const newUser = { id, ...user, age: parseInt(user.age) };

      // Tambahkan user baru ke dalam state 'datas'
      setDatas((prevDatas) => {
        const updatedData = [...prevDatas, newUser];
        // Simpan data yang diperbarui ke localStorage
        localStorage.setItem('users', JSON.stringify(updatedData));
        return updatedData;
      });

      // Tampilkan notifikasi sukses
      toast.success('User added successfully');
    } catch (error) {
      // Tangani error yang terjadi saat menambahkan user
      toast.error(`Failed to add user: ${error.message}`);
    }
  };


  // handle delete data
  const handleDelete = (id) => {
    const updatedUsers = datas.filter((user) => user.id !== id);
    setDatas(updatedUsers);
    toast.success('User deleted successfully');
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  // Menangani pembukaan modal
  const handleEditClick = (user) => {
    setUserToEdit(user);
    setIsModalOpen(true);
  };

  // Menangani penyimpanan data yang sudah diedit
  const handleSave = (updatedUser) => {

    // Ambil data dari localStorage
    let data = JSON.parse(localStorage.getItem('users')) || [];

    // Map melalui data dan update user yang cocok berdasarkan id
    const updatedData = data.map((user) => {

      // Pastikan perbandingan ID tidak bergantung pada tipe data
      if (user.id == updatedUser.id) {  // Perbandingan longgar di sini
        return {
          ...user,
          name: updatedUser.name,
          email: updatedUser.email,
          age: parseInt(updatedUser.age),
          membershipStatus: updatedUser.membershipStatus,
        };
      }
      return user;
    });


    // Simpan data yang sudah diupdate kembali ke localStorage
    localStorage.setItem('users', JSON.stringify(updatedData));

    // Update state atau tampilkan notifikasi
    setDatas(updatedData);
    toast.success("User data has been successfully saved.");
  };




  // Menangani penutupan modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUserToEdit(null);
  };

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
        <h3 className='text-center text-2xl font-medium'>Management User</h3>
        <p className='text-start text-lg font-semibold underline decoration-blue-400 '>Tambah Data</p>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (<>
          <Form onAddUser={handleAddUser} />
          <Table datas={datas} onDelete={handleDelete} onSort={handleSort} onEdit={handleEditClick} />
          <EditModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSave={handleSave}
            userData={userToEdit}
          />
        </>
        )}

        <ToastContainer />
      </div>
    </>
  )
}

export default App
