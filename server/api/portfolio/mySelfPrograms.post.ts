export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const params: any[] = []
    let where = ''
    if (body?.PinCode) {
        where = 'AND tu.PinCode = ?'
        params.push(String(body.PinCode))
    }

    const [rows] = await useDb().query(`
        SELECT ROW_NUMBER() OVER(ORDER BY tp.ID_Auto ASC) AS row_num,
            tp.ID_Auto, tup.ID_AutoUser, tu.ID_Auto AS ID_AutoUser,
            tp.Program_Name, tp.Program_Description, tp.Program_Image,
            tp.Type AS type
        FROM TBL_User_Programs tup
        INNER JOIN TBL_User tu ON tu.ID_Auto = tup.ID_AutoUser
        LEFT JOIN TBL_Programs tp ON tup.ID_AutoProgram = tp.ID_Auto
        WHERE 1=1 ${where}
    `, params)
    return rows
})
