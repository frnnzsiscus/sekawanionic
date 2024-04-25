import React, { useState, useEffect } from "react";
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { Platform } from '@ionic/angular';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonImg,
  IonButton,
  IonAlert
} from "@ionic/react";
import { camera } from "ionicons/icons";
import "./Tab2.css";

const Tab2: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const savedImages = localStorage.getItem("images");
    if (savedImages) {
      setImages(JSON.parse(savedImages));
    }
  }, []);

  const saveImagesToStorage = (images: string[]) => {
    localStorage.setItem("images", JSON.stringify(images));
  };

  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });

    defineCustomElements(window);

    if (image.webPath) {
      const savedPath = image.webPath;
      setImages((prevImages) => [...prevImages, savedPath]);
      saveImagesToStorage([...images, savedPath]);
    } else {
      console.error("Image URL is undefined");
    }
  };

  const deleteImage = async (imageUrl: string) => {
    setImages((prevImages) => prevImages.filter((url) => url !== imageUrl));
    saveImagesToStorage(images.filter((url) => url !== imageUrl));
  };

  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<string | undefined>(undefined);

  const showDeleteConfirm = (imageUrl: string) => {
    setImageToDelete(imageUrl);
    setShowDeleteAlert(true);
  };

  const deleteImageConfirm = () => {
    deleteImage(imageToDelete!);
    setShowDeleteAlert(false);
  };

  const deleteImageCancel = () => {
    setShowDeleteAlert(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Galeri</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {images.map((imageUrl, index) => (
          <div key={index}>
            <IonImg src={imageUrl} alt="Foto" />
            <IonButton onClick={() => showDeleteConfirm(imageUrl)}>Hapus</IonButton>
          </div>
        ))}
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={takePicture}>
            <IonIcon icon={camera} />
          </IonFabButton>
        </IonFab>
      </IonContent>
      <IonAlert
        isOpen={showDeleteAlert}
        onDidDismiss={deleteImageCancel}
        header="Konfirmasi"
        message="Apakah Anda yakin ingin menghapus gambar ini?"
        buttons={[
          {
            text: "Batal",
            role: "cancel",
            cssClass: "secondary",
            handler: deleteImageCancel
          },
          {
            text: "Hapus",
            handler: deleteImageConfirm
          }
        ]}
      />
    </IonPage>
  );
};

export default Tab2;
