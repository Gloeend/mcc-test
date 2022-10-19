import React, { ReactNode, useState, useEffect } from 'react';
import c from './style.module.css';

interface Item {
    id: number,
    title: string,
    list?: Array<Item>,
}

interface Props {
    items: Array<Item>,
    fetchActive: Function,
}


export const List: React.FC<Props> = ({ items, fetchActive }) => {

    const [active, setActive] = useState(-1);

    function switchActive(e: Object) {
        setActive(Number((e as HTMLInputElement).getAttribute('data-key')));
    }

    useEffect(() => {
        return fetchActive(active)
    }, [active])


    function listRender(items: Item) {
        return (
            <ul>
                {items.list?.map((item) => {
                    return itemRender(item);
                })}
            </ul>
        );
    }

    function itemRender(item: Item) {
        return (
            <li className={c.list__item} key={item.id}>
                <p
                    className={(active === item.id ? c.item + ' ' + c.active : c.item)}
                    onClick={(e) => { return switchActive(e.target) }}
                    key={item.id}
                    data-key={item.id}
                >{item.title}</p>

                {item.list !== undefined && listRender(item)}
            </li>
        );
    }


    return (
        <ul>
            {items.map((item) => {
                return itemRender(item);
            })}
        </ul>
    )
}

export default List;