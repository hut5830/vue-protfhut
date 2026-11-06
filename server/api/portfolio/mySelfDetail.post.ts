export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const params: any[] = [Number(body?.ID_Auto) || 0]
    let where = ''
    if (body?.PinCode) {
        where = 'AND tu.PinCode = ?'
        params.push(String(body.PinCode))
    }

    const [rows] = await useDb().query(`
        SELECT ROW_NUMBER() OVER(ORDER BY tud.ID_Auto ASC) AS row_num,
            tu.ID_Auto, tp.ID_Auto, tp.Program_Name,
            tud.User_Detail, tud.User_Description,
            tu.Firstname, tu.Lastname, tu.Nickname
        FROM TBL_User_Detail tud
        INNER JOIN TBL_User tu ON tud.ID_AutoUser = tu.ID_Auto
        LEFT JOIN TBL_Programs tp ON tud.ID_AutoProgram = tp.ID_Auto
        WHERE tp.ID_Auto = ? ${where}
    `, params)
    return rows
})
