import React, { useState, useRef, useCallback } from 'react';
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

const NumberBaseball = () => {
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const [answer, setAnswer] = useState(getNumber);
  const [tries, setTries] = useState([]);
  const inputRef = useRef(null);

  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    if (value === answer.join('')) {
      setResult('홈런~!');
      setValue('');
      setAnswer(getNumber());
      setTries((prevTries) => {
        return [...prevTries, { try: value, result: '홈런~!' }];
      });
      setTries([]);
    } else {
      const inputArray = value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        setResult(`10번 틀려서 실패! 답은${answer.join(',')}였습니다.`);
        alert('게임을 다시 시작합니다.');
        setValue('');
        setAnswer(getNumber());
        setTries([]);
      } else {
        for (let i = 0; i < 4; i += 1) {
          if (inputArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(inputArray[i])) {
            ball += 1;
          }
        }
        setTries((prevTries) => {
          return [...prevTries, { try: value, result: `${strike} 스트라이크, ${ball}볼 입니다.` }];
        });
        // setResult(`${strike} 스트라이크, ${ball}볼 입니다.`);
        setValue('');
      }
    }
    setValue('');
    inputRef.current.focus();
  });

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <h1>{result}</h1>
      <form action="" onSubmit={onSubmitForm}>
        <input maxLength={4} ref={inputRef} value={value} onChange={onChangeInput} />
        <button>입력</button>
      </form>
      <div>시도:{tries.length}</div>
      <ul>
        {tries.map((v, i) => {
          return <Try key={i + '차 시도입니다.'} value={v} index={i} />;
        })}
      </ul>
    </>
  );
};

export default NumberBaseball;
