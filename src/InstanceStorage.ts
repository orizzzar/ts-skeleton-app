
type StorageItem = {
    obj: Instance,
    priority: number,
    key: Symbol
}

class InstanceStorage {
    private stored: StorageItem[];

    
    public add(instance: Instance, priority: number) {
        let key = Symbol();

        this.stored.push(
            {
                obj: instance,
                priority: priority,
                key: key
            }
        );

        // Sort stored by priority (100,50,2,1) 
        this.stored.sort( (a,b)=>(b.priority-a.priority) );

        return key;
    }

    public remove(key: Symbol) {
        let array = [];
        for(let i = 0; i < this.stored.length; i++) {
            if (this.stored[i].key != key) {
                array.push(this.stored[i]);
            }
        }
        let success = array.length = this.stored.length;
        if (!success) {
            throw new Error("Somethins is wrong with InstanceStorage.p.remove(). " 
                + array.length + " " + this.stored.length);

        }
    }
}