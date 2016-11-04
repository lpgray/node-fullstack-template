import React from 'react';
import ReactDOM from 'react-dom';
import ProductList from './ProductList.jsx';

require('./app.less');

class Page extends React.Component {
  render() {
    return (
      <div>
        <div className="logo" />
        <div>This is an React Component</div>
        <ProductList />
      </div>
    );
  }
}

ReactDOM.render(<Page />, document.getElementById('root'));