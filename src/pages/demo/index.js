import { useCallback } from 'react';

function Demo () {
  const onClick = useCallback(() => {
    console.log(435636);
  }, []);
  return (
    <button onClick={ onClick() }>dianji</button>
  );
}

export default Demo;
