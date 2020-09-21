import React , { Component } from "react";
import { View, Text, Button, TouchableOpacity} from "react-native";


class TimerDisplay extends Component {

    constructor(props){
        super(props);
    }


    render() {
        return(
            <View>
                <Text>{this.props.title}</Text>

                <TouchableOpacity onPress={this.props.pressFunction1}>
                <View style={{
                   marginLeft: '45%'
                }}>
                  {this.props.view1}
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.props.pressFunction2}>
                <View style={{
                    marginLeft: '55%',
                    marginTop: '-15px'
                    
                }}>
                  {this.props.view2}
                </View>
            </TouchableOpacity>   
            </View>
        )
    }
}

export default TimerDisplay;