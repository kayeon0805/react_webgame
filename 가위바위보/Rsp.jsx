import React, { useState, useRef, useEffect } from 'react';

// ---------------------- 리액트 라이프사이클 ---------------------
// 클래스의 경우 => constructor => render => ref => componentDidMount
// => (setState, props 바뀔 때 -> shouldComponentUpdate -> render -> componentDidUpdate)
// 부모가 나를 없앴을 때 => componentWillUnmount => 소멸

const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px',
};

const scores = {
    가위: 1,
    바위: 0,
    보: -1,
};

const RSP = () => {
    
    const [ result, setResult ] = useState('');
    const [ imgCoord, setImgCoord ] = useState('0');
    const [ score, setScore ] = useState(0); 
    const interval = useRef;

    useEffect(() => { // componentDidMount, componentDidUpdate 역할 (1 대 1 대응은 아님)
        console.log('재실행');
        interval.current = setInterval(changeHand, 100);
        return () => { // componentWillUnmount 역할
            clearInterval(interval.current);
        }
    }, [imgCoord]); // 배열에 넣은 값들이 바뀔 때 useEffect가 실행됨.

    const changeHand = () => {
        if (imgCoord === rspCoords.바위) {
            setImgCoord(rspCoords.가위);
        } else if (imgCoord === rspCoords.가위) {
            setImgCoord(rspCoords.보);
        } else if (imgCoord === rspCoords.보) {
            setImgCoord(rspCoords.바위);
        }
    }

    const computerChoice = (imgCoord) => {
        // Object.entries: 객체가 가지고 있는 모든 프로퍼티를 키와 값 쌍으로 배열 형태로 반환
        // find: 조건에 맞는 값 중 첫번째 값을 리턴
        return Object.entries(rspCoords).find((v) => {                   
            return v[1] === imgCoord;
        })[0];
    }

    const onClickBtn = (choice) => () => {
        clearInterval(interval.current);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;

        if (diff === 0) {
            setResult('비겼습니다');
        } else if ([-1, 2].includes(diff)) {
            setResult('이겼습니다');
            setScore((prevScore) => prevScore + 1);
        } else {
            setResult('졌습니다');
            setScore((prevScore) => prevScore - 1);
        }
        setTimeout(() => {
            interval.current = setInterval(changeHand, 100);
        }, 1000);
    }
    
    return (
        <>
            <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
            <div>
                <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
                <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
                <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
        </>
    );
}
export default RSP;