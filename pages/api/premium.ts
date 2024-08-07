import { NextApiHandler } from "next";
import random from 'lodash/random';
import { getSession } from "next-auth/react";

const premium : NextApiHandler = async (req, res) => {
    const session = await getSession({req});

    if(session === null){
        return res.status(401).json({
            error: 'Unauthorized'
        })
    }

    res.status(200).json({
        data: `https://randomfox.ca/images/${random(1, 122)}.jpg`,
        time: new Date().getTime()
    })
};

export default premium;

