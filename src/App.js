import React,{useState} from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const  App =()=> {
 const  pageSize = "100"
const [progress,setProgress] = useState(10)
    return (
      <div>
           <Router>
           <LoadingBar
           height={3}
        color='Green'
        progress={progress}
       
      />
        <Navbar/>
         <Switch>
          <Route exact path="/">  <News key="general" pagesize= { pageSize}  setProgress={setProgress} country={"in"} category={"general"}/></Route>
          <Route exact path="/business">  <News key="business" pagesize= { pageSize}  setProgress={setProgress} country={"in"} category={"business"}/></Route>
          <Route exact path="/entertainment">  <News key="entertainment" pagesize= { pageSize}  setProgress={setProgress} country={"in"} category={"entertainment"}/></Route>
          <Route exact path="/general">  <News key="general" pagesize= { pageSize}  setProgress={setProgress} country={"in"} category={"general"}/></Route>
          <Route exact path="/health">  <News key="health" pagesize= { pageSize}  setProgress={setProgress} country={"in"} category={"health"}/></Route>
          <Route exact path="/science">  <News key="science" pagesize= { pageSize}  setProgress={setProgress} country={"in"} category={"science"}/></Route>
          <Route exact path="/sports">  <News key="sports" pagesize= { pageSize}  setProgress={setProgress} country={"in"} category={"sports"}/></Route>
          <Route exact path="/technology">  <News key="technology" pagesize= { pageSize}  setProgress={setProgress} country={"in"} category={"technology"}/></Route>

          </Switch>
          </Router>

      </div>
    );
   
}

export default App;