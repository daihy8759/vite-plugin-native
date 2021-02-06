const { stringify } = JSON;

export default () => {
    return {
        name: 'native-plugin',
        async transform(src: any, id: string) {
            if (id.endsWith('.node')) {
                const dir = __dirname;
                return `
                    const m = { exports: {} };
                    process.dlopen(
                        m,
                        join(${dir}, id)
                    )
                    export default m.exports;
                `;
            }
        },
    };
};
