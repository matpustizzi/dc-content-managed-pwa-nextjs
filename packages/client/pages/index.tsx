import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

import Header from '../components/Header';
import PromoBanner from '../components/PromoBanner';
import UserActions from '../components/UserActions';
import Navigation from '../components/Navigation';
import SearchBox from '../components/SearchBox';
import Footer from '../components/Footer';
import EditorialBlock from '../components/EditorialBlock';
import HeroBannerBlock from '../components/HeroBannerBlock';
import GalleryBlock from '../components/GalleryBlock';
import Sidebar from '../components/Sidebar';
import { fetchContent, fetchContentById } from '../utils/fetchContent';

interface Props {
    navigation: {
      navigation:{
        links: {title: string, href: string}[]
      }
    },
    promoBanner: {
      description: string
    },
    slot: {
        components: any[]
    }
}

const Index: NextPage<Props> = (props: Props) => {
  let {
      navigation,
      promoBanner,
      slot
  } = props;





  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  }
  
  /** Data fixes if not loaded **/
  let defaultNavContent = navigation?.navigation?.links || [ { title: 'Error: No Navigation Slot with content for delivery key "slots/navigation"', href: '/' }]
  const navigationLinks = defaultNavContent;

  let defaultSlotContent = {
    components: [
      {
          description: 'No Page Slot with content for delivery key "slots/homepage-hero"',
          component: 'EditorialBlock',
          title: 'Error loading content'
      }]
    }
    if(slot && slot.components){
      defaultSlotContent = slot;
    }
    const slotContent = defaultSlotContent;


  return (
    <>
      <Head>
        <title>ANYA FINN</title>
      </Head>
      
      <div>
        <PromoBanner description={ promoBanner.description }></PromoBanner>

        <Header actions={<UserActions />}
          search={<SearchBox />}
          navigation={(
            <Navigation links={navigationLinks}>
            </Navigation>
          )}
          onToggleSidebar={handleToggleSidebar}>
        </Header>

        {
            slotContent.components.map(component => {
                let ComponentType = null;

                switch (component.component) {
                    case 'HeroBannerBlock':
                        ComponentType = HeroBannerBlock;
                        break;
                    case 'EditorialBlock':
                        ComponentType = EditorialBlock;
                        break;
                    case 'GalleryBlock':
                        ComponentType = GalleryBlock;
                        break;
                    case 'PromoBanner':
                        ComponentType = PromoBanner;
                        break;
                }
                
                return <ComponentType {...component} />;
            })
        }

        <Footer />
      </div>

      <Sidebar links={navigationLinks} open={sidebarOpen} onToggleOpen={handleToggleSidebar} />
    </>
  );
}

Index.getInitialProps = async (context) => {
  const navigation = fetchContent('slots/navigation', context);
  const slot = fetchContent('slots/homepage-hero', context);
  const promoBanner = fetchContentById('e349042e-6e57-4a03-8246-a1ea1e042cb8', context);
  console.log(await promoBanner)
  return {
    navigation: await navigation,
    slot: await slot,
    promoBanner: await promoBanner
  };
};

export default Index;