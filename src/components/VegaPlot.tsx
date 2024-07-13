import { useState } from 'react'

const VegaPlot = () => {
  const [toggle, setToggle] = useState<boolean>(false)

  return (
    <div className="bg-blue-300">
      VegaPlot
      <div>
        <button
          className="hover:bg-blue-400"
          onClick={() => setToggle((prev) => !prev)}
        >
          Hi
        </button>
      </div>
      {toggle && <div>button toggle on</div>}
    </div>
  )
}

export default VegaPlot
