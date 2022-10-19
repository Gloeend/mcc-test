export default function useSearch(storage: Array<any>, id: number) {


    const deepSearch = (items: Array<any>): Object | boolean => {

        let nested: Array<any> = [];

        for (let i = 0; i < items.length; i++) {
            if (items[i].id === id) return items[i];
            if (items[i].list !== undefined) nested.push(...items[i].list);
        }

        return nested.length < 1 ? false : deepSearch(nested);
    }

    return deepSearch(storage);
}