import React, { Fragment, useEffect } from 'react'
import styled from 'styled-components'

import useResourceHeader from "../hooks/useResourceHeader"

const Title = styled.div`
  font-size: 35px;
`

const Description = styled.div`
  font-size: 18px;
`

const Container = styled.div`
  border: 1px solid #ccc;
  padding-left: 35px;
  padding-top: 10px;
  padding-bottom: 10px;
`

export default function ResourceHeader() {
  const { resourceHeaderDetails: {
    title,
    description
  } } = useResourceHeader()
  
  useEffect(() => {
    document.title = title
  },[title])

  return (
    <Fragment>
      <Container>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Container>
    </Fragment>
  )
}
