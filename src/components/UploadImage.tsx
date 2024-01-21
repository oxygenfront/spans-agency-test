import { FC, useMemo, useState } from 'react';
import { FaRegHeart, FaRegTrashAlt } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';

import { changeFavoritesUploads } from '../redux/slices/FavoritesSlice';
import { AppDispatch } from '../redux/store';

interface IUploadImageProps {
  arrayFavorites: File[]
  file: File,
  key: number,
}

const UploadImage: FC<Omit<IUploadImageProps, 'key'>> = ({ arrayFavorites, file }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isHoveredLike, setIsHoveredLike] = useState<boolean>(false);

  const dispatch: AppDispatch = useDispatch();

  const handleChangeFavorites = () => {
    dispatch(changeFavoritesUploads(file));
  };
  const uploadImage = useMemo(() => URL.createObjectURL(file), [file]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseEnterLike = () => {
    setIsHoveredLike(true);
  };
  const handleMouseLeaveLike = () => {
    setIsHoveredLike(false);
  };
  return (
    <div
      className="main-left_images-item"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="main-left_images-item" onClick={() => console.log('Клик!')} type="button"><img alt="" src={uploadImage} /></button>
      <button
        className="main-left_images-item_button like"
        onClick={handleChangeFavorites}
        onMouseEnter={handleMouseEnterLike}
        onMouseLeave={handleMouseLeaveLike}
        type="button"
      >
        {isHoveredLike ? <FaHeart /> : <FaRegHeart />}
      </button>
      {isHovered && <button className="main-left_images-item_button delete" type="button"><FaRegTrashAlt /></button>}

    </div>
  );
};

export default UploadImage;