import { useState } from 'react';
import './feeds.component.scss'

import Subtitle from '../typography/subtitle/subtitle.component';
import Posts from '../posts/posts.component';

import Categories from './categories/categories.component';

const Feeds = (props) => {

    const [category, setCategory] = useState('all')

    return ( 
        <section className= "feeds" data-testid="feeds">
            <div className='feeds__nav'>
                <Subtitle>Feeds</Subtitle>
                <Categories category={category} setCategory={setCategory}/>
            </div>
            <Posts category={category} /> 
        </section>
    )
}

export default Feeds;

