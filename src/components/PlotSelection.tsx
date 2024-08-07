import { useState, useRef, useEffect } from 'react'
import { IoSettingsOutline } from 'react-icons/io5'

interface PlotSelectionProps {
  setPlot: (plot: string) => void
  plotComponentKeys: string[]
  children: JSX.Element
}

const PlotSelection = ({
  setPlot,
  plotComponentKeys,
  children
}: PlotSelectionProps) => {
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
      <div ref={menuRef}>
        <button
          onClick={() => toggleMenu()}
          className={`absolute right-0 top-0 m-1 rounded bg-gray-200 bg-opacity-0 p-1 opacity-70 transition hover:bg-opacity-80 hover:opacity-100`}
        >
          <IoSettingsOutline size={22} />
        </button>
        {showMenu && (
          <div
            className={`absolute right-0 top-8 m-2 rounded bg-white p-2 shadow-lg`}
          >
            <ul>
              {plotComponentKeys.map((plot: string) => {
                return (
                  <li
                    className="select-none px-1 text-lg text-slate-900 hover:bg-gray-100"
                    onClick={() => setPlot(plot)}
                    key={plot}
                  >
                    {plot}
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
      {children}
    </div>
  )
}

export default PlotSelection
