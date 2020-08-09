module.exports = async function(db, {proffyValue, classValue, classScheduleValues}){
    //inserir dados na table teachers
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `);

    const proffy_id = insertedProffy.lastID;

    //inserir dados na tabela classes

    const insertedClass = await db.run(`
        INSERT INTO classes (
            subject,
            cost,
            proffy_id
        ) VALUES (
            "${classValue.subject}",
            "${classValue.cost}",
            "${proffy_id}"
        );
    `);

    const class_id = insertedClass.lastID;

    //inserir dados na tabela class_schedule
    const insertedAllClassScheduleValues = classScheduleValues.map((classScheduleValue) => {
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
            )
        `);
    });

    //aqui vou executar todos os db.runs() das class_schedules
    //await Promise.all(insertedAllClassScheduleValues);

    //Consultar os dados inseridos

    //todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys");
    //console.log(selectedProffys);

    //consultar as classes de um determinado professor
    //e trazer junto os dados do professor
    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `);
    //console.log(selectClassesAndProffys);
    
    // o horário que a pessoa trabalha, por exemplo, e das 8h - 18h
    // o horário do time_from (8h) precisa ser menor ou igual ao horário solicitado
    // o time_to precisa ser acima

    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = 1
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "520"
        AND class_schedule.time_to > "520"
    `);
    //console.log(selectClassesSchedules);
};