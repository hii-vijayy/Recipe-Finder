// src/App.js
import React, { useState } from 'react';
import RecipeForm from './Components/RecipeForm';
import RecipeDetails from './Components/RecipeDetails'; // Updated import
import ErrorMessage from './Components/ErrorMessage';

function App() {
    const [recipe, setRecipe] = useState({ ingredients: [], instructions: [], tips: [] }); // Initialize with empty arrays
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const parseRecipe = (recipeText) => {
        const sections = {
            ingredients: [],
            instructions: [],
            tips: [],
        };

        const lines = recipeText.split('\n');

        let currentSection = null;
        lines.forEach(line => {
            line = line.trim();
            if (line.toLowerCase().includes("ingredients")) {
                currentSection = 'ingredients';
            } else if (line.toLowerCase().includes("instructions")) {
                currentSection = 'instructions';
            } else if (line.toLowerCase().includes("tips")) {
                currentSection = 'tips';
            } else if (currentSection) {
                sections[currentSection].push(line);
            }
        });

        return sections;
    };

    const handleRecipeRequest = async (dishType) => {
        setLoading(true);
        setError('');

        // Check if dishType is provided
        if (!dishType) {
            setError('Please enter a dish type.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${import.meta.env.VITE_APP_GOOGLE_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                { text: `Suggest a recipe for ${dishType}.` }
                            ]
                        }
                    ]
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error: ${response.status} - ${errorData.error.message || "Network response was not ok"}`);
            }

            const data = await response.json();
            console.log('API Response:', data); // Log the entire response

            if (data.candidates && data.candidates.length > 0) {
                const recipeText = data.candidates[0].content.parts[0].text; // Access the recipe text
                const parsedRecipe = parseRecipe(recipeText);
                setRecipe(parsedRecipe);
            } else {
                throw new Error('No content returned from API');
            }
        } catch (err) {
            setError(err.message);
            console.error('Error fetching recipe:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Food Assistant</h1>
            <RecipeForm onSubmit={handleRecipeRequest} loading={loading} />
            <ErrorMessage message={error} />
            {recipe.ingredients.length > 0 && <RecipeDetails recipe={recipe} />} {/* Use RecipeDetails component */}
        </div>
    );
}

export default App;