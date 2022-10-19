import useInput from 'hooks/useInput';
import React from 'react';
import c from '../../form.module.css';

interface Props {
    storage: Array<any>,
    setStorage: Function,
    fetchAction: Function,
    id: number,
}

const fetchAppend = (storage: any, id: number, item: any) => {
    let res = storage;
    for (let i = 0; i < storage.length; i++) {
        if (storage[i].id === id) {
            console.log("n1");
            if (storage[i].list) {
                res[i].list.push(item);
            } else {
                res[i].list = [item];
            }
            return res;
        }
        if (storage[i].list !== undefined) {
            for (let j = 0; j < storage[i].list.length; j++) {
                if (storage[i].list[j].id === id) {
                    console.log("n2");
                    if (storage[i].list[j].list) {
                        res[i].list[j].list.push(item);
                    } else {
                        res[i].list[j].list = [item];
                    }
                    return res;
                }
            }
        }
    }
    return false;
}

export const Append: React.FC<Props> = ({ storage, setStorage, id, fetchAction }) => {

    const title = useInput('');


    function save(e: React.FormEvent) {
        e.preventDefault();
        if (title.value.length === 0) {
            alert('Нельзя создать пустой список');
            return false;
        }
        const item = { id: Math.floor(Math.random() * 100000), title: title.value }
        fetchAppend(storage, id, item);
        close();
    }

    function close() {
        return fetchAction(-1);
    }


    return (
        <form className={c.form}>
            <button className={c.close} onClick={close}>X</button>
            <input {...title} type="text" name="title" placeholder="Введите название" />
            <button className={c.save} type='submit' onClick={(e) => { return save(e) }}>Сохранить</button>
        </form >
    )
}

export default Append;