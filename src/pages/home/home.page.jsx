import useMediaQuery from 'hooks/useMediaQuery'

import Stories from 'components/stories/stories.component'
import Divider from 'components/display/divider/divider.component'
import Feeds from 'components/feeds/feeds.component'
import Explore from 'components/explore/explore.component'

import './home.page.scss'

const HomePage = () => {
    const isTablet = useMediaQuery('(max-width: 50em)')
    return  <div className="home" data-testid="home">
        <main className= "main">
            <Stories/>
            <Divider/>
            <Feeds />
        </main>
        <div className='vl'/>
        {/* { !isTablet && <Explore/>} */}
    </div>
}

export default HomePage;

