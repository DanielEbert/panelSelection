import { useState } from 'react'

import PlotSelection from './PlotSelection'
import VegaPlot from './VegaPlot'
import PixiePlot from './PixiePlot'

type PlotComponents = {
  [key: string]: () => JSX.Element
}

const plotComponents: PlotComponents = {
  Pixie: () => <PixiePlot />,
  Vega: () => <VegaPlot />
}

const App = () => {
  const [plots, setPlots] = useState<JSX.Element[]>([
    <PixiePlot key={0} />,
    <VegaPlot key={1} />,
    <div key={2} />,
    <div key={3} />
  ])

  const changePlot = (index: number, plot: string) => {
    const newPlots = [...plots]
    if (plotComponents[plot]) {
      newPlots[index] = plotComponents[plot]()
      console.log(newPlots)
      setPlots(newPlots)
    }
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="flex h-full w-full">
        <PlotSelection setPlot={(plot: string) => changePlot(0, plot)}>
          {plots[0]}
        </PlotSelection>
        <PlotSelection setPlot={(plot: string) => changePlot(1, plot)}>
          {plots[1]}
        </PlotSelection>
      </div>
      <div className="flex h-full w-full">
        <PlotSelection setPlot={(plot: string) => changePlot(2, plot)}>
          {plots[2]}
        </PlotSelection>
        <PlotSelection setPlot={(plot: string) => changePlot(3, plot)}>
          {plots[3]}
        </PlotSelection>
      </div>
      <div>
        <input type="range" min="0" max="100" className="w-full" />
      </div>
    </div>
  )
}

export default App
