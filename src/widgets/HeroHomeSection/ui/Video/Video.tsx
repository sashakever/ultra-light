import clsx from 'clsx';
import React, {FC, useEffect, useRef} from 'react';

type Props = {
  className?: string;
  isPlayed?: boolean;
  src: string;
};

const Video: FC<Props> = ({isPlayed, src, className = ''}) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (ref?.current) {
      if (isPlayed) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        ref.current.play();
      } else {
        ref.current.pause();
      }
    }
  }, [ref?.current, isPlayed]);

  return (
    <video
      src={src}
      controls={false}
      autoPlay
      playsInline
      loop
      muted
      className={clsx(className)}
      ref={ref}
    />
  );
};

export default Video;
