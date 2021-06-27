import React, { memo } from 'react'

export default memo(function TabItem({ tabDetail }) {
  const { title, description } = tabDetail
  return (
    <div className="mr-10">
      <p>
        {title}
      </p>
      <p>
        {description}
      </p>
    </div>
  )
})
