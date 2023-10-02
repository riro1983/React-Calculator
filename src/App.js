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
        document.querySelectorAll('.calculator-buttons Button[data-action]').forEach(button => {
          button.classList.remove('active');
        })
      }
      else if (operator_pressed === '/' || operator_pressed === '+' || operator_pressed === '-' || operator_pressed === '*'){
        document.querySelectorAll('.calculator-buttons Button[data-action]').forEach(button => {
          button.classList.remove('active');
        })
        e.target.classList.add('active');
        setlastOperator(operator_pressed);
        setlastInput(output);
        //setOutput('');
        setrepeatedInput('');
      }
      else if (operator_pressed === '='){
        if (repeatedInput !== ''){
          const result = calculation(parseFloat(output),lastOperator,parseFloat(repeatedInput));
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
          document.querySelectorAll('.calculator-buttons Button[data-action]').forEach(button => {
            button.classList.remove('active');
          })
          if(lastOperator && output !== ''){
            setOutput(button_pressed);
          }
          else{
          setOutput(output + button_pressed);
          }
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
        <Button variant='contained' color = 'primary' data-value='7'>7</Button>
        <Button variant='contained' color = 'primary' data-value='8'>8</Button>
        <Button variant='contained' color = 'primary' data-value='9'>9</Button>
        <Button variant='contained' color = 'primary' data-action='/'>/</Button>
        <Button variant='contained' color = 'primary' data-value='4'>4</Button>
        <Button variant='contained' color = 'primary' data-value='5'>5</Button>
        <Button variant='contained' color = 'primary' data-value='6'>6</Button>
        <Button variant='contained' color = 'primary' data-action='*'>*</Button>
        <Button variant='contained' color = 'primary' data-value='1'>1</Button>
        <Button variant='contained' color = 'primary' data-value='2'>2</Button>
        <Button variant='contained' color = 'primary' data-value='3'>3</Button>
        <Button variant='contained' color = 'primary' data-action='-'>-</Button>
        <Button variant='contained' color = 'primary' data-value='0'>0</Button>
        <Button variant='contained' color = 'primary' data-action='.'>.</Button>
        <Button variant='contained' color = 'primary' data-action='='>=</Button>
        <Button variant='contained' color = 'secondary' data-action='+'>+</Button>
      </div>
    </div>
    </ThemeProvider>
  );
}

export default App;
