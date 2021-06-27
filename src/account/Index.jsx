import { Toaster } from '@blueprintjs/core'
import React, { useEffect, useState } from 'react'

import List from "../shared/components/index/List"
import Tabs from '../shared/components/tabs/Tabs'
import useResourceHeader from "../shared/hooks/useResourceHeader"
import { BASE_URL } from '../shared/uri'
import { apiPost } from '../shared/utils/api'
import Form from "./Form"

const downloadDetailsToaster = Toaster.create({
  position: "top",
})

export default function Index() {
  const { setResourceHeaderDetails } = useResourceHeader()
  const [ isDialogOpen, toggleDialog ] = useState(false)
  const [ userDetails, setUserDetails ] = useState({})


  useEffect(() => {
    setResourceHeaderDetails({
      title: "Users",
      description: "Users description "
    })
  }, [])
  const onClickMapping = {
    show_details: (item) => {
      setUserDetails(item)
      toggleDialog(!isDialogOpen)
    },
    download: (item) => {
      const response = apiPost(`${BASE_URL}/sendEmail`, {
        customer_id: item.customer_id
      })
      if (response) {
        downloadDetailsToaster.show({
          intent: "success",
          message: "The user details you requested will be emailed to you shortly.",
          icon: "tick"
        })
      } else {
        downloadDetailsToaster.show({
          intent: "danger",
          message: "The user details you requested will be emailed to you shortly.",
          icon: "tick"
        })
      }
    }
  }

  const toggleTransactionDialog = () => {
    toggleDialog(!isDialogOpen)
  }
  return (
    <div>
      <List
        listUrl={`${BASE_URL}/customerList`}
        onClickMapping={onClickMapping}
      />
      <Form
        isDialogOpen={isDialogOpen}
        toggleDialog={toggleTransactionDialog}
        userDetails={userDetails}
      />
    </div>
  )
}
