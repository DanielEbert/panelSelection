import { useState, useRef, useEffect } from 'react'

interface PlotSelectionProps {
  setPlot: (plot: string) => void
  children: JSX.Element
}

const PlotSelection = ({ setPlot, children }: PlotSelectionProps) => {
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => {
    setShowMenu((prev: boolean) => {
      return !prev
    })
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShowMenu(false)
    }
  }

  useEffect(() => {
    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showMenu])

  return (
    <div className={`relative w-1/2 border`}>
      <button
        onClick={() => toggleMenu()}
        className={`absolute right-0 top-0 m-1 rounded bg-gray-200 p-1 opacity-80`}
      >
        {showMenu ? '▼' : '▲'}
      </button>
      {showMenu && (
        <div
          className={`absolute right-0 top-8 m-2 rounded bg-white p-2 shadow-lg`}
          ref={menuRef}
        >
          <ul>
            <li
              className="px-1 hover:bg-gray-100"
              onClick={() => setPlot('Pixie')}
            >
              Pixie
            </li>
            <li
              className="px-1 hover:bg-gray-100"
              onClick={() => setPlot('Vega')}
            >
              Vega
            </li>
            <li
              className="px-1 hover:bg-gray-100"
              onClick={() => setPlot('Pixie')}
            >
              Pixie
            </li>
          </ul>
        </div>
      )}
      {children}
    </div>
  )
}

export default PlotSelection
