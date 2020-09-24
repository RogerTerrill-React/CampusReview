import React from 'react'

const MajorItem = ({major}) => {
  return (
    <li>{major.name} ({major.code})</li>
  )
}

export default MajorItem
