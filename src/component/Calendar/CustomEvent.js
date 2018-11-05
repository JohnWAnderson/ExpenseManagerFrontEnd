
import React from 'react';

class CustomEvent extends React.Component {
    constructor(props){
        super(props);  
    }
    render() {
      return (
        <div>
            <div>{this.props.title}</div>
        </div>
      );
    }
}

export default CustomEvent;