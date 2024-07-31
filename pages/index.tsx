import { GetStaticProps, InferGetServerSidePropsType } from 'next'
import { getPlantList } from '@api'
import { Layout } from '@components/Layout'
import { PlantCollection } from '@components/PlantCollection'
import PlantEntryPage from './entry/[slug]'

type HomeProps = { 
  plants: Plant[]
}

export const getStaticProps: GetStaticProps<HomeProps> = async() => {
  const plants = await getPlantList({limit: 10});

  return{
    props: {
      plants,
    },
    revalidate: 5 * 60
  }
}

export default function Home({plants}: InferGetServerSidePropsType<typeof getStaticProps>) {

  return(
    <Layout>
      <PlantCollection plants={plants} variant='square'/>
      <PlantEntryPage plant={plants[0]} categories={[]}/>
    </Layout>
  )
}