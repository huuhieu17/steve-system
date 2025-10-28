import React from 'react'

const ComputerControlMicroApp = React.lazy(() => import('ComputerControlMicroApp/ComputerControlMicroApp'))
const ComputerControlApp = () => {
  return (
    <div>
      <React.Suspense fallback={<div>Launching App...</div>}>
        <ComputerControlMicroApp />
      </React.Suspense>
    </div>
  )
}

export default ComputerControlApp