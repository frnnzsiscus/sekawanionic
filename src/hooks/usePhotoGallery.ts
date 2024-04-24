import { useState, useEffect } from "react";

const PHOTO_STORAGE = 'photos';

export function usePhotoGallery() {
  const [photos, setPhotos] = useState<UserPhoto[]>([]);

  useEffect(() => {
    const loadSaved = async () => {
      const photosString = localStorage.getItem(PHOTO_STORAGE);
      const photosInLocalStorage = photosString ? JSON.parse(photosString) : [];
      setPhotos(photosInLocalStorage);
    };
    loadSaved();
  }, []);

  const takePhoto = async () => {
    // Take a photo
  };

  const savePicture = async (photo: string): Promise<void> => {
    const newPhotos = [{ filepath: photo }, ...photos];
    setPhotos(newPhotos);
    localStorage.setItem(PHOTO_STORAGE, JSON.stringify(newPhotos));
  };

  const deletePhoto = async (photo: UserPhoto) => {
    const newPhotos = photos.filter(p => p.filepath !== photo.filepath);
    setPhotos(newPhotos);
    localStorage.setItem(PHOTO_STORAGE, JSON.stringify(newPhotos));
  };

  return {
    deletePhoto,
    photos,
    takePhoto,
    savePicture
  };
}

export interface UserPhoto {
  filepath: string;
}
