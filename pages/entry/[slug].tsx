import { getPlant, getPlantList, getCategoryList } from "@api";

import { Layout } from "@components/Layout";
import { RichText } from "@components/RichText";

import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { AuthorCard } from "@components/AuthorCard";
import { GetStaticProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";

type PlantEntryProps = {
    plant: Plant
    categories: Category[] 
}

type PathType = {
    params: {
        slug: string
    }
}

export const getStaticPaths = async() => {
    const entries = await getPlantList({limit: 10});
    const paths: PathType[] = entries.map(plant => ({
        params: {
            slug: plant.slug
        }
    }));

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps<PlantEntryProps> = async({params}) => {
    const slug = params?.slug as string
    if (typeof slug !== 'string'){
        return {
            notFound: true
        }
    }
    try{
        const plant = await getPlant(slug)
        const otherEntries = await getCategoryList({limit: 4})
        return {
            props: {
                plant,
                categories: otherEntries
            },
            revalidate: 5 * 60
        }
    }
    catch(error){
        return {
            notFound: true
        }
    }
}


export default function PlantEntryPage({ plant, categories }: InferGetServerSidePropsType<typeof getStaticProps>){
    
    if(plant === null){
        <Layout>
            <main className="pt-16 text-center">Plant not found 404</main>
        </Layout>
    }

    return(
        <Layout>
            <Grid container spacing={4}>
                <Grid item xs={12} md={8} lg={9} component="article">
                    <figure>
                        <img width={952} src={plant.image.url} alt={plant.image.title}/>
                    </figure>
                    <div className="px-12 pt-8">
                        <Typography variant="h2">{plant.plantName}</Typography>
                    </div>
                    <div className="p-10">
                        <RichText richText={plant.description}/>
                    </div>
                </Grid>
                <Grid item xs={12} md={8} lg={9} component="aside">
                    <section className="mt-10">
                        <Typography variant="h5" component="h3" className="mb-4">Categories</Typography>
                        <ul className="list">
                            {categories.map((category) => (
                                <li key={category.id}>
                                    <Link passHref href={`/category/${category.slug}`}>
                                        <Typography component="a">{category.title}</Typography>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                </Grid>
            </Grid>
            <section>
                <AuthorCard {...plant.author}/>
            </section>
        </Layout>
    )
}