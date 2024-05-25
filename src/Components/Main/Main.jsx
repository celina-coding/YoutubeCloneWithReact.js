import './main.css';
import iconOne from '../../assets/casque-de-musique.png'
import iconTwo from '../../assets/download.png'
import iconThree from '../../assets/lecture-video.png'

function Main(){
    return(
        <div className="main">
            <h2 className='main-title'>Exprimez, Partagez, Découvrez</h2>
            <p className='main-description'>Découvrez une plateforme où les visions se rencontrent! Capturez les moments, partagez des histoires et créez des liens à travers des vidéos qui parlent de vous.</p>
            <div className='main-icons'>
                <img src={iconTwo} alt="" className='icon-img-two' />
                <img src={iconThree} alt="" className='icon-img'/>
                <img src={iconOne} alt="" className='icon-img'/>
            </div>

        </div>
    )
}

export default Main