type TCallbackItem = {
    callback: Function,
    bound?: object
}

export class EventHandler<TCallback extends Function = (...args: any[]) => void> {
    public static Instantiate(): PropertyDecorator {
        return ( target: Object, key: string | symbol ) => {
            const additionalKey = `__${ String( key ) }__`;
        
            const getter = function (this: any) {
                this[additionalKey] = this[additionalKey] || new EventHandler();
        
                return this[additionalKey];
            };
        
            const setter = ( _: any ) => {
                new SyntaxError("You can't reassign this parameter!");
                return;
            };
        
            return Object.defineProperty(target, key, {
                get: getter,
                set: setter,
                enumerable: false,
                configurable: false,
            });
        };
    }

    public callbackStore: TCallbackItem[] = [];

    public Invoke( ...params: ArgumentTypes<TCallback> ): void {
        let toFixIDs: number[] = [];
        this.callbackStore.forEach(( {callback, bound}, index ) => {
            if ( typeof callback !== 'function' ) {
                toFixIDs.push(index);
                return;  
            }

            callback.call(bound ?? undefined, ...params);
        });

        if ( toFixIDs.length > 0 ) toFixIDs.forEach(id => this.TryToFixStore(id));
    }

    public Subscribe( callback: TCallback, bound?: object ): void {
        this.callbackStore.push({
            callback,
            bound
        });
    }

    public Unsubscribe( callback: Function, bound?: object ): void {
        this.DeleteCallback(callback, bound);
    }

    public ClearSubscribes(): void {
        this.callbackStore = [];
    }

    private TryToFixStore( id: number ): void {
        delete this.callbackStore[id];

        new ReferenceError(
            "Attention! EventHandler tries to call a function that no longer exists! Please check the EventHandler unsubscribes",
        );
    }

    private DeleteCallback( _callback: Function, _bound?: object ): void {
        let ind = this.callbackStore.findIndex((data, index) => {
            if (!data) return false;
            if (_bound && !data.bound) return false;
            if (!_bound && data.bound) return false;
            if (data.callback !== _callback) return false;
            if (_bound && data.bound !== _bound) return false;

            return true;
        });

        if (ind) delete this.callbackStore[ind];
    }
}
