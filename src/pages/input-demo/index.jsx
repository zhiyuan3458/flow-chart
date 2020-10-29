import { useState } from 'react';

export default function InputDemo (props) {

  const [value, setValue] = useState('56456');

  const onChange = e => {
    setValue(e.target.value);
  };

  const clickFn = () => {
    console.log(value);
    const a = 1234567890123456789n * 123n;
    console.log(a + '');
    setValue(a);
  };

  return (
    <div>
      <input type="text" value={ value } onChange={ e => onChange(e) } />
      <button onClick={ clickFn }>64</button>
      <div>{ value + '' }</div>
    </div>
  );
}
