import React,{useState,useEffect} from 'react'
import axios from 'axios'
const Pharmacy = () => {
    const [notes, setNotes] = useState([]);
    const [visits, setVisits] = useState([]);
    useEffect(() => {
      axios .get("visits.json")
      .then((res) => {
        console.log(res.data.results);
        const n = res.data.results;
        console.log(n.length);
        setVisits(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });

    }, [])
  
    return (
      <div>
        {/* {notes.map(note => (
          <p key={note.id}>{ note.body }</p>
        ))} */}
      </div>
    )
}

export default Pharmacy
