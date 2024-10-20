import React from 'react'

const Eachdash = ({playlist}) => {
  return (
    <div className="m-div">
      <h1 className="s-name"> Name of song:${playlist.songName}</h1>
      <h2 classname="a-name">Name of artist:${playlist.artistName}</h2>
      <h2 className="g-name">Genere:${playlist.Genre}</h2>
      <h2 className="timespent">Timespent:${playlist.Timespent}</h2>
      <h3 className="date">Date:${playlist.Date}</h3>
      <h3 classname="length">Actual Length of song:${playlist.length}</h3>
    </div>
  )
}

export default Eachdash
