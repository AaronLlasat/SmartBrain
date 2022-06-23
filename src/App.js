import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import SignIn from './components/signin/SignIn';
import Register from './components/register/Register';
import FaceRecognition from './components/facerecognition/FaceRecognition';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
import Rank from './components/rank/Rank';
import LoadBg from './LoadBg';

window.process = {
  env: {
      NODE_ENV: 'development'
  }
}

const initialState = {
  input:'',
  imageUrl:'',
  box:[],
  route: 'signin',
  isSignedIn: false,
  user: {
     id: "",
     name:"",
     email: "",
     entries: 0,
     joined: ""
  }
}

class App extends Component  {
  constructor() {
  super();
  this.state = initialState;
 }


 loadUser = (data) => {
    this.setState({user:{
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined

    }})
 }
  onRouteChange = (route) => {
    
    if (route ==='signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn:true})
    }
    this.setState({route: route})

    
  }


  calculateFaceLocation = (data) => {
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const clarifaiFace = data.outputs[0].data;
    const facesArray = [];

    clarifaiFace.regions.forEach(face => {
      const clarifaiInfo = face.region_info.bounding_box;

      const iterationFace = {
        leftCol: clarifaiInfo.left_col * width,
        topRow: clarifaiInfo.top_row * height,
        rightCol: width - (clarifaiInfo.right_col * width),
        bottomRow: height - (clarifaiInfo.bottom_row * height)
      }
      facesArray.push(iterationFace);
    })

    return facesArray;
    
  }

  displayFaceBox = (boxCalculation) => {
    this.setState({box : boxCalculation});
  }

  onInputChange = (event) => {
      this.setState({input:event.target.value});
  }

  onButtonSubmit = () => {
      this.setState({imageUrl: this.state.input})
      fetch("https://salty-river-25477.herokuapp.com/imageurl", {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                input: this.state.input
            })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch("https://salty-river-25477.herokuapp.com/image", {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.user.id
          })
        })
        .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {entries:count}))
            })
            .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))})
      .catch(err => console.log(err))
  }


  render() {
    const {isSignedIn, imageUrl, route, box} = this.state;
    return (
      <div className="App">
          <LoadBg/>
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>

          {route === 'home'
          ? 
          <>
            <Logo/>
            <Rank username={this.state.user.name} entries={this.state.user.entries}/> 
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition box={box} imageUrl={imageUrl}/>
          </>
          : (
            route === 'signin' 
            ?<SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : route === 'signout'
            ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
          
          
          }
      </div>
    );
}
  
}

export default App;
