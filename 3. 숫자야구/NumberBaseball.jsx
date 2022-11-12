import React, { Component } from 'react';
import Try from './Try';

function getNumber() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

class NumberBaseball extends Component {
  string = Math.random() * 9;
  state = {
    value: '',
    result: '',
    answer: getNumber(),
    tries: [],
  };
  input;
  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.value === this.state.answer.join('')) {
      this.setState({
        result: '홈런~!',
        value: '',
        answer: getNumber(),
        tries: [...this.state.tries, { try: this.state.value, result: '홈런~!' }],
      });
    } else {
      const inputArray = this.state.value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (this.state.tries.length >= 9) {
        this.setState({
          result: `10번 틀려서 실패! 답은${this.state.answer.join(',')}였습니다.`,
        });
        alert('게임을 다시 시작합니다.');
        this.setState({
          value: '',
          answer: getNumber(),
          tries: [],
        });
      } else {
        for (let i = 0; i < 4; i += 1) {
          if (inputArray[i] === this.state.answer[i]) {
            strike += 1;
          } else if (this.state.answer.includes(inputArray[i])) {
            ball += 1;
          }
        }
        this.setState({
          tries: [...this.state.tries, { try: this.state.value, result: `${strike} 스트라이크, ${ball}볼 입니다.` }],
          value: '',
        });
      }
    }
    this.setState({
      result: this.state.value,
      value: '',
    });
    this.input.focus();
  };

  onChangeInput = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  inputRef = (c) => {
    this.input = c;
  };

  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form action="" onSubmit={this.onSubmit}>
          <input maxLength={4} ref={this.inputRef} value={this.state.value} onChange={this.onChangeInput} />
          <button>입력</button>
        </form>
        <div>시도:{this.state.tries.length}</div>
        <ul>
          {this.state.tries.map((v) => {
            return <Try value={v} />;
          })}
        </ul>
      </>
    );
  }
}

export default NumberBaseball;
