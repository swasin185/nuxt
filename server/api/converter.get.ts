import Converter from "../math/Converter"
export default eventHandler(async (req) => {
    const query = getQuery(req)
    return Converter.convert(
        query.numInput as string, 
        query.baseIn as number, 
        query.baseOut as number)
})
