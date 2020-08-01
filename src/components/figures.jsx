import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import Carousel from 'nuka-carousel'
import CarouselControls from './carouselControls'
import { useColorTheme } from '../context/ColorTheme'


const IMAGE_QUERY = graphql`
  query ImageQuery {
    allFile(filter: { extension: { eq: "svg" } }) {
      edges {
        node {
          publicURL
          name
        }
      }
    }
  }
`

const Figures = (props) => {
  
  const themeState = useColorTheme()
  const queryData = useStaticQuery(IMAGE_QUERY)

  // Convert object of arrays (props) to array of objects (figArr)
  let i
  const figArr = []
  for (i = 0; i < props.filenames.length; i++) {
    const figObj = {}
    const figEdge = queryData.allFile.edges.filter(img => img.node.name === props.filenames[i])
    figObj.key = i
    figObj.url = figEdge[0].node.publicURL
    figObj.alt = props.alts[i]
    figObj.caption = props.captions[i]
    figArr.push(figObj)
  }
  
  // Convert objects to jsx elements
  const figList = figArr.map((fig) => (
    <FigureContainer>
      <img 
        key={fig.key} 
        src={fig.url} 
        alt={fig.alt} 
        className={`${themeState.dark ? 'dark' : 'light'}`} 
        onLoad={() => { window.dispatchEvent(new Event('resize')) }}
      />
      <div className='bottom-buffer'> </div>
    </FigureContainer>
  ))

  return (
    <CarouselContainer>
      <Carousel 
        renderTopCenterControls={props => <CarouselControls {...props} />}
        renderBottomCenterControls={({ currentSlide }) => (
          <FigCaption>
            <span className='fig-label'>Fig {currentSlide+1}</span> — {figArr[currentSlide].caption}
          </FigCaption>
        )}
        renderCenterLeftControls={null}
        renderCenterRightControls={null}
        renderAnnounceSlideMessage={({ currentSlide, slideCount }) => (
          `Slide ${currentSlide + 1} of ${slideCount}`
        )}
      >
        {figList}
      </Carousel>
    </CarouselContainer>
  )
}

const CarouselContainer = styled.div`
  margin: 1.75em auto 1.25em auto;
  max-width: 54rem;
  .slider-control-bottomcenter {
    height: 3.2rem;
    width: 100%;
  }
`

const FigCaption = styled.div`
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  font-size: 0.75em;
  text-align: center;
  width: 100%;
  .fig-label {
    font-weight: bold;
  }
`

const FigureContainer = styled.div`
  width: 100%;
  margin: 0;
  .bottom-buffer {
    height: 4rem;
  }
  img {
    display: block;
    margin: 0 auto;
    max-width: 52rem;
    width: 100%;
    &.dark {
      filter: invert(100%) hue-rotate(350deg);
    }
  }
`

export default Figures
