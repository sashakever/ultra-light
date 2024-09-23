'use server';

import React, {FC, Suspense} from 'react';
import {match} from 'ts-pattern';

import {StrapiService} from '@base/services';

import {
  AreaSection,
  BestSellingSection,
  CardsSection,
  CategoriesSection,
  GetShoppingSection,
  HeroHomeSection,
  InstafeedSection,
  NewArrivalsSection,
} from '@widgets';

import {PageTypeEnum, SectionVariantsType} from '@shared/types';

async function getData(lang: string) {
  try {
    const sections = await StrapiService.instance.requestSections(
      lang,
      PageTypeEnum.HOME_PAGE,
    );

    return {sections};
  } catch (error) {
    console.error('Error:', error);
    return {
      status: 500,
      error: 'Error receiving data',
    };
  }
}

type Props = {
  params: {lang: string};
};

export async function generateMetadata({params}: Props) {
  const strapiMetadata = await StrapiService.instance.requestMetadata(
    params.lang,
    PageTypeEnum.HOME_PAGE,
  );
  return {
    title: strapiMetadata?.title,
    description: strapiMetadata?.description,
  };
}

const Home: FC<Props> = async ({params: {lang}}) => {
  const {sections} = await getData(lang);

  return (
    <div className='flex flex-col'>
      <Suspense>
        {sections?.map((section: SectionVariantsType) =>
          match(section)
            .with({__component: 'page.hero-section'}, (sectionInstance) => (
              <HeroHomeSection section={sectionInstance} />
            ))
            .with(
              {__component: 'page.home-categories-section'},
              (sectionInstance) => (
                <CategoriesSection section={sectionInstance} />
              ),
            )
            .with(
              {__component: 'page.home-cards-section'},
              (sectionInstance) => <CardsSection section={sectionInstance} />,
            )
            .with({__component: 'page.area-section'}, (sectionInstance) => (
              <AreaSection section={sectionInstance} />
            ))
            .with(
              {__component: 'page.new-arrivals-section'},
              (sectionInstance) => (
                <NewArrivalsSection section={sectionInstance} />
              ),
            )
            .with(
              {__component: 'page.best-selling-section'},
              (sectionInstance) => (
                <BestSellingSection section={sectionInstance} />
              ),
            )
            .with(
              {__component: 'page.home-get-shopping-section'},
              (sectionInstance) => (
                <GetShoppingSection section={sectionInstance} />
              ),
            )
            .with({__component: 'page.instafeed'}, (sectionInstance) => (
              <InstafeedSection section={sectionInstance} />
            ))
            .otherwise(() => null),
        )}
      </Suspense>
    </div>
  );
};

export default Home;
