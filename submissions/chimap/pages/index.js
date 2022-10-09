import Head from 'next/head'
import useInfo from '../hooks/getInfo'
import GlobalMap from '../components/map/global.map'
import countryData from '../utils/countries.json'
import { useEffect, useState } from 'react'
import { filterByCountry } from '../helpers/query'

export default function Home() {


  const countryList = countryData

  const [country, setCountry] = useState("Afghanistan")
  const [status, setStatus] = useState(false)
  const data = useInfo()

  const [filteredData, setFilteredData] = useState([])


  const apiStatus = data.status == "success" ? true : false


  useEffect(() => {
    const benefits = data.data?.benefitList
    setStatus(apiStatus)

    if (status) {
      setFilteredData(filterByCountry(country, benefits))
    }

  }, [apiStatus, country, data.data?.benefitList, status])



  return (
    <div >
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='lg:first-letter:max-h-screen w-full'>
        <div className='w-full lg:h-screen flex flex-col lg:flex-row'>
          {/* map */}
          <div className='lg:w-3/5 h-64 lg:h-full w-full lg:border-r'><GlobalMap /></div>
          <div className='lg:w-2/5 w-full p-2'>
            <label className='mr-4 ' htmlFor='country'>
              Country
            </label>
            <select defaultValue={country} onChange={(e) => setCountry(e.target.value)} className='w-full p-2 mt-2' id='country'>
              {
                countryList.map((i) => (
                  <option value={i.name} key={i.code}>{i.name}</option>
                ))
              }

            </select>

            <div className='mt-4 border-t'>
              {!status ?
                <div className='text-center mt-4'>Loading...</div>
                :
                <div>{console.log(filteredData)}</div>
              }
            </div>
          </div>


        </div>

      </main>

    </div>
  )
}
