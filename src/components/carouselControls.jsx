import React from 'react'
import styled from '@emotion/styled'


const SliderButton = (props) => {
  const icon = props.direction === 'next' ? 'chevron_right' : 'chevron_left'
  return (
    <SliderButtonStyles 
      className={props.className + (props.disabled ? ' disabled' : '')} 
      onClick={props.onClick}
    >
      <i className='material-icons'>{icon}</i>
    </SliderButtonStyles>
  )
}


class PreviousButton extends React.Component {
  constructor() {
    super(...arguments);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    event.preventDefault();
    this.props.previousSlide();
  }
  render() {
    const disabled =
      (this.props.currentSlide === 0 && !this.props.wrapAround) ||
      this.props.slideCount === 0;
    return (
      <SliderButton
        className=''
        direction='prev'
        disabled={disabled}
        onClick={this.handleClick}
        aria-label='previous'
        type='button'
      />
    );
  }
}


class NextButton extends React.Component {
  constructor() {
    super(...arguments);
    this.handleClick = this.handleClick.bind(this);
    this.nextButtonDisable = this.nextButtonDisabled.bind(this);
  }
  handleClick(event) {
    event.preventDefault();
    this.props.nextSlide();
  }

  nextButtonDisabled(params) {
    const {
      wrapAround,
      slidesToShow,
      currentSlide,
      cellAlign,
      slideCount
    } = params;

    let buttonDisabled = false;
    if (!wrapAround) {
      const lastSlideIndex = slideCount - 1;
      let slidesShowing = slidesToShow;
      let lastSlideOffset = 0;

      switch (cellAlign) {
        case 'center':
          slidesShowing = (slidesToShow - 1) * 0.5;
          lastSlideOffset = Math.floor(slidesToShow * 0.5) - 1;
          break;
        case 'right':
          slidesShowing = 1;
          break;
      }

      if (slidesToShow > 1) {
        buttonDisabled =
          currentSlide + slidesShowing > lastSlideIndex + lastSlideOffset;
      } else {
        buttonDisabled = currentSlide + 1 > lastSlideIndex;
      }
    }
    return buttonDisabled;
  }
  render() {
    const {
      wrapAround,
      slidesToShow,
      currentSlide,
      cellAlign,
      slideCount
    } = this.props;

    const disabled = this.nextButtonDisabled({
      wrapAround,
      slidesToShow,
      currentSlide,
      cellAlign,
      slideCount
    });

    return (
      <SliderButton
        className=''
        direction='next'
        disabled={disabled}
        onClick={this.handleClick}
        aria-label='next'
        type='button'
      />
    );
  }
}


class PagingDots extends React.Component {
  getDotIndexes(slideCount, slidesToScroll, slidesToShow, cellAlign) {
    const dotIndexes = [];
    let lastDotIndex = slideCount - slidesToShow;

    switch (cellAlign) {
      case 'center':
      case 'right':
        lastDotIndex += slidesToShow - 1;
        break;
    }
    if (lastDotIndex < 0) {
      return [0];
    }

    for (let i = 0; i < lastDotIndex; i += slidesToScroll) {
      dotIndexes.push(i);
    }
    dotIndexes.push(lastDotIndex);
    return dotIndexes;
  }

  getListStyles() {
    return {
      position: 'relative',
      margin: 0,
      top: -24,
      padding: 0
    };
  }

  getListItemStyles() {
    return {
      listStyleType: 'none',
      display: 'inline-block'
    };
  }

  getButtonStyles(active) {
    return {
      cursor: 'pointer',
      opacity: active ? 1 : 0.3,
      background: 'transparent',
      border: 'none'
    };
  }

  render() {
    const indexes = this.getDotIndexes(
      this.props.slideCount,
      this.props.slidesToScroll,
      this.props.slidesToShow,
      this.props.cellAlign
    );
    return (
      <ul style={this.getListStyles()}>
        {indexes.map(index => {
          return (
            <li
              style={this.getListItemStyles()}
              key={index}
              className={
                this.props.currentSlide === index
                  ? 'paging-item active'
                  : 'paging-item'
              }
            >
              <button
                type='button'
                style={this.getButtonStyles(this.props.currentSlide === index)}
                onClick={this.props.goToSlide.bind(null, index)}
                aria-label={`slide ${index + 1} bullet`}
              >
                <PagingDot className='paging-dot'/>
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default class CarouselControls extends React.Component {
  render() {
    return (
      <ControlsContainer>
        <PreviousButton {...this.props}/>
        <PagingDots {...this.props}/>
        <NextButton {...this.props}/>
      </ControlsContainer>
    )
  }
}

const ControlsContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
`

const PagingDot = styled.span`
  display: inline-block;
  border-radius: 50%;
  width: 0.8rem;
  height: 0.8rem;
  background: ${props => props.theme.highlight};
`

const SliderButtonStyles = styled.button`
  position: relative;
  top: -2.1rem;
  background-color: rgba(0,0,0,0);
  border: 0;
  cursor: pointer;
  outline: none;
  padding: 0;
  text-align: center;
  height: 3.6rem;
  width: 3.6rem;
  .material-icons {
    font-size: 3.2rem;
    color: ${props => props.theme.highlight};
  }
  &.disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`
