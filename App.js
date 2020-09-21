import React, { Component } from "react";
import { View, Text, Button, TouchableOpacity} from "react-native";
import TimerDisplay from './components/timeDisplays';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faArrowUp, faArrowDown, faPause, faRedo, faPlay} from '@fortawesome/free-solid-svg-icons'
/*
  add alarm sound
  style components
  find start icon

  create components from views
*/

class App extends Component {

  constructor(props){
    super(props);
    this.state = {breakLength: 5,sessionLength: 25, session: '',sessionTimer: 1500, timerStarted: false}
    this.increaseBreak = this.increaseBreak.bind(this);
    this.decreaseBreak = this.decreaseBreak.bind(this);
    this.increaseSessionLength = this.increaseSessionLength.bind(this);
    this.decreaseSessionLength = this.decreaseSessionLength.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.countdown = this.countdown.bind(this);
    this.stopCountdown = this.stopCountdown.bind(this);
    this.showPlayButton = this.showPlayButton.bind(this);
  }


  //set intial session time
  
  componentDidMount(){

    let initSession = new Date(1500 * 1000).toTimeString('mm:ss').substr(3,5);
    this.setState({
      session: initSession
    })
  }


  // Break Length
  increaseBreak() {

    if(this.state.timerStarted == true){
      return
    }

    let newBreakLength = this.state.breakLength + 1;
    
    this.setState({
      breakLength: newBreakLength
    })
  }

  decreaseBreak(){

    if(this.state.timerStarted == true){
      return
    }

    let newBreakLength = this.state.breakLength - 1;
    if(newBreakLength < 0){
      this.setState({
        breakLength: 0
      })
    }else{
      this.setState({
        breakLength: newBreakLength
      })
    }
  }


  // Session Length
  increaseSessionLength(){

    if(this.state.timerStarted == true){
      return
    }

    let newSessionLength = this.state.sessionLength + 1;
    let newSessionTimer = this.state.sessionTimer + 60;
    let newSession = new Date(newSessionTimer * 1000).toTimeString('mm:ss').substr(3,5);
    
    this.setState({
      sessionLength: newSessionLength,
      session: newSession,
      sessionTimer: newSessionTimer
    })
  }

  decreaseSessionLength(){

    if(this.state.timerStarted == true){
      return
    }

    let newSessionLength = this.state.sessionLength - 1;
    let newSessionTimer = this.state.sessionTimer - 60;
    let newSession = new Date(newSessionTimer * 1000).toTimeString('mm:ss').substr(3,5);

    if(newSessionLength < 1){
      this.setState({
        sessionLength: 1
      })
    }else{
      this.setState({
        sessionLength: newSessionLength,
        session: newSession,
        sessionTimer: newSessionTimer
      })
    }
  }

  // Timer countdown methods

  countdown(){
      this.intervalID = setInterval(()=>{
        let newSessionTimer = this.state.sessionTimer - 1;
        let newSession = new Date(newSessionTimer * 1000).toTimeString('mm:ss').substr(3,5);
        if(newSessionTimer < 0){
          alert("finished");
          this.stopCountdown();
          return;
        }else{
          this.setState({
            sessionTimer: newSessionTimer,
            session: newSession        
          })
        } 
      },1000);
  }

  stopCountdown(){
    clearInterval(this.intervalID);
  }

  // Session Timer
  startTimer(){

    if(this.state.timerStarted == false){
      this.setState({
        timerStarted: true
      })

      this.countdown();
    }else{
      this.setState({
        timerStarted: false
      })

      this.stopCountdown();

    }
  }

  resetTimer(){

    let initSession = new Date(1500 * 1000).toTimeString('mm:ss').substr(3,5);

    this.setState({
      breakLength: 5,
      sessionLength: 25,
      session: initSession,
      sessionTimer: 1500,
      timerStarted: false
    })

    this.stopCountdown();
  }


  // play button

  showPlayButton(){
    if(this.state.timerStarted == true){
      return <FontAwesomeIcon icon={faPause} color='yellow'/>
    }else{
      return <FontAwesomeIcon icon={faPlay} color='green'/>
    }
  }
 
  render() {

    return (
      <View style={{
        textAlign: 'center',
        marginTop: 50
      }}>
        <Text>Pomodoro Clock</Text>
        
        {/* Break Timer */}
        <View>
          <TimerDisplay 
            title={this.state.breakLength}
            pressFunction1 = {this.increaseBreak}
            pressFunction2 = {this.decreaseBreak}
            view1 = { <FontAwesomeIcon icon={faArrowUp} color='blue'/>}
            view2 = { <FontAwesomeIcon icon={faArrowDown} color='blue'/>}
          />       
        </View>

        {/* Session Timer */}
        <View>
          <TimerDisplay
            title = {this.state.sessionLength}
            pressFunction1 = {this.increaseSessionLength}
            pressFunction2 = {this.decreaseSessionLength}
            view1 = { <FontAwesomeIcon icon={faArrowUp} color='blue'/> }
            view2 = { <FontAwesomeIcon icon={faArrowDown} color='blue'/>}
          />    
        </View>

        {/* Play Button */}
        <View>

          <TimerDisplay
            title = {this.state.session}
            pressFunction1 = {this.startTimer}
            pressFunction2 = {this.resetTimer}
            view1 = {this.showPlayButton()}
            view2 = {<FontAwesomeIcon icon={faRedo} color='red'/>}
          />
            
        </View>

      </View>
    );
  }
}

export default App;


/**
 *          
 * 
 * 
 * 
 */