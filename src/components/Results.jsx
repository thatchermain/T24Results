import React, { useState } from 'react';
import './Results.scss';

const Results = () => {
  const [data, setData] = useState();

  const results = async () => {
    const res = await fetch(
      'https://basic-express-server-qlme.onrender.com/getResults'
    );
    const fetchedData = await res.json(res);
    await setData(fetchedData);
    console.log(fetchedData);
  };

  return (
    <div className='container'>
      <>
        <h1>RESULTS</h1>
        <button onClick={results}>Fetch</button>
        <br />
        <div className='wrapper'>
          <table className='table' border={0}>
            <tr className='table__row'>
              <th className='table__row table__row__head'>Imię i nazwisko</th>
              <th className='table__row table__row__head'>Region</th>
              <th className='table__row table__row__head'>Odpowiedzi</th>
              <th className='table__row table__row__head'>Poprawne</th>
              <th className='table__row table__row__head'>Błęde</th>
              <th className='table__row table__row__head'>Wynik</th>
            </tr>
            <tbody className='table__body'>
              {data
                ? data.map((item) => {
                    return (
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
                    );
                  })
                : 'Loading'}
            </tbody>
          </table>
        </div>
      </>
    </div>
  );
};

export default Results;
