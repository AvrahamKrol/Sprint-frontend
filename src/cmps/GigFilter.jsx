import { useState, useEffect } from 'react'
import { SearchSuggestions } from './SearchSuggestions'

import searchIcon from '../../public/icons/search-icon.svg'

export function GigFilter({ cmpStl = 'header', filterBy, setFilterBy }) {
  const [filterToEdit, setFilterToEdit] = useState(structuredClone(filterBy))

  useEffect(() => {
    setFilterBy(filterToEdit)
  }, [filterToEdit])

  function handleChange(ev) {
    const { name, value } = ev.target
    setFilterToEdit((prev) => ({ ...prev, [name]: value }))
  }

  function onSelectSuggestion(suggestion) {
    setFilterToEdit((prev) => ({
      ...prev,
      txt: suggestion,
    }))

    setFilterBy({
      ...filterToEdit,
      txt: suggestion,
    })
  }

  // function handleChange(ev) {
  //   var { type, name, value } = ev.target

  //   // switch (type) {
  //   //   case 'search':
  //   //   case 'radio':
  //   //     // newValue = field === 'sortDir' ? +value : value
  //   //     setFilterToEdit((prev) => ({ ...prev, [name]: value }))
  //   //     // if (!filterToEdit.sortDir) filterToEdit?.sortDir = 1
  //   //     break
  //   //   case 'number':
  //   //     // newValue = +value || ''
  //   //     setFilterToEdit((prev) => ({ ...prev, [name]: +value }))
  //   //     break
  //   // }
  // }

  function onSubmit(ev) {
    ev.preventDefault()
    setFilterBy(filterToEdit)
  }

  function clearFilter() {
    setFilterToEdit({ ...filterToEdit, txt: '', minPrice: '' })
  }

  function clearSort() {
    setFilterToEdit({ ...filterToEdit, sortField: '', sortDir: '' })
  }

  return (
    <section className="gig-filter">
      <form className={`search-bar search-bar--${cmpStl}`} onSubmit={onSubmit}>
        <input
          type="search"
          placeholder="What service are you looking for today?"
          name="txt"
          value={filterToEdit.txt || ''}
          onChange={handleChange}
        />
        <button type="submit">
          <img src={searchIcon} alt="search" />
        </button>
      </form>
      {cmpStl === 'hero' && <SearchSuggestions onSelect={onSelectSuggestion} />}
      {/* <div>
      <h3>Filter:</h3>
      <input
        type="text"
        name="txt"
        value={filterToEdit.txt}
        placeholder="Free text"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        min="0"
        name="minPrice"
        value={filterToEdit.minSpeed}
        placeholder="Min price"
        onChange={handleChange}
        required
      />
      <button className="btn-clear" onClick={clearFilter}>
        Clear
      </button>
      </div> */}
      {/* <div>
      <h3>Sort:</h3>
      <div className="sort-field">
        <label>
          <span>Speed</span>
          <input
            type="radio"
            name="sortField"
            value="speed"
            checked={filterToEdit.sortField === 'speed'}
            onChange={handleChange}
          />
        </label>
        <label>
          <span>Vendor</span>
          <input
            type="radio"
            name="sortField"
            value="vendor"
            checked={filterToEdit.sortField === 'vendor'}
            onChange={handleChange}
          />
        </label>

      <div className="sort-dir">
        <label>
          <span>Asce</span>
          <input
            type="radio"
            name="sortDir"
            value="1"
            checked={filterToEdit.sortDir === 1}
            onChange={handleChange}
          />
        </label>
        <label>
          <span>Desc</span>
          <input
            type="radio"
            name="sortDir"
            value="-1"
            onChange={handleChange}
            checked={filterToEdit.sortDir === -1}
          />
        </label>
      </div>

      <button className="btn-clear" onClick={clearSort}>
        Clear
      </button>

     </div> 
     </div> */}
    </section>
  )
}
