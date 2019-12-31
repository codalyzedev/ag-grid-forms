import React from 'react';
import Header from './Header'
class Card extends React.Component {
  constructor(){
    super()
    this.state={greet:""}
  }
  componentDidMount(){
    //this.state.greet="good night"
  
    setTimeout(()=>{this.setState({greet:"good night"},function(){
      console.log(this.state)
    })},2000)
 //   console.log(this.state)
  }

  render() {
    var abc="Loading";
    if(this.state.greet){
       abc=<Header  hi="hi" data={this.state}/>
    }
    return (
      <div>
        <h1>{this.state.greet}</h1>
       
       {abc }
  
      </div>
    );
  }
}

export default Card;