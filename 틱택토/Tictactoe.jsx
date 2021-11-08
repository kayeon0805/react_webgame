import React, { useEffect, useState, useReducer, useCallback } from "react";
import Table from "./Table";

const initialState = {
    winner: '',
    turn: 'O',
    tableData: [
        ['', '', ''], 
        ['', '', ''], 
        ['', '', '']
    ],
    recentCell : [-1, -1],
    noWinner: false,
};

export const CLICK_CELL = 'CLICK_CELL';
export const SET_WINNER = 'SET_WINNER';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';
export const NO_WINNER = 'NO_WINNER';

const reducer = (state, action) => {
    switch(action.type) {
        case SET_WINNER:
            return {
                // state.winner = action.winner; => X
                ...state,
                winner: action.winner,
            }
        case CLICK_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...tableData[action.row]];
            tableData[action.row][action.cell] = state.turn; // immer 라는 라이브러리로 가독성 해결
            return {
                ...state,
                tableData, // => tableData: tableData
                recentCell: [action.row, action.cell],
            }
        }
        case CHANGE_TURN: {
            return {
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O',
            }
        }
        case RESET_GAME: {
            return {
                ...state,
                turn: 'O',
                tableData: [
                    ['', '', ''], 
                    ['', '', ''], 
                    ['', '', '']
                ],
                recentCell : [-1, -1],            
            }; 
        };
        case NO_WINNER: 
            return {
                ...state,
                noWinner: true
            };
    };
};

const Tictactoe = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, turn, winner, recentCell, noWinner } = state;

    const onClickTable = useCallback(() => {
        dispatch({ type: SET_WINNER, winner: 'O' });
    }, []);

    useEffect(() => { // 비동기 state에 따라 처리해야 하는 부분은 useEffect를 사용
        let win = false;
        const [ row, cell ] = recentCell;
        if (row < 0) { return; }
        // 최근에 클릭한 cell 기준으로 가로줄, 세로줄, 대각선을 검사함
        if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
            win = true;
        }
        if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
            win = true;
        }
        if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
            win = true;
        }
        if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
            win = true;
        }
        if (win) { // 승리했을 시
            dispatch({ type: SET_WINNER, winner: turn });
            dispatch({ type: RESET_GAME});
        } else { 
            let all = true; // all이 true면 무승부
            tableData.forEach(row => { // 무승부 검사
                row.forEach(cell => {
                    if (!cell) {
                        all = false;
                    }
                });
            });
            if (all) { // 무승부일 시
                dispatch({ type: NO_WINNER });
                dispatch({ type: RESET_GAME});
            } else {
                dispatch({ type: CHANGE_TURN });
            }
        }
    }, [recentCell]);

    return (
        <>
            <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
            {winner && <div>{winner}님의 승리!</div>}
            {noWinner && <div>무승부!</div>}
        </>
    )
};

export default Tictactoe;