import { useState } from 'react';

export default function Square({value, onSquareClick}){

    return(
        <>
            <button className={value === "X" ? 'x' : 'o'}
                    onClick={onSquareClick} >
                {value}
            </button>
        </>
        
    )
}