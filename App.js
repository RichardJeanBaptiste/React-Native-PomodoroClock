import React, { Component } from "react";
import { View, Text, Button } from "react-native";

/*
  add alarm sound
  style components
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



  
  render() {

    return (
      <View style={{
        textAlign: 'center',
        marginTop: 50
      }}>
        <Text>Pomodoro Clock</Text>
        <View>
            <Text>{this.state.breakLength}</Text>
            <Button 
              title = "up"
              onPress={this.increaseBreak}
            />
            <Button 
              title = "down"
              onPress={this.decreaseBreak}
            />
        </View>

        <View>
            <Text>{this.state.sessionLength}</Text>
            <Button 
              title = "up"
              onPress={this.increaseSessionLength}
            />
            <Button 
              title = "down"
              onPress={this.decreaseSessionLength}
            />
        </View>
        
        <View>
            <Text>{this.state.session}</Text>
            <Button
              title="start/stop"
              onPress={this.startTimer}
            />
            <Button
              title="reset"
              onPress={this.resetTimer}
            />
        </View>
        
      </View>
    );
  }
}

export default App;