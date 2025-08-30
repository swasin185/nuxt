import Division from "../math/LongDivision"
export default eventHandler(async (req) => {
    const query = getQuery(req)
    const result = new Division(query.x as number, query.y as number)
    return result
})