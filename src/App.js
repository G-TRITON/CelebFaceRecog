import React,{Component} from 'react';
import Navigation from './Components/Navigation/Navigation';
import ImgLinkForm from './Components/ImgLinkForm/ImgLinkForm';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';
import FaceRecog from './Components/FaceRecog/FaceRecog';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import './App.css';

//-------------api-key--------------------

//-------particles---------------------
const particlesOpt = {
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 500
      }
    }
  }
}
//--------------------------------------
const initialState = {
      searchField: '',
      imgUrl: '',
      box: [],
      celebName: '',
      route: 'signedout',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
              }
    };
/*-------------------------App-------------------------------*/
class App extends Component{
  constructor(props){
    super(props);
    this.state = initialState;
    this.onInput = this.onInput.bind(this);
    this.onDetect = this.onDetect.bind(this);
    this.detectFace = this.detectFace.bind(this);
    this.faceBox = this.faceBox.bind(this);
    this.onRouteCh = this.onRouteCh.bind(this);
    this.loadUser = this.loadUser.bind(this);
  }
//------------------------------------------------------------------
  loadUser(data){
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }})
  }
//-----------------------------------------------------------------

//-----------------------------------------------------------------
  onInput(event){
    this.setState({searchField: event.target.value});
  }
//-------------------------------------------------------------------
  onDetect(){
    this.setState({imgUrl: this.state.searchField})
   fetch('http://localhost:3000/imageurl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              input: this.state.searchField
            })
    })
    .then(response => response.json())
    .then(response => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
        }
        this.faceBox(this.detectFace(response))      
    }).catch(err => console.log('Error!'));
  }
//---------------------------------------------------------------------
  onRouteCh(route){
    if (route === 'signedout'){
      this.setState(initialState);
    }else if (route === 'signedin'){
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }
//----------------------------------------------------------------------
  detectFace(info){
    const detectedFace = info.outputs[0].data.regions[0].region_info.bounding_box;
    const celebName = info.outputs[0].data.regions[0].data.concepts[0].name;
    const img = document.getElementById('img');
    const width = Number(img.width);
    const height = Number(img.height);
    console.log(width, height);
    this.setState({celebName: celebName});
    return{
      leftCol: detectedFace.left_col * width,
      topRow : detectedFace.top_row * height,
      rightCol: width - (detectedFace.right_col * width),
      bottomRow: height - (detectedFace.bottom_row * height),
    }
  }
//-----------------------------------------------------------------
  faceBox(box){
    console.log(box);
    console.log(this.state.celebName);
    this.setState({box: box});
  }
//----------------------------------------------------------------
  render(){
    return (
      <div className="App">
       <Particles className='particles' params={particlesOpt} />
        { this.state.route === 'signedin' 
        ? <div>
           <Navigation onRouteCh={this.onRouteCh} />
        <Rank celebName={this.state.celebName} name={this.state.user.name} entries={this.state.user.entries}/>
        <ImgLinkForm onInput={this.onInput} onDetect={this.onDetect}/>
        <FaceRecog box={this.state.box} celebName={this.state.celebName} imgUrl={this.state.imgUrl}/>
        </div>
        : (
            this.state.route === 'signedout' ?
            <Signin onRouteCh={this.onRouteCh} loadUser={this.loadUser} />
            : <Register onRouteCh={this.onRouteCh} loadUser={this.loadUser}/>
          )
      }
      </div>
    );
  }
}
/*-----------------------------App-end--------------------------------------*/
export default App;
