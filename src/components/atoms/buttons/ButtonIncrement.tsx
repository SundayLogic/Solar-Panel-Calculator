
import React, { useState, useRef } from 'react';
import { useButton } from '@react-aria/button';
import { AriaButtonProps } from '@react-types/button';
import { PressEvent } from '@react-types/shared';

type ButtonProps = AriaButtonProps & {
  children: React.ReactNode;
};

function ButtonIncrement(props: ButtonProps) {
  // Initialize the counter state
  const [counter, setCounter] = useState(0);
  
  // Initialize ref
  const ref = useRef<HTMLButtonElement>(null);

  // Modify the onPress function to also increment the counter
  const {buttonProps} = useButton({
    ...props,
    onPress: (e: PressEvent) => {
      // Call the original onPress function if it exists
      props.onPress?.(e);
      
      // Increment the counter
      setCounter(prevCounter => prevCounter + 1);
    },
  }, ref);

  return (
    <div>
      <button type="button" ref={ref} {...buttonProps}>
        {props.children}
      </button>
      <p>Button pressed {counter} times</p>
    </div>
  );
}

export default ButtonIncrement;