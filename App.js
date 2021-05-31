import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, SafeAreaView, View, Text, Image, TextInput, TouchableOpacity, Keyboard, Vibration} from 'react-native';

var workTime = 1500;
var breakTime = 300;
var isActive = true;
var isWorking = false;
var timeMax = setTimeMax();

function Timer(){
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if(isActive)
        setTime(time => time + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if(time % timeMax == 0)
  {
    isActive = !isActive
    isWorking = !isWorking
    timeMax = setTimeMax();
    if(time != 0)
      Vibration.vibrate()
  }
  var timeOut = timeMax - (time % timeMax);
  
  return (
    <View style={styles.timer}>
      <Text style={styles.text}>{isWorking? "work" : "break"}</Text>
      <Text style={styles.timerText}>{formatTime(timeOut)}</Text>
    </View>
  );
}

function setTimeMax()
{
  var out
  if(isWorking)
    out = workTime
  else
    out = breakTime
  return out
}

function formatTime(secIn)
{
  let minOut = parseInt(secIn/60).toString()
  let secOut = secIn % 60
  if(secOut >= 10)
    secOut = secOut.toString()
  else
    secOut = "0" + secOut.toString()
  return minOut + ":" + secOut
}

const App = props => {

  const onChangeNumber = React.useState(null);
  const [currentTextInput, setCurrentTextInput] = useState('');

  return (
    <SafeAreaView style={styles.safeAreaView}>
      {/* TIMER */}
      {Timer()}
      
      {/* INPUT */}
      <View style={styles.inputSection}>
        <Text style={styles.text}>Work Time:</Text>
        <TextInput
            style={styles.input}
            placeholder="25"
            value={currentTextInput}
            onChangeText={(text) => setCurrentTextInput(text)}
            keyboardType="numeric"
          />
        <Text style={styles.text}>Break Time:</Text>
        <TextInput
          style={styles.input}
          placeholder="5"
          value={currentTextInput}
          onChangeText={(text) => setCurrentTextInput(text)}
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity style={styles.buttonSection} onPress={Keyboard.dismiss, () => {
        isActive = !isActive
      }}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Play/Pause</Text>
          </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonSection} onPress={Keyboard.dismiss, () => {
        isActive = false
        isWorking = true
        timeMax = setTimeMax()
      }}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Reset</Text>
          </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: 'black'
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30
  },
  timerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 125
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 50,
  },
  timer: {
    flex: 1,
    backgroundColor: 'black',
    borderWidth: 2,
    borderColor: 'orange',
    alignItems: 'center'
  },
  inputSection: {
    
    backgroundColor: 'black'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  button: {
    height: 60,
    margin: 25,
    borderWidth: 1,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  buttonSection: {
    flex: 1
  }
});

export default App;