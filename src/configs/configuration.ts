
export const configurations = () => ({
    port: parseInt(process.env.PORT || '3000', 10),
    database: {
        type: 'sqlite',
        name: process.env.DB_NAME || 'db.sqlite',
        synchronize: true,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'secret',
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    }
})