import { Dialog, Tabs, Tab,Spinner, Button, FormGroup, InputGroup, Toaster, Tag } from '@blueprintjs/core'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import TransactionCard from "../shared/components/TransactionCard"
import { BASE_URL } from '../shared/uri'
import { apiPost } from '../shared/utils/api'
import "./form.scss"

const saleToaster = Toaster.create({
  position: 'top',
})

const Container = styled.div`
  padding: 10px;
`
const StyledTabTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TransactionDetails = ({ transactionDetails }) => {
  if (transactionDetails.length === 0) {
    return <div class="bp3-non-ideal-state">
    <div class="bp3-non-ideal-state-visual">
      <span class="bp3-icon bp3-icon-search"></span>
    </div>
    <h4 class="bp3-heading">No transactions found for this sale</h4>
  </div>
  }
  return transactionDetails.map((transactionDetail) => {
    return (
      <div className="mb-10" key={transactionDetail.id}>
        <TransactionCard transactionDetail={transactionDetail}  />
      </div>
    )
  })
}


const TabTitle = ({ customerName, toggleSalePopupOpen }) => {
  return (<StyledTabTitle>
    <p>
      Sales details for {customerName}
    </p>
    <Button
      className="mr-10"
      intent="success"
      onClick={toggleSalePopupOpen}
      icon="plus"
    >
      New
    </Button>
  </StyledTabTitle>)
}

const AddSalesPopup = ({ isSalesPopupOpen, toggleSalePopupOpen, customer_id, fetchSalesData }) => {
  const [saleLabel, setSaleLabel] = useState("")
  const [saleAmt, setSaleAmt] = useState("")
  const [loading, setLoading] = useState(false)

  const clearState = () => {
    setSaleLabel("")
    setSaleAmt("")
  }

  const handleSaveSales = async () => {
    setLoading(true)
    const url = `${BASE_URL}/addSales`
    const params = {
      customer_id: customer_id,
      sale_label: saleLabel,
      sale_amount: saleAmt
    }
    const res = await apiPost(url, params)
    if (res) {
      saleToaster.show({
        intent: "success",
        message: "Sales data has saved successfully"
      })
    }
    fetchSalesData()
    setLoading(false)
    toggleSalePopupOpen()
  }
  return (
    <Dialog
      className="add-sales-dialog"
      title="Add Sales"
      onOpening={clearState}
      isOpen={isSalesPopupOpen}
      onClose={toggleSalePopupOpen}
    >
      <div className="dialog-body">
        <FormGroup
          label="Customer ID"
          labelFor="text-input"
        >
          <InputGroup
            id="text-input"
            placeholder="Placeholder text"
            value={customer_id}
            disabled={true}
          />
        </FormGroup>
        <FormGroup
          label="Sale label"
          labelFor="text-input"
        >
          <InputGroup
            id="text-input"
            value={saleLabel}
            onChange={(e)=>setSaleLabel(e.target.value)}
          />
        </FormGroup>
        <FormGroup
          label="Sale amount"
          labelFor="text-input"
        >
          <InputGroup
            id="text-input"
            placeholder="Enter the sales amount"
            type="number"
            value={saleAmt}
            onChange={(e)=>setSaleAmt(e.target.value)}
          />
        </FormGroup>
        <Button
          loading={loading}
          intent="success"
          className="mt-10"
          onClick={handleSaveSales}
        >
          Save
        </Button>

      </div>
    </Dialog>
  )
}

export default function Form({ isDialogOpen, toggleDialog, userDetails }) {
  const { customer_id, name } = userDetails || {};
  const [selectedTabId, setSelectedTabId] = useState("sale_1")
  const [salesData, setSalesData] = useState([])
  const [isSalesPopupOpen, toggleSalePopupOpen] = useState(false)

  const handleSalesPopup = () => {
    toggleSalePopupOpen(!isSalesPopupOpen)
  }

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
      title={
        <TabTitle
          customerName={name}
          toggleSalePopupOpen={handleSalesPopup}
        />
      }
    >
      <AddSalesPopup
        isSalesPopupOpen={isSalesPopupOpen}
        toggleSalePopupOpen={toggleSalePopupOpen}
        customer_id={customer_id}
        fetchSalesData={fetchSalesData}
      />
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
                    <div>
                      <Tag intent="success"  className="mb-10" large minimal>Sale amount: {saleData.sale_amount}</Tag>
                      <TransactionDetails
                        transactionDetails={saleData.transactions} /
                      >
                    </div>
                  }
                />
              )
            })}
          </Tabs>
        </Container>) :
        <div style={{
          height: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }} >
          <Spinner size={30}/>
        </div>
      }
    </Dialog>
  )
}
