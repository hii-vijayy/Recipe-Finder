import React from 'react';
import '../App.css';

const RecipeDetails = ({ recipe }) => {
    return (
        <div className="recipe-details">
            {/* Recipe Name */}
            <h1>{recipe.name}</h1>

            {/* Recipe Description (if available) */}
            {recipe.description && <p>{recipe.description}</p>}

            {/* Ingredients Section */}
            {recipe.ingredients.length > 0 && (
                <div className="recipe-section">
                    <h3>Ingredients</h3>
                    <div className="ingredients-list">
                        {recipe.ingredients.map((ingredient, index) => (
                            <p key={index} className="ingredient-item">{ingredient}</p>
                        ))}
                    </div>
                </div>
            )}

            {/* Instructions Section */}
            {recipe.instructions.length > 0 && (
                <div className="recipe-section">
                    <h3>Instructions</h3>
                    <div className="instructions-list">
                        {recipe.instructions.map((instruction, index) => (
                            <p key={index} className="instruction-item">{instruction}</p>
                        ))}
                    </div>
                </div>
            )}

            {/* Tips Section */}
            {recipe.tips.length > 0 && (
                <div className="recipe-section">
                    <h3>Tips</h3>
                    <div className="tips-list">
                        {recipe.tips.map((tip, index) => (
                            <p key={index} className="tip-item">{tip}</p>
                        ))}
                    </div>
                </div>
            )}

            {/* Conclusion or Enjoyment Message */}
            <div className="enjoy-message">
                <h3>Enjoy your meal!</h3>
                <p>This recipe is sure to delight your taste buds. Happy cooking!</p>
            </div>
        </div>
    );
};

export default RecipeDetails;