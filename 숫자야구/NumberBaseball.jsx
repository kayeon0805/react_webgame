import React, {useRef, useState, useCallback} from 'react';
import Try from "./Try";

function getNumbers() { // 숫자 네 개를 겹치지 않게 랜덤하게 뽑음. 
    const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = [];
    for (let i = 0; i < 4; i++) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        array.push(chosen);
    } 
    return array;
}

const NumberBaseball = () => {

    const [ result, setResult ] = useState('');
    const [ value, setValue ] = useState('');
    const [ answer, setAnswer ] = useState(getNumbers());
    const [ tries, setTries ] = useState([]);

    const onSubmitForm = (e) => {
        e.preventDefault();

         if (new Set(value).size !== 4) {
            return alert('중복되지 않는 숫자 4자리를 입력해주세요.');
        } else if (tries.length > 0) {
            let include = false;
            tries.map((v, i) => {
                if (tries[i].try == value) {
                    include = true;
                }           
            });
            if (include) {
                return alert('입력하지 않은 숫자로 입력하세요.');
            }
        }
        if (value === answer.join('')) {
            setResult('홈런!');
            setTries((prevTries) => {
                return [...prevTries, { try: value, result: '홈런!' }]
            });
            setTimeout(() => {
                alert('게임을 다시 시작합니다!');
                setResult('');
                setValue('');
                setAnswer(getNumbers());
                setTries([]);
            }, 500);
        } else {
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (tries.length >= 9) {
                setResult(`실패! 답은 ${answer.join(',')}였습니다!`);
                setTimeout(() => {
                    alert('게임을 다시 시작합니다!');
                    setValue('');
                    setAnswer(getNumbers());
                    setTries([]);
                }, 500);
            } else {
                for (let i = 0; i < 4; i++) {
                    if (answerArray[i] === answer[i]) {
                        strike++;
                    } else if (answer.includes(answerArray[i])) {
                        ball++;
                    }
                }
                setTries((prevTries) => {
                    return [...prevTries, { try: value, result: `${strike}스트라이크 ${ball}볼입니다.` }]
                });
                setValue('');
            }
        }
    };

    const onChangeInput = (e) => {
        setValue(e.target.value )
    };

    
    return (
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                <input maxLength={4} value={value} onChange={onChangeInput}/>
                <button>입력</button>
            </form>
            <div>시도: {tries.length}</div>
            <ul>
                {tries.map((v, i) => {
                    return (
                        //                               props
                        <Try key={ `${i + 1}차 시도: ` } tryInfo={v} /> 
                    );
                })}
            </ul>
        </>
    );
    
    
}

export default NumberBaseball;