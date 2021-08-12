import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Visits = () => {
  const [visits, setVisits] = useState([]);
  useEffect(() => {
    axios
      .get('visits.json')
      .then(res => {
        console.log(res.data.results);
        const n = res.data.results;
        console.log(n.length);
        setVisits(res.data.results);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {visits.map(visit => (
        <p key={visit.uuid}>
          <ul>
            <li>{visit.patient.display}</li>
            <li>{visit.visitType.display}</li>
          </ul>
        </p>
      ))}
    </div>
  );
};

export default Visits;
