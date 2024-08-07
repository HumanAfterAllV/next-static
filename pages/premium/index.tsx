import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/react";

import { Layout } from "@components/Layout";

import { AccessDenied } from "@components/AccessDenied";
import { Button, Typography } from "@material-ui/core";

export const getServerSideProps : GetServerSideProps<{}> = async (context) => {
    const session = await getSession(context);

    if(session === null){
        return {
            redirect: {
                destination: '/api/auth/signin?callbackUrl=/premium',
                permanent: false
            }
        }
    }

    return {
        props: {session}
    }
}

function PremiumPage() {
    const {data: session, status} = useSession();
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [refetchCounter, refetch] = useState(0)

    useEffect(() => {
        fetch('/api/premium')
        .then(res => res.json())
        .then(data => setImageUrl(data.data))
    }, [refetchCounter])

    if(status === 'loading'){
        return null
    }

    if(session === null){
        return <AccessDenied />
    }
    return (
        <Layout>
            <div className="text-center">
                <Typography variant="h2">
                    {`Welcome ${session.user?.name}`}
                </Typography>
                <div className="max-w-lg mx-auto text-center my-8">
                    {imageUrl == null ? null:(
                        <img key={imageUrl} src={imageUrl} alt="Random Fox" className="rounded"></img>
                    )}
                </div>
                <Button variant="outlined" onClick={() => refetch((c) => ++c)}>More</Button>
            </div>
        </Layout>
  );
}

export default PremiumPage;