// src/components/RecipeDisplay.js
import React from 'react';

const RecipeDisplay = ({ recipe }) => {
    return (
        <div>
            <h2>Suggested Recipe:</h2>
            <p>{recipe}</p>
        </div>
    );
};

export default RecipeDisplay;