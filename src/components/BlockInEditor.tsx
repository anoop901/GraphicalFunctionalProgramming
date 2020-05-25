import Block from "../block/Block";
import * as React from "react";
import NumberLiteralBlockInEditor from "./NumberLiteralBlockInEditor";
import FunctionBlockInEditor from "./FunctionBlockInEditor";

export default function BlockInEditor({
  block,
  onMouseDown,
  location,
}: {
  block: Block;
  onMouseDown?: (e: React.MouseEvent) => void;
  location: { x: number; y: number };
}): JSX.Element {
  return block.accept({
    visitFunctionBlock: (block) => (
      <FunctionBlockInEditor
        block={block}
        onMouseDown={onMouseDown}
        location={location}
      />
    ),
    visitNumberLiteralBlock: (block) => (
      <NumberLiteralBlockInEditor
        block={block}
        onMouseDown={onMouseDown}
        location={location}
      />
    ),
  });
}
