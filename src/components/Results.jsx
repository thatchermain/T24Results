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
  };

  const setFilters = () => {
    let regions = [];
    data &&
      data.map((item) => {
        regions.push(item.region);
      });
    let filteredRegions = [...new Set(regions)];
    setFilterOptions(filteredRegions);
    // setFilterOptions([...new Set(regions)]);
    setShowFilter(!showFilter);
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
          )}
        </div>
        <br />
        <div className='wrapper'>
          <table className='table' border={0}>
            <tr className='table__row'>
              <th className='table__row table__row__head'>Imię i nazwisko</th>
              <th className='table__row table__row__head'>Region</th>
              <th className='table__row table__row__head'>Odpowiedzi</th>
              <th className='table__row table__row__head'>Poprawne</th>
              <th className='table__row table__row__head'>Błędne</th>
              <th className='table__row table__row__head'>Wynik</th>
            </tr>
            <br></br>
            <tbody className='table__body'>
              {data &&
                data
                  .filter((entry) => {
                    return search.toLocaleLowerCase() === ''
                      ? entry
                      : entry.region.toLocaleLowerCase().includes(search);
                  })
                  .map((item) => (
                    <tr className='table__body table__body__row'>
                      <td className='table__body__row table__body__row__data'>
                        {item.user}
                      </td>
                      <td className='table__body__row table__body__row__data'>
                        {item.region}
                      </td>
                      <td className='table__body__row table__body__row__data'>
                        {item.numberOfQuestionsAnswered}
                      </td>
                      <td className='table__body__row table__body__row__data'>
                        {item.correctAnswer}
                      </td>
                      <td className='table__body__row table__body__row__data'>
                        {item.wrongAnswer}
                      </td>
                      <td className='table__body__row table__body__row__data'>
                        {item.score + ' %'}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </>
    </div>
  );
};

export default Results;
