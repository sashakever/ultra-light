import {Metadata} from 'next';

import {
  MetadataType,
  PageTypeEnum,
  SectionsType,
  StrapiAccountPageType,
  StrapiCollectionBannersType,
  StrapiPageType,
  StrapiSystemDatasetType,
} from '@shared/types';

export default class StrapiService {
  private url = process.env.STRAPI_URL;

  static get instance() {
    return new StrapiService();
  }

  // eslint-disable-next-line class-methods-use-this
  private async strapiRequest(url: string): Promise<StrapiPageType | null> {
    try {
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      });
      const data = await response.json();

      return await (data as Promise<StrapiPageType>);
    } catch (error) {
      console.log('error -> ', error);
    }

    return null;
  }

  async requestSystemDataset(
    locale: string,
  ): Promise<StrapiSystemDatasetType['data']['attributes'] | undefined> {
    const urlFull = `${
      this.url
    }/api/system-dataset?locale=${locale.toLocaleLowerCase()}&populate=deep`;

    const strapiData = (await this.strapiRequest(
      urlFull,
    )) as unknown as StrapiSystemDatasetType;

    return strapiData && strapiData.data
      ? strapiData.data?.attributes
      : undefined;
  }

  async requestAccountPage(
    locale: string,
  ): Promise<StrapiAccountPageType['data']['attributes'] | undefined> {
    const urlFull = `${
      this.url
    }/api/account-page?locale=${locale.toLocaleLowerCase()}&populate=deep`;

    const strapiData = (await this.strapiRequest(
      urlFull,
    )) as unknown as StrapiAccountPageType;

    return strapiData && strapiData.data
      ? strapiData.data?.attributes
      : undefined;
  }

  async requestSections(
    locale: string,
    slug: PageTypeEnum | string,
  ): Promise<SectionsType> {
    const urlFull = `${
      this.url
    }/api/pages?locale=${locale.toLocaleLowerCase()}&filters[slug][$eq]=${slug}&populate=deep`;
    const strapiData = await this.strapiRequest(urlFull);

    const strapiSections =
      strapiData && strapiData.data
        ? strapiData?.data[0]?.attributes?.Dynamic
        : [];

    return strapiSections;
  }

  async requestMetadata(
    locale: string,
    slug: PageTypeEnum | string,
  ): Promise<MetadataType> {
    const urlFull = `${
      this.url
    }/api/pages?locale=${locale.toLocaleLowerCase()}&filters[slug][$eq]=${slug}&populate=deep`;
    const strapiData = await this.strapiRequest(urlFull);

    const title =
      strapiData && strapiData.data
        ? strapiData?.data[0]?.attributes?.Title
        : '';

    const description =
      strapiData && strapiData.data
        ? strapiData?.data[0]?.attributes?.Description
        : '';

    const strapiMetadata = {title, description};

    return strapiMetadata;
  }

  async requestSectionsAndMetadata(
    locale: string,
    slug: PageTypeEnum | string,
  ): Promise<{sections: SectionsType; metadata: Metadata | null}> {
    const urlFull = `${
      this.url
    }/api/pages?locale=${locale.toLocaleLowerCase()}&filters[slug][$eq]=${slug}&populate=deep`;
    const strapiData = await this.strapiRequest(urlFull);

    const page = strapiData?.data[0]?.attributes;
    const metadata: Metadata | null = page
      ? {
          title: page.Title,
          description: page.Description,
          keywords: page.Keywords,
        }
      : null;

    const sections =
      strapiData && strapiData.data
        ? strapiData?.data[0]?.attributes?.Dynamic
        : [];

    return {sections, metadata};
  }

  async requestLayout(locale: string): Promise<StrapiPageType> {
    const urlFull = `${
      this.url
    }/api/pages?locale=${locale.toLocaleLowerCase()}&filters[slug][$eq]=layout&populate=deep`;
    const strapiData = await this.strapiRequest(urlFull);

    // @ts-ignore
    return strapiData && strapiData.data ? strapiData : [];
  }

  async requestCollectionBanners(
    locale: string,
    handle: string,
  ): Promise<StrapiCollectionBannersType | undefined> {
    const urlFull = `${
      this.url
    }/api/collection-banners?locale=${locale.toLocaleLowerCase()}&filters[CollectionHandle][$eq]=${handle}&populate=deep`;

    const strapiData = await this.strapiRequest(urlFull);
    // @ts-ignore
    return strapiData &&
      strapiData.data &&
      Array.isArray(strapiData.data) &&
      strapiData.data[0]
      ? strapiData.data[0]
      : undefined;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  async requestCollectionTypeItem<T>(
    locale: string,
    slug: string,
    type: 'articles' | 'products',
  ): Promise<T | undefined> {
    const urlFull = `${
      this.url
    }/api/${type}?locale=${locale.toLocaleLowerCase()}&filters[Slug][$eq]=${slug}&populate=deep`;
    const strapiData = await this.strapiRequest(urlFull);

    // @ts-ignore
    return strapiData && strapiData.data[0] && strapiData.data[0]?.attributes
      ? strapiData.data[0].attributes
      : undefined;
  }
}
