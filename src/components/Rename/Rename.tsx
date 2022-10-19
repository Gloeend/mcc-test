import React from 'react';
import useInput from 'hooks/useInput';
import c from '../../form.module.css';

interface Props {
    storage: any,
    id: number,
    fetchAction: Function,
}

// Эта функция ужасна из-за n3, я понимаю, но ничего лучше не придумал
const fetchRename = ( storage: any, id: number, title: string) => {
    for (let i = 0; i < storage.length; i++) {
        if (storage[i].id === id) {
            storage[i].title = title;
            return storage;
        }
        if (storage[i].list !== undefined) {
            for (let j = 0; j < storage[i].list.length; j++) {
                if (storage[i].list[j].id === id) {
                    storage[i].list[j].title = title;
                    return storage;
                }
                if (storage[i].list[j].list !== undefined) {
                    for (let k = 0; k < storage[i].list[j].list.length; k++) {
                        if (storage[i].list[j].list[k].id === id) {
                            storage[i].list[j].list[k].title = title;
                            return storage;
                        }
                    }
                }
            }
        }
    }
    return false;
}

export const Rename: React.FC<Props> = ({ storage, id, fetchAction }) => {

    const title = useInput('');


    function save(e: React.FormEvent) {
      e.preventDefault();
      if (title.value.length === 0) {
        alert('Нельзя создать пустой список');
        return false;
      }
      fetchRename(storage, id, title.value);
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

export default Rename;