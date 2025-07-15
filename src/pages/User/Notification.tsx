import React from 'react'
import Blank from '../../components/ui/Blank'

const Notification: React.FC = () => {
  return (
    <Blank title="Notification">
      <div className="flex items-center justify-center h-full py-10">
        <p className="text-gray-500">No data available</p>
      </div>
    </Blank>
  )
}

export default Notification
