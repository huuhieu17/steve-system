import React from 'react'

type Props = {}
const ComputerControlMicroApp = React.lazy(() => import('ComputerControlMicroApp/ComputerControlMicroApp'))
const ComputerControlApp = (props: Props) => {
  return (
    <div>
      <h2>Computer Control</h2>
      <React.Suspense fallback={<div>Launching App...</div>}>
        <ComputerControlMicroApp />
      </React.Suspense>
    </div>
  )
}

export default ComputerControlApp