export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const [rows] = await useDb().query(
        'SELECT * FROM TBL_User WHERE Username = ?',
        [String(body?.Username ?? '')]
    )
    return rows
})
