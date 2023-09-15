"use client";

import React, { ChangeEvent } from "react";

type FilterProps = {
  movie: {
    title: string;
    releaseDate: string;
    oscarWinner: boolean;
    file: File | null;
  };
  isEditing: boolean;
  setMovie: (data: any) => void;
  onSubmit: () => void;
  updateMovie: () => void;
};

const FilterMovie: React.FC<FilterProps> = ({
  movie,
  setMovie,
  onSubmit,
  isEditing,
  updateMovie,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, files } = e.target;
    setMovie((prev: any) => ({
      ...prev,
      [name]:
        name === "oscarWinner" ? checked : name === "file" ? files?.[0] : value,
      filename: files?.[0]?.name || "",
    }));
  };

  const handleSubmit = () => {
    isEditing ? updateMovie() : onSubmit();
  };

  return (
    <div className="flex space-x-3 mb-4 px-4">
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Movie title..."
        value={movie.title}
        onChange={handleChange}
        className="px-3 py-2 border rounded-md w-1/3"
      />
      <input
        type="number"
        name="releaseDate"
        id="releaseDate"
        placeholder="Movie release date..."
        value={movie.releaseDate}
        onChange={handleChange}
        className="px-3 py-2 border rounded-md w-1/3"
      />
      <input type="file" name="file" onChange={handleChange} />
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="oscarWinner"
          id="oscarWinner"
          checked={movie.oscarWinner}
          onChange={handleChange}
        />
        <span>Oscar Award Winner</span>
      </label>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        onClick={handleSubmit}
      >
        {isEditing ? "Update Movie" : "Add Movie"}
      </button>
    </div>
  );
};

export default FilterMovie;
