import React, { useState } from 'react';
import './Submit.css'
const Submit= () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    websiteUrl: '',
    contactEmail: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    alert('Form submitted successfully!');
  };

  return (
    <div class="container bg-white">
    {/* Left Column */}
    <div className="column left-column ">
      <h2 className='text-primary'>Submit Your AI Tool</h2>
      <p>
        Have an innovative AI tool? Submit it to our platform and reach thousands of potential users. Our automated system will review and integrate your tool seamlessly.
      </p>
      <div class="feature-list">
        <div class="feature-item">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p>Automatic tool integration</p>
        </div>
        <div class="feature-item">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p>Reach targeted audience</p>
        </div>
        <div class="feature-item">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p>Analytics dashboard access</p>
        </div>
      </div>
    </div>

    {/* Right Column */}
    <div className="column right-column shadow-lg ">
    <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="flex name">
            <label htmlFor="name" className="text-sm font-medium text-black m-2 ">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder='      '
              value={formData.name}
              onChange={handleChange}
              className=" w-50 rounded-lg border  focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Category */}
          <div className=" flex cost">
            <label htmlFor="category" className="text-black font-medium text-gray-700">Category :</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className=" r1  px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a category</option>
              <option value="Content Creation">Content Creation</option>
              <option value="Development">Development</option>
              <option value="Data Analysis">Data Analysis</option>
              <option value="Image Processing">Image Processing</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Website URL */}
          <div className="">
            <label htmlFor="websiteUrl" className=" text-black font-medium text-gray-700 mb-2">Website URL :</label>
            <input
              type="url"
              id="websiteUrl"
              name="websiteUrl"
              value={formData.websiteUrl}
              onChange={handleChange}
              className=" "
              required
            />
          </div>

          {/* Aitool Image */}
          <div className='url1'>
            <label htmlFor="AitoolImage" className="text-sm font-medium text-gray-700 mb-2 text-black">Aitool Image URL :</label>
            <input
              type="url"
              id="AitoolImage"
              name="AitoolImage"
              value={formData.AitoolImage}
              onChange={handleChange}
              className=" px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Cost */}
          <div className='cat1'>
            <label htmlFor="cost" className=" text-sm font-medium text-gray-700 mb-2 text-black pl-0">Cost :</label>
            <select
              id="cost"
              name="cost"
              value={formData.cost}
              onChange={handleChange}
              className=" r1 px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a cost option</option>
              <option value="Free">Free</option>
              <option value="Paid">Paid</option>
              <option value="Freemium">Freemium</option>
              <option value="Free Trial">Free Trial</option>
              <option value="Active deal">Active deal</option>
            </select>
          </div>

          {/* Description */}

          <div className='d-flex des'>
               <p className='text-black m-3'>Description:</p>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb- text-black"></label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition duration-300"
          >
            Submit Tool
          </button>
        </form>
    </div>
  </div>
  )
}

export default Submit;
