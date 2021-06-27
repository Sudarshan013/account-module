import React, { memo } from 'react'
import styled from 'styled-components'
import TabItem from './TabItem'

const StyledTabs = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`

export default memo(function Tabs({ tabs }) {
  return <StyledTabs>
    {
      tabs.map((tabDetail) => {
      return (
        <TabItem
          key={tabDetail.id}
          tabDetail={tabDetail}
        />
      )
    })}
  </StyledTabs>
})
