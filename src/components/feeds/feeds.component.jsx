import { useState } from 'react';
import './feeds.component.scss'

import Subtitle from '../subtitle/subtitle.component';
import Posts from '../posts/posts.component';

import usePosts from '../../hooks/usePosts';
import Categories from './categories/categories.component';
import { useErrorHandler } from 'react-error-boundary';

const Feeds = (props) => {

    const handleError = useErrorHandler()
    const [category, setCategory] = useState('following')

    // NOTE: COMPONENT RE-RENDER
    const [ posts, count, loading, error ] = usePosts({ url: `${category === 'all' ? '' : category}`  })

    // if(error)handleError(error)

    return ( 
        <section className= "feeds" id="feeds" data-testid="feeds">
            <div className='feeds__nav'>
                <Subtitle>Feeds</Subtitle>
                <Categories category={category} setCategory={setCategory}/>
            </div>
            { <Posts posts={posts} loading={loading} error={error}/> }
        </section>
    )
}

export default Feeds;

