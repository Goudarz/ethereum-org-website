import React, { useEffect, useState } from "react"
import styled from "styled-components"

import ButtonLink from "./ButtonLink"
import Icon from "./Icon"
import Emoji from "./Emoji"
import Translation from "./Translation"

const H3 = styled.h3`
  font-weight: 700;
  line-height: 100%;
  margin-top: 0;
  margin-bottom: 0;
`

const BannerContainer = styled.div`
  display: ${(props) => (props.isOpen ? `block` : `none`)};
  bottom: 2rem;
  right: 2rem;
  position: fixed;
  z-index: 99;
  cursor: pointer;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    bottom: 0rem;
    right: 0rem;
  }
`

const StyledBanner = styled.div`
  position: relative;
  padding: 1rem;
  height: auto;
  cursor: auto;
  max-height: 100%;
  max-width: 600px;
  background: ${(props) => props.theme.colors.infoBanner};
  display: flex;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 2px 4px 0px;
  width: 100%;
  border-radius: 8px;
  margin: 0px auto;
  border-radius: 2px;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    max-width: 100%;
    box-shadow: 0px -4px 10px 0px ${(props) => props.theme.colors.text} 10%;
  }
`

const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    margin-top: 2.5rem;
  }
`

const BannerClose = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 1rem;
`
const BannerCloseIcon = styled(Icon)`
  cursor: pointer;
  fill: ${(props) => props.theme.colors.black300};
`

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    flex-direction: column-reverse;
    align-items: flex-start;
  }
`

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const StyledEmoji = styled(Emoji)`
  padding-top: 0.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    margin-bottom: 1rem;
  }
`

const StyledButtonLink = styled(ButtonLink)`
  margin-left: 0.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    margin-left: 0rem;
    margin-top: 0.5rem;
  }
`

const TranslationBanner = ({
  isPageOutdated,
  originalPagePath,
  shouldShow,
}) => {
  const [isOpen, setIsOpen] = useState(shouldShow)

  useEffect(() => {
    setIsOpen(shouldShow)
  }, [originalPagePath, shouldShow])

  // If page isn't outdated, it hasn't been translated at all
  const headerTextId = isPageOutdated
    ? "translation-banner-title-update"
    : "translation-banner-title-new"
  const bodyTextId = isPageOutdated
    ? "translation-banner-body-update"
    : "translation-banner-body-new"

  return (
    <BannerContainer isOpen={isOpen}>
      <StyledBanner>
        <BannerContent>
          <Row>
            <H3>
              <Translation id={headerTextId} />
            </H3>
            <StyledEmoji
              ml={"0.5rem"}
              size={1.5}
              text=":globe_showing_asia_australia:"
            />
          </Row>
          <p>
            <Translation id={bodyTextId} />
          </p>
          <ButtonRow>
            <div>
              <ButtonLink to="/contributing/translation-program/">
                <Translation id="translation-banner-button-translate-page" />
              </ButtonLink>
            </div>
            {isPageOutdated && (
              <div>
                <StyledButtonLink isSecondary to={`/en${originalPagePath}`}>
                  <Translation id="translation-banner-button-see-english" />
                </StyledButtonLink>
              </div>
            )}
          </ButtonRow>
        </BannerContent>
        <BannerClose onClick={() => setIsOpen(false)}>
          <BannerCloseIcon name="close" />
        </BannerClose>
      </StyledBanner>
    </BannerContainer>
  )
}

export default TranslationBanner