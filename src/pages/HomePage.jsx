import { GigFilter } from '../cmps/GigFilter'
import { useSelector } from 'react-redux'
import { setFilterBy } from '../store/actions/gig.actions'
import { useLocation, useNavigate } from 'react-router'

export function HomePage() {
  const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  function onSetFilterBy(filter) {
    if (filter.txt === filterBy.txt) return

    setFilterBy(filter)
    // if (pathname !== '/gig') navigate('/gig')
  }
  return (
    <section className="hero full">
      <div className="hero-search-bar">
        <h1>Hire talent obsessed with getting it right</h1>
        <div className="search-bar-container">
          <GigFilter
            cmpStl="hero"
            filterBy={filterBy}
            setFilterBy={onSetFilterBy}
          />
          {/* <div className="search-input">
            <input type="text" placeholder="Search..." />
            <button className="search-btn">
              <img src={'../../public/icons/search-icon.svg'} alt="" />
            </button>
          </div> */}
        </div>
      </div>
    </section>
  )
}
