const React = require('react');

('use strict');
class GuGuDan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first: Math.ceil(Math.random() * 9),
      second: Math.ceil(Math.random() * 9),
      value: '',
      result: '',
    };
  }
  printOK = () => `${this.state.first} * ${this.state.second} = ${this.state.first * this.state.second}`;
  onSubmit = (e) => {
    e.preventDefault();
    if (parseInt(this.state.value) === this.state.first * this.state.second) {
      this.setState({
        result: this.printOK() + ' 딩동댕',
        first: Math.ceil(Math.random() * 9),
        second: Math.ceil(Math.random() * 9),
        value: '',
      });
    } else {
      this.setState({ result: '떙', value: '' });
    }
  };

  onChange = (e) => this.setState({ value: e.target.value });

  render() {
    return (
      <React.Fragment>
        {this.state.first} 곱하기 {this.state.second} = ?
        <form onSubmit={this.onSubmit}>
          <input type="number" value={this.state.value} onChange={this.onChange} />
          <button>입력!</button>
        </form>
        <div>{this.state.result}</div>
      </React.Fragment>
    );
  }
}

module.exports = GuGuDan;
