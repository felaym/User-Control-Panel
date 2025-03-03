import { useEffect, useState } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from './api';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [editData, setEditData] = useState({ id: null, name: '', email: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser(formData);
    setFormData({ name: '', email: '' });
    fetchUsers();
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await updateUser(editData.id, { name: editData.name, email: editData.email });
    setEditData({ id: null, name: '', email: '' });
    fetchUsers();
  };

  return (
    <div className="container">
      <h1>User Management</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <button type="submit">Add User</button>
      </form>

      <h2>All Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <span>
              {user.name} ({user.email})
            </span>
            <div>
              <button
                onClick={() => deleteUser(user._id).then(fetchUsers)}
                style={{ backgroundColor: '#ff6d62', marginLeft: '8px' }}
              >
                Delete
              </button>
              <button
                onClick={() => setEditData({
                  id: user._id,
                  name: user.name,
                  email: user.email
                })}
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editData.id && (
        <>
          <h2>Edit User</h2>
          <form onSubmit={handleEditSubmit}>
            <input
              type="text"
              placeholder="New Name"
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="New Email"
              value={editData.email}
              onChange={(e) => setEditData({ ...editData, email: e.target.value })}
              required
            />
            <button type="submit">Update User</button>
          </form>
        </>
      )}
    </div>
  );
}

export default App;
