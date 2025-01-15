import { useState } from 'react';
import SquareProps from "@/types/SquareProps";

export default function Square(props: SquareProps) {
    return <button className="square" onClick={props.onSquareClick}>{props.squareText}</button>;
}

