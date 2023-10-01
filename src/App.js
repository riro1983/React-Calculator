import React, {useState} from 'react';
import './App.css';
import {Button, ThemeProvider, createTheme} from '@mui/material';
import {blue,purple} from '@mui/material/colors'
const theme = createTheme({
  palette:{
    primary: blue,
    secondary: purple,
  }
});

function App() {
  const [output, setOutput] = useState('');
  const [lastInput, setlastInput] = useState('');
  const [lastOperator, setlastOperator] = useState('');
  const [repeatedInput, setrepeatedInput] = useState('');

  const handleClick = (e) => {
    if (e.target.matches('button')){
      const button_pressed = e.target.getAttribute('data-value');
      const operator_pressed = e.target.getAttribute('data-action');

      if (operator_pressed === 'C'){
        setOutput('');
        setlastInput('');
        setlastOperator('');
        setrepeatedInput('');
      }
      else if (operator_pressed === '/' || operator_pressed === '+' || operator_pressed === '-' || operator_pressed === '*'){
        setlastOperator(operator_pressed);
        setlastInput(output);
        setOutput('');
        setrepeatedInput('');
      }
      else if (operator_pressed === '='){
        if (repeatedInput !== ''){
          const result = calculation(parseFloat(repeatedInput),lastOperator,parseFloat(output));
          setOutput(result.toString());
        }
      
        else{
          if(repeatedInput === ''){
            setrepeatedInput(output);
          }
          const firstResult = calculation(parseFloat(lastInput),lastOperator,parseFloat(output));
          setOutput(firstResult.toString());
        }
      }
      else if (operator_pressed === '.'){
          if(!output.includes('.')){
            setOutput(output + '.');
          }
        }
        else {
          setOutput(output + button_pressed);
        }
      }
    }
    

  const calculation = (number,operator,input) =>{
    switch (operator){
      case '/':
        return (number / input);
      case '+':
        return (number + input);
      case '-':
        return (number - input);
      case '*':
        return (number * input);
      default:
        return('hello');
    }
  };
  return (
    <ThemeProvider theme={theme}>
    <div className='calculator-container'>
      <div className='calculator-display'>{output}</div>
      <div className='calculator-buttons' onClick={handleClick}>
      <Button variant='contained' color = 'primary' data-action='C'>C</Button>
        <Button data-value='7'>7</Button>
        <Button data-value='8'>8</Button>
        <Button data-value='9'>9</Button>
        <Button data-action='/'>/</Button>
        <Button data-value='4'>4</Button>
        <Button data-value='5'>5</Button>
        <Button data-value='6'>6</Button>
        <Button data-action='*'>*</Button>
        <Button data-value='1'>1</Button>
        <Button data-value='2'>2</Button>
        <Button data-value='3'>3</Button>
        <Button data-action='-'>-</Button>
        <Button data-value='0'>0</Button>
        <Button data-action='.'>.</Button>
        <Button data-action='='>=</Button>
        <Button data-action='+'>+</Button>
      </div>
    </div>
    </ThemeProvider>
  );
}

export default App;
