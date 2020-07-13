import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import './App.css';
import {Button, Toast} from 'react-bootstrap';

export default function App () {
  const [data, setData] = useState(0);
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
//  const [password, setPassword] = useState("");

  useEffect(() => {
    axios.get('/api')
      .then(res => {
        console.log(res)
        setData(0);
        console.log(data)
    }).catch((err) => {console.log(err)})
  }, []);

  function sendRequest () {
    axios.post('/api/post', {
      'username': text
    }).then(res => {
      setResult(res.data) 
    })

  } 

  function submitForm () {
    if (!validateEmail(email)) return;
    axios.post('/api/post', {
      'username': email
    }).then(res => {
      setResult(res.data) 
    })
  }

  function copied () {
    navigator.clipboard.writeText(result)
    setShow(true)
  }

  function validateEmail(email: string){
      var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/
      return re.test(email);
    }

  return (
    <div>
      <div className="container">
        <div className="row">
        <div className="col-sm"/>
        <div className="col-sm">
          <h1>Sluggifier</h1>
          <Toast onClose={() => setShow(false)} show={show} delay={2000} autohide={true}>
            <Toast.Header>
              <strong className="mr-auto">Success!</strong>
            </Toast.Header>
            <Toast.Body>Copied {result} to clipboard</Toast.Body>
          </Toast>
          <p/>
        </div>
        <div className="col-sm"/>
        </div>
      </div>
      <div className="container">
      <div className="row">
          <div className="col-sm"/>
          <div className="col-sm">
            <div className="input-group mb-3">
              <input type="text" className="form-control" onChange={e => setText(e.target.value)}/>
            </div>
            <div className="input-group mb-3">
              <input type="text" className="form-control" value={result} readOnly={true}/>
            </div>
            <Button onClick={sendRequest}>Slugify</Button>{' '}
            <Button variant="danger" onClick={() => setResult('')}>Reset</Button>{' '}
            <Button variant="warning" onClick={copied}>Copy</Button>
          </div>
          <div className="col-sm"/>
            <input type="text" className="form-control" onChange={(e) => setEmail(e.target.value)}/>
            <Button variant="primary" onClick={submitForm}>Submit</Button>
        </div>
      </div>
    </div>
  );
}