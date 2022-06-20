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
import Clarifai from 'clarifai';
import {hiddenKey} from './ClarifaiKey'

window.process = {
  env: {
      NODE_ENV: 'development'
  }
}

const app = new Clarifai.App({
  apiKey: hiddenKey,
 });

class App extends Component  {
  constructor() {
  super();
   this.state ={
     input:'',
     imageUrl:'',
     box:[],
     route: 'signin',
     isSignedIn: false
  }
 }

  onRouteChange = (route) => {
    
    if (route ==='signout') {
      this.setState({isSignedIn:false})
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

    clarifaiFace.regions.map(face => {
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
      app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err))
  }


  render() {
    return (
      <div className="App">
          <LoadBg/>
          <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>

          {this.state.route === 'home'
          ? 
          <>
            <Logo/>
            <Rank/> 
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
          </>
          : (
            this.state.route === 'signin' 
            ?<SignIn onRouteChange={this.onRouteChange}/>
            : this.state.route === 'signout'
            ? <SignIn onRouteChange={this.onRouteChange}/>
            : <Register onRouteChange={this.onRouteChange}/>
          )
          
          
          }
      </div>
    );
}
  
}

export default App;
