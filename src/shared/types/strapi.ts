import {Product} from '@shopify/hydrogen-react/storefront-api-types';
import {type BlocksContent} from '@strapi/blocks-react-renderer';

import {SortParamType} from '@shared/types/Shopify';

export type StrapiMediaType = {
  data: {
    id: number;
    attributes: {
      name: string;
      alternativeText: string | null;
      caption: string | null;
      width: number;
      height: number;
      formats?: {
        large: {
          ext: string;
          url: string;
          hash: string;
          mime: string;
          name: string;
          path: string | null;
          size: number;
          width: number;
          height: number;
        };
        small: {
          ext: string;
          url: string;
          hash: string;
          mime: string;
          name: string;
          path: string | null;
          size: number;
          width: number;
          height: number;
        };
        medium: {
          ext: string;
          url: string;
          hash: string;
          mime: string;
          name: string;
          path: string | null;
          size: number;
          width: number;
          height: number;
        };
        thumbnail: {
          ext: string;
          url: string;
          hash: string;
          mime: string;
          name: string;
          path: string | null;
          size: number;
          width: number;
          height: number;
        };
      };
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl: string | null;
      provider: string;
      provider_metadata: string | null;
      createdAt: string;
      updatedAt: string;
    };
  } | null;
};

export type StrapiRichTextType = {
  type: string | null;
  children: Array<{
    text: string | null;
    type: string | null;
  }>;
};

export type StrapiLinkType = {
  id: number;
  attributes: {
    Title: string;
    Href: string;
    Color: 'none' | 'Blue';
    Target: '_blank' | '_self';
    Icon: StrapiMediaType;
  };
};

export type StrapiContactUsBlockType = {
  data: {
    id: number;
    attributes: {
      Title: string;
      Phones: string;
      Schedule: string;
      Links: {
        data: StrapiLinkType[] | null;
      };
    };
  } | null;
};

export type StrapiJoinUsBlockType = {
  data: {
    id: number;
    attributes: {
      Title: string;
      Text: string;
      Links: {
        data: StrapiLinkType[];
      };
    } | null;
  };
};

export type StrapiNavigationBlockType = {
  id: number;
  attributes: {
    Name: string;
    Title: string;
    Links: {
      data: StrapiLinkType[];
    };
  };
};

export type StrapiCategoryType = {
  id: number;
  attributes: {
    Name: string | null;
    Title: string | null;
    Description: string | null;
    Href: string;
    ThumbImage: StrapiMediaType;
    MainImage: StrapiMediaType;
    ImageWithLight: StrapiMediaType;
    Links: {
      data: StrapiLinkType[];
    };
    Categories: {
      data: StrapiCategoryType[];
    };
  };
};

export type StrapiCartModalType = {
  data: {
    id: number;
    attributes: {
      Name: string | null;
      Title: string | null;
      ProductCountSingularText: string | null;
      ProductCountPluralText: string | null;
      OrderSummaryText: string | null;
      OrderAmountText: string | null;
      TotalAmountText: string | null;
      MightInterestedText: string | null;
      ContinueCheckoutText: string | null;
    };
  };
};

export type StrapiWishlistModalType = {
  data: {
    id: number;
    attributes: {
      Name: string | null;
      Title: string | null;
      ProductCountSingularText: string | null;
      ProductCountPluralText: string | null;
    };
  } | null;
};

export type StrapiProductReviewModalType = {
  data: {
    id: number;
    attributes: {
      Name: string | null;
      Title: string | null;
      EmailFieldText: string | null;
      NameFieldText: string | null;
      HeadlineFieldText: string | null;
      MessageFieldText: string | null;
      SendButtonText: string | null;
      RateText: string | null;
      ThanksTitle: string | null;
      ThanksSubtitle: string | null;
      ReviewDescription: StrapiRichTextType[];
      VerifyText: string | null;
      GoBackText: string | null;
    };
  } | null;
};

export type StrapiBackInStockModalType = {
  data: {
    id: number;
    attributes: {
      Name: string | null;
      FinishText: string | null;
      OutOfStockText: string | null;
      FirstNotifyText: string | null;
      EmailFieldText: string | null;
      SecondNotifyText: string | null;
      SendButtonText: string | null;
      RateText: string | null;
      AfterSubmitText: string | null;
      GoBackText: string | null;
    };
  } | null;
};

export type StrapiHeaderType = {
  data: {
    id: number;
    attributes: {
      Name: string;
      CategoryButtonTitle: string;
      SearchPlaceholder: string;
      ContactUsBlock: StrapiContactUsBlockType;
      JoinUsBlock: StrapiJoinUsBlockType;
      BottomLinks: {
        data: StrapiLinkType[];
      };
      NavigationBlocks: {
        data: StrapiNavigationBlockType[];
      };
      MainMenuLinks: {
        data: StrapiLinkType[];
      };
      Categories: {
        data: StrapiCategoryType[];
      };
      RecentSearchesTitle: string | null;
      RecentSearchesKeys: string | null;
      SearchResultsTitle: string | null;
      SearchCloseText: string | null;
      SearchSuggestionsTitle: string | null;
      SearchShowMoreText: string | null;
      SearchNoResultsTitle: string | null;
      SearchRecommendationTitle: string | null;
      SearchNoResultsSubtitle: string | null;
      SearchRecommendationSubtitle: string | null;
      SuggestionsProducts: {
        data: {attributes: StrapiProductType}[];
      };
      SearchRecommendedProducts: {
        data: {attributes: StrapiProductType}[];
      };
    } | null;
  };
};

export type StrapiFooterType = {
  data: {
    id: number;
    attributes: {
      Name: string | null;
      ContactUsBlock: StrapiContactUsBlockType;
      JoinUsBlock: StrapiJoinUsBlockType;
      BottomLinks: {
        data: StrapiLinkType[];
      } | null;
      NavigationBlocks: {
        data: StrapiNavigationBlockType[];
      };
    };
  };
};

export type StrapiButtonType = {
  Title: string | null;
  Link: string | null;
};

export type StrapiSlideType = {
  id: number;
  Name: string | null;
  Title: string | null;
  Subtitle: string | null;
  Text: string | null;
  ProductId: string | null;
  Product: Product | null;
  ButtonTitle: string | null;
  ButtonLink: string | null;
  ButtonColor: 'Black' | 'Blue' | 'White' | null;
  Icon: StrapiMediaType;
  ImageMobile: StrapiMediaType;
  ImageDesktop: StrapiMediaType;
  VideoMobile: StrapiMediaType;
  VideoDesktop: StrapiMediaType;
};

export type StrapiPointType = {
  id: number;
  Name: string | null;
  Title: string | null;
  Subtitle: string | null;
  ProductId: string | null;
  Product: Product | null;
  ImageMobile: StrapiMediaType;
  ImageDesktop: StrapiMediaType;
  XPercentMobile: number;
  YPercentMobile: number;
  XPercentDesktop: number;
  YPercentDesktop: number;
};

export type StrapiSortType = {
  id: number;
  Name: string | null;
  Type: SortParamType;
  Title: string | null;
};

export type StrapiBreadcrumbItemType = {
  id: number;
  Title: string | null;
  Link: string | null;
};

export type StrapiFaqType = {
  id: number;
  attributes: {
    Title: string | null;
    Text: string | null;
  };
};

export type StrapiArticleType = {
  Title: string | null;
  Description: string | null;
  Slug: string;
  Date: string | null;
  TimeToRead: string | null;
  TitleCategory: string | null;
  AuthorName: string | null;
  AuthorAvatar: StrapiMediaType;
  MainImageMobile: StrapiMediaType;
  MainImageDesktop: StrapiMediaType;
  ContentMarkdown: string | null;
  locale: string;
  publishedAt: string;
  Points: StrapiPointType[];
  Faqs: {
    data: StrapiFaqType[];
  };
  RelatedArticles: {
    data: {attributes: StrapiArticleType}[];
  };
};

export type StrapiInstaReelsItemType = {
  id: number;
  Poster: StrapiMediaType;
  Video: StrapiMediaType;
  Faqs: {
    data: StrapiFaqType[];
  };
};

export type StrapiProductVideoType = {
  id: number;
  Title: string | null;
  Text: string | null;
  VideoMobile: StrapiMediaType;
  VideoDesktop: StrapiMediaType;
  PosterMobile: StrapiMediaType;
  PosterDesktop: StrapiMediaType;
};

export type StrapiFileType = {
  id: number;
  Title: string | null;
  File: StrapiMediaType;
  IconType: string | null;
};

export type StrapiRecordType = {
  id: number;
  Title: string | null;
  Text: string | null;
};

export type StrapiProductType = {
  Slug: string;
  ShopifyId: string;
  Faqs: {
    data: StrapiFaqType[];
  };
  Videos: StrapiProductVideoType[];
  OverviewTitle: string | null;
  OverviewDescription: string | null;
  OverviewHighlightsTitle: string | null;
  OverviewTechnicalTitle: string | null;
  OverviewHighlights: StrapiRecordType[];
  OverviewFiles: StrapiFileType[];
  OverviewTechnicalRecords: StrapiRecordType[];
  NotIncludedTitle: string | null;
  NotIncludedText: string | null;
  GoingFastText: string | null;
};

export type StrapiStoreType = {
  id: number;
  attributes: {
    Name: string | null;
    StoreName: string | null;
    Address: string | null;
    Lat: string | null;
    Long: string | null;
    ImageMobile: StrapiMediaType;
    ImageDesktop: StrapiMediaType;
  };
};

export type StrapiSectionContactUsType = {
  id: number;
  __component: 'page.contact-us-section';
  Name: string | null;
  Title: string | null;
  Text: string | null;
  Breadcrumbs: StrapiBreadcrumbItemType[];
  SocialLinks: {
    data: StrapiLinkType[];
  };
  ContactUsBlock: StrapiContactUsBlockType;
};

export type StrapiSectionFindStoreType = {
  id: number;
  __component: 'page.find-store-section';
  Name: string | null;
  Title: string | null;
  Text: string | null;
  SearchPlaceholder: string | null;
  DirectionsTitle: string | null;
  VirtualShowroomTitle: string | null;
  Stores: {
    data: StrapiStoreType[];
  };
};

export type StrapiSectionRichTextType = {
  id: number;
  __component: 'page.rich-text-section';
  Content: BlocksContent;
};

export type StrapiCollectionBannersType = {
  id: number;
  __component: 'page.collection-banners';
  attributes: {
    Name: string | null;
    DividerText: string | null;
    Points: StrapiPointType[];
    Videos: StrapiProductVideoType[];
  };
};

export type StrapiSectionProductsGridType = {
  id: number;
  __component: 'page.products-grid-section';
  QuickFilterName: string | null;
  QuickFilterTitle: string | null;
  ShowFilterButton: string | null;
  CloseFilterButton: string | null;
  ClearAllButton: string | null;
  ProductsCountText: string | null;
  FiltersTitle: string | null;
  SlidesTitle: string | null;
  NoResultsTitle: string | null;
  NoResultsText: string | null;
  NoResultsButtonText: string | null;
  Slides: StrapiSlideType[];
  SortItems: StrapiSortType[];
};

export type StrapiSectionHomeHeroType = {
  id: number;
  __component: 'page.hero-section';
  NextCollectionLabel: string | null;
  OutletLabel: string | null;
  PriceLabel: string | null;
  ToCollectionButton: StrapiButtonType | null;
  ImageMobile: StrapiMediaType;
  ImageDesktop: StrapiMediaType;
  Slides: StrapiSlideType[];
};

export type StrapiSectionCardsType = {
  id: number;
  __component: 'page.home-cards-section';
  Title: string | null;
  Subtitle: string | null;
  BeforeImg: StrapiMediaType;
  AfterImg: StrapiMediaType;
  InfoBlocks: StrapiSlideType[];
  SubBlock: StrapiSlideType;
  ContactUsText?: string | null;
  DirectionsText?: string | null;
  Stores?: {
    data: StrapiStoreType[];
  };
};

export type StrapiSectionAreaType = {
  id: number;
  __component: 'page.area-section';
  VideosAreaTitle: string | null;
  VideosAreaSubtitle: string | null;
  VideosAreaCompareTitle: string | null;
  VideosAreaCompareText: string | null;
  BlogAreaTitle: string | null;
  BlogAreaSubtitle: string | null;
  ShowMoreButtonTitle: string | null;
  InstaReels: StrapiInstaReelsItemType[];
  Articles: {
    data: {attributes: StrapiArticleType}[];
  };
};

export type StrapiSectionNewArrivalsType = {
  id: number;
  __component: 'page.new-arrivals-section';
  Title: string | null;
  Subtitle: string | null;
  Products: StrapiSlideType[];
};

export type StrapiSectionAboutGoalType = {
  id: number;
  __component: 'page.about-goal-section';
  Name: string | null;
  Text: string | null;
  ImageMobile: StrapiMediaType;
  ImageDesktop: StrapiMediaType;
};

export type StrapiSectionAboutHeroType = {
  id: number;
  __component: 'page.about-hero-section';
  Name: string | null;
  Breadcrumb: string | null;
  Subtitle: string | null;
  Title: string | null;
  ButtonTitle: string | null;
  ButtonLink: string | null;
  ImageMobile: StrapiMediaType;
  ImageDesktop: StrapiMediaType;
  File: StrapiMediaType;
  Breadcrumbs: StrapiBreadcrumbItemType[];
};

export type StrapiSectionAboutOurProductsServicesType = {
  id: number;
  __component: 'page.about-our-products-section';
  Name: string | null;
  Text: string | null;
  TextBetweenImages: string | null;
  FirstImageMobile: StrapiMediaType;
  FirstImageDesktop: StrapiMediaType;
  LastImageMobile: StrapiMediaType;
  LastImageDesktop: StrapiMediaType;
};

export type StrapiSectionAboutDesignServicesType = {
  id: number;
  __component: 'page.about-design-services-section';
  Name: string | null;
  Text: string | null;
  ButtonTitle: string | null;
  ButtonLink: string | null;
  CompareImageBefore: StrapiMediaType;
  CompareImageAfter: StrapiMediaType;
};

export type StrapiSectionAboutCustomerServiceType = {
  id: number;
  __component: 'page.about-customer-service-section';
  Name: string | null;
  Text: string | null;
  SubText: string | null;
  OurProductsLabel: string | null;
  ButtonText: string | null;
};
export type StrapiSectionAboutInfoType = {
  id: number;
  __component: 'page.about-info-section';
  Name: string | null;
  ImageMobile: StrapiMediaType;
  ImageDesktop: StrapiMediaType;
  Text: string | null;
};

export type StrapiTabBestSellingType = {
  Name: string | null;
  Title: string | null;
  products: {
    data: {attributes: StrapiProductType}[];
  };
};

export type StrapiSectionBestSellingType = {
  id: number;
  __component: 'page.best-selling-section';
  Title: string | null;
  Subtitle: string | null;
  products: {
    data: {attributes: StrapiProductType}[];
  };
  Tabs: StrapiTabBestSellingType[];
};

export type StrapiSectionGetShoppingType = {
  id: number;
  __component: 'page.home-get-shopping-section';
  Title: string | null;
  Subtitle: string | null;
  ShoppingInfo: StrapiSlideType[];
  ServicesInfo: StrapiSlideType[];
};

export type StrapiSectionCategoriesType = {
  id: number;
  __component: 'page.home-categories-section';
  TextBefore: string | null;
  TextAfter: string | null;
  Advantages: string | null;
  Categories: {
    data: StrapiCategoryType[];
  };
};

export type StrapiSectionInstafeedType = {
  id: number;
  __component: 'page.instafeed';
  ProfileName: string | null;
  FollowText: string | null;
  ProfileImage: StrapiMediaType;
  FollowersCountText: string | null;
};

export type StrapiSectionBlogCommonInfoType = {
  id: number;
  __component: 'page.blog-common-info';
  ShareTitle: string | null;
  AskExpertTitle: string | null;
  RelatedPostsTitle: string | null;
  Prev: string | null;
  Next: string | null;
  ViewPostButtonTitle: string | null;
  ContactUsText: string | null;
  ContactUsTitle: string | null;
  ContactUsPlaceHolder: string | null;
  Breadcrumbs: StrapiBreadcrumbItemType[] | null;
  SocialLinks: {
    data: StrapiLinkType[];
  };
};

export type StrapiSectionMightBeInterestedType = {
  id: number;
  __component: 'page.might-be-interested-section';
  Name: string | null;
  Title: string | null;
  Products: {
    data: {attributes: StrapiProductType}[];
  };
};

export type StrapiSectionPromotionalCodeType = {
  id: number;
  __component: 'page.promotional-code-section';
  Name: string | null;
  Text: string | null;
  Title: string | null;
  ExtraTitle: string | null;
  UseCode: string | null;
  DiscountCode: string | null;
  ImageMobile: StrapiMediaType;
  ImageDesktop: StrapiMediaType;
  PromocodeCopyText: string | null;
};

export type StrapiSectionPeopleSearchedType = {
  id: number;
  __component: 'page.people-searched-section';
  Name: string | null;
  Title: string | null;
  RelatedSearchTitle: string | null;
  RankingKeywordsTitle: string | null;
  RelatedSearchKeys: string | null;
  RankingKeywordsKeys: string | null;
  Text: string | null;
  Categories: {
    data: StrapiCategoryType[];
  };
};

export type StrapiSectionProductMainType = {
  id: number;
  __component: 'page.main-product-section';
  Name: string | null;
  WriteReviewTitle: string | null;
  QuestionsTitle: string | null;
  GoingFastText: string | null;
  ExtraTitle: string | null;
  UseCodeTitle: string | null;
  TaxTitle: string | null;
  AddToCartTitle: string | null;
  NotifyMeTitle: string | null;
  DeliveryDateTitle: string | null;
  OptionSelectValue: string | null;
  NotIncludedTitle: string | null;
  FrequentlyBoughtTitle: string | null;
  FrequentlyBoughtButtonTitle: string | null;
  ReviewsTitle: string | null;
  OverviewTitle: string | null;
  VideosTitle: string | null;
  SelectProductTitle: string | null;
  ResponseTitle: string | null;
  DiscountCode: string | null;
  PromocodeCopyText: string | null;
};

export type StrapiErrorPageSectionType = {
  id: number;
  __component: 'page.error-page-section';
  Name: string | null;
  Title: string | null;
  Description: string | null;
  ButtonText: string | null;
};

export type StrapiOrderStatusSectionType = {
  id: number;
  __component: 'page.order-page-section';
  Name: string | null;
  Title: string | null;
  SearchFieldText: string | null;
  EmptyMapTitle: string | null;
  EmptyMapDescription: string | null;
  OrderSummaryText: string | null;
  WarehouseText: string | null;
  ShowMapText: string | null;
  QuantityText: string | null;
  ColourText: string | null;
  OrderAmountText: string | null;
  TotalAmountText: string | null;
  NoCategoryText: string | null;
  DiscountText: string | null;
  Breadcrumbs: StrapiBreadcrumbItemType[];
};

export type SectionVariantsType =
  | StrapiSectionHomeHeroType
  | StrapiSectionCategoriesType
  | StrapiSectionAreaType
  | StrapiSectionNewArrivalsType
  | StrapiSectionBestSellingType
  | StrapiSectionGetShoppingType
  | StrapiSectionProductsGridType
  | StrapiSectionBlogCommonInfoType
  | StrapiSectionAboutHeroType
  | StrapiSectionAboutGoalType
  | StrapiSectionAboutDesignServicesType
  | StrapiSectionAboutOurProductsServicesType
  | StrapiSectionAboutCustomerServiceType
  | StrapiSectionAboutInfoType
  | StrapiSectionProductMainType
  | StrapiErrorPageSectionType
  | StrapiCollectionBannersType
  | StrapiSectionMightBeInterestedType
  | StrapiSectionPromotionalCodeType
  | StrapiSectionPeopleSearchedType
  | StrapiSectionContactUsType
  | StrapiSectionFindStoreType
  | StrapiSectionInstafeedType
  | StrapiSectionCardsType
  | StrapiOrderStatusSectionType
  | StrapiSectionRichTextType;

export type StrapiPageType = {
  data: {
    id: number;
    attributes: {
      Title: string | null;
      Description: string | null;
      Keywords: string | null;
      slug: string | null;
      locale: string;
      header: StrapiHeaderType;
      footer: StrapiFooterType;
      CartModal: StrapiCartModalType;
      WishlistModal: StrapiWishlistModalType;
      ProductReviewModal: StrapiProductReviewModalType;
      BackInStockModal: StrapiBackInStockModalType;
      Dynamic: SectionVariantsType[];
    };
  }[];
};

export type StrapiBlogAttributesType = {
  Name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  Title: string;
  Description: string;
  Date: string;
  ContentMarkdown: string;
  MainImage: StrapiMediaType;
  socialLinks: {
    data: StrapiLinkType[];
  };
  Points: StrapiPointType[];
};

export type StrapiBlogDataType = {
  data: {
    id: number;
    attributes: StrapiBlogAttributesType;
  }[];
};

export type StrapiFormFieldType = {
  Label?: string;
  Placeholder?: string;
};

export type StrapiFormErrorsType = {
  Required?: string;
  Email?: string;
  Password?: string;
  DoNotMatch?: string;
};

export type StrapiLoginDatasetType = {
  Name: string | null;
  Title: string | null;
  ForgotPasswordTitle: string | null;
  NewCustomerTitle: string | null;
  SignInButtonTitle: string | null;
  SignUpButtonTitle: string | null;
  ResetPasswordTitle: string | null;
  WillSendText: string | null;
  ResetButtonTitle: string | null;
  CancelButtonTitle: string | null;
  EmailSentTitle: string | null;
  ThankYouText: string | null;
  EmailInput: StrapiFormFieldType | null;
  PasswordInput: StrapiFormFieldType | null;
};

export type StrapiRegisterDatasetType = {
  Name: string | null;
  Title: string | null;
  AcceptPolicyText: string | null;
  CustomerExistingTitle: string | null;
  SignInButtonTitle: string | null;
  SignUpButtonTitle: string | null;
  EmailInput: StrapiFormFieldType | null;
  PasswordInput: StrapiFormFieldType | null;
  FirstNameInput: StrapiFormFieldType | null;
  LastNameInput: StrapiFormFieldType | null;
  PrivacyPolicyLink: StrapiButtonType | null;
};

export type StrapiResetDatasetType = {
  Name: string | null;
  Title: string | null;
  PasswordInput: StrapiFormFieldType | null;
  PasswordConfirmInput: StrapiFormFieldType | null;
  ButtonTitle: string | null;
};

export type StrapiSystemDatasetType = {
  data: {
    id: number;
    attributes: {
      CloseButtonText: string | null;
      LoginDataset: StrapiLoginDatasetType;
      RegisterDataset: StrapiRegisterDatasetType;
      ResetDataset: StrapiResetDatasetType;
      FormErrors: StrapiFormErrorsType;
    };
  };
};

export type StrapiAccountHeaderType = {
  Title: string | null;
  Subtitle: string | null;
  LogoutButtonText: string | null;
};

export type StrapiAccountAddressesType = {
  Title: string | null;
  AddAddressButtonTitle: string | null;
  PrimaryTitle: string | null;
  MakePrimaryTitle: string | null;
  EmptyAddressText: string | null;
  EditAddressTitle: string | null;
  AddAddressTitle: string | null;
  AddButtonTitle: string | null;
  EditButtonTitle: string | null;
  CancelButtonTitle: string | null;
};

export type StrapiAccountOrdersType = {
  Title: string | null;
  OrderTitle: string | null;
  DateTitle: string | null;
  PaymentStatusTitle: string | null;
  OrderStatusTitle: string | null;
  TotalTitle: string | null;
  EmptyOrdersText: string | null;
};

export type StrapiAccountPageType = {
  data: {
    id: number;
    attributes: {
      AccountHeader: StrapiAccountHeaderType;
      AccountAddresses: StrapiAccountAddressesType;
      AccountOrders: StrapiAccountOrdersType;
      //
      FirstNameField?: StrapiFormFieldType;
      LastNameField?: StrapiFormFieldType;
      CompanyField?: StrapiFormFieldType;
      CityField?: StrapiFormFieldType;
      CountryField?: StrapiFormFieldType;
      ProvinceField?: StrapiFormFieldType;
      PostalCodeField?: StrapiFormFieldType;
      PhoneField?: StrapiFormFieldType;
      Address1Field?: StrapiFormFieldType;
      SetAsDefaultTitle?: string | null;
      LoadingText?: string | null;
      PleaseLoginText?: string | null;
    };
  };
};

export type SectionsType = SectionVariantsType[];

export type MetadataType = {
  title: string | null;
  description: string | null;
};
