import React from 'react';

interface Props {
    storage: any,
    active: number,
    switchAction: Function,
    setStorage: Function,
}

const fetchDelete = (storage: any, active: number) => {
    let res = storage;
    for (let i = 0; i < storage.length; i++) {
        if (storage[i].id === active) {
            res.splice(i, 1);
            return res;
        }
        if (storage[i].list !== undefined) {
            for (let j = 0; j < storage[i].list.length; j++) {
                if (storage[i].list[j].id === active) {
                    storage[i].list.splice(j, 1);
                    if (storage[i].list && storage[i].list.length === 0) delete res[i].list;
                    return res;
                }
                if (storage[i].list[j].list !== undefined) {
                    for (let k = 0; k < storage[i].list[j].list.length; k++) {
                        if (storage[i].list[j].list[k].id === active) {
                            storage[i].list[j].list.splice(k, 1);
                            if (storage[i].list[j].list && storage[i].list[j].list.length === 0) delete res[i].list[j].list
                            return res;
                        }
                    }
                }
            }
        }
    }
    return false;
}

export const Delete: React.FC<Props> = ({ storage, setStorage, active, switchAction }) => {
    fetchDelete(storage, active);
    return switchAction(-1);
}

export default Delete;
