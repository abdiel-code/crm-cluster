import React, { useState } from 'react'
import axios from 'axios';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post('http://localhost:3030/api/auth/register', formData);

      setMessage(response.data.message);

      console.log(response);

      setFormData({
        name: '',
        email: '',
        password: '',
      });

    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "An error occurred while registering.");
    }

  };


  return (
    <div>
      <form>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <button type="submit" onClick={handleSubmit}>Register</button>
      </form>

      {message && <p>{message}</p>}

    </div>
  );
}

export default RegisterPage
