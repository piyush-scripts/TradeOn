"use client"
import { ChartLineInteractive } from "@/components/custom/chart"
import LineChart9 from "@/components/line-chart-9"
import { useParams } from "next/navigation"

const page = () => {
    const params = useParams()
    const itemId = params.itemId
  return (
    <div className="flex flex-col pt-10">
      
      <LineChart9/>
      
    </div>
  )
}

export default page
