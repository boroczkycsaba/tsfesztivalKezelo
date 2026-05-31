export function MessageLogger() {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            console.debug('');
            console.debug('Következő üzenet adatokat küldte:');
            console.debug(args);
            console.debug('');
            return originalMethod.apply(this, args);
        };
        return descriptor;
    };
}
