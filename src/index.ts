import { join } from 'path';

export default () => {
    return {
        name: 'native-plugin',
        async transform(src: any, id: string) {
            if (id.endsWith('.node')) {
                const dir = join(process.cwd(), id);
                return `
                    const m = { exports: {} };
                    process.dlopen(
                        m,
                        '${dir}'
                    )
                    export default m.exports;
                `;
            }
        },
    };
};
