import useInput from 'hooks/useInput';
import React from 'react';
import c from '../../form.module.css';

interface Props {
  fetchAction: Function,
  fetchCreate: Function
}

export const Create: React.FC<Props> = ({ fetchAction, fetchCreate }) => {

  const title = useInput('');


  function save(e: React.FormEvent) {
    e.preventDefault();
    if (title.value.length === 0) {
      alert('Нельзя создать пустой список');
      return false;
    }
    fetchCreate(title.value);
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

export default Create;