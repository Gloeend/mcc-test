import React, { useEffect, useState } from 'react';
import c from './style.module.css';
import Panel from '@components/Panel/Panel';
import List from '@components/List/List';
import Create from '@components/Create/Create';
import Rename from '@components/Rename/Rename';
import Delete from '../../other/delete';
import Append from '@components/Append/Append';

enum Actions {
  Create,
  Rename,
  Append,
  Delete,
  Reset,
}

const items = [
  {
    id: 0,
    title: "text-1",
    list: [
      {
        id: 10,
        title: "text-1-1",
        list: [
          {
            id: 20,
            title: "text-1-1-1",
          },
          {
            id: 21,
            title: "text-1-1-2",
          }
        ],
      }
    ],
  },
  {
    id: 1,
    title: "text-2",
    list: [
      {
        id: 40,
        title: "text-2-1-1",
      },
    ],
  },
  {
    id: 2,
    title: "text-3"
  },
]

export const Screen = () => {

  const [action, setAction] = useState(-1);
  const [active, setActive] = useState(-1);
  const [storage, setStorage] = useState(JSON.parse(JSON.stringify(items)));

  function switchAction(actionEnum: number) {
    return setAction(actionEnum);
  }

  function switchActive(active: number) {
    return setActive(active);
  }

  function fetchCreate(el: string) {
    return setStorage([...storage, { id: Math.floor(Math.random() * 100000), title: el }]);
  }

  const Reset = () => {
    useEffect(() => {
      setStorage(JSON.parse(JSON.stringify(items)));
      setAction(-1);
    }, [])
    return <></>
  }

  const route = () => {
    switch (action) {
      case Actions.Create: return <Create fetchAction={switchAction} fetchCreate={fetchCreate} />;
      case Actions.Rename: return <Rename fetchAction={switchAction} storage={storage} id={active} />;
      case Actions.Append: return <Append fetchAction={switchAction} storage={storage} id={active} setStorage={setStorage} />;
      case Actions.Delete: return Delete({ storage, setStorage, active, switchAction });
      case Actions.Reset: return <Reset />;
    }
  }


  return (
    <div className={c.screen}>
      {route()}
      <List items={storage} fetchActive={switchActive} />
      <Panel action={switchAction} actions={Actions} />
    </div>
  )
}

export default Screen;
