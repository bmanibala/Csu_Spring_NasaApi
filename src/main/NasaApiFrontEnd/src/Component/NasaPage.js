import React, { useEffect, useState } from 'react';

function NasaPage() {
  const [inputs, setInputs] = useState({
    date: '',
    fromDate: '',
    toDate: '',
    count: 1,
  });
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchImages();
  };

  const fetchImages = async () => {
    const apiKey = 'YOUR_NASA_API_KEY'; 
    let url = `http://localhost:8080/apod?api_key=${apiKey}&`;

    if (inputs.date) {
      url += `date=${inputs.date}`;
    } else if (inputs.fromDate && inputs.toDate) {
      url += `start_date=${inputs.fromDate}&end_date=${inputs.toDate}`;
    }

    if (inputs.count) {
      url += `&count=${inputs.count}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      setImages(Array.isArray(data) ? data : [data]); 
    } catch (error) {
      console.error('Failed to fetch data from NASA API', error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div>
      <h1>NASA Images</h1>
      <form onSubmit={handleSubmit}>
        <input name="date" type="date" value={inputs.date} onChange={handleChange} />
        <input name="fromDate" type="date" value={inputs.fromDate} onChange={handleChange} />
        <input name="toDate" type="date" value={inputs.toDate} onChange={handleChange} />
        <input name="count" type="number" value={inputs.count} onChange={handleChange} />
        <button type="submit">Fetch Images</button>
      </form>
      <div>
        {images.map((image, index) => (
          <div key={index}>
            <h3>{image.title}</h3>
            <img src={image.url} alt={image.title} width="500" />
            <p>{image.date}</p>
            <p>{image.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NasaPage;