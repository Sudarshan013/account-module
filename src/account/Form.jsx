import { Dialog, Tabs, Tab,Spinner } from '@blueprintjs/core'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import TransactionCard from "../shared/components/TransactionCard"
import { BASE_URL } from '../shared/uri'
import { apiPost } from '../shared/utils/api'
import "./form.scss"

const Container = styled.div`
  padding: 10px;
`


const TransactionDetails = ({transactionDetails}) => {
  return transactionDetails.map((transactionDetail) => {
    return (
      <div className="mb-10" key={transactionDetail.id}>
        <TransactionCard transactionDetail={transactionDetail} />
      </div>
    )
  })
}

export default function Form({ isDialogOpen, toggleDialog, userDetails }) {
  const { customer_id, name } = userDetails || {};
  const [selectedTabId, setSelectedTabId] = useState("sale_1")
  const [salesData, setSalesData] = useState([])
  const handleTabChange = (tabId) => {
    setSelectedTabId(tabId)
  }
  const fetchSalesData = async () => {
    const params = {
      customer_id: customer_id
    }

    const salesData = await apiPost(`${BASE_URL}/editCustomer`, params)
    const { sales = [] } = salesData
    setSalesData(sales)
  }

  useEffect(() => {
    let [saleInfo] = salesData
    saleInfo = saleInfo || {}
    setSelectedTabId(saleInfo.sale_id)
  }, [salesData])
  
  const clearSalesData = () => {
    setSalesData([])
  }

  return (
    <Dialog
      className="transaction-dialog"
      isOpen={isDialogOpen}
      onClose={toggleDialog}
      onOpening={fetchSalesData}
      onClosing={clearSalesData}
      title={`Transaction details for "${name}"`}
    >
      {salesData.length > 0 ?
        (<Container>
          <Tabs
            id="transaction-tabs"
            vertical
            onChange={handleTabChange}
            selectedTabId={selectedTabId}
          >
            <h3>Transaction Details</h3>
            {salesData.map((saleData) => {
              return (
                <Tab
                  key={saleData.sale_id}
                  id={saleData.sale_id} 
                  title={saleData.sale_label}
                  panel={
                    <TransactionDetails
                      transactionDetails={saleData.transactions} /
                    >
                  }
                />
              )
            })}
          </Tabs>
        </Container>) :
        <Spinner size={30}/>
      }
    </Dialog>
  )
}
