const React = require('react');
const { useState, useRef } = React;

const WordRelay = () => {
    const [ word, setWord ] = React.useState('김가연');
    const [ value, setValue ] = React.useState('');
    const [ result, setResult ] = React.useState('');
    const inputRef = React.useRef(null);

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (word[word.length - 1] === value[0]) {
            setWord(value);
            setValue('');
            setResult('딩동댕!');
        } else {
            setValue:('');
            setResult('땡!');
        }
        inputRef.current.focus();
    }

    const onChangeInput = (e) => {
        setValue(e.target.value);
    }

    return (
        <>
            <div>{word}</div>
            <form onSubmit={onSubmitForm}>
                <input type="text" ref={inputRef} onChange={onChangeInput} value={value} />
            </form>
            <div>{result}</div>
        </>
    )
}

module.exports = WordRelay;