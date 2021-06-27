import React, { useState } from 'react'
import useFetch from '../../hooks/useApi'
import { apiGet } from '../../utils/api'
import { Spinner } from '@blueprintjs/core'


import "../../styles/list.scss"
import Headers from "./Headers"
import Rows from "./Rows"

// const apiResponse = {
//   headers: [
//     {
//       id: "header_1",
//       label: "Header1"
//     },
//     {
//       id: "header_2",
//       label: "Header2"
//     },
//     {
//       id: "actions",
//       label: ""
//     }
//   ],
//   items: [
//     {
//       header_1: "Item 1 of Header1",
//       header_2: "Item 1 of Header2",
//       actions: {
//         inline: [{
//           id: "show_details",
//           label: "Show details",
//           icon: "eye-open"
//         }, {
//           id: "download",
//           label: "Download",
//           icon: "import"
//         }]
//       }
//     },
//     {
//       header_1: "Item 2 of Header1",
//       header_2: "Item 2 of Header2",
//       actions: {
//         inline: [
//           {
//             id: "show_details",
//             label: "Show details",
//             icon: "eye-open"
//           },{
//             id: "download",
//             label: "Download",
//             icon: "import"
//         }]
//       }
//     }
//   ]
// }

export default function List({
  listUrl,
  onClickMapping
}) {
  const listResponse = useFetch({
    url: listUrl
  })
  const { headers, items = []} = listResponse
  
  return (
    <div className="table-container">
      {items.length > 0  ? 
        <table>
          <Headers
            headers={headers}
          />
          <Rows
            headers={headers}
            items={items}
            onClickMapping={onClickMapping}
          />
        </table>
        :
        <Spinner
          intent="primary"
          size={20}
        />
      }
    </div>
  )
}
