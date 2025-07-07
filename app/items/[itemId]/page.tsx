"use client"
import { ChartLineInteractive } from "@/components/custom/chart"
import { useParams } from "next/navigation"

const page = () => {
    const params = useParams()
    const itemId = params.itemId
  return (
    <div className="flex flex-col pt-10">
      
      <ChartLineInteractive/>
      
    </div>
  )
}

export default page
