import Division from '../math/LongDivision'
export default eventHandler(async (req) => {
    const query = getQuery(req)
    if (!query.x || !query.y) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing parameter "x" / "y"',
        })
    }
    const divisor: number = Math.round(query.y as number)
    const dividend: number = Math.round(query.x as number)
    if (divisor == 0 || divisor != (query.y as number) || dividend != (query.x as number)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Input Number Error',
        })
    }
    const result = new Division(dividend, divisor)
    return result
})
