import React from 'react'
import styled from 'styled-components'
import { Motion, spring } from 'react-motion'
import { spring as springConf, Text } from '@aragon/ui'
import * as Steps from './steps'
import { lerp } from '../math-utils'

class ProgressBar extends React.Component {
  static defaultProps = {
    step: Steps.ProgressBarSteps[0],
  }
  currentStepIndex() {
    return Steps.ProgressBarSteps.indexOf(this.props.step)
  }
  render() {
    const stepIndex = this.currentStepIndex()
    const visible = stepIndex > -1

    return (
      <Motion
        style={{
          showProgress: spring(Number(visible), springConf('fast')),
          stepProgress: spring(stepIndex, springConf('fast')),
        }}
      >
        {({ showProgress, stepProgress }) => (
          <Main
            style={{
              pointerEvents: visible ? 'auto' : 'none',
              transform: `translateY(${lerp(showProgress, -40, 0)}px)`,
              opacity: showProgress,
            }}
          >
            <Progress>
              <Line />
              <Line
                style={{
                  width: stepProgress * 25 + '%',
                }}
                active
              />

              <StepsContainer>
                {this.renderStep('Choose Template', 0, stepProgress)}
                {this.renderStep('Claim Domain', 1, stepProgress)}
                {this.renderStep('Configure', 2, stepProgress)}
                {this.renderStep('Launch', 3, stepProgress)}
              </StepsContainer>
            </Progress>
          </Main>
        )}
      </Motion>
    )
  }
  renderStep(label, index, stepProgress) {
    const currentStepIndex = this.currentStepIndex()
    const animVisible = stepProgress + 0.05 >= index
    return (
      <Step>
        <Text
          color={
            currentStepIndex === index && animVisible
              ? COLOR_ACTIVE
              : COLOR_TEXT
          }
          smallcaps
        >
          {label}
        </Text>
        <Disc active={animVisible} />
      </Step>
    )
  }
}

const COLOR_TEXT = '#C0C0C0'
const COLOR_INACTIVE = '#D8D8D8'
const COLOR_ACTIVE = '#02B9E4'

const Main = styled.div`
  position: absolute;
  display: flex;
  top: 40px;
  width: 100%;
  justify-content: center;
`

const Progress = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  max-width: 790px;
  height: 40px;
`

const Line = styled.div`
  position: absolute;
  z-index: 1;
  bottom: 4px;
  width: 75%;
  margin-left: calc(25% / 2);
  height: 2px;
  background: ${({ active }) => (active ? COLOR_ACTIVE : COLOR_INACTIVE)};
`

const StepsContainer = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  width: 100%;
`

const Step = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 25%;
  height: 100%;
  text-align: center;
  color: ${COLOR_TEXT};
`

const Disc = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background: ${({ active }) => (active ? COLOR_ACTIVE : COLOR_INACTIVE)};
`

export default ProgressBar