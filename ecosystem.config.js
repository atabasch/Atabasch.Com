module.exports = {
    apps: [
        {
            name: 'AtabaschNuxt3',
            port: '3000',
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs'
        }
    ]
}
