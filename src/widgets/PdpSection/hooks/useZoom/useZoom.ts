import {RefObject, useState} from 'react';

type UseZoomReturnType = {
  isZoomed: boolean;
  handleMouseMove: (event: React.MouseEvent<HTMLDivElement>) => void;
  zoom: () => void;
  unZoom: () => void;
};

const useZoom = (imageRef: RefObject<HTMLImageElement>): UseZoomReturnType => {
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || !imageRef.current) return;

    const container = event.currentTarget;
    const image = imageRef.current;

    const containerRect = container.getBoundingClientRect();

    const x = event.clientX - containerRect.left;
    const y = event.clientY - containerRect.top;

    const xPercent = (x / containerRect.width) * 100;
    const yPercent = (y / containerRect.height) * 100;

    image.style.transformOrigin = `${xPercent}% ${yPercent}%`;
  };

  const zoom = () => {
    setIsZoomed(true);
  };

  const unZoom = () => {
    setIsZoomed(false);
  };

  return {isZoomed, handleMouseMove, zoom, unZoom};
};

export default useZoom;
