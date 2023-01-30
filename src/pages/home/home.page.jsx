import React, { useEffect } from 'react'
import useAxiosFunction from '../../hooks/useAxiosFunction'
import axiosInstance from '../../api/axios-instance'


//// COMPONENTS
import Sidebar from '../../components/sidebar/sidebar.component'
import Stories from '@/components/stories/stories.component'
import Divider from '@/components/divider/divider.component'
import Feeds from '@/components/feeds/feeds.component'
import Explore from '../../components/explore/explore.component'

import './home.page.scss'
import Spinner from '../../components/spinner/spinner.component'
import { useErrorHandler } from 'react-error-boundary'
import useMediaQuery from '../../hooks/useMediaQuery'

const HomePage = ({ windowSize }) => {
    const handleError = useErrorHandler()
    
    const isTablet = useMediaQuery('(max-width: 75em)')

    const [data, loading, error, axiosGetUsers] = useAxiosFunction();
    const getUsers = () => {
        axiosGetUsers({
            axiosInstance,
            method: 'get',
            url: 'http://localhost:3000/api/v1/users'
        })
    }
    useEffect(() => {
        getUsers()
    }, [])
    

    if (loading) return <Spinner/>
    
    if (error) handleError(error)

    return data?.users && !loading && ( 
        <div className="home" id="home" data-testid="home">
            <main className= "main">
                <Stories users={data?.users}/>
                <Divider/>
                <Feeds />
            </main>
            <div className='vl'/>
            { <Explore users={data?.users}/>}
        </div>
    )
}

export default HomePage;

