import React, { useState, useRef }  from 'react';

const ResponseCheck = () => {
    const [ state, useState ] = useState('waiting');
    const [ message, setMessage ] = useState('클릭해서 시작하세요');
    const [ result, setResult ] = useState([]);
    const timeout = useRef(null);
    const startTime = useRef();
    const endTime = useRef();
    // useRef의 값을 바꿀 때는 return 부분이 재실행되지 않음(불필요한 렌더링 감소)

    const onClickScreen = () => {
        if (state === 'waiting') {
            setState('ready');
            setMessage('초록색이 되면 클릭하세요.');
            timeout.current = setTimeout(() => {
                setState('now');
                setMessage('지금 클릭');
                startTime.current = new Date()
            }, Math.floor(Math.random() * 1000) + 2000); // 2~3초 랜덤
        } else if (state === 'ready') { // 성급하게 클릭
            clearTimeout(timeout.current);
            setState('witing');
            setMessage('너무 성급하시군요. 초록색이 되면 클릭하세요');
        } else if (state === 'now') { // 반응속도 체크
            endTime.current = new Date();
            setState('waiting');
            setMessage('클릭해서 시작하세요.');
            setResult((prevResult) => {
                [...prevResult, endTime.current - startTime.current]
            })
        }
    }

    const reset = () => setResult([]);

    const renderAvearge = () => {
        // jsx에서 false, undefined, null => 태그 없음
        return result.length === 0 
        ? null 
        : <>
            <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
             {/* 또는 { result.length !== 0 && <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div> */}
             <button onClick={reset}>리셋</button>
        </>
    }

    return (
        <>
            <div
                id='screen'
                className={state}
                onClick={onClickScreen}
            >
                {message}
            </div>
            {renderAvearge()}
        </>
    )
}

export default ResponseCheck;