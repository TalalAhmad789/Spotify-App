import React from 'react'
import Sidebar from '@/components/Sidebar'
import MainContent from '@/components/MainContent'

const page = () => {
  return (
    <div className="flex w-full h-112.5 gap-x-2">
      <Sidebar />
      <MainContent />
    </div>
  )
}

export default page
