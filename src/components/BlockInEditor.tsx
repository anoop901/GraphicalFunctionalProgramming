import Block from "../block/Block";
import * as React from "react";
import NumberLiteralBlockInEditor, {
  getNumberLiteralBlockPartOffsets,
} from "./NumberLiteralBlockInEditor";
import FunctionBlockInEditor, {
  getFunctionBlockPartOffsets,
} from "./FunctionBlockInEditor";
import "./BlockInEditor.css";
import NumberInputBlockInEditor, {
  getNumberInputBlockPartOffsets,
} from "./NumberInputBlockInEditor";
import NumberOutputBlockInEditor, {
  getNumberOutputBlockPartOffsets,
} from "./NumberOutputBlockInEditor";

export default function BlockInEditor({
  block,
  setBlock,
  onMouseDown,
  location,
  inputValue,
  setInputValue,
  outputValue,
}: {
  block: Block;
  setBlock: (block: Block) => void;
  onMouseDown?: (e: React.MouseEvent) => void;
  location: { x: number; y: number };
  inputValue: number;
  setInputValue: (value: number) => void;
  outputValue: number | null;
}): JSX.Element {
  return (
    <g className="BlockInEditor">
      {block.accept({
        // eslint-disable-next-line react/display-name
        visitFunctionBlock: (block) => (
          <FunctionBlockInEditor
            block={block}
            onMouseDown={onMouseDown}
            location={location}
          />
        ),
        // eslint-disable-next-line react/display-name
        visitNumberLiteralBlock: (block) => (
          <NumberLiteralBlockInEditor
            block={block}
            setBlock={setBlock}
            onMouseDown={onMouseDown}
            location={location}
          />
        ),
        // eslint-disable-next-line react/display-name
        visitNumberInputBlock: () => (
          <NumberInputBlockInEditor
            value={inputValue}
            setValue={setInputValue}
            onMouseDown={onMouseDown}
            location={location}
          />
        ),
        // eslint-disable-next-line react/display-name
        visitNumberOutputBlock: () => (
          <NumberOutputBlockInEditor
            value={outputValue}
            onMouseDown={onMouseDown}
            location={location}
          />
        ),
      })}
    </g>
  );
}

export interface BlockPartOffsets {
  getInputOffset(inputIndex: number): { dx: number; dy: number };
  getOutputOffset(outputIndex: number): { dx: number; dy: number };
}

function getBlockPartOffsets(block: Block): BlockPartOffsets {
  return block.accept({
    visitFunctionBlock: getFunctionBlockPartOffsets,
    visitNumberLiteralBlock: getNumberLiteralBlockPartOffsets,
    visitNumberInputBlock: getNumberInputBlockPartOffsets,
    visitNumberOutputBlock: getNumberOutputBlockPartOffsets,
  });
}

export function getBlockInputLocation(
  block: Block,
  inputIndex: number,
  blockLocation: { x: number; y: number }
): { x: number; y: number } {
  const offset = getBlockPartOffsets(block).getInputOffset(inputIndex);
  return {
    x: blockLocation.x + offset.dx,
    y: blockLocation.y + offset.dy,
  };
}

export function getBlockOutputLocation(
  block: Block,
  outputIndex: number,
  blockLocation: { x: number; y: number }
): { x: number; y: number } {
  const offset = getBlockPartOffsets(block).getOutputOffset(outputIndex);
  return {
    x: blockLocation.x + offset.dx,
    y: blockLocation.y + offset.dy,
  };
}
