
export function CheckAllowDelete(adminUser:string) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            const hasDeletePermission: boolean = adminUser === 'admin';

            if (hasDeletePermission) {
                console.log(`Törlés történ a metóduson ${propertyKey} a(z) ${adminUser} felhasználóval`);
            } else {
                throw new Error(
                    `Sajnos csak a kivételes felhasználók törölhetnek a(z) metóduson ${propertyKey}`
                );
            }
            return originalMethod.apply(this, args);
        };
        return descriptor;
    };
}