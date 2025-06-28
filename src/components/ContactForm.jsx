import { useState } from 'react';
import React from 'react';
function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Ism kiritilishi shart";
    if (!formData.email.includes('@')) newErrors.email = "To'g'ri email kiriting";
    if (!formData.message) newErrors.message = "Xabar kiritilishi shart";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    alert("Ma'lumotlar yuborildi!");
    setFormData({ name: '', email: '', message: '' });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md">
      <div className="mb-4">
        <label className="block text-gray-700">Ism</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full border p-2 rounded ${errors.name ? 'border-red-500' : ''}`}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full border p-2 rounded ${errors.email ? 'border-red-500' : ''}`}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Xabar</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className={`w-full border p-2 rounded ${errors.message ? 'border-red-500' : ''}`}
        ></textarea>
        {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
      </div>
      <button type="submit" className="bg-ilm-blue text-white px-6 py-2 rounded hover:bg-blue-700">
        Yuborish
      </button>
    </form>
  );
}

export default ContactForm;