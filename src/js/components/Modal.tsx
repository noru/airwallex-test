import React, { ReactElement } from 'react'

interface Props {
  show?: boolean,
  children: ReactElement<any>,
  onClose: () => void,
}

export default function(props: Props) {
  let { show, children, onClose } = props
  if (!show) return null
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        { children }
      </div>
    </div>
  )
}