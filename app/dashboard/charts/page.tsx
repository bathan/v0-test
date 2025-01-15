'use client'

import { useQuery, gql } from '@apollo/client'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Data } from 'plotly.js'

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false })

const chartTypes = [
  { value: 'bar', label: 'Bar Chart' },
  { value: 'line', label: 'Line Chart' },
  { value: 'scatter', label: 'Scatter Plot' },
  { value: 'pie', label: 'Pie Chart' },
  { value: 'plot_yield_by_campaign', label: 'Yield by Campaign' },
  { value: 'plot_yield_by_location', label: 'Yield by Location' }
]

interface MockData {
  [key: string]: Data
}

export default function ChartsPage() {
  const [selectedChart, setSelectedChart] = useState('bar')
  const [mockData, setMockData] = useState<MockData>({
    bar: {
      x: ['Corn', 'Wheat', 'Barley', 'Soybean'],
      y: [20, 14, 23, 18],
      type: 'bar'
    } as Data,
    line: {
      x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      y: [10, 15, 13, 17, 22, 24],
      type: 'scatter',
      mode: 'lines+markers'
    } as Data,
    scatter: {
      x: [1, 2, 3, 4, 5],
      y: [1, 6, 3, 8, 5],
      mode: 'markers',
      type: 'scatter'
    } as Data,
    pie: {
      values: [30, 25, 20, 15, 10],
      labels: ['Corn', 'Wheat', 'Barley', 'Soybean', 'Rice'],
      type: 'pie'
    } as Data
  })

  const { data, loading, error } = useQuery(gql`
    query {
      chartData {
        id
        name
        data
      }
    }
  `)

  useEffect(() => {
    if (data) {
      const transformedData = data.chartData.reduce(
        (acc: { [x: string]: any }, item: { [x: string]: any; name: any }) => {
          const { name, ...rest } = item // Destructure to exclude `name`
          acc[name] = rest.data // Use `name` as the key and the rest as the value
          return acc
        },
        {}
      )

      const { plot_yield_by_campaign, plot_yield_by_location } = transformedData

      setMockData((prevData) => ({
        ...prevData,
        plot_yield_by_campaign,
        plot_yield_by_location
      }))
    }
  }, [data])

  const handleChartChange = (value: string) => {
    setSelectedChart(value)
  }

  const isFromApi = [
    'plot_yield_by_campaign',
    'plot_yield_by_location'
  ].includes(selectedChart)

  const currentData = mockData[selectedChart]

  if (loading) {
    return (
      <div className="container mx-auto py-10 h-full">
        <h1 className="text-2xl font-bold mb-4">Charts</h1>
        <div>Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-10 h-full">
        <h1 className="text-2xl font-bold mb-4">Charts</h1>
        <div>Error: {error.message}</div>
      </div>
    )
  }

  // Plotly requires mutable data /facepalm
  const clonedData = currentData?.data
    ? JSON.parse(JSON.stringify(currentData.data))
    : []
  const clonedLayout = currentData?.layout
    ? JSON.parse(JSON.stringify(currentData.layout))
    : {}

  return (
    <div className="container mx-auto py-10 h-full">
      <h1 className="text-2xl font-bold mb-4">Charts</h1>
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle>Data Visualization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Select
              onValueChange={handleChartChange}
              defaultValue={selectedChart}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select chart type" />
              </SelectTrigger>
              <SelectContent>
                {chartTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full flex-grow">
            {isFromApi ? (
              <>
                <div>from api</div>
                <Plot
                  data={clonedData}
                  layout={clonedLayout}
                  config={currentData?.config || { responsive: true }}
                  onError={(error) => console.error('Plotly Error:', error)}
                />
              </>
            ) : (
              <Plot
                data={[mockData[selectedChart]]}
                layout={{
                  width: '100%',
                  height: '100%',
                  autosize: true,
                  title: `${
                    chartTypes.find((type) => type.value === selectedChart)
                      ?.label
                  } of Data`
                }}
                config={{ responsive: true }}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
