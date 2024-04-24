import './ExploreContainer.css';
import { IonIcon } from '@ionic/react';
import { logoInstagram } from 'ionicons/icons';


interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">
      <strong>{name}</strong>
      <p>Follow my Instagram <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/frnzsiscus/"><IonIcon icon={logoInstagram} /></a></p>
    </div>
  );
};

export default ExploreContainer;
