import Prime from "../math/Prime";
import Big from "big.js";
export default eventHandler(async (req) => {
    const query = getQuery(req);
    const div = Prime.findDivisor(new Big(query.x as string));
    return { x: query.x, diviser: div.toString(), prime: div.eq(1) };
})
