import { Card } from '@blueprintjs/core'
import React, { memo } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  h3{
    margin: 0px;
    margin-bottom: 5px;
  }
  p{
    color: #474747;
  }
  .bal{
    display: flex;
    justify-content: flex-end;
    p{
      color: #2965CC;
    }
  }
`

export default memo(function TransactionCard({
  transactionDetail: {
    label,
    credit_amount,
    balance,
    created_at
  }
}) {
  return (
    <Card>
      <Container>
        <h3>{created_at} - {label}</h3>
        <p>Credit: {credit_amount}</p>
        <div className="bal">
          <p>Balance: {balance}</p>
        </div>
      </Container>
    </Card>
  )
})
