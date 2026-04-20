import React from 'react'
import Header from '../components/Header'
import TopTrends from '../components/TopTrends'
import TopBrands from '../components/TopBrands'
import Cards from '../components/Cards'
import Footer from '../components/Footer'
import ShowingAllProducts from '../pages/ShowingAllProducts'
import SaleSec from '../components/SaleSec'
import SaleSecTwo from '../components/SaleSEcTwo'
import SectionLanding from '../components/SectionLanding'
import RecentProducts from '../pages/RecentProducts'
import InteractiveSpotlight from '../components/InteractiveSpotlight'

export default function UserDashboard() {
  return (
<> 

<InteractiveSpotlight />
<Cards />
<SaleSecTwo />
<TopTrends />

<TopBrands />
<RecentProducts />
<SaleSec />

<ShowingAllProducts />



<Footer />

</>
  )
}
