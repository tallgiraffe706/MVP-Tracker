import './App.css';
import { useState } from 'react';
import PlayerItem from './components/PlayerItem';
import Nav from 'react-bootstrap/Nav';

const mvpData = [
  { name: 'Jayson Tatum', ranking: '1', team: 'Celtics', points: '30.5', rebounds: '7.9 rpg', assists: '4.6 apg', image: process.env.PUBLIC_URL + "/images/jayson.png" },
  { name: 'Luka Doncic', ranking: '2', team: 'Mavericks', points: '33.4', rebounds: '8.9 rpg', assists: '8.2 apg', image: process.env.PUBLIC_URL + "/images/luka.jpeg" },
  { name: 'Nikola Jokic', ranking: '3', team: 'Nuggets', points: '22.4', rebounds: '9.7 rpg', assists: '8.8 apg', image: process.env.PUBLIC_URL + "/images/jokic.png" },
  { name: 'Giannis Antetokounmpo', ranking: '4', team: 'Bucks', points: '31.0', rebounds: '11.4 rpg', assists: '5.5 apg', image: process.env.PUBLIC_URL + "/images/giannis.png" },
  { name: 'Stephen Curry', ranking: '5', team: 'Warriors', points: '31.7', rebounds: '6.6 rpg', assists: '7.1 apg', image: process.env.PUBLIC_URL + "/images/steph.jpeg" },
  { name: 'Donovan Mitchell', ranking: '6', team: 'Cavaliers', points: '30.0', rebounds: '4.1 rpg', assists: '5.4 apg', image: process.env.PUBLIC_URL + "/images/spida.png" },
  { name: 'Tyrese Haliburton', ranking: '7', team: 'Pacers', points: '19.9', rebounds: '4.5 rpg', assists: '11.1 apg', image: process.env.PUBLIC_URL + "/images/tyrese.jpeg" },
  { name: 'Devin Booker', ranking: '8', team: 'Suns', points: '27.1', rebounds: '5.2 rpg', assists: '5.8 apg', image: process.env.PUBLIC_URL + "/images/book.jpg" },
  { name: 'Ja Morant', ranking: '9', team: 'Grizzlies', points: '28.6', rebounds: '6.1 rpg', assists: '7.3 apg', image: process.env.PUBLIC_URL + "/images/ja.jpeg" },
  { name: 'Anthony Davis', ranking: '10', team: 'Lakers', points: '26.3', rebounds: '12.8 rpg', assists: '2.5 apg', image: process.env.PUBLIC_URL + "/images/ad.jpeg"  },
  { name: 'Jaylen Brown', ranking: '11', team: 'Celtics', points: '25.6', rebounds: '6.6 rpg', assists: '3.4 apg', image: process.env.PUBLIC_URL + "/images/jaylen.png" },
  { name: 'Joel Embiid', ranking: '12', team: '76ers', points: '32.3', rebounds: '10.1 rpg', assists: '4.6 apg', image: process.env.PUBLIC_URL + "/images/joel.jpeg" },
]

function App() {
  const [favorites, updateFavorites] = useState({});
  const [team, updateTeam] = useState('All');
  const [order, updateOrder] = useState('Ascending');
  const [scorer, updateScorer] = useState(0);

  let filteredData = mvpData;
  const selectTeamFilterType = (eventKey) => {
    updateTeam(eventKey);
  }


  const matchesTeamFilterType = (player) => {
    if (team === "All") {
      return true;
    } else if (team === player.team) {
      return true;
    } else {
      return false;
    }
  }

  const selectScoreFilterType = (eventKey) => {
    updateScorer(eventKey);
  }

  const matchesScoreFilterType = (player) => {
    if (parseFloat(player.points) >= scorer) {
      return true;
    } else {
      return false;
    }
  }

  let players = mvpData
    .filter(matchesTeamFilterType)
    .filter(matchesScoreFilterType);

  let numFavorites = 0;
  const newFavoritePlayer = (newPlayer) => {
    const updatedFavorites = {...favorites};
    if (typeof updatedFavorites[newPlayer.name] == 'undefined') {
      updatedFavorites[newPlayer.name] = newPlayer;
      console.log(updatedFavorites);
    }
    else {
      console.log('Player already in Favorites')
    }
    updateFavorites(updatedFavorites)
  }

  const removeFavoritePlayer = (player) => {
    const updatedFavorites = {...favorites};
    if (player.name in updatedFavorites) {
      delete updatedFavorites[player.name];
    }
    else {
      console.log('Error, you should not be able to delete this player');
    }
    updateFavorites(updatedFavorites)
  }

  Object.keys(favorites).forEach((key) => {
    numFavorites += parseFloat(favorites[key].points);
  })

  const sortPlayers = (eventKey) => {
    if (eventKey === "ascending") {
      updateOrder("Ascending")
      filteredData = filteredData.sort((a, b) => {
        return a.ranking - b.ranking;
      })
      console.log(filteredData)
    } else if (eventKey === "descending") {
      updateOrder("Descending")
      filteredData = filteredData.sort((a, b) => {
        return b.ranking - a.ranking;
      })
      console.log(filteredData)
    }
  }

  return (
    <div className="App">
      <div className="MVPCandidates">
        <h1>MVP Candidates</h1>
        <div className="filters">
          <div className="teamFilters">
            <h4>Team Filters</h4>
            <h4>Currently Showing: {team} Players</h4>
            <Nav onSelect={ selectTeamFilterType }>
              <Nav.Item><Nav.Link eventKey="All">All Players</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link eventKey="Celtics">Celtics Players</Nav.Link></Nav.Item>
            </Nav>
          </div>
          <div className="pointFilters">
            <h4>Scoring Filters</h4>
            <h4>Currently Showing: {scorer}+ ppg Players</h4>
            <Nav onSelect={ selectScoreFilterType }>
              <Nav.Item><Nav.Link eventKey={0}>All Players</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link eventKey={30}>30+ ppg Players</Nav.Link></Nav.Item>
            </Nav>
          </div>
        </div>
        <div className="sorting">
          <h4>Sort</h4>
          <h4>Current Order: {order}</h4>
          <Nav onSelect={ sortPlayers }>
            <Nav.Item><Nav.Link eventKey="ascending">Ascending Order (Based on Rank)</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="descending">Descending Order (Based on Rank)</Nav.Link></Nav.Item>
          </Nav>
        </div>
        <div className="PlayerItem">
          <p>Picture</p>
          <p>Name</p>
          <p>Ranking</p>
          <p>Team</p>
          <p>Points</p>
          <p>Rebounds</p>
          <p>Assists</p>
          <p>Add to Favorites</p>
        </div>
        {players.map((item, index) => (
          <PlayerItem newPlayerItem={item} onButtonClick={ newFavoritePlayer } buttonText={ 'Add Player to Favorites' }/>
        ))}
      </div>
      <div className="FavoritePlayers">
        <h1>Your Favorite Players</h1>
        {Object.values(favorites).map((item, index) => (
          <PlayerItem newPlayerItem={item} onButtonClick={ removeFavoritePlayer } buttonText={ 'Remove Player from Favorites' }/>
        ))}
        <h3>Total Number of Points Per Game by Your Favorite Players: { numFavorites }</h3>
      </div>
    </div>
  );
}

export default App;
