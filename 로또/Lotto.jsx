import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import Ball from './Ball';

// useCallback => 자식 컴포넌트로 props로 함수를 넘겨줄 때 꼭 사용해야 함. 
// => 안 쓴다면 부모가 자꾸 새로운 함수를 주는 줄 알고 매번 리랜더링을 함.

function getWinNumbers() {
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((a, b) => a - b);
    return [...winNumbers, bonusNumber];
}

const Lotto = () => {
    // getWinNumbers가 반복 호출되는 것을 막기 위함.
    // useRef: 일반 값을 기억, useMemo: 값을 기억/두번째 인자가 바뀔 때까지
    const lottoNumbers = useMemo(() => getWinNumbers(), []);
    const [ winNumbers, setWinNumbers ] = useState(lottoNumbers());
    const [ winBalls, setWinBalls ] = useState([]);
    const [ bonus, setBonus ] = useState(null);
    const [ redo, setRedo ] = useState(false);
    const timeOuts = useRef([]);

    useEffect(() => { // 두번째 인자가 바뀔 때 실행
        for (let i = 0; i < winNumbers.length - 1; i++) {
            timeOuts.current[i] = setTimeout(() => { // timeOuts 자체가 바뀌는 것이 아닌 요소가 추가되는 것이므로 useEffect실행X
                setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
            }, (i + 1) * 1000);
        }
        timeOuts.current[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 7000);
        return () => {
            timeOuts.current.forEach((v) => {
                clearTimeout(v);
            })
        }
    }, [timeOuts.current]); // 빈 배열이면 ComponentDidMount와 동일
    // 배열에 요소가 있으면 ComponentDidMount랑 componentDidUpdate 둘 다 수행

    // useCallback: 두번째 인자가 바뀌기 전까지 기억
    const onClickRedo = useCallback(() => { // 초기화
        setWinNumbers(getWinNumbers()); 
        setWinBalls([]);
        setBonus(null); 
        setRedo(false);
        timeOuts.current = [];
    }, [winNumbers]);

    return (
        <>
            <div>당첨 숫자</div>
            <div id="결과창">
                {winBalls.map((v) => <Ball key={v} number={v} />)}
            </div>
            <div>보너스</div>
            {bonus && <Ball number={bonus} />}
            {redo && <button onClick={onClickRedo}>한 번 더!</button>}
        </>
    )
};

export default Lotto;