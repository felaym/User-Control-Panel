import './App.css';

import { useEffect, useState } from 'react';

import { createUser, deleteUser, getUsers, updateUser } from './api';

interface User {
  _id: string;
  name: string;
  email: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState<Omit<User, '_id'>>({ name: '', email: '' });
  const [editData, setEditData] = useState<{ id: string | null } & Omit<User, '_id'>>({
    id: null,
    name: '',
    email: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error instanceof Error ? error.message : 'Unknown error');
    }
  };

  const clearInput = () => {
    setFormData({ name: '', email: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createUser(formData);
    clearInput();
    await fetchUsers();
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editData.id) return;
    await updateUser(editData.id, { name: editData.name, email: editData.email });
    setEditData({ id: null, name: '', email: '' });
    await fetchUsers();
  };

  const handleEditClick = (user: User) => {
    setEditData({
      id: user._id,
      name: user.name,
      email: user.email
    });
  };

  const handleDeleteUser = async (userId: string) => {
    await deleteUser(userId);
    await fetchUsers();
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
                className='delete-button'
                onClick={() => handleDeleteUser(user._id)}
              >
                Delete
              </button>
              <button onClick={() => handleEditClick(user)}>
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
