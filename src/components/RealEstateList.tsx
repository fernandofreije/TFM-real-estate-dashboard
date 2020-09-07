import { ReactElement } from 'react';
import { RealEstate } from '../models/RealEstate';
import styles from '../styles/RealEstateList.module.css';
import Loading from './Loading';
import { withSeparator } from '../util/NumberUtil';
import { Category } from '../models/Category';

interface RealestateListProps {
  realEstates: RealEstate[];
}

export default function RealEstateList({ realEstates }: RealestateListProps): ReactElement {
  if (!realEstates) {
    return <Loading />;
  }

  return (
    <div className={styles.listContainer}>
      {realEstates.map((realEstate) => (
        <div className={styles.realEstateContainer} key={realEstate.remote_id}>
          <img className={styles.image} src={realEstate.imageLink}></img>
          <div className={styles.realEstateData}>
            <span className={styles.title}>
              <a href={realEstate.link}>{realEstate.description}</a>
            </span>
            <span>Type: {realEstate.category === Category.HOUSE ? 'House' : 'Flat'}</span>
            <span>Price: {withSeparator(realEstate.price)} €</span>
            <span>Size: {withSeparator(realEstate.size)} m²</span>
            {realEstate.floor && <span>Floor: {withSeparator(realEstate.floor)} floor</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
