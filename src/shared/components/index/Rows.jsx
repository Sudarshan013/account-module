import { AnchorButton, Button } from '@blueprintjs/core'
import React, { memo, Fragment } from 'react'


const InlineActions = ({ actions, onClickMapping, item }) => {
  return actions.map((action, index) => {
    return (
      <Button
        minimal
        key={index}
        icon={action.icon}
        onClick={() => onClickMapping[action.id](item)}
      />
    )
  })
}

const Actions = ({item, actions, onClickMapping}) => {
  const { inline, overflow } = actions
  if (inline) {
    return <InlineActions
      item={item}
      actions={inline}
      onClickMapping={onClickMapping}
    />
  }
  return null
}

const Row = ({ item, headers, onClickMapping }) => {
  return headers.map((header) => {
    return <td key={header.id}>
      {["actions"].includes(header.id) ?
        <div id="actions">
          <Actions
            item={item}
            actions={item["actions"]}
            onClickMapping={onClickMapping}
          />
        </div>
        :
        item[header.id]
      }
    </td> 
  })
}

export default memo(function Rows({ headers, items, onClickMapping}) {
  return (
    <Fragment>
      <tbody>
        {items.map((item, index) => {
          return (<tr key={index}>
            <Row
              item={item}
              headers={headers}
              onClickMapping={onClickMapping}
            />
          </tr>)
        })}
      </tbody>
    </Fragment>
  )
})
