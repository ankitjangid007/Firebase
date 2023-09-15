"use client";

import React, { useEffect, useState } from "react";
import { auth, db, storage } from "../config/firebase-config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import AddMovie from "../components/AddMovie";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import Header from "../components/Header";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

type Movie = {
  id: string;
  title: string;
  releaseDate: string;
  oscarWinner: boolean;
  userId: string | undefined;
  file: File | null;
  filename: string;
};

const Movies = () => {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [movie, setMovie] = useState<Movie>({
    id: "",
    title: "",
    releaseDate: "",
    oscarWinner: false,
    userId: auth?.currentUser?.uid || "",
    file: null,
    filename: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [movieDoc, setMovieDoc] = useState<Movie | null | any>(null);

  const movieCollectionRef = collection(db, "movies");

  const getMovieList = async (): Promise<void> => {
    try {
      const data = await getDocs(movieCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Movie[];
      setMovieList(filteredData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const fetchFile = async (filename: string) => {
    try {
      const fileRef = ref(storage, `projectFiles/${filename}`);
      const downloadURL = await getDownloadURL(fileRef);
      return `${downloadURL}`;
    } catch (error) {
      console.error("Error fetching file:", error);
      return null;
    }
  };

  const onSubmit = async (): Promise<void> => {
    const { file, ...restOfMovie } = movie;
    try {
      if (!file) {
        throw new Error("No file selected.");
      }
      const fileFolderRef = ref(storage, `projectFiles/${file.name}`);
      await uploadBytesResumable(fileFolderRef, file);
      await addDoc(movieCollectionRef, { ...restOfMovie, file: file.name });
    } catch (error: unknown) {
      console.log("Error:", error);
    } finally {
      getMovieList();
      clearState();
    }
  };

  const deleteMovie = async (id: string): Promise<void> => {
    try {
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
    } catch (error: unknown) {
      console.log("Error:", error);
    } finally {
      getMovieList();
    }
  };

  const editMovie = async (id: string): Promise<void> => {
    try {
      const movieDoc = doc(db, "movies", id);
      setMovieDoc(movieDoc);
      const docSnapshot = await getDoc(movieDoc);

      if (docSnapshot.exists()) {
        const movieData: any = { ...docSnapshot.data(), id: docSnapshot.id };

        setMovie(movieData);
        setIsEditing(true);
      } else {
        console.log("Document does not exist.");
      }
    } catch (error: unknown) {
      console.log("Error:", error);
    }
  };

  const updateMovie = async (): Promise<void> => {
    try {
      await updateDoc(movieDoc, movie);
      clearState();
      setMovieDoc(null);
      setIsEditing(false);
    } catch (error: unknown) {
      console.log("Error:", error);
    } finally {
      getMovieList();
    }
  };

  const clearState = (): void => {
    setMovie((prev) => ({
      ...prev,
      id: "",
      title: "",
      releaseDate: "",
      oscarWinner: false,
      file: null,
      filename: "",
    }));
  };

  return (
    <div className="w-full">
      <Header />

      <AddMovie
        movie={movie}
        setMovie={setMovie}
        onSubmit={onSubmit}
        isEditing={isEditing}
        updateMovie={updateMovie}
      />
      <hr className="mb-10" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-4">
        {movieList.map((movie: Movie, index) => (
          <div
            key={movie.id}
            className="bg-white p-4 border rounded-md shadow-md transition transform hover:scale-105"
          >
            <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
            <div className="flex justify-between">
              <p className="text-gray-500 mb-2">
                Release Date: {movie.releaseDate}
              </p>
              {movie.oscarWinner && (
                <span className="text-green-500 mb-2">Oscar Award Winner</span>
              )}
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => editMovie(movie.id)}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
              >
                <BiEdit />
              </button>
              <button
                onClick={() => deleteMovie(movie.id)}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none"
              >
                <AiFillDelete />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
