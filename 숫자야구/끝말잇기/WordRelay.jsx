const React = require('react');
const { Component } = React;

class WordRelay extends Component {
    state = {
        word: '김가연',
        value: '',
        result: '',
    };

    onSubmitForm = (e) => {
        e.preventDefault();
        if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
            this.setState({
                word: this.state.value,
                value: '',
                result: '딩동댕!',
            });
        } else {
            this.setState({
                value: '',
                result: '땡!',
            });
        }
        this.input.focus();
    }

    inputRef = (e) => {
        this.setState({ value: e.target.value });
    }

    onChangeInput = (c) => {
        this.input = c;
    }

    render() {
        return (
            <>
                <div>{this.state.word}</div>
                <form onSubmit={this.onSubmitForm}>
                    <input type="text" ref={this.inputRef} onChange={this.onChangeInput} value={this.state.value} />
                </form>
                <div>{this.state.result}</div>
            </>
        )
    }
}
module.exports = WordRelay;
