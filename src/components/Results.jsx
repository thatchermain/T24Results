import React, { useEffect, useState } from 'react';
import './Results.scss';

const Results = () => {
  const [data, setData] = useState();
  const [search, setSearch] = useState('');
  const [filterOptions, setFilterOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [showFilter, setShowFilter] = useState(true);
  const [points, setPoints] = useState();

  const results = async () => {
    const res = await fetch(
      'https://basic-express-server-qlme.onrender.com/getResults'
    );
    const fetchedData = await res.json(res);
    await setData(fetchedData);
    await console.log(fetchedData);
    setShowOptions(true);
    // await data.allQuestions.filter((question) => question.isCorrect).lenght

    console.log('Points ', points);
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
    // const correctAnswersCount = data.allQuestions.filter(
    //   (question) => question.isCorrect
    // ).length;
    // setPoints(correctAnswersCount);
  };

  // const countPoints = () => {
  //   const correctAnswers = data.allQuestions.filter(
  //     (question) => question.isCorrect
  //   );
  //   const numberOfCorrectAnswers = correctAnswers.lenght;
  //   console.log('Points ', numberOfCorrectAnswers);
  // };

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
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className='wrapper'>
          {data &&
            data
              .filter((entry) => {
                return search.toLocaleLowerCase() === ''
                  ? entry
                  : entry.region.toLocaleLowerCase().includes(search);
              })
              .map((item, id) => {
                return (
                  <>
                    <div className='wrapped'>
                      <div>{item.user}</div>
                      <div>{item.region}</div>
                      <div></div>
                      <div className='scores'>
                        {/* <div className='questions'>
                          {item.allQuestions.map((question) => {
                            return (
                              <div className='bordered'>
                                <p>{question.answerText}</p>
                              </div>
                            );
                          })}
                        </div>
                        <div className='questions'>
                          {item.allQuestions.map((question) => {
                            return (
                              <div className='bordered'>
                                <p>{question.isCorrect ? 'TAK' : 'NIE'}</p>
                              </div>
                            );
                          })}
                        </div> */}
                        <div className='questions'>
                          <p>{`Wynik końcowy: ${item.score} pkt `}</p>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
        </div>
      </>
    </div>
  );
};

export default Results;
