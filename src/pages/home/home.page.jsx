import Stories from 'components/stories/stories.component'
import Divider from 'components/display/divider/divider.component'
import Feeds from 'components/feeds/feeds.component'

import './home.page.scss'

const HomePage = () => {
    return  <div className="home" data-testid="home">
        <main className= "main">
            <Stories/>
            <Divider/>
            <Feeds />
        </main>
        <div className='vl'/>
    </div>
}

export default HomePage;

