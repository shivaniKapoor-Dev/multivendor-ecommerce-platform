import React from 'react'
import '../App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
import TopTrends from '../components/TopTrends';
import TopBrands from '../components/TopBrands';
import ShowingAllProducts from './ShowingAllProducts';
import RecentProducts from './RecentProducts'
import Hero from '../components/Hero';
import SaleSec from '../components/SaleSec';
import SaleSecTwo from '../components/SaleSecTwo';
import SectionLanding from '../components/SectionLanding';
import SubTopTrendsPage from '../components/SubTopTrendsPage';
import InteractiveSpotlight from '../components/InteractiveSpotlight';

export default function Landing() {
  return (
            <>  
            <Hero />
            <Cards></Cards>
                <InteractiveSpotlight />
                
                
                <TopTrends></TopTrends>
                <SectionLanding />
                <TopBrands></TopBrands>
                {/* <SubTopTrendsPage /> */}
                <RecentProducts />
                <SaleSecTwo />
                <ShowingAllProducts />
                 <SaleSec />
                <Footer></Footer>
                
            </>
    
  )
}
