import React from 'react';
import Albums from '../album/album';
import Album from '../album/album';
import { Link, Redirect } from 'react-router-dom';
import NavBarContainer from '../navbar/navbar_container';

class UserShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserId: this.props.currentUserId,
      artist: null,
      albums: null
    };
  }

  componentDidMount() { 
    window.scrollTo(0, 0);
    // debugger
    if (this.props.state.entities.users[this.props.artistId]) {
      
      this.setState({
        artist: this.props.state.entities.users[this.props.artistId],
        albums: this.props.state.entities.users[this.props.artistId].albums
      });
    } else {   

      this.props.fetchUser(this.props.artistId)
        .then((res) => this.setState({ 
          artist: res.user,
          albums: res.user.albums
        }));
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.artistId !== this.props.artistId) {
      this.props.fetchUser(this.props.artistId)
        .then((res) => this.setState({
          artist: res.user,
          albums: res.user.albums
        }));
    }
  }

  getAlbums() {
    let artistAlbums = [];
    // debugger
    let albums; 
    if (Array.isArray(this.state.albums)) {
      albums = this.state.albums;
    } else {
      albums = Object.values(this.state.albums);
    }
    albums.forEach((alb) => {
      if (alb.user_id === this.state.artist.id) {
        artistAlbums.push(alb);
      }
    });

    return artistAlbums;
  }

  render() {
    const { artist } = this.state;
    
    let loc = { url: "/artists" };

    if (!artist) {
      return(<div>
        <NavBarContainer loc={loc} />
      </div>);
    } else {
      let artistAlbums = this.getAlbums();
      if (artist.id === this.state.currentUserId) {
        loc = { url: "/library" };
      }
      // debugger
      return (
        <div className="userShowBackground">
          <NavBarContainer loc={loc} />
          <div className="userShowMid">

            <div className="userBanner">
              <div className="artistBannerPic">
                <img className="artistMainArt" src={artist.photoUrl} />
              </div>

              <div className="artistShowTitleOuter">
                <h3 className="artistShowTitle">{artist.username}</h3>
              </div>

            </div>

            <div className="showMidLower">
              
              <div className="showMidLeft">
                <div className="showUserTitles">
                  <h3 className="showUserTitle"> Albums</h3>
                </div>

                <div className="showLeftAndRight">
                  <div className="userAlbumList">
                    {artistAlbums.map((album) => {
                      // debugger 
                      return (
                      <div className="userIndividualAlbum" key={album.id}>
                        <Link to={`/albums/${album.id}`}><img className="albumArt" id="showPagePic" src={album.albumUrl}></img></Link>
                        
                        <div className="showTitleSpacing">
                          <div className="showTitleAdjustments">
                            <i className="fas fa-play-circle" id="showPagePlay"></i>
                            <div className="showJustTitles">
                              <Link to={`/artists/${this.props.artistId}`} className="showAlbumArtist">{artist.username}</Link>
                              <Link to={`/albums/${album.id}`} className="showAlbumTitle">{album.title}</Link>
                            </div>
                          </div>
                          <div className="waveFormContainer">
                            <img className="waveForm" src={window.waveform} />
                          </div>
                        </div>
                      </div>
                      )})}
                  </div>

                  <div className="showMidRight">
                    <div className="showMidRightCont">
                      Albums
                      <div className="showMidRightNum">
                        {artistAlbums.length}
                      </div>
                    </div>
                    
                    <div className="shamelessPlug">
                      <a href="https://www.linkedin.com/in/brian-tjoe-walsh-89086991/"><i className="fab fa-linkedin"></i></a>
                      <a href="https://github.com/bbriannwalshh"><i className="fab fa-github"></i></a>
                    </div>
                  </div>

                </div>

              </div>


            </div>

          </div>
        </div>
      )
    }
  }
}

export default UserShow;