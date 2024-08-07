import type { NextApiHandler } from 'next'
 

const credentialsAuth: NextApiHandler<User> = (req, res) =>{
    //GET any not OK
    if(req.method !== 'POST'){
        res.status(405).end()
    }
    //POST - OK
    //Validate credentials
    if(req.body.password === process.env.AUTH_PLANT){
        const plantUser: User = {
            name: 'Plant V',
            email: 'plant@mail.com',
            image: '',
        }

        return res.status(200).json(plantUser)
    }

    res.status(401).end()
}

export default credentialsAuth
