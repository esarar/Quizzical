import { nanoid } from "nanoid";
import React from "react";

function Options({ categoryData, getData, isSelected }) {
  const getCategories = Array.from(categoryData).map((cat) => {
    return (
      <option key={nanoid()} value={cat.id}>
        {cat.name}
      </option>
    );
  });

  return (
    <section className="options">
      <div className="options--container">
        <div className="option--selection">
          <label className="custom-label" htmlFor="category">
            Category
          </label>
          <select
            name="category"
            id="category"
            className="custom-select"
            value={getData.category}
            onChange={isSelected}
          >
            <option value="" key={nanoid()}>
              Any Category
            </option>
            {getCategories}
          </select>
        </div>
        <div className="option--selection">
          <label className="custom-label" htmlFor="difficulty">
            Difficulty
          </label>
          <select
            name="difficulty"
            id="difficulty"
            className="custom-select"
            value={getData.difficulty}
            onChange={isSelected}
          >
            <option value="" key={nanoid()}>
              Any Difficulty
            </option>
            <option value="easy" key={nanoid()}>
              Easy
            </option>
            <option value="medium" key={nanoid()}>
              Medium
            </option>
            <option value="hard" key={nanoid()}>
              Hard
            </option>
          </select>
        </div>
        <div className="option--selection">
          <label className="custom-label" htmlFor="type">
            Type
          </label>
          <select
            name="type"
            id="type"
            className="custom-select"
            value={getData.type}
            onChange={isSelected}
          >
            <option value="" key={nanoid()}>
              Any Type
            </option>
            <option value="multiple" key={nanoid()}>
              Multiple Choice
            </option>
            <option value="boolean" key={nanoid()}>
              True / False
            </option>
          </select>
        </div>
      </div>
    </section>
  );
}

export default Options;
