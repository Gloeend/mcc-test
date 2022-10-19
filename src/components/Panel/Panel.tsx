import React from 'react';
import c from './style.module.css';


interface Props {
  action: Function;
  actions: any,
}

function fetchAction(e: Object, action: Function) {
  return action(Number((e as HTMLInputElement).getAttribute('data-key')))
}

const Panel: React.FC<Props> = ({ action, actions }) => {

  const filteredActions = Object.keys(actions).filter((v) => isNaN(Number(v)));

  return (
    <div className={c.panel}>
      {filteredActions.map((val, ind) => {
        return <button key={ind} data-key={ind} onClick={(e) => { return fetchAction(e.target, action) }}>{val}</button>
      })}
    </div>
  )
}

export default Panel;
