import '../App.css';
import { Button } from '@mui/material';

const PlayerItem = (props) => {
    const {
        newPlayerItem,
        onButtonClick,
        buttonText,
    } = props;

    const addToFavorites = () => {
        onButtonClick(newPlayerItem);
    }

    return (
        <div className='PlayerItem'>
            <img src={newPlayerItem.image} alt={newPlayerItem.name} width='100' height='100'></img>
            <p>{newPlayerItem.name}</p>
            <p>{newPlayerItem.ranking}</p>
            <p>{newPlayerItem.team}</p>
            <p>{newPlayerItem.points} ppg</p>
            <p>{newPlayerItem.rebounds}</p>
            <p>{newPlayerItem.assists}</p>
            <Button onClick={ addToFavorites } variant='contained'>{buttonText}</Button>
        </div>
    )
}

export default PlayerItem;