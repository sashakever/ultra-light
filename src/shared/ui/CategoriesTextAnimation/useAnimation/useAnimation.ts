import {gsap} from 'gsap';
import {MutableRefObject, useLayoutEffect} from 'react';

const useAnimation = (containerRef: MutableRefObject<HTMLElement | null>) => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {duration: 2},
        paused: false,
        repeat: -1,
        smoothChildTiming: true,
      });

      tl.add(() => {}, '+=2')
        .set('[data-panel]', {yPercent: 0})
        .set('[data-container]', {width: '100%'})
        .to(
          '[data-panel]',
          {yPercent: 33.3, duration: 0.5, ease: 'back.out(1.7)'},
          'step1',
        )
        .to(
          '[data-left="1"]',
          {xPercent: 12, duration: 0.5, ease: 'back.out(1.7)'},
          'step1',
        )
        .to(
          '[data-right="1"]',
          {xPercent: -12, duration: 0.5, ease: 'back.out(1.7)'},
          'step1',
        )
        .add(() => {}, '+=2')
        .to(
          '[data-panel]',
          {yPercent: 66.6, duration: 0.5, ease: 'back.out(1.7)'},
          'step2',
        )
        .to(
          '[data-left="1"]',
          {xPercent: 10, duration: 0.5, ease: 'back.out(1.7)'},
          'step2',
        )
        .to(
          '[data-right="1"]',
          {xPercent: -10, duration: 0.5, ease: 'back.out(1.7)'},
          'step2',
        )
        .add(() => {}, '+=2')
        .to(
          '[data-panel]',
          {yPercent: 0, duration: 0.5, ease: 'back.out(1.7)'},
          'step3',
        )
        .to(
          '[data-left="1"]',
          {xPercent: 0, duration: 0.5, ease: 'back.out(1.7)'},
          'step3',
        )
        .to(
          '[data-right="1"]',
          {xPercent: 0, duration: 0.5, ease: 'back.out(1.7)'},
          'step3',
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);
};

export default useAnimation;
