

import dbPromise from "../db/db";

const seed = async ()=> {
    const db = await dbPromise;
    const classes =[
        {day:"Monday",classes:["Math","Geography","Chemistry","IT","IT"],},
        {day:"Tuesday",classes:["Literature","History","Math","Math","IT","IT","History","Grammar","Summers","Summers"],},
        {day:"Wednesday",classes:["MaciLaci","MaciLaci","PE","PE","English"],},
        {day:"Thursday",classes:["English","Geography","Chemistry","IT","English"],},
        {day:"Friday",classes:["Math","History","Geography","History","IT"],},
    ]
    
    for (const entry of data){
        await db.run("INSERT INTO classes (day, class_list) VALUES (?, ?)", 
                    [entry.day,JSON.stringify(entry.classes)]);
    }
}
seed();
