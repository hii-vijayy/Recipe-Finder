import React, { useState } from 'react';

const RecipeForm = ({ onSubmit, loading }) => {
    const [dishType, setDishType] = useState(''); // State for dish type

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(dishType); // Pass the dish type to the onSubmit function
    };

    return (
        <form onSubmit={handleSubmit} className='App'>
            <div className="search-container">
            <input
                type="text"
                placeholder="Enter dish type (e.g., pizza, cake)"
                value={dishType}
                onChange={(e) => setDishType(e.target.value)}
                required
                className='search-input'
            />
            <button type="submit" disabled={loading} className='search-button'>
                {loading ? 'Loading...' : 'Get Recipe'}
            </button>
            </div>
        </form>
    );
};

export default RecipeForm;