import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, reset, incrementByAmount } from "./counterSlice";
import { AppState } from "../../store/store";
import { useState } from "react";

export function Counter() {
  const count = useSelector((state: AppState) => state.counter.count);
  const dispatch = useDispatch(); // we pass the actions inside the dispatch
  const [amountToIncrement, setAmountToIncrement] = useState<
    number | undefined
  >(undefined);

  return (
    <div>
      <p>{count}</p>

      <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
      </div>

      <input
        type="text"
        value={amountToIncrement}
        onChange={(e) => setAmountToIncrement(Number(e.target.value))}
      />

      <div>
        <button onClick={() => dispatch(reset())}>reset</button>
        <button onClick={() => dispatch(incrementByAmount(amountToIncrement))}>
          increment by amount
        </button>
      </div>
    </div>
  );
}
