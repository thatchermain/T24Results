import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import './Results.scss';

const Results = () => {
  const [data, setData] = useState();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [filterOptions, setFilterOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [showFilter, setShowFilter] = useState(true);
  // const [points, setPoints] = useState();
  const [finalScore, setFinalScore] = useState(0);

  const results = async () => {
    setLoading(true);
    const res = await fetch(
      'https://basic-express-server-qlme.onrender.com/getResults'
    );
    const fetchedData = await res.json(res);
    await setData(fetchedData);
    await console.log(fetchedData);
    setShowOptions(true);
  };

  const setFilters = () => {
    let regions = [];
    data &&
      data.map((item) => {
        regions.push(item.region);
      });
    let filteredRegions = [...new Set(regions)];
    setFilterOptions(filteredRegions);

    // setShowFilter(!showFilter);
  };

  const csvHandler = () => {
    const flattebedData = data && data.map((item) => flattenObject(item));
    const csv = Papa.unparse(flattebedData);

    //////////////////////////
    const blob = new Blob([csv], { type: 'text/csv' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'data.csv';

    document.body.appendChild(downloadLink);

    downloadLink.click();

    document.body.removeChild(downloadLink);

    //////////////////////////

    console.log('first');
    console.log(csv);
  };

  const flattenObject = (obj, prefix = '') => {
    const flattened = {};

    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        const nested = flattenObject(obj[key], `${prefix}${key}.`);
        Object.assign(flattened, nested);
      } else {
        flattened[`${prefix}${key}`] = obj[key];
      }
    }

    return flattened;
  };

  return (
    <div className='container'>
      <>
        <div className='header'>
          <h1>Wyniki</h1>
          <button className='button' onClick={results}>
            Pobierz wyniki
          </button>
          {showOptions && showFilter ? (
            <>
              <button className='button' onClick={csvHandler}>
                Pobierz jako CSV
              </button>
              {/* <button className='button' onClick={setFilters}>
                Wybierz Region
              </button> */}
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
          )}
        </div>

        <br />
        <div className='wrapper'>
          {loading ? (
            !data ? (
              <>loading</>
            ) : (
              <>
                <table>
                  <tr className='table__head'>
                    <th>Użytkownik</th>
                    <th>Region</th>
                    <th>Odp. prawidłowe</th>
                    <th>Wynik</th>
                  </tr>
                  <tr></tr>
                  <tr></tr>
                  <tr></tr>
                  {data
                    .filter((entry) => {
                      return search.toLocaleLowerCase() === ''
                        ? entry
                        : entry.region.toLocaleLowerCase().includes(search);
                    })
                    .map((item, id) => {
                      return (
                        <tr className='table__data'>
                          <td>{item.user}</td>
                          <td>{item.region}</td>
                          <td>{item.score}</td>
                          <td>{item.procentage} %</td>
                        </tr>
                      );
                    })}
                </table>
              </>
            )
          ) : (
            ''
          )}
        </div>
      </>
    </div>
  );
};

export default Results;
