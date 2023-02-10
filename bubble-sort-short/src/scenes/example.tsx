import { Text } from '@motion-canvas/2d/lib/components';
import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {all, waitFor} from '@motion-canvas/core/lib/flow';
import { createSignal } from '@motion-canvas/core/lib/signals';
import { tween } from '@motion-canvas/core/lib/tweening';
import { Color } from '@motion-canvas/core/lib/types';
import { createRef } from '@motion-canvas/core/lib/utils';
import { Array } from '../components/ArrayComponent/Array';
import { Colors } from '../styles/styles'

export default makeScene2D(function* (view) {
  const ArrayRef = createRef<Array>();
  const ArrayVal = [6, 5, 3, 1, 8, 7, 2]

  const jRef = createRef<Text>();
  const j1Ref = createRef<Text>();

  const iVal = createSignal(0);

  const textStyle = {
    paddingTop: 10,
    fontFamily: 'JetBrains Mono',
    fill: 'rgba(255, 255, 255, 0.6)',
  };

  view.add(
    <>
      <Text
        text={'BUBBLE SORT'}
        fontSize={100}
        fontWeight={700}
        {...textStyle}
        y={-700}
      />
      <Text
        text={() => "i = " + iVal().toString()}
        fontSize={50}
        {...textStyle}
        y={-575}
      />
      <Text
        ref={jRef}
        text={'<- j'}
        fontSize={50}
        {...textStyle}
        y={-413}
        x={150}
      />
      <Text
        ref={j1Ref}
        text={' <- j+1'}
        fontSize={50}
        {...textStyle}
        y={-413 + (128+28)}
        x={150}
      />
      <Array
        ref={ArrayRef}
        values={ArrayVal}
      />
    </>
  )

  for(let i = 0; i < ArrayVal.length; i++){
    yield iVal(i);
    for(let j = 0; j < ArrayVal.length-i-1; j++){
      yield* all(
        jRef().position.y(j *(128+28) - 413, .3),
        j1Ref().position.y(j *(128+28) - 413 + (128+28), .3),
      )
        yield*ArrayRef().HighLight(j, .3, new Color(Colors.blue));
        yield* ArrayRef().HighLight(j+1, .3, new Color(Colors.blue));
        if(ArrayVal[j] > ArrayVal[j+1]){
          yield* ArrayRef().Swap(j, j+1, true);
          let temp = ArrayVal[j];
          ArrayVal[j] = ArrayVal[j+1];
          ArrayVal[j+1] = temp;
        }
        yield* all(
          ArrayRef().deHighLight(j, .3),
          ArrayRef().deHighLight(j+1, .3),
        )
    }
    yield* ArrayRef().HighLight(ArrayVal.length-i-1, .5, new Color(Colors.green))
}

  yield* waitFor(5);
});
