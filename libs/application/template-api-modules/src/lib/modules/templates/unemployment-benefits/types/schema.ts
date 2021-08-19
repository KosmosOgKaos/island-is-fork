export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any
}

export type Identity = {
  nationalId: Scalars['ID']
  name: Scalars['String']
  address?: Maybe<IdentityAddress>
  type: IdentityType
}

export enum IdentityType {
  Person = 'Person',
  Company = 'Company',
}

export type AuthDelegation = {
  id: Scalars['ID']
  from: Identity
  to: Identity
  type: AuthDelegationType
  provider: AuthDelegationProvider
}

export enum AuthDelegationType {
  LegalGuardian = 'LegalGuardian',
  ProcurationHolder = 'ProcurationHolder',
  Custom = 'Custom',
}

export enum AuthDelegationProvider {
  Thjodskra = 'Thjodskra',
  Fyrirtaekjaskra = 'Fyrirtaekjaskra',
  Delegationdb = 'Delegationdb',
}

export type NationalRegistryAddress = {
  __typename?: 'NationalRegistryAddress'
  streetName: Scalars['String']
  postalCode: Scalars['String']
  city: Scalars['String']
}

export type NationalRegistryPerson = {
  __typename?: 'NationalRegistryPerson'
  nationalId: Scalars['ID']
  fullName: Scalars['String']
  address?: Maybe<NationalRegistryAddress>
  livesWithApplicant?: Maybe<Scalars['Boolean']>
  livesWithBothParents?: Maybe<Scalars['Boolean']>
  children: Array<NationalRegistryPerson>
  otherParent?: Maybe<NationalRegistryPerson>
}

export type IdentityAddress = {
  __typename?: 'IdentityAddress'
  streetAddress?: Maybe<Scalars['String']>
  city: Scalars['String']
  postalCode?: Maybe<Scalars['String']>
}

export type NationalRegistryFamilyMember = {
  __typename?: 'NationalRegistryFamilyMember'
  nationalId: Scalars['ID']
  fullName: Scalars['String']
  gender?: Maybe<Gender>
  familyRelation: Scalars['String']
}

export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE',
  Transgender = 'TRANSGENDER',
  MaleMinor = 'MALE_MINOR',
  FemaleMinor = 'FEMALE_MINOR',
  TransgenderMinor = 'TRANSGENDER_MINOR',
  Unknown = 'UNKNOWN',
}

export type BanMarking = {
  __typename?: 'BanMarking'
  banMarked: Scalars['Boolean']
  startDate: Scalars['String']
}

export type Address = {
  __typename?: 'Address'
  code: Scalars['ID']
  lastUpdated?: Maybe<Scalars['String']>
  streetAddress?: Maybe<Scalars['String']>
  city: Scalars['String']
  postalCode?: Maybe<Scalars['String']>
}

export type Citizenship = {
  __typename?: 'Citizenship'
  code: Scalars['ID']
  name: Scalars['String']
}

export type NationalRegistryUser = {
  __typename?: 'NationalRegistryUser'
  nationalId: Scalars['ID']
  fullName: Scalars['String']
  gender?: Maybe<Gender>
  legalResidence?: Maybe<Scalars['String']>
  birthPlace?: Maybe<Scalars['String']>
  citizenship?: Maybe<Citizenship>
  religion?: Maybe<Scalars['String']>
  maritalStatus?: Maybe<MaritalStatus>
  banMarking?: Maybe<BanMarking>
  age: Scalars['Float']
  birthday: Scalars['DateTime']
  address?: Maybe<Address>
}

export enum MaritalStatus {
  Unmarried = 'UNMARRIED',
  Married = 'MARRIED',
  Widowed = 'WIDOWED',
  Separated = 'SEPARATED',
  Divorced = 'DIVORCED',
  MarriedLivingSeparately = 'MARRIED_LIVING_SEPARATELY',
  MarriedToForeignLawPerson = 'MARRIED_TO_FOREIGN_LAW_PERSON',
  Unknown = 'UNKNOWN',
  ForeignResidenceMarriedToUnregisteredPerson = 'FOREIGN_RESIDENCE_MARRIED_TO_UNREGISTERED_PERSON',
  IcelandicResidenceMarriedToUnregisteredPerson = 'ICELANDIC_RESIDENCE_MARRIED_TO_UNREGISTERED_PERSON',
}

export type NationalRegistryGetPerson = {
  __typename?: 'NationalRegistryGetPerson'
  nationalId: Scalars['ID']
  name: Scalars['String']
  phoneNumber: Scalars['String']
  email: Scalars['String']
  address: Scalars['String']
  partnerNationalId: Scalars['String']
  childrenNationalId: Array<Scalars['String']>
}

export type IdentityPerson = Identity & {
  __typename?: 'IdentityPerson'
  nationalId: Scalars['ID']
  fullName: Scalars['String']
  gender?: Maybe<Gender>
  legalResidence?: Maybe<Scalars['String']>
  birthPlace?: Maybe<Scalars['String']>
  citizenship?: Maybe<Citizenship>
  religion?: Maybe<Scalars['String']>
  maritalStatus?: Maybe<MaritalStatus>
  banMarking?: Maybe<BanMarking>
  age: Scalars['Float']
  birthday: Scalars['DateTime']
  address?: Maybe<IdentityAddress>
  name: Scalars['String']
  type: IdentityType
}

export type IdentityCompany = Identity & {
  __typename?: 'IdentityCompany'
  nationalId: Scalars['ID']
  name: Scalars['String']
  address?: Maybe<IdentityAddress>
  type: IdentityType
}

export type AuthApiScopeGroup = {
  __typename?: 'AuthApiScopeGroup'
  name: Scalars['ID']
  displayName: Scalars['String']
  description?: Maybe<Scalars['String']>
}

export type AuthApiScope = {
  __typename?: 'AuthApiScope'
  name: Scalars['ID']
  type: Scalars['String']
  displayName: Scalars['String']
  group?: Maybe<AuthApiScopeGroup>
  description?: Maybe<Scalars['String']>
  groupName?: Maybe<Scalars['String']>
}

export type AuthDelegationScope = {
  __typename?: 'AuthDelegationScope'
  id: Scalars['String']
  name: Scalars['String']
  type: Scalars['String']
  displayName: Scalars['String']
  validTo?: Maybe<Scalars['DateTime']>
}

export type AuthLegalGuardianDelegation = AuthDelegation & {
  __typename?: 'AuthLegalGuardianDelegation'
  id: Scalars['ID']
  from: Identity
  to: Identity
  type: AuthDelegationType
  provider: AuthDelegationProvider
}

export type AuthProcuringHolderDelegation = AuthDelegation & {
  __typename?: 'AuthProcuringHolderDelegation'
  id: Scalars['ID']
  from: Identity
  to: Identity
  type: AuthDelegationType
  provider: AuthDelegationProvider
}

export type AuthCustomDelegation = AuthDelegation & {
  __typename?: 'AuthCustomDelegation'
  id: Scalars['ID']
  from: Identity
  to: Identity
  type: AuthDelegationType
  provider: AuthDelegationProvider
  validTo?: Maybe<Scalars['DateTime']>
  scopes: Array<AuthDelegationScope>
}

export type Image = {
  __typename?: 'Image'
  id: Scalars['ID']
  url: Scalars['String']
  title: Scalars['String']
  contentType: Scalars['String']
  width: Scalars['Int']
  height: Scalars['Int']
}

export type Link = {
  __typename?: 'Link'
  text: Scalars['String']
  url: Scalars['String']
}

export type ArticleCategory = {
  __typename?: 'ArticleCategory'
  id: Scalars['ID']
  title: Scalars['String']
  slug: Scalars['String']
  description?: Maybe<Scalars['String']>
}

export type ArticleGroup = {
  __typename?: 'ArticleGroup'
  title: Scalars['String']
  slug: Scalars['String']
  description?: Maybe<Scalars['String']>
  importance?: Maybe<Scalars['Float']>
}

export type ArticleSubgroup = {
  __typename?: 'ArticleSubgroup'
  title: Scalars['String']
  importance?: Maybe<Scalars['Float']>
  slug: Scalars['String']
}

export type OrganizationTag = {
  __typename?: 'OrganizationTag'
  id: Scalars['ID']
  title: Scalars['String']
}

export type Asset = {
  __typename?: 'Asset'
  typename: Scalars['String']
  id: Scalars['ID']
  url: Scalars['String']
  title: Scalars['String']
  contentType: Scalars['String']
}

export type Html = {
  __typename?: 'Html'
  typename: Scalars['String']
  id: Scalars['ID']
  document: Scalars['JSON']
}

export type TimelineEvent = {
  __typename?: 'TimelineEvent'
  id: Scalars['ID']
  title: Scalars['String']
  date: Scalars['String']
  numerator?: Maybe<Scalars['Int']>
  denominator?: Maybe<Scalars['Int']>
  label: Scalars['String']
  body?: Maybe<Html>
  tags?: Maybe<Array<Scalars['String']>>
  link: Scalars['String']
}

export type TimelineSlice = {
  __typename?: 'TimelineSlice'
  id: Scalars['ID']
  title: Scalars['String']
  intro: Scalars['String']
  events: Array<TimelineEvent>
}

export type Story = {
  __typename?: 'Story'
  label: Scalars['String']
  title: Scalars['String']
  logo: Image
  readMoreText: Scalars['String']
  date: Scalars['String']
  intro: Scalars['String']
  link: Scalars['String']
  linkedPage?: Maybe<Scalars['String']>
  body?: Maybe<Scalars['String']>
}

export type LinkCard = {
  __typename?: 'LinkCard'
  title: Scalars['String']
  body: Scalars['String']
  link: Scalars['String']
  linkText: Scalars['String']
}

export type LinkCardSlice = {
  __typename?: 'LinkCardSlice'
  id: Scalars['ID']
  title: Scalars['String']
  cards: Array<LinkCard>
}

export type GenericTag = {
  __typename?: 'GenericTag'
  id: Scalars['ID']
  title: Scalars['String']
  slug: Scalars['String']
}

export type News = {
  __typename?: 'News'
  id: Scalars['ID']
  slug: Scalars['String']
  title: Scalars['String']
  subtitle: Scalars['String']
  intro?: Maybe<Scalars['String']>
  image?: Maybe<Image>
  date: Scalars['String']
  content?: Maybe<Array<Slice>>
  genericTags: Array<GenericTag>
}

export type Slice =
  | TimelineSlice
  | MailingListSignupSlice
  | HeadingSlice
  | LinkCardSlice
  | StorySlice
  | LogoListSlice
  | LatestNewsSlice
  | BulletListSlice
  | Statistics
  | ProcessEntry
  | FaqList
  | ConnectedComponent
  | EmbeddedVideo
  | SectionWithImage
  | TabSection
  | TeamList
  | ContactUs
  | Location
  | TellUsAStory
  | Html
  | Image
  | Asset
  | Districts
  | FeaturedArticles
  | OneColumnText
  | TwoColumnText
  | MultipleStatistics
  | AccordionSlice
  | OverviewLinks
  | EventSlice

export type MailingListSignupSlice = {
  __typename?: 'MailingListSignupSlice'
  id: Scalars['ID']
  title: Scalars['String']
  variant?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  inputLabel: Scalars['String']
  fullNameLabel?: Maybe<Scalars['String']>
  questionLabel?: Maybe<Scalars['String']>
  yesLabel?: Maybe<Scalars['String']>
  noLabel?: Maybe<Scalars['String']>
  disclaimerLabel?: Maybe<Scalars['String']>
  buttonText: Scalars['String']
  signupUrl: Scalars['String']
}

export type HeadingSlice = {
  __typename?: 'HeadingSlice'
  id: Scalars['ID']
  title: Scalars['String']
  body: Scalars['String']
}

export type StorySlice = {
  __typename?: 'StorySlice'
  id: Scalars['ID']
  readMoreText: Scalars['String']
  stories: Array<Story>
}

export type LogoListSlice = {
  __typename?: 'LogoListSlice'
  id: Scalars['ID']
  title: Scalars['String']
  body: Scalars['String']
  images: Array<Image>
}

export type LatestNewsSlice = {
  __typename?: 'LatestNewsSlice'
  id: Scalars['ID']
  title: Scalars['String']
  tag: Scalars['String']
  readMoreText: Scalars['String']
  news: Array<News>
}

export type BulletListSlice = {
  __typename?: 'BulletListSlice'
  id: Scalars['ID']
  bullets: Array<BulletEntry>
}

export type BulletEntry = IconBullet | NumberBulletGroup

export type IconBullet = {
  __typename?: 'IconBullet'
  id: Scalars['ID']
  title: Scalars['String']
  body: Scalars['String']
  icon: Image
  url?: Maybe<Scalars['String']>
  linkText?: Maybe<Scalars['String']>
}

export type NumberBulletGroup = {
  __typename?: 'NumberBulletGroup'
  id: Scalars['ID']
  defaultVisible: Scalars['Int']
  bullets: Array<NumberBullet>
}

export type FaqList = {
  __typename?: 'FaqList'
  id: Scalars['ID']
  title: Scalars['String']
  questions: Array<QuestionAndAnswer>
}

export type ConnectedComponent = {
  __typename?: 'ConnectedComponent'
  id: Scalars['ID']
  title: Scalars['String']
  type?: Maybe<Scalars['String']>
  json?: Maybe<Scalars['JSON']>
}

export type EmbeddedVideo = {
  __typename?: 'EmbeddedVideo'
  id: Scalars['ID']
  title: Scalars['String']
  url: Scalars['String']
}

export type SectionWithImage = {
  __typename?: 'SectionWithImage'
  id: Scalars['ID']
  title: Scalars['String']
  image?: Maybe<Image>
  html: Html
}

export type TabSection = {
  __typename?: 'TabSection'
  id: Scalars['ID']
  title: Scalars['String']
  tabs: Array<TabContent>
}

export type TeamList = {
  __typename?: 'TeamList'
  id: Scalars['ID']
  teamMembers: Array<TeamMember>
}

export type ContactUs = {
  __typename?: 'ContactUs'
  id: Scalars['ID']
  title: Scalars['String']
  required: Scalars['String']
  invalidPhone: Scalars['String']
  invalidEmail: Scalars['String']
  labelName: Scalars['String']
  labelPhone: Scalars['String']
  labelEmail: Scalars['String']
  labelSubject: Scalars['String']
  labelMessage: Scalars['String']
  submitButtonText: Scalars['String']
  successMessage: Scalars['String']
  errorMessage: Scalars['String']
}

export type Location = {
  __typename?: 'Location'
  id: Scalars['ID']
  title: Scalars['String']
  subTitle: Scalars['String']
  address: Scalars['String']
  link?: Maybe<Link>
  background: Image
}

export type Districts = {
  __typename?: 'Districts'
  id: Scalars['ID']
  title: Scalars['String']
  description?: Maybe<Scalars['String']>
  image?: Maybe<Image>
  links: Array<Link>
}

export type FeaturedArticles = {
  __typename?: 'FeaturedArticles'
  id: Scalars['ID']
  title: Scalars['String']
  image?: Maybe<Image>
  articles: Array<Article>
  link?: Maybe<Link>
}

export type TwoColumnText = {
  __typename?: 'TwoColumnText'
  id: Scalars['ID']
  rightTitle?: Maybe<Scalars['String']>
  rightContent?: Maybe<Array<Slice>>
  rightLink?: Maybe<Link>
  leftTitle?: Maybe<Scalars['String']>
  leftContent?: Maybe<Array<Slice>>
  leftLink?: Maybe<Link>
}

export type MultipleStatistics = {
  __typename?: 'MultipleStatistics'
  id: Scalars['ID']
  title: Scalars['String']
  statistics: Array<Statistics>
  link?: Maybe<Link>
}

export type AccordionSlice = {
  __typename?: 'AccordionSlice'
  id: Scalars['ID']
  title: Scalars['String']
  type: Scalars['String']
  accordionItems?: Maybe<Array<OneColumnText>>
}

export type OverviewLinks = {
  __typename?: 'OverviewLinks'
  id: Scalars['ID']
  overviewLinks: Array<IntroLinkImage>
  link?: Maybe<Link>
}

export type EventSlice = {
  __typename?: 'EventSlice'
  id: Scalars['ID']
  title: Scalars['String']
  subtitle: Scalars['String']
  date: Scalars['String']
  link?: Maybe<Link>
  backgroundImage?: Maybe<Image>
}

export type NumberBullet = {
  __typename?: 'NumberBullet'
  id: Scalars['ID']
  title: Scalars['String']
  body: Scalars['String']
}

export type Statistic = {
  __typename?: 'Statistic'
  id: Scalars['ID']
  value: Scalars['String']
  label: Scalars['String']
}

export type Statistics = {
  __typename?: 'Statistics'
  id: Scalars['ID']
  title: Scalars['String']
  statistics: Array<Statistic>
}

export type ProcessEntry = {
  __typename?: 'ProcessEntry'
  id: Scalars['ID']
  type: Scalars['String']
  processTitle: Scalars['String']
  processLink: Scalars['String']
  openLinkInModal?: Maybe<Scalars['Boolean']>
  buttonText: Scalars['String']
}

export type QuestionAndAnswer = {
  __typename?: 'QuestionAndAnswer'
  id: Scalars['ID']
  question: Scalars['String']
  answer: Array<Slice>
}

export type TabContent = {
  __typename?: 'TabContent'
  tabTitle: Scalars['String']
  contentTitle?: Maybe<Scalars['String']>
  image?: Maybe<Image>
  body?: Maybe<Html>
}

export type TeamMember = {
  __typename?: 'TeamMember'
  name: Scalars['String']
  title: Scalars['String']
  image: Image
}

export type TellUsAStory = {
  __typename?: 'TellUsAStory'
  id: Scalars['ID']
  introTitle: Scalars['String']
  introDescription?: Maybe<Html>
  introImage?: Maybe<Image>
  firstSectionTitle: Scalars['String']
  organizationLabel: Scalars['String']
  organizationPlaceholder: Scalars['String']
  organizationInputErrorMessage: Scalars['String']
  dateOfStoryLabel: Scalars['String']
  dateOfStoryPlaceholder: Scalars['String']
  dateOfStoryInputErrorMessage: Scalars['String']
  secondSectionTitle: Scalars['String']
  subjectLabel: Scalars['String']
  subjectPlaceholder: Scalars['String']
  subjectInputErrorMessage?: Maybe<Scalars['String']>
  messageLabel: Scalars['String']
  messagePlaceholder: Scalars['String']
  messageInputErrorMessage: Scalars['String']
  thirdSectionTitle: Scalars['String']
  instructionsDescription?: Maybe<Html>
  instructionsImage: Image
  instructionsTitle: Scalars['String']
  nameLabel: Scalars['String']
  namePlaceholder: Scalars['String']
  nameInputErrorMessage: Scalars['String']
  emailLabel: Scalars['String']
  emailPlaceholder: Scalars['String']
  emailInputErrorMessage: Scalars['String']
  publicationAllowedLabel: Scalars['String']
  submitButtonTitle: Scalars['String']
  SuccessMessageTitle: Scalars['String']
  successMessage?: Maybe<Html>
  errorMessageTitle: Scalars['String']
  errorMessage?: Maybe<Html>
}

export type OneColumnText = {
  __typename?: 'OneColumnText'
  id: Scalars['ID']
  title: Scalars['String']
  link?: Maybe<Link>
  content?: Maybe<Array<Slice>>
}

export type ReferenceLink = {
  __typename?: 'ReferenceLink'
  slug: Scalars['String']
  type: Scalars['String']
}

export type IntroLinkImage = {
  __typename?: 'IntroLinkImage'
  title: Scalars['String']
  intro: Html
  image?: Maybe<Image>
  leftImage: Scalars['Boolean']
  linkTitle: Scalars['String']
  link: ReferenceLink
}

export type FooterItem = {
  __typename?: 'FooterItem'
  id: Scalars['ID']
  title: Scalars['String']
  link?: Maybe<Link>
  content?: Maybe<Array<Slice>>
}

export type Organization = {
  __typename?: 'Organization'
  id: Scalars['ID']
  title: Scalars['String']
  shortTitle: Scalars['String']
  description?: Maybe<Scalars['String']>
  slug: Scalars['String']
  tag: Array<OrganizationTag>
  logo?: Maybe<Image>
  link?: Maybe<Scalars['String']>
  footerItems: Array<FooterItem>
}

export type ArticleReference = {
  __typename?: 'ArticleReference'
  id: Scalars['ID']
  title: Scalars['String']
  slug: Scalars['String']
  intro: Scalars['String']
  group?: Maybe<ArticleGroup>
  organization?: Maybe<Array<Organization>>
}

export type SubArticle = {
  __typename?: 'SubArticle'
  id: Scalars['ID']
  title: Scalars['String']
  slug: Scalars['String']
  parent?: Maybe<ArticleReference>
  body: Array<Slice>
  showTableOfContents?: Maybe<Scalars['Boolean']>
}

export type Article = {
  __typename?: 'Article'
  id: Scalars['ID']
  title: Scalars['String']
  slug: Scalars['String']
  shortTitle?: Maybe<Scalars['String']>
  intro?: Maybe<Scalars['String']>
  importance?: Maybe<Scalars['Float']>
  body: Array<Slice>
  processEntry?: Maybe<ProcessEntry>
  category?: Maybe<ArticleCategory>
  otherCategories?: Maybe<Array<ArticleCategory>>
  group?: Maybe<ArticleGroup>
  otherGroups?: Maybe<Array<ArticleGroup>>
  subgroup?: Maybe<ArticleSubgroup>
  otherSubgroups?: Maybe<Array<ArticleSubgroup>>
  organization?: Maybe<Array<Organization>>
  relatedOrganization?: Maybe<Array<Organization>>
  responsibleParty?: Maybe<Array<Organization>>
  subArticles: Array<SubArticle>
  relatedArticles?: Maybe<Array<Article>>
  relatedContent?: Maybe<Array<Link>>
  featuredImage?: Maybe<Image>
  showTableOfContents?: Maybe<Scalars['Boolean']>
}

export type ContentSlug = {
  __typename?: 'ContentSlug'
  id: Scalars['ID']
  slug: Scalars['String']
  type: Scalars['String']
}

export type AdgerdirTag = {
  __typename?: 'AdgerdirTag'
  id: Scalars['ID']
  title: Scalars['String']
}

export type AdgerdirPage = {
  __typename?: 'AdgerdirPage'
  id: Scalars['ID']
  title: Scalars['String']
  description: Scalars['String']
  longDescription?: Maybe<Scalars['String']>
  content: Array<Slice>
  objective?: Maybe<Scalars['String']>
  slug: Scalars['String']
  tags: Array<AdgerdirTag>
  link?: Maybe<Scalars['String']>
  linkButtonText?: Maybe<Scalars['String']>
  status: Scalars['String']
  estimatedCostIsk?: Maybe<Scalars['Float']>
  finalCostIsk?: Maybe<Scalars['Float']>
  processEntry?: Maybe<ProcessEntry>
}

export type Organizations = {
  __typename?: 'Organizations'
  items: Array<Organization>
}

export type AdgerdirPages = {
  __typename?: 'AdgerdirPages'
  items: Array<AdgerdirPage>
}

export type AdgerdirFrontpage = {
  __typename?: 'AdgerdirFrontpage'
  id: Scalars['ID']
  slug: Scalars['String']
  title: Scalars['String']
  description?: Maybe<Scalars['String']>
  content: Array<Slice>
  slices: Array<AdgerdirSlice>
  featuredImage?: Maybe<Image>
}

export type AdgerdirSlice = AdgerdirGroupSlice | AdgerdirFeaturedNewsSlice

export type AdgerdirGroupSlice = {
  __typename?: 'AdgerdirGroupSlice'
  id: Scalars['ID']
  subtitle?: Maybe<Scalars['String']>
  title: Scalars['String']
  description?: Maybe<Scalars['String']>
  image?: Maybe<Image>
  pages: Array<AdgerdirPage>
}

export type AdgerdirFeaturedNewsSlice = {
  __typename?: 'AdgerdirFeaturedNewsSlice'
  id: Scalars['ID']
  title: Scalars['String']
  featured: Array<News>
}

export type Namespace = {
  __typename?: 'Namespace'
  namespace: Scalars['String']
  fields: Scalars['String']
}

export type PageHeader = {
  __typename?: 'PageHeader'
  typename: Scalars['String']
  id: Scalars['ID']
  title: Scalars['String']
  introduction: Scalars['String']
  navigationText: Scalars['String']
  links: Array<Link>
  slices: Array<TimelineSlice>
}

export type AboutPage = {
  __typename?: 'AboutPage'
  id: Scalars['ID']
  title: Scalars['String']
  slug: Scalars['String']
  seoDescription: Scalars['String']
  theme: Scalars['String']
  pageHeader: PageHeader
  slices: Array<Slice>
}

export type AlertBanner = {
  __typename?: 'AlertBanner'
  id: Scalars['ID']
  showAlertBanner: Scalars['Boolean']
  bannerVariant: Scalars['String']
  title?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  linkTitle?: Maybe<Scalars['String']>
  link?: Maybe<ReferenceLink>
  isDismissable: Scalars['Boolean']
  dismissedForDays: Scalars['Int']
}

export type GenericPage = {
  __typename?: 'GenericPage'
  title: Scalars['String']
  slug: Scalars['String']
  intro?: Maybe<Scalars['String']>
  mainContent?: Maybe<Scalars['String']>
  sidebar?: Maybe<Scalars['String']>
  misc?: Maybe<Scalars['String']>
}

export type MenuLink = {
  __typename?: 'MenuLink'
  title: Scalars['String']
  link: ReferenceLink
}

export type MenuLinkWithChildren = {
  __typename?: 'MenuLinkWithChildren'
  title: Scalars['String']
  link?: Maybe<ReferenceLink>
  childLinks: Array<MenuLink>
}

export type Menu = {
  __typename?: 'Menu'
  id: Scalars['ID']
  title: Scalars['String']
  links: Array<Link>
  menuLinks: Array<MenuLinkWithChildren>
}

export type GenericOverviewPage = {
  __typename?: 'GenericOverviewPage'
  id: Scalars['ID']
  title: Scalars['String']
  pageIdentifier: Scalars['String']
  intro?: Maybe<Html>
  navigation: Menu
  overviewLinks: Array<IntroLinkImage>
}

export type AdgerdirTags = {
  __typename?: 'AdgerdirTags'
  items: Array<AdgerdirTag>
}

export type LifeEventPage = {
  __typename?: 'LifeEventPage'
  id: Scalars['ID']
  title: Scalars['String']
  slug: Scalars['String']
  intro?: Maybe<Scalars['String']>
  image?: Maybe<Image>
  thumbnail?: Maybe<Image>
  content: Array<Slice>
  category?: Maybe<ArticleCategory>
}

export type OrganizationTags = {
  __typename?: 'OrganizationTags'
  items: Array<OrganizationTag>
}

export type Url = {
  __typename?: 'Url'
  id: Scalars['ID']
  title?: Maybe<Scalars['String']>
  page?: Maybe<ReferenceLink>
  urlsList: Array<Scalars['String']>
}

export type AboutSubPage = {
  __typename?: 'AboutSubPage'
  id: Scalars['ID']
  title: Scalars['String']
  slug: Scalars['String']
  url: Scalars['String']
  description: Scalars['String']
  subDescription: Scalars['String']
  intro?: Maybe<Html>
  slices: Array<Slice>
  bottomSlices: Array<Slice>
  parent?: Maybe<AboutPage>
}

export type SubpageHeader = {
  __typename?: 'SubpageHeader'
  subpageId: Scalars['String']
  title: Scalars['String']
  summary: Scalars['String']
  featuredImage?: Maybe<Image>
  body?: Maybe<Array<Slice>>
}

export type LinkGroup = {
  __typename?: 'LinkGroup'
  id: Scalars['ID']
  name: Scalars['String']
  primaryLink: Link
  childrenLinks: Array<Link>
}

export type SidebarCard = {
  __typename?: 'SidebarCard'
  id: Scalars['ID']
  type: Scalars['String']
  title: Scalars['String']
  content: Scalars['String']
  link?: Maybe<Link>
}

export type OrganizationTheme = {
  __typename?: 'OrganizationTheme'
  gradientStartColor: Scalars['String']
  gradientEndColor: Scalars['String']
}

export type OrganizationPage = {
  __typename?: 'OrganizationPage'
  id: Scalars['ID']
  title: Scalars['String']
  slug: Scalars['String']
  description: Scalars['String']
  theme: Scalars['String']
  themeProperties: OrganizationTheme
  slices: Array<Slice>
  bottomSlices: Array<Slice>
  newsTag?: Maybe<GenericTag>
  menuLinks: Array<LinkGroup>
  secondaryMenu?: Maybe<LinkGroup>
  organization: Organization
  featuredImage?: Maybe<Image>
  footerItems: Array<FooterItem>
  sidebarCards: Array<SidebarCard>
}

export type OrganizationSubpage = {
  __typename?: 'OrganizationSubpage'
  id: Scalars['ID']
  title: Scalars['String']
  slug: Scalars['String']
  url: Array<Scalars['String']>
  intro?: Maybe<Scalars['String']>
  description?: Maybe<Array<Slice>>
  links?: Maybe<Array<Link>>
  slices?: Maybe<Array<Slice>>
  sliceCustomRenderer?: Maybe<Scalars['String']>
  sliceExtraText?: Maybe<Scalars['String']>
  parentSubpage?: Maybe<Scalars['String']>
  organizationPage: OrganizationPage
  featuredImage?: Maybe<Image>
}

export type ErrorPage = {
  __typename?: 'ErrorPage'
  id: Scalars['ID']
  errorCode: Scalars['String']
  title: Scalars['String']
  description?: Maybe<Html>
}

export type Auction = {
  __typename?: 'Auction'
  id: Scalars['ID']
  title: Scalars['String']
  updatedAt: Scalars['String']
  date: Scalars['String']
  type: Scalars['String']
  content?: Maybe<Array<Slice>>
  organization: Organization
}

export type Featured = {
  __typename?: 'Featured'
  title: Scalars['String']
  attention: Scalars['Boolean']
  thing?: Maybe<ReferenceLink>
}

export type FrontpageSlider = {
  __typename?: 'FrontpageSlider'
  title: Scalars['String']
  subtitle: Scalars['String']
  intro?: Maybe<Html>
  content: Scalars['String']
  link?: Maybe<Scalars['String']>
  animationJsonAsset?: Maybe<Asset>
}

export type Frontpage = {
  __typename?: 'Frontpage'
  id: Scalars['ID']
  title?: Maybe<Scalars['String']>
  featured: Array<Featured>
  slides: Array<FrontpageSlider>
  namespace?: Maybe<Namespace>
  lifeEvents: Array<LifeEventPage>
}

export type Graph = {
  __typename?: 'Graph'
  title: Scalars['String']
  data: Scalars['String']
  datakeys: Scalars['String']
  type: Scalars['String']
}

export type GraphCard = {
  __typename?: 'GraphCard'
  graphTitle: Scalars['String']
  graphDescription: Scalars['String']
  organization?: Maybe<Scalars['String']>
  graph: Graph
}

export type StatisticsCard = {
  __typename?: 'StatisticsCard'
  title: Scalars['String']
  statistic: Scalars['String']
  image?: Maybe<Image>
}

export type OpenDataPage = {
  __typename?: 'OpenDataPage'
  id: Scalars['ID']
  pageTitle: Scalars['String']
  pageDescription: Scalars['String']
  pageHeaderGraph: Graph
  link: Scalars['String']
  linkTitle: Scalars['String']
  statisticsCardsSection: Array<StatisticsCard>
  chartSectionTitle: Scalars['String']
  graphCards: Array<GraphCard>
  externalLinkCardSelection: LinkCardSlice
  externalLinkSectionTitle: Scalars['String']
  externalLinkSectionDescription: Scalars['String']
  externalLinkSectionImage?: Maybe<Image>
}

export type ProjectSubpage = {
  __typename?: 'ProjectSubpage'
  id: Scalars['ID']
  title: Scalars['String']
  slug: Scalars['String']
  content?: Maybe<Array<Slice>>
  slices: Array<Slice>
}

export type Step = {
  __typename?: 'Step'
  id: Scalars['ID']
  title: Scalars['String']
  slug: Scalars['String']
  subtitle?: Maybe<Array<Slice>>
  text?: Maybe<Array<Slice>>
  isAnswer: Scalars['Boolean']
  options?: Maybe<Scalars['String']>
}

export type Stepper = {
  __typename?: 'Stepper'
  id: Scalars['ID']
  title: Scalars['String']
  steps?: Maybe<Array<Step>>
}

export type ProjectPage = {
  __typename?: 'ProjectPage'
  id: Scalars['ID']
  title: Scalars['String']
  slug: Scalars['String']
  theme: Scalars['String']
  sidebar: Scalars['Boolean']
  sidebarLinks: Array<Link>
  subtitle: Scalars['String']
  intro: Scalars['String']
  content?: Maybe<Array<Slice>>
  stepper?: Maybe<Stepper>
  slices: Array<Slice>
  newsTag?: Maybe<GenericTag>
  projectSubpages: Array<ProjectSubpage>
  featuredImage?: Maybe<Image>
}

export type NewsList = {
  __typename?: 'NewsList'
  total: Scalars['Int']
  items: Array<News>
}

export type GroupedMenu = {
  __typename?: 'GroupedMenu'
  id: Scalars['ID']
  title: Scalars['String']
  menus: Array<Menu>
}

export type TagCount = {
  __typename?: 'TagCount'
  key: Scalars['String']
  value: Scalars['String']
  count: Scalars['Int']
}

export type TypeCount = {
  __typename?: 'TypeCount'
  key: Scalars['String']
  count: Scalars['Int']
}

export type SearchResult = {
  __typename?: 'SearchResult'
  total: Scalars['Int']
  items: Array<Items>
  tagCounts?: Maybe<Array<TagCount>>
  typesCount?: Maybe<Array<TypeCount>>
}

export type Items =
  | Article
  | LifeEventPage
  | News
  | AboutPage
  | AdgerdirPage
  | SubArticle
  | OrganizationSubpage

export type WebSearchAutocomplete = {
  __typename?: 'WebSearchAutocomplete'
  total: Scalars['Int']
  completions: Array<Scalars['String']>
}

export type Eligibility = {
  __typename?: 'Eligibility'
  id: Scalars['ID']
  issued: Scalars['String']
  expires: Scalars['String']
  comment: Scalars['String']
}

export type DrivingLicense = {
  __typename?: 'DrivingLicense'
  id: Scalars['ID']
  name: Scalars['String']
  issued: Scalars['String']
  expires: Scalars['String']
  isProvisional?: Maybe<Scalars['Boolean']>
  eligibilities: Array<Eligibility>
}

export type DrivingLicenseType = {
  __typename?: 'DrivingLicenseType'
  id: Scalars['ID']
  name: Scalars['String']
}

export type PenaltyPointStatus = {
  __typename?: 'PenaltyPointStatus'
  nationalId: Scalars['ID']
  isPenaltyPointsOk: Scalars['Boolean']
}

export type HasTeachingRights = {
  __typename?: 'HasTeachingRights'
  nationalId: Scalars['ID']
  hasTeachingRights: Scalars['Boolean']
}

export type StudentInformation = {
  __typename?: 'StudentInformation'
  name: Scalars['String']
}

export type StudentInformationResult = {
  __typename?: 'StudentInformationResult'
  student?: Maybe<StudentInformation>
}

export type ApplicationEligibilityRequirement = {
  __typename?: 'ApplicationEligibilityRequirement'
  key: RequirementKey
  requirementMet: Scalars['Boolean']
}

export enum RequirementKey {
  DrivingAssessmentMissing = 'drivingAssessmentMissing',
  DrivingSchoolMissing = 'drivingSchoolMissing',
  DeniedByService = 'deniedByService',
}

export type ApplicationEligibility = {
  __typename?: 'ApplicationEligibility'
  isEligible: Scalars['Boolean']
  requirements: Array<ApplicationEligibilityRequirement>
}

export type Juristiction = {
  __typename?: 'Juristiction'
  id: Scalars['ID']
  zip: Scalars['Float']
  name: Scalars['String']
}

export type DrivingLicenseDeprevationType = {
  __typename?: 'DrivingLicenseDeprevationType'
  id: Scalars['ID']
  name: Scalars['String']
}

export type DrivingLicenseRemarkType = {
  __typename?: 'DrivingLicenseRemarkType'
  id: Scalars['ID']
  remark: Scalars['Boolean']
  name: Scalars['String']
  for: Scalars['String']
  description: Scalars['String']
}

export type EducationLicense = {
  __typename?: 'EducationLicense'
  id: Scalars['ID']
  school: Scalars['String']
  programme: Scalars['String']
  date: Scalars['String']
}

export type EducationSignedLicense = {
  __typename?: 'EducationSignedLicense'
  url: Scalars['ID']
}

export type Grade = {
  __typename?: 'Grade'
  grade: Scalars['String']
  weight?: Maybe<Scalars['String']>
}

export type EducationIcelandicGrade = {
  __typename?: 'EducationIcelandicGrade'
  grade: Scalars['String']
  competence: Scalars['String']
  competenceStatus: Scalars['String']
  reading: Grade
  grammar: Grade
  progressText: Scalars['String']
}

export type EducationEnglishGrade = {
  __typename?: 'EducationEnglishGrade'
  grade: Scalars['String']
  competence: Scalars['String']
  competenceStatus: Scalars['String']
  reading: Grade
  grammar: Grade
  progressText: Scalars['String']
}

export type EducationMathGrade = {
  __typename?: 'EducationMathGrade'
  grade: Scalars['String']
  competence: Scalars['String']
  competenceStatus: Scalars['String']
  calculation: Grade
  geometry: Grade
  ratiosAndPercentages: Grade
  algebra: Grade
  numberComprehension: Grade
  wordAndNumbers: Scalars['String']
  progressText: Scalars['String']
}

export type EducationGradeResult = {
  __typename?: 'EducationGradeResult'
  studentYear: Scalars['String']
  icelandicGrade?: Maybe<EducationIcelandicGrade>
  mathGrade?: Maybe<EducationMathGrade>
  englishGrade?: Maybe<EducationEnglishGrade>
}

export type EducationExamResult = {
  __typename?: 'EducationExamResult'
  id: Scalars['ID']
  fullName: Scalars['String']
  grades: Array<EducationGradeResult>
}

export type EducationExamFamilyOverview = {
  __typename?: 'EducationExamFamilyOverview'
  nationalId: Scalars['ID']
  name: Scalars['String']
  isChild: Scalars['Boolean']
  organizationType: Scalars['String']
  organizationName: Scalars['String']
  yearInterval: Scalars['String']
}

export type ActionCardTag = {
  __typename?: 'ActionCardTag'
  label?: Maybe<Scalars['String']>
  variant?: Maybe<Scalars['String']>
}

export type ActionCardMetaData = {
  __typename?: 'ActionCardMetaData'
  title?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  tag?: Maybe<ActionCardTag>
}

export type Application = {
  __typename?: 'Application'
  id: Scalars['ID']
  created: Scalars['DateTime']
  modified: Scalars['DateTime']
  applicant: Scalars['String']
  assignees: Array<Scalars['String']>
  state: Scalars['String']
  actionCard?: Maybe<ActionCardMetaData>
  attachments?: Maybe<Scalars['JSON']>
  typeId: ApplicationResponseDtoTypeIdEnum
  answers: Scalars['JSON']
  externalData: Scalars['JSON']
  name?: Maybe<Scalars['String']>
  institution?: Maybe<Scalars['String']>
  progress?: Maybe<Scalars['Float']>
  status: ApplicationResponseDtoStatusEnum
}

export enum ApplicationResponseDtoTypeIdEnum {
  ExampleForm = 'ExampleForm',
  Passport = 'Passport',
  DrivingLessons = 'DrivingLessons',
  DrivingLicense = 'DrivingLicense',
  DrivingAssessmentApproval = 'DrivingAssessmentApproval',
  ParentalLeave = 'ParentalLeave',
  MetaApplication = 'MetaApplication',
  DocumentProviderOnboarding = 'DocumentProviderOnboarding',
  HealthInsurance = 'HealthInsurance',
  ChildrenResidenceChange = 'ChildrenResidenceChange',
  DataProtectionAuthorityComplaint = 'DataProtectionAuthorityComplaint',
  PartyLetter = 'PartyLetter',
  LoginService = 'LoginService',
  PartyApplication = 'PartyApplication',
  InstitutionCollaboration = 'InstitutionCollaboration',
  FundingGovernmentProjects = 'FundingGovernmentProjects',
  PublicDebtPaymentPlan = 'PublicDebtPaymentPlan',
  JointCustodyAgreement = 'JointCustodyAgreement',
  PayableDummyTemplate = 'PayableDummyTemplate',
  ComplaintsToAlthingiOmbudsman = 'ComplaintsToAlthingiOmbudsman',
  AccidentNotification = 'AccidentNotification',
  UnemploymentBenefits = 'UnemploymentBenefits',
}

export enum ApplicationResponseDtoStatusEnum {
  Inprogress = 'inprogress',
  Completed = 'completed',
  Rejected = 'rejected',
}

export type ApplicationPayment = {
  __typename?: 'ApplicationPayment'
  fulfilled: Scalars['Boolean']
}

export type RequestFileSignatureResponse = {
  __typename?: 'RequestFileSignatureResponse'
  controlCode: Scalars['String']
  documentToken: Scalars['String']
}

export type PresignedUrlResponse = {
  __typename?: 'PresignedUrlResponse'
  url: Scalars['String']
}

export type UploadSignedFileResponse = {
  __typename?: 'UploadSignedFileResponse'
  documentSigned: Scalars['Boolean']
}

export type ApplicationPaymentChargeResponse = {
  __typename?: 'ApplicationPaymentChargeResponse'
  id: Scalars['String']
  paymentUrl: Scalars['String']
}

export type Union = {
  __typename?: 'Union'
  id: Scalars['String']
  name: Scalars['String']
}

export type PensionFund = {
  __typename?: 'PensionFund'
  id: Scalars['String']
  name: Scalars['String']
}

export type ParentalLeaveEntitlement = {
  __typename?: 'ParentalLeaveEntitlement'
  independentMonths: Scalars['Float']
  transferableMonths: Scalars['Float']
}

export type ParentalLeavePeriod = {
  __typename?: 'ParentalLeavePeriod'
  from: Scalars['String']
  to: Scalars['String']
  ratio: Scalars['Float']
  approved: Scalars['Boolean']
  paid: Scalars['Boolean']
  rightsCodePeriod?: Maybe<Scalars['String']>
}

export type ParentalLeavePaymentPlan = {
  __typename?: 'ParentalLeavePaymentPlan'
  estimatedAmount: Scalars['Float']
  pensionAmount: Scalars['Float']
  privatePensionAmount: Scalars['Float']
  unionAmount: Scalars['Float']
  taxAmount: Scalars['Float']
  estimatePayment: Scalars['Float']
  period: ParentalLeavePeriod
}

export type PregnancyStatus = {
  __typename?: 'PregnancyStatus'
  hasActivePregnancy: Scalars['Boolean']
  expectedDateOfBirth: Scalars['String']
}

export type ParentalLeaveAttachment = {
  __typename?: 'ParentalLeaveAttachment'
  attachmentType: Scalars['String']
  attachmentBytes: Scalars['String']
}

export type ParentalLeaveEmployer = {
  __typename?: 'ParentalLeaveEmployer'
  email?: Maybe<Scalars['String']>
  nationalRegistryId: Scalars['String']
}

export type ParentalLeavePensionFund = {
  __typename?: 'ParentalLeavePensionFund'
  id: Scalars['String']
  name: Scalars['String']
}

export type ParentalLeaveUnion = {
  __typename?: 'ParentalLeaveUnion'
  id: Scalars['String']
  name: Scalars['String']
}

export type ParentalLeavePaymentInfo = {
  __typename?: 'ParentalLeavePaymentInfo'
  bankAccount: Scalars['String']
  personalAllowance: Scalars['Float']
  personalAllowanceFromSpouse: Scalars['Float']
  union: ParentalLeaveUnion
  pensionFund: ParentalLeavePensionFund
  privatePensionFund: ParentalLeavePensionFund
  privatePensionFundRatio: Scalars['Float']
}

export type ParentalLeave = {
  __typename?: 'ParentalLeave'
  applicationId: Scalars['ID']
  applicant: Scalars['String']
  otherParentId?: Maybe<Scalars['String']>
  expectedDateOfBirth: Scalars['String']
  dateOfBirth: Scalars['String']
  email: Scalars['String']
  phoneNumber: Scalars['String']
  paymentInfo: ParentalLeavePaymentInfo
  periods: Array<ParentalLeavePeriod>
  employers: Array<ParentalLeaveEmployer>
  status: Scalars['String']
  rightsCode?: Maybe<Scalars['String']>
  attachments?: Maybe<Array<ParentalLeaveAttachment>>
}

export type ParentalLeavePeriodEndDate = {
  __typename?: 'ParentalLeavePeriodEndDate'
  periodEndDate: Scalars['Float']
}

export type ParentalLeavePeriodLength = {
  __typename?: 'ParentalLeavePeriodLength'
  periodLength: Scalars['Int']
}

export type PresignedPost = {
  __typename?: 'PresignedPost'
  url: Scalars['String']
  fields: Scalars['JSON']
}

export type DocumentDetails = {
  __typename?: 'DocumentDetails'
  fileType: Scalars['String']
  content: Scalars['String']
  html: Scalars['String']
  url: Scalars['String']
}

export type DocumentCategory = {
  __typename?: 'DocumentCategory'
  id: Scalars['ID']
  name: Scalars['String']
}

export type Document = {
  __typename?: 'Document'
  id: Scalars['ID']
  date: Scalars['DateTime']
  subject: Scalars['String']
  senderName: Scalars['String']
  senderNatReg: Scalars['String']
  opened: Scalars['Boolean']
  fileType: Scalars['String']
  url: Scalars['String']
}

export type CommunicationResponse = {
  __typename?: 'CommunicationResponse'
  sent: Scalars['Boolean']
}

export type UserProfile = {
  __typename?: 'UserProfile'
  nationalId: Scalars['ID']
  mobilePhoneNumber?: Maybe<Scalars['String']>
  locale?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  emailVerified: Scalars['Boolean']
  mobilePhoneNumberVerified: Scalars['Boolean']
}

export type ConfirmResponse = {
  __typename?: 'ConfirmResponse'
  message: Scalars['String']
  confirmed: Scalars['Boolean']
}

export type Response = {
  __typename?: 'Response'
  created: Scalars['Boolean']
}

export type OpenApi = {
  __typename?: 'OpenApi'
  spec: Scalars['String']
}

export type PageInfo = {
  __typename?: 'PageInfo'
  nextCursor?: Maybe<Scalars['String']>
}

export type ExternalLinks = {
  __typename?: 'ExternalLinks'
  responsibleParty: Scalars['String']
  documentation: Scalars['String']
  bugReport: Scalars['String']
  featureRequest: Scalars['String']
}

export type XroadIdentifier = {
  __typename?: 'XroadIdentifier'
  instance: Scalars['String']
  memberClass: Scalars['String']
  memberCode: Scalars['String']
  subsystemCode: Scalars['String']
  serviceCode: Scalars['String']
}

export type ServiceDetail = {
  __typename?: 'ServiceDetail'
  version: Scalars['ID']
  title: Scalars['String']
  summary: Scalars['String']
  description: Scalars['String']
  type: TypeCategory
  pricing: Array<PricingCategory>
  data: Array<DataCategory>
  links: ExternalLinks
  xroadIdentifier: XroadIdentifier
}

export enum TypeCategory {
  Rest = 'REST',
  Soap = 'SOAP',
  Graphql = 'GRAPHQL',
}

export enum PricingCategory {
  Free = 'FREE',
  Paid = 'PAID',
}

export enum DataCategory {
  Open = 'OPEN',
  Public = 'PUBLIC',
  Official = 'OFFICIAL',
  Personal = 'PERSONAL',
  Health = 'HEALTH',
  Financial = 'FINANCIAL',
}

export type ServiceEnvironment = {
  __typename?: 'ServiceEnvironment'
  environment: Environment
  details: Array<ServiceDetail>
}

export enum Environment {
  Development = 'DEVELOPMENT',
  Staging = 'STAGING',
  Production = 'PRODUCTION',
}

export type Service = {
  __typename?: 'Service'
  id: Scalars['ID']
  owner: Scalars['String']
  title: Scalars['String']
  summary: Scalars['String']
  description: Scalars['String']
  pricing: Array<PricingCategory>
  data: Array<DataCategory>
  type: Array<TypeCategory>
  access: Array<AccessCategory>
  environments: Array<ServiceEnvironment>
}

export enum AccessCategory {
  Xroad = 'XROAD',
  Apigw = 'APIGW',
}

export type ApiCatalogue = {
  __typename?: 'ApiCatalogue'
  services: Array<Service>
  pageInfo?: Maybe<PageInfo>
}

export type AudienceAndScope = {
  __typename?: 'AudienceAndScope'
  audience: Scalars['String']
  scope: Scalars['String']
}

export type ClientCredentials = {
  __typename?: 'ClientCredentials'
  clientId: Scalars['String']
  clientSecret: Scalars['String']
  providerId: Scalars['String']
}

export type TestResult = {
  __typename?: 'TestResult'
  id: Scalars['String']
  isValid: Scalars['Boolean']
  message?: Maybe<Scalars['String']>
}

export type Contact = {
  __typename?: 'Contact'
  id: Scalars['String']
  name: Scalars['String']
  email: Scalars['String']
  phoneNumber: Scalars['String']
  created: Scalars['DateTime']
  modified: Scalars['DateTime']
}

export type Helpdesk = {
  __typename?: 'Helpdesk'
  id: Scalars['String']
  email: Scalars['String']
  phoneNumber: Scalars['String']
  created: Scalars['DateTime']
  modified: Scalars['DateTime']
}

export type Provider = {
  __typename?: 'Provider'
  id: Scalars['String']
  organisationId?: Maybe<Scalars['String']>
  endpoint?: Maybe<Scalars['String']>
  endpointType?: Maybe<Scalars['String']>
  apiScope?: Maybe<Scalars['String']>
  xroad?: Maybe<Scalars['Boolean']>
  created: Scalars['DateTime']
  modified: Scalars['DateTime']
}

export type Organisation = {
  __typename?: 'Organisation'
  id: Scalars['String']
  nationalId: Scalars['String']
  name: Scalars['String']
  address?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  phoneNumber?: Maybe<Scalars['String']>
  created: Scalars['DateTime']
  modified: Scalars['DateTime']
  administrativeContact?: Maybe<Contact>
  technicalContact?: Maybe<Contact>
  helpdesk?: Maybe<Helpdesk>
  providers?: Maybe<Array<Provider>>
}

export type ProviderStatistics = {
  __typename?: 'ProviderStatistics'
  published: Scalars['Float']
  notifications: Scalars['Float']
  opened: Scalars['Float']
}

export type Homestay = {
  __typename?: 'Homestay'
  registrationNumber?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  address?: Maybe<Scalars['String']>
  manager?: Maybe<Scalars['String']>
  year?: Maybe<Scalars['Float']>
  city?: Maybe<Scalars['String']>
  guests?: Maybe<Scalars['Float']>
  rooms?: Maybe<Scalars['Float']>
  propertyId?: Maybe<Scalars['String']>
  apartmentId?: Maybe<Scalars['String']>
}

export type CurrentUserCompanies = {
  __typename?: 'CurrentUserCompanies'
  nationalId: Scalars['String']
  name: Scalars['String']
  operationalForm: Scalars['String']
  companyStatus: Scalars['String']
  isPartOfBoardOfDirectors: Scalars['Boolean']
  hasProcuration: Scalars['Boolean']
}

export type IcelandicName = {
  __typename?: 'IcelandicName'
  id: Scalars['Float']
  icelandicName: Scalars['String']
  type?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  visible?: Maybe<Scalars['Boolean']>
  description?: Maybe<Scalars['String']>
  verdict?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
  created: Scalars['DateTime']
  modified: Scalars['DateTime']
}

export type DeleteNameResponse = {
  __typename?: 'DeleteNameResponse'
  id: Scalars['Float']
}

export type CustomerChargeTypeItem = {
  __typename?: 'CustomerChargeTypeItem'
  id: Scalars['String']
  name: Scalars['String']
}

export type CustomerChargeType = {
  __typename?: 'CustomerChargeType'
  chargeType: Array<CustomerChargeTypeItem>
}

export type FinanceDocumentData = {
  __typename?: 'FinanceDocumentData'
  type: Scalars['String']
  document: Scalars['String']
}

export type FinanceDocumentModel = {
  __typename?: 'FinanceDocumentModel'
  docment: FinanceDocumentData
}

export type CustomerTapsControlModel = {
  __typename?: 'CustomerTapsControlModel'
  RecordsTap: Scalars['Boolean']
  employeeClaimsTap: Scalars['Boolean']
  localTaxTap: Scalars['Boolean']
}

export type DocumentsListModel = {
  __typename?: 'DocumentsListModel'
  documentsList: Array<DocumentsListItem>
}

export type DocumentsListItem = {
  __typename?: 'DocumentsListItem'
  id: Scalars['String']
  date: Scalars['String']
  type: Scalars['String']
  note?: Maybe<Scalars['String']>
  sender: Scalars['String']
  dateOpen: Scalars['String']
  amount: Scalars['Float']
}

export type CustomerRecordsItem = {
  __typename?: 'CustomerRecordsItem'
  createDate: Scalars['String']
  createTime: Scalars['String']
  valueDate: Scalars['String']
  performingOrganization: Scalars['String']
  collectingOrganization: Scalars['String']
  chargeType: Scalars['String']
  itemCode: Scalars['String']
  chargeItemSubject: Scalars['String']
  periodType: Scalars['String']
  period: Scalars['String']
  amount: Scalars['Float']
  category: Scalars['String']
  subCategory: Scalars['String']
  actionCategory?: Maybe<Scalars['String']>
  reference: Scalars['String']
  referenceToLevy: Scalars['String']
  accountReference: Scalars['String']
}

export type CustomerRecords = {
  __typename?: 'CustomerRecords'
  records: Array<CustomerRecordsItem>
}

export type EndorsementListOpen = {
  __typename?: 'EndorsementListOpen'
  id: Scalars['ID']
  title: Scalars['String']
  description?: Maybe<Scalars['String']>
  tags?: Maybe<Array<EndorsementListOpenTagsEnum>>
  closedDate?: Maybe<Scalars['String']>
}

export enum EndorsementListOpenTagsEnum {
  PartyLetter2021 = 'partyLetter2021',
  PartyApplicationNordausturkjordaemi2021 = 'partyApplicationNordausturkjordaemi2021',
  PartyApplicationNordvesturkjordaemi2021 = 'partyApplicationNordvesturkjordaemi2021',
  PartyApplicationReykjavikurkjordaemiNordur2021 = 'partyApplicationReykjavikurkjordaemiNordur2021',
  PartyApplicationReykjavikurkjordaemiSudur2021 = 'partyApplicationReykjavikurkjordaemiSudur2021',
  PartyApplicationSudurkjordaemi2021 = 'partyApplicationSudurkjordaemi2021',
  PartyApplicationSudvesturkjordaemi2021 = 'partyApplicationSudvesturkjordaemi2021',
}

export type EndorsementMetadata = {
  __typename?: 'EndorsementMetadata'
  fullName?: Maybe<Scalars['String']>
  address?: Maybe<Scalars['JSON']>
  bulkEndorsement?: Maybe<Scalars['Boolean']>
  signedTags?: Maybe<Array<EndorsementMetadataSignedTagsEnum>>
  voterRegion?: Maybe<Scalars['JSON']>
}

export enum EndorsementMetadataSignedTagsEnum {
  PartyLetter2021 = 'partyLetter2021',
  PartyApplicationNordausturkjordaemi2021 = 'partyApplicationNordausturkjordaemi2021',
  PartyApplicationNordvesturkjordaemi2021 = 'partyApplicationNordvesturkjordaemi2021',
  PartyApplicationReykjavikurkjordaemiNordur2021 = 'partyApplicationReykjavikurkjordaemiNordur2021',
  PartyApplicationReykjavikurkjordaemiSudur2021 = 'partyApplicationReykjavikurkjordaemiSudur2021',
  PartyApplicationSudurkjordaemi2021 = 'partyApplicationSudurkjordaemi2021',
  PartyApplicationSudvesturkjordaemi2021 = 'partyApplicationSudvesturkjordaemi2021',
}

export type Endorsement = {
  __typename?: 'Endorsement'
  id: Scalars['ID']
  endorser: Scalars['String']
  endorsementListId: Scalars['String']
  endorsementList?: Maybe<EndorsementListOpen>
  meta: EndorsementMetadata
  created: Scalars['String']
  modified: Scalars['String']
}

export type ValidationRule = {
  __typename?: 'ValidationRule'
  type: ValidationRuleDtoTypeEnum
  value?: Maybe<Scalars['JSON']>
}

export enum ValidationRuleDtoTypeEnum {
  MinAge = 'minAge',
  MinAgeAtDate = 'minAgeAtDate',
  UniqueWithinTags = 'uniqueWithinTags',
}

export type EndorsementList = {
  __typename?: 'EndorsementList'
  id: Scalars['ID']
  title: Scalars['String']
  description?: Maybe<Scalars['String']>
  closedDate?: Maybe<Scalars['String']>
  endorsementMeta: Array<EndorsementListEndorsementMetaEnum>
  tags: Array<EndorsementListTagsEnum>
  validationRules: Array<ValidationRule>
  owner: Scalars['String']
  endorsements: Array<Endorsement>
  meta: Scalars['JSON']
  created: Scalars['String']
  modified: Scalars['String']
}

export enum EndorsementListEndorsementMetaEnum {
  FullName = 'fullName',
  Address = 'address',
  SignedTags = 'signedTags',
  VoterRegion = 'voterRegion',
}

export enum EndorsementListTagsEnum {
  PartyLetter2021 = 'partyLetter2021',
  PartyApplicationNordausturkjordaemi2021 = 'partyApplicationNordausturkjordaemi2021',
  PartyApplicationNordvesturkjordaemi2021 = 'partyApplicationNordvesturkjordaemi2021',
  PartyApplicationReykjavikurkjordaemiNordur2021 = 'partyApplicationReykjavikurkjordaemiNordur2021',
  PartyApplicationReykjavikurkjordaemiSudur2021 = 'partyApplicationReykjavikurkjordaemiSudur2021',
  PartyApplicationSudurkjordaemi2021 = 'partyApplicationSudurkjordaemi2021',
  PartyApplicationSudvesturkjordaemi2021 = 'partyApplicationSudvesturkjordaemi2021',
}

export type NationalIdError = {
  __typename?: 'NationalIdError'
  nationalId: Scalars['String']
  message: Scalars['String']
}

export type EndorsementBulkCreate = {
  __typename?: 'EndorsementBulkCreate'
  succeeded: Array<Endorsement>
  failed: Array<NationalIdError>
}

export type PaymentCatalogItem = {
  __typename?: 'PaymentCatalogItem'
  performingOrgID: Scalars['String']
  chargeType: Scalars['String']
  chargeItemCode: Scalars['String']
  chargeItemName: Scalars['String']
  priceAmount: Scalars['Float']
}

export type PaymentCatalogResponse = {
  __typename?: 'PaymentCatalogResponse'
  items: Array<PaymentCatalogItem>
}

export type TemporaryVoterRegistry = {
  __typename?: 'TemporaryVoterRegistry'
  id: Scalars['ID']
  nationalId: Scalars['String']
  regionNumber: Scalars['Float']
  regionName: Scalars['String']
}

export type PartyLetterRegistry = {
  __typename?: 'PartyLetterRegistry'
  partyLetter: Scalars['ID']
  partyName: Scalars['String']
  owner: Scalars['String']
  managers: Array<Scalars['String']>
}

export type GenericLicenseDataField = {
  __typename?: 'GenericLicenseDataField'
  /** Type of data field */
  type: GenericLicenseDataFieldType
  /** Name of data field */
  name?: Maybe<Scalars['String']>
  /** Label of data field */
  label?: Maybe<Scalars['String']>
  /** Value of data field */
  value?: Maybe<Scalars['String']>
  /** Name of data field */
  fields?: Maybe<Array<GenericLicenseDataField>>
}

/** Possible types of data fields */
export enum GenericLicenseDataFieldType {
  Group = 'Group',
  Category = 'Category',
  Value = 'Value',
}

export type Payload = {
  __typename?: 'Payload'
  /** Data parsed into a standard format */
  data: Array<GenericLicenseDataField>
  /** Raw JSON data */
  rawData?: Maybe<Scalars['JSON']>
}

export type GenericLicenseProvider = {
  __typename?: 'GenericLicenseProvider'
  /** ID of license provider */
  id: GenericLicenseProviderId
}

/** Exhaustive list of license provider IDs */
export enum GenericLicenseProviderId {
  NationalPoliceCommissioner = 'NationalPoliceCommissioner',
  EnvironmentAgency = 'EnvironmentAgency',
}

export type GenericLicense = {
  __typename?: 'GenericLicense'
  /** Type of license from an exhaustive list */
  type: GenericLicenseType
  /** Provider of the license */
  provider: GenericLicenseProvider
  /** Does the license support pkpass? */
  pkpass: Scalars['Boolean']
  /** How long the data about the license should be treated as fresh */
  timeout: Scalars['Float']
  /** Status of license */
  status: GenericUserLicenseStatus
}

/** Exhaustive list of license types */
export enum GenericLicenseType {
  DriversLicense = 'DriversLicense',
  HuntingLicense = 'HuntingLicense',
}

/** Possible license statuses for user */
export enum GenericUserLicenseStatus {
  Unknown = 'Unknown',
  HasLicense = 'HasLicense',
  NotAvailable = 'NotAvailable',
}

export type GenericLicenseFetch = {
  __typename?: 'GenericLicenseFetch'
  /** Status of license fetch */
  status: GenericUserLicenseFetchStatus
  /** Datetime of last update of fetch status */
  updated: Scalars['String']
}

/** Possible license fetch statuses */
export enum GenericUserLicenseFetchStatus {
  Fetched = 'Fetched',
  NotFetched = 'NotFetched',
  Fetching = 'Fetching',
  Error = 'Error',
  Stale = 'Stale',
}

export type GenericUserLicense = {
  __typename?: 'GenericUserLicense'
  /** National ID of license owner */
  nationalId: Scalars['String']
  /** License info */
  license: GenericLicense
  /** Info about license fetch */
  fetch: GenericLicenseFetch
  /** Potential payload of license, both parsed and raw */
  payload?: Maybe<Payload>
}

export type GenericPkPass = {
  __typename?: 'GenericPkPass'
  pkpassUrl: Scalars['String']
}

export type PaymentScheduleConditions = {
  __typename?: 'PaymentScheduleConditions'
  nationalId: Scalars['ID']
  maxDebtAmount: Scalars['Float']
  totalDebtAmount: Scalars['Float']
  minPayment: Scalars['Float']
  maxPayment: Scalars['Float']
  collectionActions: Scalars['Boolean']
  doNotOwe: Scalars['Boolean']
  maxDebt: Scalars['Boolean']
  oweTaxes: Scalars['Boolean']
  disposableIncome: Scalars['Float']
  taxReturns: Scalars['Boolean']
  vatReturns: Scalars['Boolean']
  citReturns: Scalars['Boolean']
  accommodationTaxReturns: Scalars['Boolean']
  withholdingTaxReturns: Scalars['Boolean']
  wageReturns: Scalars['Boolean']
  alimony: Scalars['Float']
}

export type PaymentScheduleCharge = {
  __typename?: 'PaymentScheduleCharge'
  id: PaymentScheduleChargeType
  name: Scalars['String']
  principal: Scalars['Float']
  intrest: Scalars['Float']
  expenses: Scalars['Float']
  total: Scalars['Float']
}

/** Possible types of charges */
export enum PaymentScheduleChargeType {
  ParliamentAndMunicipalFees = 'ParliamentAndMunicipalFees',
  CarTax = 'CarTax',
  CourtFinesAndLegalCosts = 'CourtFinesAndLegalCosts',
  OverpaidHousingBenefits = 'OverpaidHousingBenefits',
  WitholdingEmployerTax = 'WitholdingEmployerTax',
  Electronic = 'Electronic',
  CertificatesLicences = 'CertificatesLicences',
  TourismAgencyFees = 'TourismAgencyFees',
  PlanningFees = 'PlanningFees',
  ClinicEntranceFees = 'ClinicEntranceFees',
  Ho = 'HO',
  ConsumerAgencyPenalties = 'ConsumerAgencyPenalties',
  ImmigrationPermit = 'ImmigrationPermit',
  FoodAdministrationFees = 'FoodAdministrationFees',
  WitholdingTaxSecurtyContribution = 'WitholdingTaxSecurtyContribution',
  PoliceChiefsAccords = 'PoliceChiefsAccords',
  WitholdingSalaryTax = 'WitholdingSalaryTax',
  DailyFinesEnvironmentAgency = 'DailyFinesEnvironmentAgency',
  ExciseDutyOnVehicles = 'ExciseDutyOnVehicles',
  SentencingCourtOrder = 'SentencingCourtOrder',
}

export type PaymentScheduleDebts = {
  __typename?: 'PaymentScheduleDebts'
  nationalId: Scalars['ID']
  type: PaymentScheduleType
  paymentSchedule: Scalars['String']
  organization: Scalars['String']
  explanation: Scalars['String']
  totalAmount: Scalars['Float']
  chargetypes: Array<PaymentScheduleCharge>
}

/** Possible types of schedules */
export enum PaymentScheduleType {
  FinesAndLegalCost = 'FinesAndLegalCost',
  OverpaidBenefits = 'OverpaidBenefits',
  Wagedection = 'Wagedection',
  OtherFees = 'OtherFees',
}

export type PaymentSchedulePayment = {
  __typename?: 'PaymentSchedulePayment'
  dueDate: Scalars['ID']
  payment: Scalars['Float']
  accumulated: Scalars['Float']
}

export type PaymentScheduleDistribution = {
  __typename?: 'PaymentScheduleDistribution'
  nationalId: Scalars['ID']
  scheduleType: PaymentScheduleType
  payments: Array<PaymentSchedulePayment>
}

export type PaymentScheduleEmployer = {
  __typename?: 'PaymentScheduleEmployer'
  nationalId: Scalars['ID']
  name: Scalars['String']
}

export type PaymentScheduleInitialSchedule = {
  __typename?: 'PaymentScheduleInitialSchedule'
  nationalId: Scalars['ID']
  scheduleType: PaymentScheduleType
  minPayment: Scalars['Float']
  maxPayment: Scalars['Float']
  minCountMonth: Scalars['Float']
  maxCountMonth: Scalars['Float']
}

export type SubmitApplicationResponse = {
  __typename?: 'SubmitApplicationResponse'
  success: Scalars['Boolean']
}

export type Query = {
  __typename?: 'Query'
  authActorDelegations: Array<AuthDelegation>
  authDelegations: Array<AuthDelegation>
  authDelegation?: Maybe<AuthDelegation>
  authApiScopes: Array<AuthApiScope>
  identity?: Maybe<Identity>
  nationalRegistryUserV2: NationalRegistryPerson
  searchResults: SearchResult
  webSearchAutocomplete: WebSearchAutocomplete
  getNamespace?: Maybe<Namespace>
  getAboutPage: AboutPage
  getAboutSubPage?: Maybe<AboutSubPage>
  getContentSlug?: Maybe<ContentSlug>
  getAlertBanner?: Maybe<AlertBanner>
  getGenericPage?: Maybe<GenericPage>
  getGenericOverviewPage?: Maybe<GenericOverviewPage>
  getAdgerdirPage?: Maybe<AdgerdirPage>
  getErrorPage?: Maybe<ErrorPage>
  getOpenDataPage: OpenDataPage
  getOrganization?: Maybe<Organization>
  getOrganizationPage?: Maybe<OrganizationPage>
  getOrganizationSubpage?: Maybe<OrganizationSubpage>
  getAuctions: Array<Auction>
  getAuction: Auction
  getProjectPage?: Maybe<ProjectPage>
  getAdgerdirPages: AdgerdirPages
  getOrganizations: Organizations
  getAdgerdirTags?: Maybe<AdgerdirTags>
  getOrganizationTags?: Maybe<OrganizationTags>
  getAdgerdirFrontpage?: Maybe<AdgerdirFrontpage>
  getLifeEventPage?: Maybe<LifeEventPage>
  getLifeEvents: Array<LifeEventPage>
  getLifeEventsInCategory: Array<LifeEventPage>
  getUrl?: Maybe<Url>
  getTellUsAStory: TellUsAStory
  getFrontpage?: Maybe<Frontpage>
  getArticleCategories: Array<ArticleCategory>
  getSingleArticle?: Maybe<Article>
  getArticles: Array<Article>
  getSingleNews?: Maybe<News>
  getNewsDates: Array<Scalars['String']>
  getNews: NewsList
  getMenu?: Maybe<Menu>
  getGroupedMenu?: Maybe<GroupedMenu>
  getSubpageHeader?: Maybe<SubpageHeader>
  drivingLicense: DrivingLicense
  drivingLicenseDeprivationTypes: Array<DrivingLicenseDeprevationType>
  drivingLicenseEntitlementTypes: Array<DrivingLicenseType>
  drivingLicenseRemarkTypes: Array<DrivingLicenseRemarkType>
  drivingLicensePenaltyPointStatus: PenaltyPointStatus
  drivingLicenseTeachingRights: HasTeachingRights
  drivingLicenseStudentInformation: StudentInformationResult
  drivingLicenseApplicationEligibility: ApplicationEligibility
  drivingLicenseListOfJuristictions: Array<Juristiction>
  educationLicense: Array<EducationLicense>
  educationExamFamilyOverviews: Array<EducationExamFamilyOverview>
  educationExamResult: EducationExamResult
  applicationApplication?: Maybe<Application>
  applicationPaymentStatus?: Maybe<ApplicationPayment>
  applicationApplications?: Maybe<Array<Application>>
  getPresignedUrl?: Maybe<PresignedUrlResponse>
  getParentalLeavesEntitlements?: Maybe<ParentalLeaveEntitlement>
  getParentalLeaves?: Maybe<Array<ParentalLeave>>
  getParentalLeavesEstimatedPaymentPlan?: Maybe<Array<ParentalLeavePaymentPlan>>
  getParentalLeavesApplicationPaymentPlan?: Maybe<
    Array<ParentalLeavePaymentPlan>
  >
  getParentalLeavesPeriodEndDate: ParentalLeavePeriodEndDate
  getParentalLeavesPeriodsLength: ParentalLeavePeriodLength
  getUnions?: Maybe<Array<Union>>
  getPensionFunds?: Maybe<Array<PensionFund>>
  getPrivatePensionFunds?: Maybe<Array<PensionFund>>
  getPregnancyStatus?: Maybe<PregnancyStatus>
  getDocument?: Maybe<DocumentDetails>
  listDocuments?: Maybe<Array<Document>>
  getDocumentCategories?: Maybe<Array<DocumentCategory>>
  getProviderOrganisations: Array<Organisation>
  getProviderOrganisation: Organisation
  organisationExists: Scalars['Boolean']
  getStatisticsTotal: ProviderStatistics
  getTranslations?: Maybe<Scalars['JSON']>
  nationalRegistryUser?: Maybe<NationalRegistryUser>
  getPerson: NationalRegistryGetPerson
  nationalRegistryFamily?: Maybe<Array<NationalRegistryFamilyMember>>
  healthInsuranceGetProfun: Scalars['String']
  healthInsuranceIsHealthInsured: Scalars['Boolean']
  healthInsuranceGetPendingApplication: Array<Scalars['Float']>
  getUserProfile?: Maybe<UserProfile>
  getApiCatalogue: ApiCatalogue
  getApiServiceById?: Maybe<Service>
  getOpenApi: OpenApi
  getHomestays: Array<Homestay>
  rskCurrentUserCompanies: Array<CurrentUserCompanies>
  getAllIcelandicNames: Array<IcelandicName>
  getIcelandicNameById: IcelandicName
  getIcelandicNameByInitialLetter: Array<IcelandicName>
  getIcelandicNameBySearch: Array<IcelandicName>
  endorsementSystemGetSingleEndorsement?: Maybe<Endorsement>
  endorsementSystemGetEndorsements?: Maybe<Array<Endorsement>>
  endorsementSystemFindEndorsementLists: Array<EndorsementList>
  endorsementSystemGetSingleEndorsementList?: Maybe<EndorsementList>
  endorsementSystemUserEndorsements: Array<Endorsement>
  temporaryVoterRegistryGetVoterRegion?: Maybe<TemporaryVoterRegistry>
  getRegulation: Scalars['JSON']
  getRegulations: Scalars['JSON']
  getRegulationsSearch: Scalars['JSON']
  getRegulationsYears: Scalars['JSON']
  getRegulationsMinistries: Scalars['JSON']
  getRegulationsLawChapters: Scalars['JSON']
  getFinanceStatus: Scalars['JSON']
  getFinanceStatusDetails: Scalars['JSON']
  getCustomerChargeType?: Maybe<CustomerChargeType>
  getCustomerRecords?: Maybe<CustomerRecords>
  getDocumentsList: DocumentsListModel
  getFinanceDocument?: Maybe<FinanceDocumentModel>
  getCustomerTapControl?: Maybe<CustomerTapsControlModel>
  paymentCatalog: PaymentCatalogResponse
  partyLetterRegistryFindLetter?: Maybe<PartyLetterRegistry>
  genericLicenses: Array<GenericUserLicense>
  genericLicense: GenericUserLicense
  paymentScheduleConditions?: Maybe<PaymentScheduleConditions>
  paymentScheduleDebts?: Maybe<Array<PaymentScheduleDebts>>
  paymentScheduleEmployer?: Maybe<PaymentScheduleEmployer>
  paymentScheduleInitialSchedule?: Maybe<PaymentScheduleInitialSchedule>
  paymentScheduleDistribution?: Maybe<PaymentScheduleDistribution>
}

export type QueryAuthDelegationArgs = {
  input: AuthDelegationInput
}

export type QueryIdentityArgs = {
  input?: Maybe<IdentityInput>
}

export type QuerySearchResultsArgs = {
  query: SearcherInput
}

export type QueryWebSearchAutocompleteArgs = {
  input: WebSearchAutocompleteInput
}

export type QueryGetNamespaceArgs = {
  input: GetNamespaceInput
}

export type QueryGetAboutPageArgs = {
  input: GetAboutPageInput
}

export type QueryGetAboutSubPageArgs = {
  input: GetAboutSubPageInput
}

export type QueryGetContentSlugArgs = {
  input: GetContentSlugInput
}

export type QueryGetAlertBannerArgs = {
  input: GetAlertBannerInput
}

export type QueryGetGenericPageArgs = {
  input: GetGenericPageInput
}

export type QueryGetGenericOverviewPageArgs = {
  input: GetGenericOverviewPageInput
}

export type QueryGetAdgerdirPageArgs = {
  input: GetAdgerdirPageInput
}

export type QueryGetErrorPageArgs = {
  input: GetErrorPageInput
}

export type QueryGetOpenDataPageArgs = {
  input: GetOpenDataPageInput
}

export type QueryGetOrganizationArgs = {
  input: GetOrganizationInput
}

export type QueryGetOrganizationPageArgs = {
  input: GetOrganizationPageInput
}

export type QueryGetOrganizationSubpageArgs = {
  input: GetOrganizationSubpageInput
}

export type QueryGetAuctionsArgs = {
  input: GetAuctionsInput
}

export type QueryGetAuctionArgs = {
  input: GetAuctionInput
}

export type QueryGetProjectPageArgs = {
  input: GetProjectPageInput
}

export type QueryGetAdgerdirPagesArgs = {
  input: GetAdgerdirPagesInput
}

export type QueryGetOrganizationsArgs = {
  input: GetOrganizationsInput
}

export type QueryGetAdgerdirTagsArgs = {
  input: GetAdgerdirTagsInput
}

export type QueryGetOrganizationTagsArgs = {
  input: GetOrganizationTagsInput
}

export type QueryGetAdgerdirFrontpageArgs = {
  input: GetAdgerdirFrontpageInput
}

export type QueryGetLifeEventPageArgs = {
  input: GetLifeEventPageInput
}

export type QueryGetLifeEventsArgs = {
  input: GetLifeEventsInput
}

export type QueryGetLifeEventsInCategoryArgs = {
  input: GetLifeEventsInCategoryInput
}

export type QueryGetUrlArgs = {
  input: GetUrlInput
}

export type QueryGetTellUsAStoryArgs = {
  input: GetTellUsAStoryInput
}

export type QueryGetFrontpageArgs = {
  input: GetFrontpageInput
}

export type QueryGetArticleCategoriesArgs = {
  input: GetArticleCategoriesInput
}

export type QueryGetSingleArticleArgs = {
  input: GetSingleArticleInput
}

export type QueryGetArticlesArgs = {
  input: GetArticlesInput
}

export type QueryGetSingleNewsArgs = {
  input: GetSingleNewsInput
}

export type QueryGetNewsDatesArgs = {
  input: GetNewsDatesInput
}

export type QueryGetNewsArgs = {
  input: GetNewsInput
}

export type QueryGetMenuArgs = {
  input: GetMenuInput
}

export type QueryGetGroupedMenuArgs = {
  input: GetSingleMenuInput
}

export type QueryGetSubpageHeaderArgs = {
  input: GetSubpageHeaderInput
}

export type QueryDrivingLicenseStudentInformationArgs = {
  nationalId: Scalars['String']
}

export type QueryDrivingLicenseApplicationEligibilityArgs = {
  type: Scalars['String']
}

export type QueryEducationExamResultArgs = {
  nationalId: Scalars['String']
}

export type QueryApplicationApplicationArgs = {
  input: ApplicationApplicationInput
  locale?: Maybe<Scalars['String']>
}

export type QueryApplicationPaymentStatusArgs = {
  applicationId: Scalars['String']
  locale?: Maybe<Scalars['String']>
}

export type QueryApplicationApplicationsArgs = {
  input?: Maybe<ApplicationApplicationsInput>
  locale?: Maybe<Scalars['String']>
}

export type QueryGetPresignedUrlArgs = {
  input: GetPresignedUrlInput
}

export type QueryGetParentalLeavesEntitlementsArgs = {
  input: GetParentalLeavesEntitlementsInput
}

export type QueryGetParentalLeavesEstimatedPaymentPlanArgs = {
  input: GetParentalLeavesEstimatedPaymentPlanInput
}

export type QueryGetParentalLeavesApplicationPaymentPlanArgs = {
  input: GetParentalLeavesApplicationPaymentPlanInput
}

export type QueryGetParentalLeavesPeriodEndDateArgs = {
  input: GetParentalLeavesPeriodEndDateInput
}

export type QueryGetParentalLeavesPeriodsLengthArgs = {
  input: GetParentalLeavesPeriodLengthInput
}

export type QueryGetDocumentArgs = {
  input: GetDocumentInput
}

export type QueryGetProviderOrganisationArgs = {
  nationalId: Scalars['String']
}

export type QueryOrganisationExistsArgs = {
  nationalId: Scalars['String']
}

export type QueryGetStatisticsTotalArgs = {
  input?: Maybe<StatisticsInput>
}

export type QueryGetTranslationsArgs = {
  input: GetTranslationsInput
}

export type QueryGetApiCatalogueArgs = {
  input: GetApiCatalogueInput
}

export type QueryGetApiServiceByIdArgs = {
  input: GetApiServiceInput
}

export type QueryGetOpenApiArgs = {
  input: GetOpenApiInput
}

export type QueryGetHomestaysArgs = {
  input: GetHomestaysInput
}

export type QueryGetIcelandicNameByIdArgs = {
  input: GetIcelandicNameByIdInput
}

export type QueryGetIcelandicNameByInitialLetterArgs = {
  input: GetIcelandicNameByInitialLetterInput
}

export type QueryGetIcelandicNameBySearchArgs = {
  input: GetIcelandicNameBySearchInput
}

export type QueryEndorsementSystemGetSingleEndorsementArgs = {
  input: FindEndorsementListInput
}

export type QueryEndorsementSystemGetEndorsementsArgs = {
  input: FindEndorsementListInput
}

export type QueryEndorsementSystemFindEndorsementListsArgs = {
  input: FindEndorsementListByTagsDto
}

export type QueryEndorsementSystemGetSingleEndorsementListArgs = {
  input: FindEndorsementListInput
}

export type QueryGetRegulationArgs = {
  input: GetRegulationInput
}

export type QueryGetRegulationsArgs = {
  input: GetRegulationsInput
}

export type QueryGetRegulationsSearchArgs = {
  input: GetRegulationsSearchInput
}

export type QueryGetRegulationsLawChaptersArgs = {
  input: GetRegulationsLawChaptersInput
}

export type QueryGetFinanceStatusDetailsArgs = {
  input: GetFinancialOverviewInput
}

export type QueryGetCustomerRecordsArgs = {
  input: GetCustomerRecordsInput
}

export type QueryGetDocumentsListArgs = {
  input: GetDocumentsListInput
}

export type QueryGetFinanceDocumentArgs = {
  input: GetFinanceDocumentInput
}

export type QueryPaymentCatalogArgs = {
  input: PaymentCatalogInput
}

export type QueryGenericLicensesArgs = {
  input?: Maybe<GetGenericLicensesInput>
  locale?: Maybe<Scalars['String']>
}

export type QueryGenericLicenseArgs = {
  input: GetGenericLicenseInput
  locale?: Maybe<Scalars['String']>
}

export type QueryPaymentScheduleInitialScheduleArgs = {
  input: GetInitialScheduleInput
}

export type QueryPaymentScheduleDistributionArgs = {
  input: GetScheduleDistributionInput
}

export type AuthDelegationInput = {
  toNationalId: Scalars['String']
}

export type IdentityInput = {
  nationalId: Scalars['String']
}

export type SearcherInput = {
  queryString: Scalars['String']
  types?: Maybe<Array<SearchableContentTypes>>
  language?: Maybe<ContentLanguage>
  size?: Maybe<Scalars['Int']>
  page?: Maybe<Scalars['Int']>
  tags?: Maybe<Array<Tag>>
  countTag?: Maybe<SearchableTags>
  countTypes?: Maybe<Scalars['Boolean']>
}

export enum SearchableContentTypes {
  WebAboutPage = 'webAboutPage',
  WebArticle = 'webArticle',
  WebSubArticle = 'webSubArticle',
  WebLifeEventPage = 'webLifeEventPage',
  WebNews = 'webNews',
  WebAdgerdirPage = 'webAdgerdirPage',
  WebOrganizationSubpage = 'webOrganizationSubpage',
}

export enum ContentLanguage {
  Is = 'is',
  En = 'en',
}

export type Tag = {
  type: SearchableTags
  key: Scalars['String']
}

export enum SearchableTags {
  Category = 'category',
}

export type WebSearchAutocompleteInput = {
  singleTerm: Scalars['String']
  language?: Maybe<ContentLanguage>
  size?: Maybe<Scalars['Int']>
}

export type GetNamespaceInput = {
  namespace?: Maybe<Scalars['String']>
  lang?: Maybe<Scalars['String']>
}

export type GetAboutPageInput = {
  lang?: Maybe<Scalars['String']>
}

export type GetAboutSubPageInput = {
  url: Scalars['String']
  lang?: Maybe<Scalars['String']>
}

export type GetContentSlugInput = {
  id: Scalars['String']
  lang?: Maybe<Scalars['String']>
}

export type GetAlertBannerInput = {
  id: Scalars['String']
  lang?: Maybe<Scalars['String']>
}

export type GetGenericPageInput = {
  slug: Scalars['String']
  lang?: Maybe<Scalars['String']>
}

export type GetGenericOverviewPageInput = {
  pageIdentifier: Scalars['String']
  lang?: Maybe<Scalars['String']>
}

export type GetAdgerdirPageInput = {
  slug?: Maybe<Scalars['String']>
  lang?: Maybe<Scalars['String']>
}

export type GetErrorPageInput = {
  errorCode: Scalars['String']
  lang?: Maybe<Scalars['String']>
}

export type GetOpenDataPageInput = {
  lang?: Maybe<Scalars['String']>
}

export type GetOrganizationInput = {
  slug?: Maybe<Scalars['String']>
  lang?: Maybe<Scalars['String']>
}

export type GetOrganizationPageInput = {
  slug: Scalars['String']
  lang?: Maybe<Scalars['String']>
}

export type GetOrganizationSubpageInput = {
  organizationSlug: Scalars['String']
  slug: Scalars['String']
  lang?: Maybe<Scalars['String']>
}

export type GetAuctionsInput = {
  lang?: Maybe<Scalars['String']>
  organization?: Maybe<Scalars['String']>
  year?: Maybe<Scalars['Float']>
  month?: Maybe<Scalars['Float']>
}

export type GetAuctionInput = {
  id: Scalars['String']
  lang?: Maybe<Scalars['String']>
}

export type GetProjectPageInput = {
  slug: Scalars['String']
  lang?: Maybe<Scalars['String']>
}

export type GetAdgerdirPagesInput = {
  lang?: Maybe<Scalars['String']>
  perPage?: Maybe<Scalars['Int']>
}

export type GetOrganizationsInput = {
  lang?: Maybe<Scalars['String']>
  perPage?: Maybe<Scalars['Int']>
}

export type GetAdgerdirTagsInput = {
  lang?: Maybe<Scalars['String']>
}

export type GetOrganizationTagsInput = {
  lang?: Maybe<Scalars['String']>
}

export type GetAdgerdirFrontpageInput = {
  lang?: Maybe<Scalars['String']>
}

export type GetLifeEventPageInput = {
  slug: Scalars['String']
  lang?: Maybe<Scalars['String']>
}

export type GetLifeEventsInput = {
  lang?: Maybe<Scalars['String']>
}

export type GetLifeEventsInCategoryInput = {
  slug: Scalars['String']
  lang?: Maybe<Scalars['String']>
}

export type GetUrlInput = {
  slug: Scalars['String']
  lang?: Maybe<Scalars['String']>
}

export type GetTellUsAStoryInput = {
  lang?: Maybe<Scalars['String']>
}

export type GetFrontpageInput = {
  pageIdentifier: Scalars['String']
  lang?: Maybe<Scalars['String']>
}

export type GetArticleCategoriesInput = {
  lang?: Maybe<Scalars['String']>
  size?: Maybe<Scalars['Int']>
}

export type GetSingleArticleInput = {
  slug: Scalars['String']
  lang?: Maybe<Scalars['String']>
}

export type GetArticlesInput = {
  lang?: Maybe<Scalars['String']>
  category?: Maybe<Scalars['String']>
  organization?: Maybe<Scalars['String']>
  size?: Maybe<Scalars['Int']>
  sort?: Maybe<SortField>
}

export enum SortField {
  Title = 'TITLE',
  Popular = 'POPULAR',
}

export type GetSingleNewsInput = {
  slug: Scalars['String']
  lang?: Maybe<Scalars['String']>
}

export type GetNewsDatesInput = {
  lang?: Maybe<Scalars['String']>
  order?: Maybe<Scalars['String']>
  tag?: Maybe<Scalars['String']>
}

export type GetNewsInput = {
  lang?: Maybe<Scalars['String']>
  year?: Maybe<Scalars['Int']>
  month?: Maybe<Scalars['Int']>
  order?: Maybe<Scalars['String']>
  page?: Maybe<Scalars['Int']>
  size?: Maybe<Scalars['Int']>
  tag?: Maybe<Scalars['String']>
}

export type GetMenuInput = {
  name: Scalars['String']
  lang?: Maybe<Scalars['String']>
}

export type GetSingleMenuInput = {
  id: Scalars['String']
  lang?: Maybe<Scalars['String']>
}

export type GetSubpageHeaderInput = {
  id: Scalars['String']
  lang?: Maybe<Scalars['String']>
}

export type ApplicationApplicationInput = {
  id: Scalars['String']
}

export type ApplicationApplicationsInput = {
  typeId?: Maybe<Array<Scalars['String']>>
  status?: Maybe<Array<Scalars['String']>>
}

export type GetPresignedUrlInput = {
  id: Scalars['String']
  type: Scalars['String']
}

export type GetParentalLeavesEntitlementsInput = {
  dateOfBirth: Scalars['String']
}

export type GetParentalLeavesEstimatedPaymentPlanInput = {
  dateOfBirth: Scalars['String']
  period: Array<Period>
}

export type Period = {
  from: Scalars['String']
  to: Scalars['String']
  ratio: Scalars['Float']
  approved: Scalars['Boolean']
  paid: Scalars['Boolean']
}

export type GetParentalLeavesApplicationPaymentPlanInput = {
  dateOfBirth: Scalars['String']
  applicationId: Scalars['String']
}

export type GetParentalLeavesPeriodEndDateInput = {
  startDate: Scalars['String']
  length: Scalars['String']
  percentage: Scalars['String']
}

export type GetParentalLeavesPeriodLengthInput = {
  startDate: Scalars['String']
  endDate: Scalars['String']
  percentage: Scalars['String']
}

export type GetDocumentInput = {
  id: Scalars['String']
}

export type StatisticsInput = {
  organisationId?: Maybe<Scalars['String']>
  /** Date format: YYYY-MM-DD */
  fromDate?: Maybe<Scalars['String']>
  /** Date format: YYYY-MM-DD */
  toDate?: Maybe<Scalars['String']>
}

export type GetTranslationsInput = {
  namespaces: Array<Scalars['String']>
  lang: Scalars['String']
}

export type GetApiCatalogueInput = {
  limit?: Maybe<Scalars['Int']>
  cursor?: Maybe<Scalars['String']>
  query?: Maybe<Scalars['String']>
  pricing?: Maybe<Array<Scalars['String']>>
  data?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Array<Scalars['String']>>
  access?: Maybe<Array<Scalars['String']>>
}

export type GetApiServiceInput = {
  id: Scalars['ID']
}

export type GetOpenApiInput = {
  instance: Scalars['String']
  memberClass: Scalars['String']
  memberCode: Scalars['String']
  subsystemCode: Scalars['String']
  serviceCode: Scalars['String']
}

export type GetHomestaysInput = {
  year?: Maybe<Scalars['Float']>
}

export type GetIcelandicNameByIdInput = {
  id: Scalars['Float']
}

export type GetIcelandicNameByInitialLetterInput = {
  initialLetter: Scalars['String']
}

export type GetIcelandicNameBySearchInput = {
  q: Scalars['String']
}

export type FindEndorsementListInput = {
  listId: Scalars['String']
}

export type FindEndorsementListByTagsDto = {
  tags: Array<EndorsementListControllerFindByTagsTagsEnum>
}

export enum EndorsementListControllerFindByTagsTagsEnum {
  PartyLetter2021 = 'partyLetter2021',
  PartyApplicationNordausturkjordaemi2021 = 'partyApplicationNordausturkjordaemi2021',
  PartyApplicationNordvesturkjordaemi2021 = 'partyApplicationNordvesturkjordaemi2021',
  PartyApplicationReykjavikurkjordaemiNordur2021 = 'partyApplicationReykjavikurkjordaemiNordur2021',
  PartyApplicationReykjavikurkjordaemiSudur2021 = 'partyApplicationReykjavikurkjordaemiSudur2021',
  PartyApplicationSudurkjordaemi2021 = 'partyApplicationSudurkjordaemi2021',
  PartyApplicationSudvesturkjordaemi2021 = 'partyApplicationSudvesturkjordaemi2021',
}

export type GetRegulationInput = {
  viewType: RegulationViewTypes
  name: Scalars['String']
  date?: Maybe<Scalars['String']>
  isCustomDiff?: Maybe<Scalars['Boolean']>
  earlierDate?: Maybe<Scalars['String']>
}

export enum RegulationViewTypes {
  Current = 'current',
  Diff = 'diff',
  Original = 'original',
  D = 'd',
}

export type GetRegulationsInput = {
  type: Scalars['String']
  page?: Maybe<Scalars['Float']>
}

export type GetRegulationsSearchInput = {
  q?: Maybe<Scalars['String']>
  rn?: Maybe<Scalars['String']>
  ch?: Maybe<Scalars['String']>
  year?: Maybe<Scalars['Int']>
  yearTo?: Maybe<Scalars['Int']>
}

export type GetRegulationsLawChaptersInput = {
  tree?: Maybe<Scalars['Boolean']>
}

export type GetFinancialOverviewInput = {
  OrgID: Scalars['String']
  chargeTypeID: Scalars['String']
}

export type GetCustomerRecordsInput = {
  chargeTypeID?: Maybe<Array<Scalars['String']>>
  dayFrom: Scalars['String']
  dayTo: Scalars['String']
}

export type GetDocumentsListInput = {
  dayFrom: Scalars['String']
  dayTo: Scalars['String']
  listPath: Scalars['String']
}

export type GetFinanceDocumentInput = {
  documentID: Scalars['String']
}

export type PaymentCatalogInput = {
  performingOrganizationID?: Maybe<Scalars['String']>
}

export type GetGenericLicensesInput = {
  includedTypes?: Maybe<Array<Scalars['String']>>
  excludedTypes?: Maybe<Array<Scalars['String']>>
  force?: Maybe<Scalars['Boolean']>
  onlyList?: Maybe<Scalars['Boolean']>
}

export type GetGenericLicenseInput = {
  licenseType: Scalars['String']
}

export type GetInitialScheduleInput = {
  totalAmount: Scalars['Float']
  disposableIncome: Scalars['Float']
  type: PaymentScheduleType
}

export type GetScheduleDistributionInput = {
  monthAmount?: Maybe<Scalars['Float']>
  monthCount?: Maybe<Scalars['Float']>
  scheduleType: PaymentScheduleType
  totalAmount: Scalars['Float']
}

export type Mutation = {
  __typename?: 'Mutation'
  createAuthDelegation: AuthDelegation
  updateAuthDelegation: AuthDelegation
  deleteAuthDelegation: Scalars['Boolean']
  fetchEducationSignedLicenseUrl?: Maybe<EducationSignedLicense>
  applicationPaymentCharge?: Maybe<ApplicationPaymentChargeResponse>
  createApplication?: Maybe<Application>
  updateApplication?: Maybe<Application>
  updateApplicationExternalData?: Maybe<Application>
  addAttachment?: Maybe<Application>
  deleteAttachment?: Maybe<Application>
  submitApplication?: Maybe<Application>
  assignApplication?: Maybe<Application>
  generatePdfPresignedUrl?: Maybe<PresignedUrlResponse>
  requestFileSignature?: Maybe<RequestFileSignatureResponse>
  uploadSignedFile?: Maybe<UploadSignedFileResponse>
  createUploadUrl: PresignedPost
  updateOrganisation: Organisation
  createAdministrativeContact?: Maybe<Contact>
  updateAdministrativeContact: Contact
  createTechnicalContact?: Maybe<Contact>
  updateTechnicalContact: Contact
  createHelpdesk?: Maybe<Helpdesk>
  updateHelpdesk: Helpdesk
  createTestProvider: ClientCredentials
  updateTestEndpoint: AudienceAndScope
  runEndpointTests: Array<TestResult>
  createProvider: ClientCredentials
  updateEndpoint: AudienceAndScope
  createProfile?: Maybe<UserProfile>
  updateProfile?: Maybe<UserProfile>
  createSmsVerification?: Maybe<Response>
  resendEmailVerification?: Maybe<Response>
  confirmSmsVerification?: Maybe<ConfirmResponse>
  confirmEmailVerification?: Maybe<ConfirmResponse>
  contactUs: CommunicationResponse
  tellUsAStory: CommunicationResponse
  contactUsZendeskTicket: CommunicationResponse
  updateIcelandicNameById: IcelandicName
  createIcelandicName: IcelandicName
  deleteIcelandicNameById: DeleteNameResponse
  endorsementSystemEndorseList: Endorsement
  endorsementSystemBulkEndorseList: EndorsementBulkCreate
  endorsementSystemUnendorseList: Scalars['Boolean']
  endorsementSystemCreateEndorsementList: EndorsementList
  generatePkPass: GenericPkPass
  unemploymentSubmitApplication: SubmitApplicationResponse
}

export type MutationCreateAuthDelegationArgs = {
  input: CreateAuthDelegationInput
}

export type MutationUpdateAuthDelegationArgs = {
  input: UpdateAuthDelegationInput
}

export type MutationDeleteAuthDelegationArgs = {
  input: DeleteAuthDelegationInput
}

export type MutationFetchEducationSignedLicenseUrlArgs = {
  input: FetchEducationSignedLicenseUrlInput
}

export type MutationApplicationPaymentChargeArgs = {
  input: ApplicationPaymentChargeInput
}

export type MutationCreateApplicationArgs = {
  input: CreateApplicationInput
  locale?: Maybe<Scalars['String']>
}

export type MutationUpdateApplicationArgs = {
  input: UpdateApplicationInput
  locale?: Maybe<Scalars['String']>
}

export type MutationUpdateApplicationExternalDataArgs = {
  input: UpdateApplicationExternalDataInput
  locale?: Maybe<Scalars['String']>
}

export type MutationAddAttachmentArgs = {
  input: AddAttachmentInput
}

export type MutationDeleteAttachmentArgs = {
  input: DeleteAttachmentInput
}

export type MutationSubmitApplicationArgs = {
  input: SubmitApplicationInput
}

export type MutationAssignApplicationArgs = {
  input: AssignApplicationInput
}

export type MutationGeneratePdfPresignedUrlArgs = {
  input: GeneratePdfInput
}

export type MutationRequestFileSignatureArgs = {
  input: RequestFileSignatureInput
}

export type MutationUploadSignedFileArgs = {
  input: UploadSignedFileInput
}

export type MutationCreateUploadUrlArgs = {
  filename: Scalars['String']
}

export type MutationUpdateOrganisationArgs = {
  input: UpdateOrganisationInput
  id: Scalars['String']
}

export type MutationCreateAdministrativeContactArgs = {
  input: CreateContactInput
  organisationId: Scalars['String']
}

export type MutationUpdateAdministrativeContactArgs = {
  contact: UpdateContactInput
  administrativeContactId: Scalars['String']
  organisationId: Scalars['String']
}

export type MutationCreateTechnicalContactArgs = {
  input: CreateContactInput
  organisationId: Scalars['String']
}

export type MutationUpdateTechnicalContactArgs = {
  contact: UpdateContactInput
  technicalContactId: Scalars['String']
  organisationId: Scalars['String']
}

export type MutationCreateHelpdeskArgs = {
  input: CreateHelpdeskInput
  organisationId: Scalars['String']
}

export type MutationUpdateHelpdeskArgs = {
  helpdesk: UpdateHelpdeskInput
  helpdeskId: Scalars['String']
  organisationId: Scalars['String']
}

export type MutationCreateTestProviderArgs = {
  input: CreateProviderInput
}

export type MutationUpdateTestEndpointArgs = {
  input: UpdateEndpointInput
}

export type MutationRunEndpointTestsArgs = {
  input: RunEndpointTestsInput
}

export type MutationCreateProviderArgs = {
  input: CreateProviderInput
}

export type MutationUpdateEndpointArgs = {
  input: UpdateEndpointInput
}

export type MutationCreateProfileArgs = {
  input: CreateUserProfileInput
}

export type MutationUpdateProfileArgs = {
  input: UpdateUserProfileInput
}

export type MutationCreateSmsVerificationArgs = {
  input: CreateSmsVerificationInput
}

export type MutationConfirmSmsVerificationArgs = {
  input: ConfirmSmsVerificationInput
}

export type MutationConfirmEmailVerificationArgs = {
  input: ConfirmEmailVerificationInput
}

export type MutationContactUsArgs = {
  input: ContactUsInput
}

export type MutationTellUsAStoryArgs = {
  input: TellUsAStoryInput
}

export type MutationContactUsZendeskTicketArgs = {
  input: ContactUsInput
}

export type MutationUpdateIcelandicNameByIdArgs = {
  input: UpdateIcelandicNameInput
}

export type MutationCreateIcelandicNameArgs = {
  input: CreateIcelandicNameInput
}

export type MutationDeleteIcelandicNameByIdArgs = {
  input: DeleteIcelandicNameByIdInput
}

export type MutationEndorsementSystemEndorseListArgs = {
  input: FindEndorsementListInput
}

export type MutationEndorsementSystemBulkEndorseListArgs = {
  input: BulkEndorseListInput
}

export type MutationEndorsementSystemUnendorseListArgs = {
  input: FindEndorsementListInput
}

export type MutationEndorsementSystemCreateEndorsementListArgs = {
  input: CreateEndorsementListDto
}

export type MutationGeneratePkPassArgs = {
  input: GeneratePkPassInput
  locale?: Maybe<Scalars['String']>
}

export type MutationUnemploymentSubmitApplicationArgs = {
  input: SubmitApplicationDto
}

export type CreateAuthDelegationInput = {
  toNationalId: Scalars['String']
  name: Scalars['String']
  scopes?: Maybe<Array<AuthDelegationScopeInput>>
}

export type AuthDelegationScopeInput = {
  name: Scalars['String']
  type: AuthDelegationScopeType
  validTo?: Maybe<Scalars['DateTime']>
}

export enum AuthDelegationScopeType {
  ApiScope = 'ApiScope',
  IdentityResource = 'IdentityResource',
}

export type UpdateAuthDelegationInput = {
  toNationalId: Scalars['String']
  name?: Maybe<Scalars['String']>
  scopes: Array<AuthDelegationScopeInput>
}

export type DeleteAuthDelegationInput = {
  toNationalId: Scalars['String']
}

export type FetchEducationSignedLicenseUrlInput = {
  licenseId: Scalars['String']
}

export type ApplicationPaymentChargeInput = {
  applicationId: Scalars['String']
  chargeItemCode: Scalars['String']
}

export type CreateApplicationInput = {
  typeId: CreateApplicationDtoTypeIdEnum
}

export enum CreateApplicationDtoTypeIdEnum {
  ExampleForm = 'ExampleForm',
  Passport = 'Passport',
  DrivingLessons = 'DrivingLessons',
  DrivingLicense = 'DrivingLicense',
  DrivingAssessmentApproval = 'DrivingAssessmentApproval',
  ParentalLeave = 'ParentalLeave',
  MetaApplication = 'MetaApplication',
  DocumentProviderOnboarding = 'DocumentProviderOnboarding',
  HealthInsurance = 'HealthInsurance',
  ChildrenResidenceChange = 'ChildrenResidenceChange',
  DataProtectionAuthorityComplaint = 'DataProtectionAuthorityComplaint',
  PartyLetter = 'PartyLetter',
  LoginService = 'LoginService',
  PartyApplication = 'PartyApplication',
  InstitutionCollaboration = 'InstitutionCollaboration',
  FundingGovernmentProjects = 'FundingGovernmentProjects',
  PublicDebtPaymentPlan = 'PublicDebtPaymentPlan',
  JointCustodyAgreement = 'JointCustodyAgreement',
  PayableDummyTemplate = 'PayableDummyTemplate',
  ComplaintsToAlthingiOmbudsman = 'ComplaintsToAlthingiOmbudsman',
  AccidentNotification = 'AccidentNotification',
  UnemploymentBenefits = 'UnemploymentBenefits',
}

export type UpdateApplicationInput = {
  id: Scalars['String']
  applicant?: Maybe<Scalars['String']>
  assignee?: Maybe<Scalars['String']>
  attachments?: Maybe<Scalars['JSON']>
  answers?: Maybe<Scalars['JSON']>
}

export type UpdateApplicationExternalDataInput = {
  id: Scalars['String']
  dataProviders: Array<DataProvider>
}

export type DataProvider = {
  id: Scalars['String']
  type: Scalars['String']
}

export type AddAttachmentInput = {
  id: Scalars['String']
  key: Scalars['String']
  url: Scalars['String']
}

export type DeleteAttachmentInput = {
  id: Scalars['String']
  key: Scalars['String']
}

export type SubmitApplicationInput = {
  id: Scalars['String']
  event: Scalars['String']
  answers?: Maybe<Scalars['JSON']>
}

export type AssignApplicationInput = {
  token: Scalars['String']
}

export type GeneratePdfInput = {
  id: Scalars['String']
  type: GeneratePdfDtoTypeEnum
}

export enum GeneratePdfDtoTypeEnum {
  ChildrenResidenceChange = 'ChildrenResidenceChange',
  JointCustodyAgreement = 'JointCustodyAgreement',
}

export type RequestFileSignatureInput = {
  id: Scalars['String']
  type: RequestFileSignatureDtoTypeEnum
}

export enum RequestFileSignatureDtoTypeEnum {
  ChildrenResidenceChange = 'ChildrenResidenceChange',
  JointCustodyAgreement = 'JointCustodyAgreement',
}

export type UploadSignedFileInput = {
  id: Scalars['String']
  documentToken: Scalars['String']
  type: UploadSignedFileDtoTypeEnum
}

export enum UploadSignedFileDtoTypeEnum {
  ChildrenResidenceChange = 'ChildrenResidenceChange',
  JointCustodyAgreement = 'JointCustodyAgreement',
}

export type UpdateOrganisationInput = {
  nationalId?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  address?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  phoneNumber?: Maybe<Scalars['String']>
}

export type CreateContactInput = {
  name: Scalars['String']
  email: Scalars['String']
  phoneNumber: Scalars['String']
}

export type UpdateContactInput = {
  name?: Maybe<Scalars['String']>
  address?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  phoneNumber?: Maybe<Scalars['String']>
}

export type CreateHelpdeskInput = {
  email: Scalars['String']
  phoneNumber: Scalars['String']
}

export type UpdateHelpdeskInput = {
  email?: Maybe<Scalars['String']>
  phoneNumber?: Maybe<Scalars['String']>
}

export type CreateProviderInput = {
  nationalId: Scalars['String']
  clientName: Scalars['String']
}

export type UpdateEndpointInput = {
  nationalId: Scalars['String']
  endpoint: Scalars['String']
  providerId: Scalars['String']
  xroad?: Maybe<Scalars['Boolean']>
}

export type RunEndpointTestsInput = {
  nationalId: Scalars['String']
  recipient: Scalars['String']
  documentId: Scalars['String']
  providerId: Scalars['String']
}

export type CreateUserProfileInput = {
  mobilePhoneNumber?: Maybe<Scalars['String']>
  locale?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
}

export type UpdateUserProfileInput = {
  mobilePhoneNumber?: Maybe<Scalars['String']>
  locale?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
}

export type CreateSmsVerificationInput = {
  mobilePhoneNumber: Scalars['String']
}

export type ConfirmSmsVerificationInput = {
  code: Scalars['String']
}

export type ConfirmEmailVerificationInput = {
  hash: Scalars['String']
}

export type ContactUsInput = {
  name: Scalars['String']
  phone?: Maybe<Scalars['String']>
  email: Scalars['String']
  subject?: Maybe<Scalars['String']>
  message: Scalars['String']
}

export type TellUsAStoryInput = {
  organization: Scalars['String']
  dateOfStory: Scalars['String']
  subject?: Maybe<Scalars['String']>
  message: Scalars['String']
  name: Scalars['String']
  email: Scalars['String']
  publicationAllowed?: Maybe<Scalars['Boolean']>
}

export type UpdateIcelandicNameInput = {
  id: Scalars['Float']
  body: CreateIcelandicNameInput
}

export type CreateIcelandicNameInput = {
  icelandicName: Scalars['String']
  type: Scalars['String']
  status: Scalars['String']
  verdict?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  visible: Scalars['Boolean']
  url?: Maybe<Scalars['String']>
}

export type DeleteIcelandicNameByIdInput = {
  id: Scalars['Float']
}

export type BulkEndorseListInput = {
  listId: Scalars['String']
  nationalIds: Array<Scalars['String']>
}

export type CreateEndorsementListDto = {
  title: Scalars['String']
  description?: Maybe<Scalars['String']>
  endorsementMeta: Array<EndorsementListDtoEndorsementMetaEnum>
  tags: Array<EndorsementListDtoTagsEnum>
  validationRules: Array<ValidationRuleInput>
  meta?: Maybe<Scalars['JSON']>
}

export enum EndorsementListDtoEndorsementMetaEnum {
  FullName = 'fullName',
  Address = 'address',
  SignedTags = 'signedTags',
  VoterRegion = 'voterRegion',
}

export enum EndorsementListDtoTagsEnum {
  PartyLetter2021 = 'partyLetter2021',
  PartyApplicationNordausturkjordaemi2021 = 'partyApplicationNordausturkjordaemi2021',
  PartyApplicationNordvesturkjordaemi2021 = 'partyApplicationNordvesturkjordaemi2021',
  PartyApplicationReykjavikurkjordaemiNordur2021 = 'partyApplicationReykjavikurkjordaemiNordur2021',
  PartyApplicationReykjavikurkjordaemiSudur2021 = 'partyApplicationReykjavikurkjordaemiSudur2021',
  PartyApplicationSudurkjordaemi2021 = 'partyApplicationSudurkjordaemi2021',
  PartyApplicationSudvesturkjordaemi2021 = 'partyApplicationSudvesturkjordaemi2021',
}

export type ValidationRuleInput = {
  type: ValidationRuleDtoTypeEnum
  value?: Maybe<Scalars['JSON']>
}

export type GeneratePkPassInput = {
  licenseType: Scalars['String']
}

export type SubmitApplicationDto = {
  secretWord: Scalars['String']
  getPaperCopy: Scalars['Boolean']
  employmentStatus: Scalars['String']
  employmentRatio: Scalars['Float']
  bank: Scalars['String']
  pensionFund: Scalars['String']
  union: Scalars['String']
  privatePensionFund: Scalars['String']
  pensionFundPercentage: Scalars['Float']
  personalTaxCreditRatio: Scalars['Float']
  monthlyIncome: Scalars['Float']
  insurancePayments: Scalars['Float']
  onParentalLeave: Scalars['Boolean']
}
