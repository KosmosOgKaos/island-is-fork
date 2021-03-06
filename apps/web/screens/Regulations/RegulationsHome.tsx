import {
  RegulationLawChapterTree,
  RegulationMinistryList,
  RegulationSearchResults,
  Year,
} from '../../components/Regulations/Regulations.types'
import { RegulationHomeTexts } from '../../components/Regulations/RegulationTexts.types'

import React, { useState } from 'react'
import { Screen } from '@island.is/web/types'
import { withMainLayout } from '@island.is/web/layouts/main'
import getConfig from 'next/config'
import { CustomNextError } from '@island.is/web/units/errors'
import { SubpageDetailsContent } from '@island.is/web/components'
import { RegulationsHomeImg } from '../../components/Regulations/RegulationsHomeImg'
import { SubpageLayout } from '@island.is/web/screens/Layouts/Layouts'
import {
  Box,
  Breadcrumbs,
  Button,
  CategoryCard,
  GridColumn,
  GridContainer,
  GridRow,
  Link,
  Text,
} from '@island.is/island-ui/core'
import { useNamespaceStrict as useNamespace } from '@island.is/web/hooks'
import { RegulationsSearchSection } from '../../components/Regulations/RegulationsSearchSection'
import {
  getParams,
  prettyName,
  RegulationSearchFilters,
  useRegulationLinkResolver,
} from '../../components/Regulations/regulationUtils'
import { getUiTexts } from '../../components/Regulations/getUiTexts'
import {
  GetRegulationsSearchQuery,
  QueryGetRegulationsSearchArgs,
  GetRegulationsQuery,
  QueryGetRegulationsArgs,
  GetRegulationsYearsQuery,
  GetRegulationsMinistriesQuery,
  GetRegulationsLawChaptersQuery,
  QueryGetRegulationsLawChaptersArgs,
} from '@island.is/web/graphql/schema'
import {
  GET_REGULATIONS_SEARCH_QUERY,
  GET_REGULATIONS_LAWCHAPTERS_QUERY,
  GET_REGULATIONS_MINISTRIES_QUERY,
  GET_REGULATIONS_QUERY,
  GET_REGULATIONS_YEARS_QUERY,
} from '../queries'

const { publicRuntimeConfig } = getConfig()

// ---------------------------------------------------------------------------

type RegulationsHomeProps = {
  regulations: RegulationSearchResults
  texts: RegulationHomeTexts
  searchQuery: RegulationSearchFilters
  years: ReadonlyArray<number>
  ministries: RegulationMinistryList
  lawChapters: RegulationLawChapterTree
  doSearch: boolean
}

const RegulationsHome: Screen<RegulationsHomeProps> = (props) => {
  const { disableRegulationsPage: disablePage } = publicRuntimeConfig
  if (disablePage === 'true') {
    throw new CustomNextError(404, 'Not found')
  }

  const [showDetails, setShowDetails] = useState(false)

  const txt = useNamespace(props.texts)
  const { linkResolver, linkToRegulation } = useRegulationLinkResolver()
  const totalItems = props.regulations?.data?.length ?? 0
  const stepSize = 9
  const [showCount, setShowCount] = useState(totalItems > 18 ? stepSize : 18)

  const breadCrumbs = (
    <Box display={['none', 'none', 'block']}>
      {/* Show when NOT a device */}
      <Breadcrumbs
        items={[
          {
            title: '??sland.is',
            href: linkResolver('homepage').href,
          },
          {
            title: 'Regluger??ir',
            href: linkResolver('regulationshome').href,
          },
        ]}
      />
    </Box>
  )

  return (
    <SubpageLayout
      main={
        <>
          <GridContainer>
            <GridRow>
              <GridColumn
                offset={['0', '0', '0', '0', '1/12']}
                span={['1/1', '1/1', '1/1', '9/12', '7/12']}
                paddingTop={[0, 0, 0, 8]}
                paddingBottom={[4, 4, 4, 4, 1]}
              >
                {breadCrumbs}
                <Text as="h1" variant="h1" marginTop={2} marginBottom={2}>
                  {txt('homeIntroLegend', 'Regluger??asafn')}
                </Text>

                <Text marginBottom={1}>
                  Regluger??ir eru gefnar ??t ??{' '}
                  <Link href="https://www.stjornartidindi.is/">
                    B-deild Stj??rnart????inda
                  </Link>{' '}
                  og mi??ast r??ttar??hrif vi?? ???? birtingu.
                </Text>
                <Button
                  variant="text"
                  icon={showDetails ? 'chevronUp' : 'chevronDown'}
                  onClick={() => setShowDetails(!showDetails)}
                >
                  Sj?? n??nar um safni?? og fyrirvara
                </Button>
                {showDetails && (
                  <>
                    <Text marginBottom={1} marginTop={2}>
                      Regluger??asafn er heildarsafn gildandi regluger??a.
                      Regluger??asafns&shy;vefurinn var opna??ur ?? j??n?? 2001,
                      ??nnur ??tg??fa hans ?? apr??l 2015 og ??ri??ja ??tg??fa ?? ....
                      2021.
                    </Text>
                    <Text marginBottom={1}>
                      Vi?? ??ri??ju ??tg??fu ver??ur s?? n??breytni a?? breytingar
                      regluger?? ver??a felldar inn og h??gt a?? n??lgast samfelldan
                      texta regluger??a eins og hann er ?? hverjum t??ma. Gera
                      ver??ur r???? fyrir a?? ??a?? taki nokkurn t??ma ??ar til allar
                      regluger??ir ver??i komnar ?? ??ann b??ning.
                    </Text>

                    <Text marginTop={2} marginBottom={1}>
                      <strong>Fyrirvari 2021</strong>
                    </Text>
                    <Text marginBottom={1}>
                      Regluger??ir eru birtar ??{' '}
                      <Link href="https://www.stjornartidindi.is/">
                        B-deild Stj??rnart????inda
                      </Link>{' '}
                      skv. 3. gr. laga um Stj??rnart????indi og L??gbirtingabla??,
                      nr. 15/2005, sbr. regluger?? um ??tg??fu Stj??rnart????inda{' '}
                      <Link href="/reglugerdir/nr/0958-2005">nr. 958/2005</Link>
                      .
                    </Text>
                    <Text marginBottom={1}>
                      S?? misr??mi milli ??ess texta sem birtist h??r ?? safninu og
                      ??ess sem birtur er ?? ??tg??fu B-deildar Stj??rnart????inda skal
                      s?? s????arnefndi r????a.
                    </Text>
                  </>
                )}
              </GridColumn>

              <GridColumn
                span="3/12"
                hiddenBelow="lg"
                paddingTop={[0, 0, 0, 2]}
                paddingBottom={0}
              >
                <RegulationsHomeImg />
              </GridColumn>
            </GridRow>
            <GridRow>
              <GridColumn span="12/12" paddingTop={2} paddingBottom={[4, 4, 4]}>
                <RegulationsSearchSection
                  searchFilters={props.searchQuery}
                  lawChapters={props.lawChapters}
                  ministries={props.ministries}
                  years={props.years}
                  texts={props.texts}
                />
              </GridColumn>
            </GridRow>
          </GridContainer>
        </>
      }
      details={
        <SubpageDetailsContent
          header=""
          content={
            <GridContainer>
              <GridRow>
                <GridColumn span={'12/12'} paddingTop={0} paddingBottom={0}>
                  {props.doSearch ? (
                    <Text>
                      {totalItems === 0
                        ? 'Engar regluger??ir fundust fyrir ??essi leitarskilyr??i.'
                        : String(totalItems).substr(-1) === '1'
                        ? totalItems + ' regluger?? fannst'
                        : `${totalItems} regluger??ir fundust`}
                    </Text>
                  ) : (
                    <Text>
                      {txt('homeNewestRegulations', 'N??justu regluger??irnar')}
                    </Text>
                  )}
                </GridColumn>
              </GridRow>

              <GridRow>
                {props.regulations?.data?.length > 0 &&
                  props.regulations.data.slice(0, showCount).map((reg, i) => (
                    <GridColumn
                      key={reg.name}
                      span={['1/1', '1/2', '1/2', '1/3']}
                      paddingTop={3}
                      paddingBottom={4}
                    >
                      <CategoryCard
                        href={linkToRegulation(reg.name)}
                        heading={prettyName(reg.name)}
                        text={reg.title}
                        tags={
                          reg.ministry && [
                            {
                              label: reg.ministry.name ?? reg.ministry,
                              disabled: true,
                            },
                          ]
                        }
                      />
                    </GridColumn>
                  ))}
              </GridRow>
              <Box
                display="flex"
                justifyContent="center"
                marginTop={3}
                textAlign="center"
              >
                {showCount < totalItems && (
                  <Button onClick={() => setShowCount(showCount + stepSize)}>
                    Sj?? fleiri ({totalItems - showCount})
                  </Button>
                )}
              </Box>
            </GridContainer>
          }
        />
      }
    />
  )
}

/** Asserts that string is a number between 1900 and 2150
 *
 * Guards against "Infinity" and unreasonably sized numbers
 */
const assertReasonableYear = (maybeYear?: string): Year | undefined =>
  maybeYear && /^\d{4}$/.test(maybeYear)
    ? (Math.max(1900, Math.min(2150, Number(maybeYear))) as Year)
    : undefined

RegulationsHome.getInitialProps = async (ctx) => {
  const { apolloClient, locale, query } = ctx
  const searchQuery = getParams(query, [
    'q',
    'rn',
    'year',
    'yearTo',
    'ch',
    'all',
  ])
  const doSearch = Object.values(searchQuery).some((value) => !!value)

  const [
    texts,
    regulations,
    years,
    ministries,
    lawChapters,
  ] = await Promise.all([
    await getUiTexts<RegulationHomeTexts>(
      apolloClient,
      locale,
      'Regulations_Home',
    ),

    doSearch
      ? apolloClient
          .query<GetRegulationsSearchQuery, QueryGetRegulationsSearchArgs>({
            query: GET_REGULATIONS_SEARCH_QUERY,
            variables: {
              input: {
                q: searchQuery.q,
                rn: searchQuery.rn,
                year: assertReasonableYear(searchQuery.year),
                yearTo: assertReasonableYear(searchQuery.yearTo),
                ch: searchQuery.ch,
              },
            },
          })
          .then(
            (res) => res.data?.getRegulationsSearch as RegulationSearchResults,
          )
      : apolloClient
          .query<GetRegulationsQuery, QueryGetRegulationsArgs>({
            query: GET_REGULATIONS_QUERY,
            variables: {
              input: {
                type: 'newest',
                page: 1,
              },
            },
          })
          .then((res) => res.data?.getRegulations as RegulationSearchResults),

    apolloClient
      .query<GetRegulationsYearsQuery>({
        query: GET_REGULATIONS_YEARS_QUERY,
      })
      .then((res) => res.data?.getRegulationsYears as Array<number>),

    apolloClient
      .query<GetRegulationsMinistriesQuery>({
        query: GET_REGULATIONS_MINISTRIES_QUERY,
      })
      .then(
        (res) => res.data?.getRegulationsMinistries as RegulationMinistryList,
      ),

    apolloClient
      .query<
        GetRegulationsLawChaptersQuery,
        QueryGetRegulationsLawChaptersArgs
      >({
        query: GET_REGULATIONS_LAWCHAPTERS_QUERY,
        variables: {
          input: {
            tree: true,
          },
        },
      })
      .then(
        (res) =>
          res.data?.getRegulationsLawChapters as RegulationLawChapterTree,
      ),
  ])

  return {
    regulations,
    texts,
    searchQuery,
    years,
    ministries,
    lawChapters,
    doSearch,
  }
}

export default withMainLayout(RegulationsHome)
