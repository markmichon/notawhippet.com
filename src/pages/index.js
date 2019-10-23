import React from "react"
import { Heading, Text } from "../components/radicals"
import {Helmet} from 'react-helmet'
import Layout from "../components/layout"

import Uploader from "../components/Uploader"

import styled from "styled-components"
const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100vw;
  min-height: 100vh;
`
const Container = styled.main`
  display: grid;
  grid-template-rows: minmax(50vh, auto) minmax(50vh, auto);

  @media (min-width: 550px) {
    /* max-width: 550px; */
    /* margin: 0 auto; */
  }

  @media (min-width: 800px) {
    /* max-width: 1100px; */
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr;
    margin: 0 auto;
  }
`

const TopHalf = styled.div`
  background-color: white;
  padding: 1rem;

  @media (min-width: 800px) {
    /* padding: 1rem 0; */
  }

  > * {
    max-width: 550px;
    margin-left: auto;
    margin-right: auto;
  }
`

const BottomHalf = styled.div`
  background-color: hsl(264, 8%, 12%);
  color: white;
  padding: 1rem;

  > * {
    max-width: 550px;
    margin-left: auto;
    margin-right: auto;
  }
`

const Overlay = styled.div`
  margin-top: -2rem;
  height: 4rem;
  background-color: hsl(264, 8%, 6%);
  padding: 1rem;
  display: flex;
  justify-content: center;
  justify-items: center;
`

const ExtLink = styled.a`
  color: hsl(344, 65%, 51%);
  font-weight: bold;
  text-decoration: none;
  &:hover {
    color: hsl(344, 65%, 65%);
  }
`

function SEO() {
  const title = "Not a Whippet"
  const description = "Not sure if a dog is an Italian Greyhound or a Whippet? Use machine learning to find out."

  return (
    <Helmet title={title}>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content="https://notawhippet.com" />
      <meta name="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta name="twitter:creator" content="@markmichon" />
    </Helmet>
  )
}

function IndexPage() {
  return (
    <Layout>
      <SEO />
      <PageWrapper>
        <Container>
          <TopHalf>
            <Heading fontSize={2} mb={3}>
              🐶 notawhippet.com
            </Heading>
            <Uploader />
          </TopHalf>
          <BottomHalf>
            {/* <Overlay>
            <Text>Tap anywhere above or drag a file</Text>
          </Overlay> */}
            <Heading as="h2" fontSize={6} mb={3} color="#D32F5A">
              Is that dog a whippet?
            </Heading>
            <Text mb={2}>
              Don't ask a dog owner if their Italian Greyhound is a whippet.
              Instead, take a sneaky pic and check first!
            </Text>
            <Text mb={2}>
              This site uses machine learning and computer vision to find out.
              Upload a photo of a dog above, and it will try and determine if a
              dog is a whippet, italian greyhound, greyhound, or neither.
            </Text>
            <Text mb={3}>
              Learn more about how this was built (coming soon...)
            </Text>
            <Heading as="h3" fontSize={3}>
              Privacy
            </Heading>
            <Text>
              This site uses Microsoft's Azure platform to analyze the image you
              upload. It is never saved, and only you will see the image and
              prediction.
            </Text>
            <footer
              css={`
                background-color: HSL(264, 8%, 8%);
                margin: 1rem -1rem -1rem;
                padding: 1rem;
              `}
            >
              <Text color="#ccc">
                Created by{" "}
                <ExtLink href="https://markmichon.com">Mark Michon</ExtLink>
              </Text>
            </footer>
          </BottomHalf>
        </Container>
      </PageWrapper>
    </Layout>
  )
}

export default IndexPage
