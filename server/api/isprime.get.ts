import Prime from "../math/Prime"
export default eventHandler(async (req) => {
    const query = getQuery(req)
    const div = Prime.findDivisor(query.x as number)
    return { x: query.x, diviser: div.toString(), prime: div == 1 }
})
