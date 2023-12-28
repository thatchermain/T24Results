import React, { useEffect, useState } from 'react';
import './Results.scss';

const Results = () => {
  const [data, setData] = useState();
  const [search, setSearch] = useState('');
  const [filterOptions, setFilterOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [showFilter, setShowFilter] = useState(true);

  const results = async () => {
    const res = await fetch(
      'https://basic-express-server-qlme.onrender.com/getResults'
    );
    const fetchedData = await res.json(res);
    await setData(fetchedData);
    setShowOptions(true);
    // console.log(fetchedData);
    // console.log(regions);
    await console.log(data);
  };

  // const setFilters = () => {
  //   let regions = [];
  //   data &&
  //     data.map((item) => {
  //       regions.push(item.region);
  //     });
  //   let filteredRegions = [...new Set(regions)];
  //   setFilterOptions(filteredRegions);
  //   // setFilterOptions([...new Set(regions)]);
  //   setShowFilter(!showFilter);
  // };

  return (
    <div className='container'>
      <>
        <div className='header'>
          <h1>Wyniki</h1>
          <button className='button' onClick={results}>
            Pobierz wyniki
          </button>
          {/* {showOptions && showFilter ? (
            <>
              <button className='button' onClick={setFilters}>
                Wybierz Region
              </button>
            </>
          ) : (
            <>
              {data && (
                <select
                  className='button'
                  type='select'
                  placeholder='Search'
                  onChange={(e) => setSearch(e.target.value)}
                >
                  <option value=''>Wybierz region</option>
                  {filterOptions.map((filter, index) => {
                    return (
                      <option key={index} value={filter.toLowerCase()}>
                        {filter}
                      </option>
                    );
                  })}
                </select>
              )}
            </>
          )} */}
        </div>
        <br />
        <div className='wrapper'>
          <h1>Hello</h1>
          <h1>Hello</h1>
          <h1>Hello</h1>
          <h1>Hello</h1>
          <h1>Hello</h1>
          <h1>Hello</h1>
          <h1>Hello</h1>
          {data &&
            data.map((item) => {
              return (
                <>
                  <p>{item.user}</p>
                </>
              );
            })}
        </div>
      </>
    </div>
  );
};

export default Results;
