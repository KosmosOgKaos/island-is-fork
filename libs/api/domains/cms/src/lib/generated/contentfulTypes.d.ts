// THIS FILE IS AUTOMATICALLY GENERATED. DO NOT MODIFY IT.

import { Asset, Entry } from 'contentful'
import { Document } from '@contentful/rich-text-types'

export interface IAboutSubPageFields {
  /** Title */
  title: string

  /** Slug */
  slug: string

  /** Description */
  description?: string | undefined

  /** subDescription */
  subDescription?: string | undefined

  /** Content */
  content: Document
}

/** sub-page of the about-page */

export interface IAboutSubPage extends Entry<IAboutSubPageFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'aboutSubPage'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IAlertBannerFields {
  /** Show Alert Banner */
  showAlertBanner: boolean

  /** Banner variant */
  bannerVariant: 'default' | 'warning' | 'error' | 'info' | 'success'

  /** Title */
  title?: string | undefined

  /** description */
  description?: string | undefined

  /** link */
  link?: ILink | undefined

  /** Is dismissable */
  isDismissable: boolean

  /** dismissed for days */
  dismissedForDays: number
}

/** Alert banner will show on top of all pages */

export interface IAlertBanner extends Entry<IAlertBannerFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'alertBanner'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IAnimationsJsonFields {
  /** Title */
  title: string

  /** JSON */
  json: Record<string, any>
}

export interface IAnimationsJson extends Entry<IAnimationsJsonFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'animationsJson'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IArticleFields {
  /** Content status */
  contentStatus:
    | 'Undefined'
    | 'Needs work'
    | 'In review'
    | 'Needs translation'
    | 'In translation'
    | 'Done'

  /** Title */
  title: string

  /** Short title */
  shortTitle?: string | undefined

  /** Summary */
  intro?: string | undefined

  /** Slug */
  slug: string

  /** Content */
  content?: Document | undefined

  /** Contains application form? */
  containsApplicationForm?: boolean | undefined

  /** Category */
  category?: IArticleCategory | undefined

  /** Group */
  group?: IArticleGroup | undefined

  /** Subgroup */
  subgroup?: IArticleSubgroup | undefined

  /** Organization */
  organization?: IOrganization[] | undefined

  /** Related Articles */
  relatedArticles?: IArticle[] | undefined

  /** Baby Articles */
  subArticles?: ISubArticle[] | undefined

  /** Importance */
  importance?: number | undefined
}

export interface IArticle extends Entry<IArticleFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'article'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IArticleCategoryFields {
  /** Title */
  title: string

  /** Slug */
  slug: string

  /** Description */
  description?: string | undefined
}

export interface IArticleCategory extends Entry<IArticleCategoryFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'articleCategory'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IArticleGroupFields {
  /** Title */
  title: string

  /** Slug */
  slug: string

  /** Description */
  description?: string | undefined
}

export interface IArticleGroup extends Entry<IArticleGroupFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'articleGroup'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IArticleSubgroupFields {
  /** Title */
  title: string

  /** Slug */
  slug: string

  /** Importance */
  importance?: number | undefined
}

/** Used inside groups to further categorize articles by subject */

export interface IArticleSubgroup extends Entry<IArticleSubgroupFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'articleSubgroup'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IBigBulletListFields {
  /** Title */
  title?: string | undefined

  /** Bullets */
  bullets: (IIconBullet | INumberBulletSection)[]
}

export interface IBigBulletList extends Entry<IBigBulletListFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'bigBulletList'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface ICardFields {
  /** Title */
  title: string

  /** Body */
  body: string

  /** Link Text */
  linkText?: string | undefined

  /** Link */
  link?: string | undefined
}

export interface ICard extends Entry<ICardFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'card'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface ICardSectionFields {
  /** Title */
  title?: string | undefined

  /** Cards */
  cards: ICard[]
}

/** List of link cards */

export interface ICardSection extends Entry<ICardSectionFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'cardSection'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IContactUsFields {
  /** Title */
  title?: string | undefined
}

export interface IContactUs extends Entry<IContactUsFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'contactUs'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IEmbeddedVideoFields {
  /** Title */
  title: string

  /** url */
  url: string
}

/** YouTube or Vimeo */

export interface IEmbeddedVideo extends Entry<IEmbeddedVideoFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'embeddedVideo'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IFaqListFields {
  /** Title */
  title: string

  /** Questions */
  questions?: IQuestionAndAnswer[] | undefined
}

export interface IFaqList extends Entry<IFaqListFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'faqList'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IFrontpageSliderFields {
  /** Titill */
  title: string

  /** Undirtitill */
  subtitle: string

  /** Texti */
  content: string

  /** Efnisstengill */
  link?:
    | IArticle
    | IArticleCategory
    | ILandingPage
    | INews
    | IOrganization
    | IPage
    | undefined

  /** Animation (JSON) */
  animationJson?: Record<string, any> | undefined
}

/** Efni í haus á forsíðu */

export interface IFrontpageSlider extends Entry<IFrontpageSliderFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'frontpageSlider'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IFrontpageSliderListFields {
  /** Titill */
  titill: string

  /** items */
  items: IFrontpageSlider[]
}

/** Listi af efniseiningum sem hægt er að fletta á milli og birtast efst á forsíðu Ísland.is. */

export interface IFrontpageSliderList
  extends Entry<IFrontpageSliderListFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'frontpageSliderList'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IGenericPageFields {
  /** Title */
  title: string

  /** Slug */
  slug: string

  /** Intro */
  intro?: Document | undefined

  /** Main content */
  mainContent?: Document | undefined

  /** Sidebar */
  sidebar?: Document | undefined

  /** Misc */
  misc?: Record<string, any> | undefined
}

/** Generic content page with optional sidebar */

export interface IGenericPage extends Entry<IGenericPageFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'genericPage'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IIconBulletFields {
  /** Title */
  title: string

  /** body */
  body: string

  /** Icon */
  icon: Asset

  /** Url */
  url?: string | undefined

  /** Link Text */
  linkText?: string | undefined
}

export interface IIconBullet extends Entry<IIconBulletFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'iconBullet'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface ILandingPageFields {
  /** Content status */
  contentStatus:
    | 'Undefined'
    | 'Needs work'
    | 'In review'
    | 'Needs translation'
    | 'In translation'
    | 'Done'

  /** Title */
  title: string

  /** Slug */
  slug: string

  /** Introduction */
  introduction: string

  /** Image */
  image: Asset

  /** Action button */
  actionButton?: ILink | undefined

  /** Links */
  links?: ILinkList | undefined

  /** Content */
  content?: Document | undefined
}

export interface ILandingPage extends Entry<ILandingPageFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'landingPage'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface ILatestNewsSliceFields {
  /** Title */
  title?: string | undefined
}

/** Slice to show latest news entries */

export interface ILatestNewsSlice extends Entry<ILatestNewsSliceFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'latestNewsSlice'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface ILifeEventPageFields {
  /** title */
  title: string

  /** slug */
  slug: string

  /** intro */
  intro: string

  /** image */
  image?: Asset | undefined

  /** thumbnail */
  thumbnail?: Asset | undefined

  /** content */
  content: Document

  /** category */
  category?: IArticleCategory | undefined
}

export interface ILifeEventPage extends Entry<ILifeEventPageFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'lifeEventPage'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface ILinkFields {
  /** Text */
  text: string

  /** URL */
  url: string
}

export interface ILink extends Entry<ILinkFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'link'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface ILinkListFields {
  /** Title */
  title?: string | undefined

  /** Links */
  links: ILink[]
}

export interface ILinkList extends Entry<ILinkListFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'linkList'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface ILogoListSliceFields {
  /** Title */
  title?: string | undefined

  /** Body */
  body?: string | undefined

  /** Images */
  images?: Asset[] | undefined
}

/** A List of logos/images with a heading and short description */

export interface ILogoListSlice extends Entry<ILogoListSliceFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'logoListSlice'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IMailingListSignupFields {
  /** Title */
  title: string

  /** Description */
  description?: string | undefined

  /** Input label */
  inputLabel: string

  /** Submit button text */
  buttonText: string
}

export interface IMailingListSignup extends Entry<IMailingListSignupFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'mailingListSignup'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IMenuFields {
  /** Title */
  title?: string | undefined

  /** Links */
  links: ILink[]
}

export interface IMenu extends Entry<IMenuFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'menu'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface INamespaceFields {
  /** Namespace */
  namespace?: string | undefined

  /** Strings */
  strings?: Record<string, any> | undefined

  /** Defaults */
  defaults?: Record<string, any> | undefined

  /** Fallback */
  fallback?: Record<string, any> | undefined
}

/** Namespace containing translations */

export interface INamespace extends Entry<INamespaceFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'namespace'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface INewsFields {
  /** Content status */
  contentStatus: 'Undefined' | 'Needs work' | 'In review' | 'Done'

  /** Title */
  title: string

  /** Subtitle */
  subtitle: string

  /** Slug */
  slug: string

  /** Date */
  date: string

  /** Introduction */
  intro: string

  /** Featured image */
  image: Asset

  /** Content */
  content?: Document | undefined

  /** Read More Text */
  readMoreText?: string | undefined
}

export interface INews extends Entry<INewsFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'news'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface INumberBulletFields {
  /** Title */
  title: string

  /** Body */
  body: string
}

export interface INumberBullet extends Entry<INumberBulletFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'numberBullet'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface INumberBulletSectionFields {
  /** Title */
  title?: string | undefined

  /** Initially visible */
  defaultVisible: number

  /** Bullets */
  bullets: INumberBullet[]
}

export interface INumberBulletSection
  extends Entry<INumberBulletSectionFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'numberBulletSection'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IOrganizationFields {
  /** Title */
  title: string

  /** Description */
  description?: string | undefined

  /** Slug */
  slug: string

  /** Tag */
  tag?: IOrganizationTag[] | undefined

  /** Link */
  link?: string | undefined
}

export interface IOrganization extends Entry<IOrganizationFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'organization'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IOrganizationTagFields {
  /** Title */
  title: string
}

export interface IOrganizationTag extends Entry<IOrganizationTagFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'organizationTag'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IPageFields {
  /** Content status */
  contentStatus:
    | 'Undefined'
    | 'Needs work'
    | 'In review'
    | 'Needs translation'
    | 'In translation'
    | 'Done'

  /** Page title */
  title: string

  /** Slug */
  slug: string

  /** SEO Page description */
  seoDescription?: string | undefined

  /** theme */
  theme?: 'nautral' | 'red' | 'blue' | 'gradient' | undefined

  /** header */
  header: IPageHeader

  /** Slices */
  slices: (
    | IBigBulletList
    | IMailingListSignup
    | ISectionHeading
    | ILatestNewsSlice
    | ICardSection
    | ILogoListSlice
    | IPageHeader
    | IStorySection
    | ITabSection
    | ITimeline
  )[]
}

/** Generic page with content defined in contentful */

export interface IPage extends Entry<IPageFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'page'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IPageHeaderFields {
  /** Title */
  title?: string | undefined

  /** Introduction */
  introduction?: string | undefined

  /** Navigation text */
  navigationText: string

  /** Links */
  links?: ILink[] | undefined

  /** Slices */
  slices: (ISectionHeading | ITimeline)[]
}

export interface IPageHeader extends Entry<IPageHeaderFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'pageHeader'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IProcessEntryFields {
  /** Title */
  title: string

  /** Subtitle */
  subtitle?: string | undefined

  /** Details */
  details?: Document | undefined

  /** Type */
  type:
    | 'Digital'
    | 'Not digital'
    | 'Digital w/login'
    | 'Not digital w/login'
    | 'No type'

  /** Process title */
  processTitle: string

  /** Process description (OLD field) */
  processDescription?: string | undefined

  /** Process info */
  processInfo?: Document | undefined

  /** Process link */
  processLink: string

  /** Button text */
  buttonText: string
}

export interface IProcessEntry extends Entry<IProcessEntryFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'processEntry'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IQuestionAndAnswerFields {
  /** Question */
  question: string

  /** Answer */
  answer?: Document | undefined
}

export interface IQuestionAndAnswer extends Entry<IQuestionAndAnswerFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'questionAndAnswer'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface ISectionHeadingFields {
  /** Title */
  title?: string | undefined

  /** Description */
  body?: string | undefined
}

/** Heading with title and description for separating page sections */

export interface ISectionHeading extends Entry<ISectionHeadingFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'sectionHeading'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface ISectionWithImageFields {
  /** title */
  title?: string | undefined

  /** image */
  image?: Asset | undefined

  /** body */
  body: Document
}

export interface ISectionWithImage extends Entry<ISectionWithImageFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'sectionWithImage'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface ISideMenuFields {
  /** Internal links */
  internalLinks: (
    | IArticle
    | IArticleCategory
    | IGenericPage
    | ILandingPage
    | ILifeEventPage
    | IOrganization
    | IPage
  )[]

  /** Title */
  title?: string | undefined
}

export interface ISideMenu extends Entry<ISideMenuFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'sideMenu'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IStatisticFields {
  /** Value */
  value: string

  /** Label */
  label: string
}

export interface IStatistic extends Entry<IStatisticFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'statistic'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IStatisticsFields {
  /** Title */
  title?: string | undefined

  /** Statistics */
  statistics: IStatistic[]
}

export interface IStatistics extends Entry<IStatisticsFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'statistics'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IStoryFields {
  /** Title */
  title: string

  /** Label */
  label: string

  /** Introduction */
  intro: string

  /** Body */
  body: Document

  /** Logo */
  logo: Asset

  /** Link button text */
  readMoreText: string

  /** Linked page */
  linkedPage?: IArticle | INews | undefined

  /** Link */
  link?: string | undefined
}

export interface IStory extends Entry<IStoryFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'story'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IStorySectionFields {
  /** Title */
  title: string

  /** Read More Text */
  readMoreText?: string | undefined

  /** Stories */
  stories: IStory[]
}

export interface IStorySection extends Entry<IStorySectionFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'storySection'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface ISubArticleFields {
  /** Title */
  title: string

  /** Slug */
  slug: string

  /** Content */
  content: Document
}

/** A sub article that's a part of another main article */

export interface ISubArticle extends Entry<ISubArticleFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'subArticle'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface ITabContentFields {
  /** tab title */
  tabTitle: string

  /** content title */
  contentTitle?: string | undefined

  /** image */
  image?: Asset | undefined

  /** Body */
  body?: Document | undefined
}

/** Tab with content */

export interface ITabContent extends Entry<ITabContentFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'tabContent'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface ITabSectionFields {
  /** Title */
  title?: string | undefined

  /** Tabs */
  tabs?: ITabContent[] | undefined
}

/** List of tab contents */

export interface ITabSection extends Entry<ITabSectionFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'tabSection'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface ITeamListFields {
  /** Team members */
  teamMembers?: ITeamMember[] | undefined
}

/** list of team members */

export interface ITeamList extends Entry<ITeamListFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'teamList'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface ITeamMemberFields {
  /** Name */
  name: string

  /** Title */
  title: string

  /** Mynd */
  mynd: Asset
}

export interface ITeamMember extends Entry<ITeamMemberFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'teamMember'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface ITimelineFields {
  /** Title */
  title?: string | undefined

  /** Events */
  events: ITimelineEvent[]
}

/** Timeline section with a collection of timeline events */

export interface ITimeline extends Entry<ITimelineFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'timeline'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface ITimelineEventFields {
  /** Title */
  title: string

  /** Date */
  date: string

  /** Numerator */
  numerator?: number | undefined

  /** Denominator */
  denominator?: number | undefined

  /** Label */
  label?: string | undefined

  /** Body */
  body?: Document | undefined

  /** Tags */
  tags?: string[] | undefined

  /** Link */
  link?: string | undefined
}

/** Single event on a timeline */

export interface ITimelineEvent extends Entry<ITimelineEventFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'timelineEvent'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IUiConfigurationFields {
  /** Namespace */
  namespace: string

  /** Fields */
  fields?: Record<string, any> | undefined
}

/** Each entry is a namespace that contains key->value pairs */

export interface IUiConfiguration extends Entry<IUiConfigurationFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'uiConfiguration'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IUrlFields {
  /** Title */
  title?: string | undefined

  /** Page */
  page: IArticle | IArticleCategory | ILifeEventPage | INews

  /** Urls list */
  urlsList: string[]
}

export interface IUrl extends Entry<IUrlFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'url'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IVidspyrnaFrontpageFields {
  /** Title */
  title: string

  /** description */
  description?: string | undefined

  /** Slug */
  slug: string

  /** Content */
  content?: Document | undefined

  /** Group */
  group?: IArticleGroup | undefined

  /** Category */
  category?: IArticleCategory | undefined

  /** Organization */
  organization?: IOrganization[] | undefined

  /** Slices */
  slices: (IVidspyrnaFeaturedNews | IVidspyrnaFlokkur)[]
}

/** A temporary content type that is used for the "Viðspyrna" information page. Once that site is no longer live this can be deleted. */

export interface IVidspyrnaFrontpage extends Entry<IVidspyrnaFrontpageFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'vidspyrna-frontpage'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IVidspyrnaInlineImageFields {
  /** Title */
  title?: string | undefined

  /** Image */
  image: Asset
}

export interface IVidspyrnaInlineImage
  extends Entry<IVidspyrnaInlineImageFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'vidspyrna-inline-image'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IVidspyrnaProcessEntryFields {
  /** Title */
  title: string

  /** Subtitle */
  subtitle?: string | undefined

  /** Details */
  details?: Document | undefined

  /** Button text */
  buttonText?: string | undefined

  /** Button description */
  processDescription?: string | undefined

  /** Button link */
  processLink?: string | undefined
}

/** A temporary content type that is used for the "Viðspyrna" information page. Once that site is no longer live this can be deleted. */

export interface IVidspyrnaProcessEntry
  extends Entry<IVidspyrnaProcessEntryFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'vidspyrna-process-entry'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IVidspyrnaFeaturedNewsFields {
  /** Title */
  title?: string | undefined

  /** featured */
  featured: IVidspyrnaNews[]
}

export interface IVidspyrnaFeaturedNews
  extends Entry<IVidspyrnaFeaturedNewsFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'vidspyrnaFeaturedNews'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IVidspyrnaFlokkurFields {
  /** Subtitle */
  subtitle: string

  /** Title */
  title: string

  /** Description */
  description: string

  /** Image */
  image?: Asset | undefined

  /** Pages */
  pages: IVidspyrnaPage[]
}

/** A group of Viðspyrna pages. */

export interface IVidspyrnaFlokkur extends Entry<IVidspyrnaFlokkurFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'vidspyrnaFlokkur'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IVidspyrnaNewsFields {
  /** Subtitle */
  subtitle?: string | undefined

  /** Title */
  title: string

  /** Slug */
  slug: string

  /** Date */
  date: string

  /** Introduction */
  intro: string

  /** Featured image */
  image?: Asset | undefined

  /** Content */
  content?: Document | undefined

  /** Pages */
  pages?: IVidspyrnaPage[] | undefined
}

export interface IVidspyrnaNews extends Entry<IVidspyrnaNewsFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'vidspyrnaNews'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IVidspyrnaPageFields {
  /** Title */
  title: string

  /** Short description */
  description: string

  /** Long description */
  longDescription?: string | undefined

  /** Objective */
  objective?: Document | undefined

  /** Slug */
  slug: string

  /** Tags */
  tags: IVidspyrnaTag[]

  /** Link */
  link?: string | undefined

  /** Link button text */
  linkButtonText?: string | undefined

  /** Status */
  status: 'preparing' | 'ongoing' | 'completed'

  /** Estimated cost (ISK) */
  estimatedCostIsk?: number | undefined

  /** Final cost (ISK) */
  finalCostIsk?: number | undefined

  /** Content */
  content?: Document | undefined
}

/** Page for the adgerdir.island.is website. */

export interface IVidspyrnaPage extends Entry<IVidspyrnaPageFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'vidspyrnaPage'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IVidspyrnaTagFields {
  /** Title */
  title: string
}

/** A tag used to tag Viðspyrna pages. */

export interface IVidspyrnaTag extends Entry<IVidspyrnaTagFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'vidspyrnaTag'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export type CONTENT_TYPE =
  | 'aboutSubPage'
  | 'alertBanner'
  | 'animationsJson'
  | 'article'
  | 'articleCategory'
  | 'articleGroup'
  | 'articleSubgroup'
  | 'bigBulletList'
  | 'card'
  | 'cardSection'
  | 'contactUs'
  | 'embeddedVideo'
  | 'faqList'
  | 'frontpageSlider'
  | 'frontpageSliderList'
  | 'genericPage'
  | 'iconBullet'
  | 'landingPage'
  | 'latestNewsSlice'
  | 'lifeEventPage'
  | 'link'
  | 'linkList'
  | 'logoListSlice'
  | 'mailingListSignup'
  | 'menu'
  | 'namespace'
  | 'news'
  | 'numberBullet'
  | 'numberBulletSection'
  | 'organization'
  | 'organizationTag'
  | 'page'
  | 'pageHeader'
  | 'processEntry'
  | 'questionAndAnswer'
  | 'sectionHeading'
  | 'sectionWithImage'
  | 'sideMenu'
  | 'statistic'
  | 'statistics'
  | 'story'
  | 'storySection'
  | 'subArticle'
  | 'tabContent'
  | 'tabSection'
  | 'teamList'
  | 'teamMember'
  | 'timeline'
  | 'timelineEvent'
  | 'uiConfiguration'
  | 'url'
  | 'vidspyrna-frontpage'
  | 'vidspyrna-inline-image'
  | 'vidspyrna-process-entry'
  | 'vidspyrnaFeaturedNews'
  | 'vidspyrnaFlokkur'
  | 'vidspyrnaNews'
  | 'vidspyrnaPage'
  | 'vidspyrnaTag'

export type LOCALE_CODE = 'en' | 'is-IS'

export type CONTENTFUL_DEFAULT_LOCALE_CODE = 'is-IS'
