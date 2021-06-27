import React, { memo, Fragment } from 'react'

export default memo(function Headers({ headers }) {
  return (
    <Fragment>
      <thead>
        <tr className="table-header">
          {headers.map((header) => <th key={header.id}>{header.label}</th>)}
        </tr>
      </thead>
    </Fragment>
  )
})
